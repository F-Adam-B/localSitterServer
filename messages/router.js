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
	let { userId, messages, is_group_message, recipient } = req.body;

	return Message.create({ sender: userId, messages, is_group_message, recipient })
		.then(message => {
			return res.status(201).json(message.apiRepr());
		})
		.catch(err => {
			res.status(500).json({ message: 'Internal server err' });
		});
});

module.exports = { router };
