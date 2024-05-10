import fs from 'fs'
import { S3 } from 'aws-sdk';
import { Request, Response } from 'express';


export const uploadToS3 = async (req: Request, res: Response) => {

    try {
        const fileData = req.body.fileData;
        const fileName = req.body.fileName;

        if (!fileData || !fileName) {
            return res.status(400).json({ error: 'Missing file data or file name' });
        }

        const s3Params = {
            Bucket: 'bucket.myawsbucket',
            Key: 'dummy_migration_data.csv',
            Body: `${JSON.stringify(fileData)}.json`,
        };

        console.log(process.env.env)

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
            fs.writeFile(__dirname + '/demo.json', JSON.stringify(fileData), (err) => {
                if (!err) {
                    res.status(200).json({
                        message: 'file create success',
                        data: fileData
                    })
                }
            })
        }

    } catch (error: any) {
        console.error('Error accessing S3 or processing CSV:', error);
        res.status(400).send(error.message);
    }

}

export const download = async (req: Request, res: Response) => {
    try {
        // Set headers to trigger file download
        res.setHeader('Content-Disposition', `attachment; filename="demoFile.json"`);
        res.setHeader('Content-Type', 'application/octet-stream'); // Set the appropriate content 
        const fileStream = fs.createReadStream(__dirname + '/demo.json');
        fileStream.pipe(res);
    } catch (err) {
        if (err instanceof Error) res.status(500).json({
            message: err?.message && err.message
        })
    }
}
