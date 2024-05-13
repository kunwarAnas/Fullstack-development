import express, { Router } from 'express';
import { generateToken, getLogs, migrateData } from '../Task3/script'
import { authenticateAdmin } from '../middleware/auth';
import { download, uploadToS3 } from '../Task4/upload';

const task: Router = express.Router() // creating mini router

task.route('/migrationScript/token').get(generateToken)

// protected routes
task.route('/migrationScript').get(authenticateAdmin, migrateData)
task.route('/migrationScript/logs').get(authenticateAdmin, getLogs)
task.route('/upload').post(uploadToS3)
task.route('/download').get(download)

export default task