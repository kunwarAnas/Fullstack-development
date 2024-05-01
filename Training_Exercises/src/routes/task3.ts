import express, { Router } from 'express';
import { getLogs, migrateData } from '../controller/Task3/script'

const task3: Router = express.Router() // creating mini router

task3.route('/migrationScript').get(migrateData)
task3.route('/migrationScript/logs').get(getLogs)

export default task3