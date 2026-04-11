const express = require('express');
const router = express.Router();
const languageController = require('../controllers/language.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', languageController.getAll);
router.post('/', languageController.create);
router.put('/:id', languageController.update);
router.delete('/:id', languageController.remove);

module.exports = router;