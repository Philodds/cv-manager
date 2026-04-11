const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experience.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', experienceController.getAll);
router.post('/', experienceController.create);
router.put('/:id', experienceController.update);
router.delete('/:id', experienceController.remove);

module.exports = router;