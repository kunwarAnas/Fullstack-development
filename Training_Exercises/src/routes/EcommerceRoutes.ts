import express, { Router } from 'express';
import { createProduct, updateProduct, deleteProduct, getProduct } from '../Tasks_ECommerce/productController';
import { createCategory, deleteCategory, getCategory } from '../Tasks_ECommerce/categoryController';
import { authenticateAdmin } from '../middleware/auth';

const TasksECommerceRouter: Router = express.Router() // creating mini router


// product Route

TasksECommerceRouter.route('/product').get(authenticateAdmin,getProduct)
TasksECommerceRouter.route('/product/create').post(authenticateAdmin,createProduct)
TasksECommerceRouter.route('/product/:id').get(authenticateAdmin,updateProduct)
TasksECommerceRouter.route('/product/:id').delete(authenticateAdmin,deleteProduct)

// category Routes getProduct

TasksECommerceRouter.route('/category/all').get(authenticateAdmin, getCategory)
TasksECommerceRouter.route('/category/create').post(authenticateAdmin, createCategory)
TasksECommerceRouter.route('/category/:id').delete(authenticateAdmin, deleteCategory)

export default TasksECommerceRouter