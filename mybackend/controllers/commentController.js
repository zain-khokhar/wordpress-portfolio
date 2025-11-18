// controllers/commentController.js

const Comment = require('../models/Comment');
// create comment controller
const createComment = async (req, res) => {
  try {
    const { name, comment } = req.body;

    const newComment = new Comment({ name, comment });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// read comment controller
// controllers/commentController.js

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createComment,
  getAllComments
};
