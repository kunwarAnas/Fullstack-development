import { Request, Response } from 'express';
import { Category } from '../DB'


export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Category.update(req.body, { where: { id } });
        if (updated) {
            res.status(200).json('Category updated');
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
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
