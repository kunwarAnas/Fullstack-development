import express, { Router } from 'express';
import { readFile, createWriteFile, createCopy } from '../controller/Task2/readFile';

const fsRoute: Router = express.Router() // creating mini router

fsRoute.route('/createWrite').post(createWriteFile)
fsRoute.route('/read').get(readFile)
fsRoute.route('/copy').get(createCopy)
export default fsRoute