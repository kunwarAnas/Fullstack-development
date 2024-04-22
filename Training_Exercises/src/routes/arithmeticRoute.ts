import express, { Router } from 'express';
import airthmeticOpertions from '../controller/airthmeticController'; 

const airthmeticRouter: Router = express.Router() // creating mini router

airthmeticRouter.route('/:operation').get(airthmeticOpertions)

export default airthmeticRouter