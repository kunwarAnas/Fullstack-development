import { S3 } from 'aws-sdk';
import csv from 'csv-parser';
import { Request, Response } from 'express';
import { DataRecord, MigrationLog } from './DB';

interface MigrationInfo {
    migrationFileName: string;
    filePathToS3Bucket: string;
    migrationTriggeredBy: string;
    migratedRecords: number;
    skippedOrErrorRecords: number;
    updatedRecords: number;
    errors: { customer_number: number; error: string }[];
}

export async function migrateData(req: Request, res: Response) {
    const s3Params = {
        Bucket: 'bucket.myawsbucket',
        Key: 'dummy_migration_data.csv',
    };

    const s3 = new S3({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    });

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
        const stream = s3.getObject(s3Params).createReadStream();

        stream.on('error', (err) => {
            console.error('Error streaming data from S3:', err);
            res.status(500).send('Internal Server Error');
        });

        stream.pipe(csv()).on('data', async (row: any) => {
            try {
                await processRecord(row, migrationInfo);
            } catch (error: any) {
                handleError(error, migrationInfo);
            }
        }).on('end', () => {
            logMigrationDetails(migrationInfo);
            res.status(200).json({
                created: migrationInfo.migratedRecords,
                skipped: migrationInfo.skippedOrErrorRecords,
                updated: migrationInfo.updatedRecords,
            });
        });
    } catch (error: any) {
        console.error('Error accessing S3:', error);
        res.status(400).send(error.message);
    }
}

async function processRecord(row: any, migrationInfo: MigrationInfo) {
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

    const record = await DataRecord.findByPk(customer_number);

    if (record) {
        await record.update(dataToUpdate);
        migrationInfo.updatedRecords++;
    } else {
        await DataRecord.create(dataToUpdate);
        migrationInfo.migratedRecords++;
    }
}

function handleError(error: any, migrationInfo: MigrationInfo) {
    migrationInfo.skippedOrErrorRecords++;
    migrationInfo.errors.push({ customer_number: error.customer_number, error: error.message });
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
