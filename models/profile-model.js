const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
	notes: [
		{
			title: { type: String },
			description: { type: String },
			createdAt: { type: Date, default: Date.now }
		}
	],
	contacts: [
		{
			name: { type: String },
			address: {
				street: { type: String },
				city: { type: String },
				state: { type: String },
				zip: { type: Number }
			},
			number: { type: Number }
		}
	],
	date: { type: Date, default: Date.now },
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Profile', profileSchema);
