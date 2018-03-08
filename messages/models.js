'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MessageSchema = mongoose.Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	// sitterID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	messageSubject: { type: String, required: true },
	createdMessages: [{ type: String, required: true }],
	receivedMessages: [{ type: String, required: false }],
	dateTime: { type: Date, required: false, default: Date.now },
});

MessageSchema.methods.apiRepr = function() {
	return {
		messageID: this._id,
		// sitterID: this.sitterID || '',
		userID: this.parentID || '',
		messageSubject: this.messageSubject || '',
		createdMessages: this.createdMessages || '',
		receivedMessages: this.receivedMessages || '',
		dateTime: this.dateTime || '',
	};
};

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

module.exports = { Message };
