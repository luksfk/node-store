'use strict';
const Product = require('../models/product');

exports.get = async () => {
    return await Product.find({ active: true }, 'title price slug');
};

exports.getBySlug = async (slug) => {
    return await Product.findOne({ active: true, slug }, 'title description price slug tags');
}

exports.getByTags = (tags) => {
    return Product.find({ active: true, tags }, 'title description price slug tags');
}

exports.getById = async (id) => {
    return await Product.findById(id);
}

exports.create = async (data) => {
    const product = new Product(data);
    await product.save();
}

exports.update = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    })
}

exports.delete = async (id) => {
    await Product.findOneAndRemove(id);
}