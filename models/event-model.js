const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
	title: { type: String, required: true },
	allDay: { type: Boolean, required: true, default: false },
	start: { type: String, required: true },
	end: { type: String, required: true },
	description: { type: String },
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Event', eventSchema);
