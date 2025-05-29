const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/dashboard', auth, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.userId });
});

module.exports = router;
