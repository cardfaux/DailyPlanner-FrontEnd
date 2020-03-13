const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
	notes: [
		{
			title: { type: String, required: true },
			description: { type: String, required: true }
		}
	],
	contacts: [
		{
			name: { type: String, required: true },
			address: {
				street: { type: String, required: true },
				city: { type: String, required: true },
				state: { type: String, required: true },
				zip: { type: Number, required: true }
			},
			number: { type: Number, required: true }
		}
	],
	date: { type: Date, default: Date.now },
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Profile', profileSchema);
