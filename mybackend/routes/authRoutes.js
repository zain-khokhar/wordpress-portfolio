const express = require('express');
const router = express.Router();
const { register , getAllUsers ,  deleteUser , blockUser} = require('../controllers/authController');

router.post('/login', register);
router.get('/admin', getAllUsers);
// DELETE endpoint
router.delete('/admin/:id', deleteUser);
// put request for admin
router.put('/users/:id/block', blockUser);

module.exports = router;
