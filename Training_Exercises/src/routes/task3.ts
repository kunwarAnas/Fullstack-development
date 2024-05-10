import express, { Router } from 'express';
import { generateToken, getLogs, migrateData } from '../controller/Task3/script'
import { authenticateAdmin } from '../middleware/auth';
import { uploadToS3 } from '../controller/Task4/upload';

const task3: Router = express.Router() // creating mini router

task3.route('/migrationScript/token').get(generateToken)

// protected routes
task3.route('/migrationScript').get(authenticateAdmin, migrateData)
task3.route('/migrationScript/logs').get(authenticateAdmin, getLogs)
task3.route('/upload').post(uploadToS3)

export default task3