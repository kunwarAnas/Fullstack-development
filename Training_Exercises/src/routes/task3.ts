import express, { Router } from 'express';
import { generateToken, getLogs, migrateData } from '../controller/Task3/script'
import { authenticateAdmin } from '../middleware/auth';

const task3: Router = express.Router() // creating mini router

task3.route('/migrationScript/token').get(generateToken)

// protected routes
task3.route('/migrationScript').get(authenticateAdmin, migrateData)
task3.route('/migrationScript/logs').get(authenticateAdmin, getLogs)

export default task3