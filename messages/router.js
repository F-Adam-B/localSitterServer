'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const { ParentalInfo } = require('../parents/models');
const { User } = require('../users/models');
const { Message } = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();
// const passport = require('passport');

router.post('/create_message', jsonParser, (req, res) => {
	let { email, text, subject, id } = req.body;

	return Message.create({
		sender: id,
		recipient: { recipientEmail: email },
		messages: { message: text, subject: subject },
	})
		.then(message => {
			return res.status(201).json(message.apiRepr());
		})
		.catch(err => {
			res.status(500).json({ message: 'Internal server err' });
		});
});

router.get('/:id', (req, res) => {
	return Message.find({ sender: req.params.id })
		.populate('sender', { password: 0 })
		.then(data => res.json(data))
		.catch(err => res.status(500).json({ message: 'Internal Server Err' }));
});

module.exports = { router };
