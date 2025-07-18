const {recipe, recipe_category, recipe_comment, recipe_favorite, Sequelize} = require('../models')

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

    async getAllCategory(req, res) {
    try {
        const categories = await recipe_category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error getting categories:", error);
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

    async getByCategory(req, res) {
        try {
            const { categoryId } = req.params;

            const data = await recipe.findAll({
                where: { category_id: categoryId },
                include: [recipe_category, recipe_comment, recipe_favorite]
        });

        if (data.length === 0) {
            return res.status(404).json({ message: 'No recipes found in this category' });
        }

            res.json(data);
            } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async create(req, res) {
        try {
            const {
                title, desc, category_id, overview, slug,
                how_to_make, ingredients, prep_time, cook_time, serving
            } = req.body;

            const img_url = req.file?.path || null;

            const data = await recipe.create({
                title,
                desc,
                category_id,
                overview,
                img_url,
                slug,
                how_to_make,
                ingredients,
                prep_time,
                cook_time,
                serving
            });

            res.status(201).json(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(400).json({ message: error.message });
        }
    },

    async update(req, res) {
        try {
        const id = req.params.id;

        const updated = await recipe.update(req.body, {
            where: { id }
        });

        if (updated[0] === 0) {
            return res.status(404).json({ message: 'Recipe not found or nothing to update' });
        }

        res.json({ message: 'Recipe updated' });
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    },

    async delete(req, res) {
        try {
        const id = req.params.id;

        const deleted = await recipe.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ message: 'Recipe deleted' });
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    },

        async getTrendingRecipes(req, res) {
         try {
            const { limit = 3 } = req.query; // Default limit 3
            const recipes = await recipe.findAll({ 
                attributes: [
                    'id',
                    'title',
                    'desc',
                    'img_url',
                    'slug',
                    [
                        Sequelize.fn('COUNT', Sequelize.col('recipe_favorites.id')),
                        'favoriteCount'
                    ]
                ],
                include: [
                    {
                        model: recipe_category, 
                        as: 'recipe_category',
                        attributes: ['name']
                    },
                    {
                        model: recipe_favorite, 
                        as: 'recipe_favorites',
                        attributes: [],
                        duplicating: false
                    }
                ],
                group: ['Recipe.id', 'recipe_category.id'],
                order: [[Sequelize.literal('favoriteCount'), 'DESC']],
                limit: parseInt(limit)
            });

            const formattedRecipes = recipes.map(recipe => ({
                ...recipe.toJSON(),
                favoriteCount: parseInt(recipe.dataValues.favoriteCount)
            }));

            res.json(formattedRecipes);
        } catch (error) {
            console.error('Error fetching trending recipes:', error);
            res.status(500).json({ message: 'Failed to fetch trending recipes' });
        }
    }
}