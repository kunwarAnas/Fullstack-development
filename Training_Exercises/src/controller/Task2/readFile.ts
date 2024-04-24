import fs from 'fs';
import { Request, Response } from "express"

export const readFile = (req: Request, res: Response) => {
    try {
        const isFileExist = fs.existsSync(__dirname + '/demo.txt');
        if (!isFileExist) return res.status(500).json({
            message: "please create a file first",
            route: 'fs/creatWrite'
        });

        const fileData = fs.readFileSync(__dirname + '/demo.txt', 'utf-8');

        res.status(200).json({
            message: 'Data from file',
            data: fileData
        })
    } catch (err) {
        if (err instanceof Error) res.status(500).json({
            message: err?.message && err.message
        })
    }
}

export const createWriteFile = (req: Request, res: Response) => {
    try {

        const data = req.body.data;

        if (data.trim() === '') {
            throw new Error('File Data cannot be empty')
        }

        const fileData = fs.writeFile(__dirname + '/demo.txt', data, (err) => {
            if (!err) {
                res.status(200).json({
                    message: 'file create success',
                    data: fileData
                })
            }
        })

    } catch (err) {
        if (err instanceof Error) res.status(500).json({
            message: err?.message && err.message
        })
    }
}

export const createCopy = (req: Request, res: Response) => {
    try {

        const isFileExist = fs.existsSync(__dirname + '/demo.txt');
        if (!isFileExist) return res.status(500).json({
            message: "please create a file first",
            route: '/api/fs/createWrite'
        });

        const fileData = fs.readFileSync(__dirname + '/demo.txt', 'utf-8');

        let today = new Date().toJSON().slice(0, 10).replace(/-/g, '/')

        fs.appendFile(__dirname + '/demo-copy.txt', today + " - " + fileData + "\n", (err) => {
            if (!err) {
                res.status(200).json({
                    message: 'file backup success',
                })
            }
        })


    } catch (err) {
        if (err instanceof Error) res.status(500).json({
            message: err?.message && err.message
        })
    }
}