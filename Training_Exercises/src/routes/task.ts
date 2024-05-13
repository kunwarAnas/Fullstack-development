import express, { Router } from 'express';
import { generateToken, getLogs, migrateData } from '../Task3/script'
import { authenticateAdmin } from '../middleware/auth';
import { download, logout, task4Logs, uploadToS3 } from '../Task4/upload';

const task: Router = express.Router() // creating a mini router

task.route('/login').get(generateToken)
task.route('/logout').get(logout)

// TASK 3
task.route('/task3/script').get(authenticateAdmin, migrateData)
task.route('/task3/logs').get(authenticateAdmin, getLogs)

// TASK 4
task.route('/task4/upload').post(authenticateAdmin, uploadToS3)
task.route('/task4/download').get(authenticateAdmin, download)
task.route('/task4/logs').get(authenticateAdmin, task4Logs)

export default task