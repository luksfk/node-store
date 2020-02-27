'use strict';
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const repository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug);
        res.status(200).send({ data });
    } catch (e) {
        res.status(400).send(e);
    };
};

exports.getByTags = async (req, res, next) => {
    try {
        const data = await repository.getByTags(req.params.tags);
        res.status(200).send({ data });
    } catch (e) {
        res.status(400).send(e);
    };
};

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send({ data });
    } catch (e) {
        res.status(400).send(e);
    };
};

exports.post = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        await repository.create(req.body);
        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });

    } catch (e) {
        console.log(e);
        res.status(400).send({ message: 'Falha ao cadastrar produto', data: e });
    };
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Produto atualizado com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao atualizar produto', data: e });
    };
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({ message: 'Produto removido com sucesso!' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao remover produto', data: e });
    };
};