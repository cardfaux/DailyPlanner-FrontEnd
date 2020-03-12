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
app.get('/', (req, res) => res.send('API RUNNING'));
// Test Connection Route

// Define Routes
const userRoutes = require('./routes/users-routes');
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
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	next();
});

// Bring In And Prefix Routes
app.use('/api/users', userRoutes);

// Error Handling Routes And MiddleWare
app.use((req, res, next) => {
	const error = new HttpError('Could Not Find This Route', 404);
	throw error;
});

app.use((error, req, res, next) => {
	// Rollback File Upload If We Get An Error
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			console.log(err);
		});
	}
	if (res.headersSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An Unknown Error Occurred' });
});
// Error Handling Routes And MiddleWare

// Start The Server And Connect To The DataBase
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`APP IS RUNNING ON ${PORT}`));
connectDB();
// Start The Server And Connect To The DataBase
