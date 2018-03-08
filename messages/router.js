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
	let { messageSubject, createdMessages } = req.body;
	return Message.create({ messageSubject, createdMessages })
		.then(message => {
			console.log('message: ', message);
			return res.status(201).json(message.apiRepr());
		})
		.catch(err => {
			console.log('err: ', err);
			res.status(500).json({ message: 'Internal server err' });
		});
});

module.exports = { router };
