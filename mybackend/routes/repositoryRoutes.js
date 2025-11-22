// routes/repositoryRoutes.js

const express = require('express');
const router = express.Router();
const { createRepository , getAllRepositories, updateRepository, deleteRepository  } = require('../controllers/repositoryController');

router.post('/admin', createRepository);
// Read all
router.get('/admin', getAllRepositories);
// Update by ID
router.put('/admin/:id', updateRepository);
// Delete by ID
router.delete('/admin/:id', deleteRepository);

module.exports = router;
