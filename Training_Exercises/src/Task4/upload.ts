import fs from 'fs'
import { S3 } from 'aws-sdk';
import { Request, Response } from 'express';
import { Task4Records } from '../DB';
import { _Request } from '../middleware/auth'
import { Sequelize } from 'sequelize';


export const logout = async (req: Request, res: Response) => {
    res.clearCookie("Token");
    res.send('Logout success')
}

export const uploadToS3 = async (req: _Request, res: Response) => {

    try {

        const fileData = req.body.fileData;
        const fileName = req.body.fileName;
        const userId = req.userId;

        if (!fileData || !fileName) {
            return res.status(400).json({ error: 'Missing file data or file name' });
        }

        const s3Params = {
            Bucket: 'bucket.myawsbucket',
            Key: `${fileName}.json`,
            Body: `${JSON.stringify(fileData)}.json`,
        };

        if (process.env.env !== 'local') {

            const s3 = new S3({
                accessKeyId: process.env.accessKeyId,
                secretAccessKey: process.env.secretAccessKey,
            });

            return s3.upload(s3Params, (err: any, data: {}) => {
                if (err) {
                    console.log(err.message)
                    throw new Error(err.message)
                }

                return res.status(200).send('S3 upload success')
            });

        } else {

            fs.writeFileSync(__dirname + `/${fileName}.json`, JSON.stringify(fileData))

            await Task4Records.upsert({
                uploaded_by: Number(userId),
                file_path: process.env.env === 'local' ? `/${fileName}.json` : `${s3Params.Bucket}/${s3Params.Key}`,
                uploaded_at: new Date().toISOString(),
                deleted: false
            })

            res.status(200).send('File upload success');
        }

    } catch (error: any) {
        console.error('Error occured', error);
        res.status(400).send(error.message);
    }

}

export const download = async (req: _Request, res: Response) => {
    try {
        // Set headers to trigger file download
        res.setHeader('Content-Disposition', `attachment; filename="demoFile.json"`);
        res.setHeader('Content-Type', 'application/octet-stream'); // Set the appropriate content 

        let fileStream: any

        const s3Params = {
            Bucket: 'bucket.myawsbucket',
            Key: 'demo.json',
        };

        const isFileDeleted = await Task4Records.findByPk(req?.userId);

        if (isFileDeleted && (<any>isFileDeleted)?.deleted) {
            return res.status(200).send('File is deleted please re-upload.')
        }

        if (process.env.env !== 'local') {
            const s3 = new S3({
                accessKeyId: process.env.accessKeyId,
                secretAccessKey: process.env.secretAccessKey,
            });

            fileStream = s3.getObject(s3Params).createReadStream();
        } else {
            fileStream = fs.createReadStream(__dirname + '/demo.json');
        }

        await Task4Records.update(
            {
                downloaded_by: Sequelize.fn('array_append', Sequelize.col('downloaded_by'), req.userId),
                downloads: Sequelize.literal('downloads + 1')
            }
            , {
                where: { uploaded_by: 123456 }
            })

        return fileStream.pipe(res);

    } catch (err) {
        if (err instanceof Error) res.status(500).json({
            message: err?.message && err.message
        })
    }
}

export const deleteFile = async (req: _Request, res: Response) => {
    try {
        const userID = req.userId;

        await Task4Records.update(
            {
                deleted: true
            }
            , {
                where: { uploaded_by: userID }
            })

        res.send('File flagged as deleted')

    } catch (err) {
        if (err instanceof Error) res.status(500).json({
            message: err?.message && err.message
        })
    }
}

export const task4Logs = async (req: _Request, res: Response) => {
    try {
        const logs = await Task4Records.findAll();
        res.send(logs)
    } catch (error: any) {
        res.send(error.message)
    }
}