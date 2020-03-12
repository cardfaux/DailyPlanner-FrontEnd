const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	// Unique True Will Create An Internal Index For This Field
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	image: { type: String },
	events: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Event' }]
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
