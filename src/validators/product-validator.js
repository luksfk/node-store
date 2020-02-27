'use strict';
const { check } = require('express-validator');

exports.validator = [check('title').notEmpty(), check('slug').notEmpty(), check('description').notEmpty()];