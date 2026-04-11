const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formation.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', formationController.getAll);
router.post('/', formationController.create);
router.put('/:id', formationController.update);
router.delete('/:id', formationController.remove);

module.exports = router;