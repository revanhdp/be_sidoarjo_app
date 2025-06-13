const {recipe, recipe_category, recipe_comment, recipe_favorite} = require('../models')

module.exports = {
    async getAll(req, res) {
        try {
            const data = await recipe.findAll({
                include: [recipe_category, recipe_comment, recipe_favorite]
            });
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getById(req, res) {
        try {
            const data = await recipe.findByPk(req.params.id, {
                include: [recipe_category, recipe_comment, recipe_favorite]
            });
            if(!data) return res.status(404).json({ message: 'Recipe not found'});
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    async create(req, res) {
        try {
            const data = await recipe.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async update(req, res) {
        try {
            const data = await recipe.update(req.body, {
                where: { id: req.params.id }
            })
            res.json({ message: 'Recipe updated', data });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async delete(req, res) {
        try {
            await recipe.destroy({ where: { id: req.params.id } });
            res.json({ message: 'Recipe deleted'})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}