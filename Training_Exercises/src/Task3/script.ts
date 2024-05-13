import { S3 } from 'aws-sdk';
import csv from 'csv-parser';
import { Request, Response } from 'express';
import { DataRecord, MigrationLog } from '../DB';
import fs from 'fs';
import jwt from 'jsonwebtoken';


interface MigrationInfo {
  migrationFileName: string;
  filePathToS3Bucket: string;
  migrationTriggeredBy: string;
  migratedRecords: number;
  skippedOrErrorRecords: number;
  updatedRecords: number;
  errors: { customer_number: number; error: string }[];
}


// Function to generate JWT token
export const generateToken = (_: Request, res: Response) => {
  const payload = {
    userId: '1234',
    isAdmin: true
  };
  const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '1w' });
  res.send(token)
}


export const migrateData = (_: Request, res: Response) => {

  let buffer: any[] = []

  const s3Params = {
    Bucket: 'bucket.myawsbucket',
    Key: 'dummy_migration_data.csv',
  };

  // const s3 = new S3({
  //   accessKeyId: process.env.accessKeyId,
  //   secretAccessKey: process.env.secretAccessKey,
  // });

  const migrationInfo: MigrationInfo = {
    migrationFileName: s3Params.Key,
    filePathToS3Bucket: `s3://${s3Params.Bucket}/${s3Params.Key}`,
    migrationTriggeredBy: 'Administrator',
    migratedRecords: 0,
    skippedOrErrorRecords: 0,
    updatedRecords: 0,
    errors: [],
  };

  try {
    // const stream = s3.getObject(s3Params).createReadStream();

    const stream = fs.createReadStream(__dirname + '/data.csv', 'utf-8')

    stream.on('error', (err) => {
      console.error('Error streaming data from S3:', err);
      res.status(500).send('Internal Server Error');
    });

    stream.pipe(csv()).on('data', async (row: any) => {
      buffer.push(row)
    }).on('end', async () => {
      for (let row of buffer) {
        const {
          source,
          account_number,
          first_name,
          last_name,
          customer_number,
          case_reference,
          alert_trigger_date,
          triggered_by_rule,
          record_type,
          notes,
          senior_analyst_user_id,
          investigating_analyst_user_id,
          case_outcome,
          category_of_match,
          attachments
        } = row;
        try {
          const dataToUpdate = {
            source,
            account_number,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            customer_number: +customer_number,
            case_reference: +case_reference,
            alert_trigger_date,
            triggered_by_rule: +triggered_by_rule,
            record_type,
            notes,
            senior_analyst_user_id,
            investigating_analyst_user_id,
            case_outcome,
            category_of_match,
            attachments
          };

          const isRecordExist = await DataRecord.findByPk(customer_number)

          if (!isRecordExist) {
            await DataRecord.create(dataToUpdate)
            migrationInfo.migratedRecords++;
          } else {
            await isRecordExist.update(dataToUpdate)
            migrationInfo.updatedRecords++;
          }

        } catch (error: any) {
          handleError(error, customer_number);
        }
      }

      await logMigrationDetails(migrationInfo);

      return res.status(200).json({
        created: migrationInfo.migratedRecords,
        skipped: migrationInfo.skippedOrErrorRecords,
        updated: migrationInfo.updatedRecords,
      });
    })

  } catch (error: any) {
    console.error('Error accessing S3 or processing CSV:', error);
    res.status(400).send(error.message);
  }



  function handleError(error: any, customer_number: number) {
    migrationInfo.skippedOrErrorRecords++;
    migrationInfo.errors.push({ customer_number, error: error.message });
  }

  async function logMigrationDetails(migrationInfo: MigrationInfo) {
    await MigrationLog.create({
      migrationFileName: migrationInfo.migrationFileName,
      s3FilePath: migrationInfo.filePathToS3Bucket,
      migrationTriggeredBy: migrationInfo.migrationTriggeredBy,
      migratedRecords: migrationInfo.migratedRecords,
      skippedRecords: migrationInfo.skippedOrErrorRecords,
      errorDetails: migrationInfo.errors,
    });
  }
}

export const getLogs = async (_: Request, res: Response) => {
  try {
    const logsData = await MigrationLog.findAll()
    res.status(200).json(logsData)
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
}