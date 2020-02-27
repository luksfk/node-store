

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const productValidator = require('../validators/product-validator');
const authService = require('../services/auth-service');

router.post('/', [productValidator.validator, authService.isAdmin], controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/:id', authService.isAdmin, controller.delete);
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tags', controller.getByTags);

module.exports = router;