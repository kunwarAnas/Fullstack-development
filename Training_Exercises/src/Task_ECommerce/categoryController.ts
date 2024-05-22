import { Request, Response } from 'express';
import { Category } from '../DB'


exports.createCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};

exports.updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Category.update(req.body, { where: { id } });
        if (updated) {
            const updatedCategory = await Category.findOne({ where: { id } });
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};

exports.deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Category.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};
