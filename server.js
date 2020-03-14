// Core NodeJS Module
const fs = require('fs');
const path = require('path');
// Core NodeJS Module

// Packages
const express = require('express');
// Packages

// Bring In DataBase Connection Function
const connectDB = require('./config/db');
// Bring In DataBase Connection Function

// Express
const app = express();
// Express

// Test Connection Route
// http://localhost:5000
app.get('/', (req, res) => res.send('API RUNNING'));
// Test Connection Route

// Define Routes
const userRoutes = require('./routes/users-routes');
const eventRoutes = require('./routes/events-routes');
const notesRoutes = require('./routes/notes-routes');
const HttpError = require('./models/http-error');

// BodyParser InIt
app.use(express.json({ extended: false }));
// BodyParser InIt

// Parse The Image Uploads
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
// Parse The Image Uploads

// CORS Middleware to attatch to every response
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, PUT, DELETE'
	);
	next();
});

// Bring In And Prefix Routes Middleware
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notes', notesRoutes);

// Default Error Handling MiddleWare
app.use((req, res, next) => {
	const error = new HttpError('Could Not Find This Route!!!', 404);
	throw error;
});

// With error As A Parameter Express Knows It's An Error Middleware
// Will Only Get Executed on Requests That Has An Error Attatched To It, If Any Middleware Before Has An Error
app.use((error, req, res, next) => {
	// Rollback File Upload If We Get An Error
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			console.log(err);
		});
	}
	// Check If Response and Headers Has Already Been Sent
	if (res.headersSent) {
		// return next and forward the Error
		return next(error);
	}
	// If We Make It Here Then No Response Has Been Sent, So We Send One
	res.status(error.code || 500);
	// Every Error Sent Back Should Have A Message Property
	res.json({ message: error.message || 'An Unknown Error Occurred' });
});
// Error Handling Routes And MiddleWare

// Start The Server And Connect To The DataBase
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`APP IS RUNNING ON ${PORT}`));
connectDB();
// Start The Server And Connect To The DataBase
