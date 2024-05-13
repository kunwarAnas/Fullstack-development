import express, { Router } from 'express';
import { readFile, createWriteFile, createCopy, createExcel } from '../Task2/readFile';

const fsRoute: Router = express.Router() // creating mini router

fsRoute.route('/createWrite').post(createWriteFile)
fsRoute.route('/read').get(readFile)
fsRoute.route('/copy').get(createCopy)
fsRoute.route('/excel').get(createExcel)
export default fsRoute