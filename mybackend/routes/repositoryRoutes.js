// routes/repositoryRoutes.js

const express = require('express');
const router = express.Router();
const { createRepository , getAllRepositories, deleteRepository  } = require('../controllers/repositoryController');

router.post('/admin', createRepository);
// Read all
router.get('/admin', getAllRepositories);
// Delete by ID
router.delete('/admin/:id', deleteRepository);

module.exports = router;
