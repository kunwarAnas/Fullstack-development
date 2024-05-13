import express, { Router } from 'express';
import airthmeticOpertions from '../Task1/airthmeticController';

const airthmeticRouter: Router = express.Router() // creating mini router

airthmeticRouter.route('/:operation').get(airthmeticOpertions)

export default airthmeticRouter