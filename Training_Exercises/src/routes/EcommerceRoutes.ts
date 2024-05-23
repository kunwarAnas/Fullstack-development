import express, { Router } from 'express';
import { createProduct, updateProduct, deleteProduct } from '../Tasks_ECommerce/productController';

const TasksECommerceRouter: Router = express.Router() // creating mini router


// product Route

TasksECommerceRouter.route('/product/create').post(createProduct)
TasksECommerceRouter.route('/product/:id').get(updateProduct)
TasksECommerceRouter.route('/product/:id').delete(deleteProduct)

// category Routes

TasksECommerceRouter.route('/category/create').post(createProduct)
TasksECommerceRouter.route('/category/:id').get(updateProduct)
TasksECommerceRouter.route('/category/:id').delete(deleteProduct)

export default TasksECommerceRouter