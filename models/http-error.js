// Extend The Built In JavaScript Error
class HttpError extends Error {
	// The Code In The Constructor Runs When We Instanciate This Class
	constructor(message, errorCode) {
		// Call super To Call The Constructor Of The Base Class
		super(message); // Adds A Message Property To The Instances We Create Based On This Class
		this.code = errorCode; //  Adds A code Property To The Instances We Create Based On This Class
	}
}

module.exports = HttpError;
