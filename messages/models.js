'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MessageSchema = mongoose.Schema({
	sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	messages: {
		subject: String,
		message: String,
		delivered: Boolean,
		read: Boolean,
		date: { type: Date, default: Date.now },
	},
	is_group_message: { type: Boolean, default: false },
	recipient: {
		recipientEmail: String,
		delivered: Boolean,
		read: Boolean,
		last_seen: { type: Date, default: Date.now },
	},
});

MessageSchema.methods.apiRepr = function() {
	return {
		sender: this.sender || '',
		messageID: this._id,
		messages: this.messages || '',
		is_group_message: this.is_group_message,
		recipient: this.recipient || '',
		recipientEmail: this.recipient.recipientEmail || '',
		// last_seen: this.last_seen,
	};
};

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

module.exports = { Message };
