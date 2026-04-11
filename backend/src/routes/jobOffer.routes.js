const express = require('express');
const router = express.Router();
const jobOfferController = require('../controllers/jobOffer.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', jobOfferController.getAll);
router.post('/', jobOfferController.create);
router.put('/:id', jobOfferController.update);
router.delete('/:id', jobOfferController.remove);

module.exports = router;