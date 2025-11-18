// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const { createComment, getAllComments } = require('../controllers/commentController');

router.post('/about', createComment);
router.get('/about', getAllComments);

module.exports = router;
