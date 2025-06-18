const { ProductReview, Product, Users } = require('../models');

const reviewController = {
  // Get all reviews for a specific product
  getProductReviews: async (req, res) => {
    try {
      const { productId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      
      const offset = (page - 1) * limit;
      
      const reviews = await ProductReview.findAndCountAll({
        where: { product_id: productId },
        include: [
          {
            model: Users,
            as: 'User',
            attributes: ['id', 'first_name', 'email']
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      // Calculate average rating
      const allReviews = await ProductReview.findAll({
        where: { product_id: productId },
        attributes: ['rating']
      });

      const averageRating = allReviews.length > 0 
        ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length
        : 0;

      res.json({
        success: true,
        data: {
          reviews: reviews.rows,
          totalReviews: reviews.count,
          averageRating: Math.round(averageRating * 10) / 10,
          currentPage: parseInt(page),
          totalPages: Math.ceil(reviews.count / limit)
        }
      });
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch reviews'
      });
    }
  },

  // Create a new review
  createReview: async (req, res) => {
    try {
      const { productId } = req.params;
      const { comment, rating } = req.body;
      const userId = req.user.id; // Assuming you have authentication middleware

      // Validate rating (1-5)
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: 'Rating must be between 1 and 5'
        });
      }

      // Check if product exists
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      // Check if user already reviewed this product
      const existingReview = await ProductReview.findOne({
        where: {
          product_id: productId,
          user_id: userId
        }
      });

      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: 'You have already reviewed this product'
        });
      }

      // Create review
      const review = await ProductReview.create({
        comment: comment || '',
        product_id: productId,
        rating: parseInt(rating),
        user_id: userId
      });

      // Get the created review with user info
      const createdReview = await ProductReview.findByPk(review.id, {
        include: [
          {
            model: Users,
            as: 'User',
            attributes: ['id', 'first_name', 'email']
          }
        ]
      });

      res.status(201).json({
        success: true,
        message: 'Review created successfully',
        data: createdReview
      });
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create review'
      });
    }
  },

  // Update a review
  updateReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { comment, rating } = req.body;
      const userId = req.user.id;

      // Validate rating if provided
      if (rating && (rating < 1 || rating > 5)) {
        return res.status(400).json({
          success: false,
          message: 'Rating must be between 1 and 5'
        });
      }

      // Find review
      const review = await ProductReview.findByPk(reviewId);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Review not found'
        });
      }

      // Check if user owns this review
      if (review.user_id !== userId) {
        return res.status(403).json({
          success: false,
          message: 'You can only update your own reviews'
        });
      }

      // Update review
      const updateData = {};
      if (comment !== undefined) updateData.comment = comment;
      if (rating !== undefined) updateData.rating = parseInt(rating);

      await review.update(updateData);

      // Get updated review with user info
      const updatedReview = await ProductReview.findByPk(reviewId, {
        include: [
          {
            model: Users,
            as: 'User',
            attributes: ['id', 'first_name', 'email']
          }
        ]
      });

      res.json({
        success: true,
        message: 'Review updated successfully',
        data: updatedReview
      });
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update review'
      });
    }
  },

  // Delete a review
  deleteReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const userId = req.user.id;

      // Find review
      const review = await ProductReview.findByPk(reviewId);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Review not found'
        });
      }

      // Check if user owns this review
      if (review.user_id !== userId) {
        return res.status(403).json({
          success: false,
          message: 'You can only delete your own reviews'
        });
      }

      await review.destroy();

      res.json({
        success: true,
        message: 'Review deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete review'
      });
    }
  },

  // Get user's review for a specific product
  getUserReview: async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.id;

      const review = await ProductReview.findOne({
        where: {
          product_id: productId,
          user_id: userId
        },
        include: [
          {
            model: Users,
            as: 'User',
            attributes: ['id', 'first_name', 'email']
          }
        ]
      });

      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Review not found'
        });
      }

      res.json({
        success: true,
        data: review
      });
    } catch (error) {
      console.error('Error fetching user review:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch review'
      });
    }
  }
};

module.exports = reviewController;