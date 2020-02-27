'use strict';
const { check } = require('express-validator');

exports.validator = [check('name').notEmpty(), check('email').isEmail(), check('password').notEmpty()];