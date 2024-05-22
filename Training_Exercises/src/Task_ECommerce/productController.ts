import { Request, Response } from 'express';
import { Product } from '../DB';

exports.createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Product.update(req.body, { where: { id } });
        if (updated) {
            const updatedProduct = await Product.findOne({ where: { id } });
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};
