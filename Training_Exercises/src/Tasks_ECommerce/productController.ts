import { Request, Response } from 'express';
import { Category, Product } from '../DB';

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { category } = req.query
        console.log(category)
        if (!category) {
            res.status(500).json({ error: 'category not found' });
        }
        const products = await Category.findOne({
            where: {
                name: category
            },
            include: [{
                model: Product,
            }]
        });
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const {
            name,
            availability,
            price,
            inventory,
            itemImage,
            categoryId
        } = req.body
        const product = await Product.create({
            name,
            availability,
            price,
            inventory,
            itemImage,
            categoryId
        });
        res.status(201).json(product);
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Product.update(req.body, { where: { id } });
        if (updated) {
            res.status(200).json('products updated');
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send('deleted');
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};
