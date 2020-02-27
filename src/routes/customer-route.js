

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const customerValidator = require('../validators/customer-validator');
const authService = require('../services/auth-service');

router.post('/', customerValidator.validator, controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.authenticate);

module.exports = router;