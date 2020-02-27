'use strict';
const config = require('../config');
const sendGrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendGrid.send({
        to: to,
        from: 'hello@lucas.io',
        subject: subject,
        html: body
    })
}