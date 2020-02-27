'use strict';
const { validationResult } = require('express-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');
const emailService = require('../services/email-service');

exports.post = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        });

        emailService.send(req.body.email, 'Bem vindo ao Meu Store', global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });

    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar cliente', data: e });
    };
};

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidas'
            });
            return;
        }

        const token = await authService.generateToken(
            {
                email: customer.email,
                name: customer.name,
                id: customer._id,
                roles: customer.roles
            });

        res.status(200).send({
            token: token, data: {
                email: customer.email,
                name: customer.name
            }
        })

    } catch (e) {
        res.status(400).send({ message: 'Falha ao logar usuário', data: e });
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.header['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(401).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken(
            {
                email: customer.email,
                name: customer.name,
                id: customer._id,
                roles: customer.roles
            }
        );

        res.status(200).send({
            token: tokenData, data: {
                email: customer.email,
                name: customer.name
            }
        })

    } catch (e) {
        res.status(400).send({ message: 'Falha ao logar usuário', data: e });
    }
}