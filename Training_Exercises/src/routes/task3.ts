import express, { Router } from 'express';
import { migrateData } from '../controller/Task3/script'

const task3: Router = express.Router() // creating mini router

task3.route('/migrationScript').get(migrateData)

export default task3