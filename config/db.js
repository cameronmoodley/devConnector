const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('MDB connected....');
	} catch (err) {
		console.error(err.message);
		// exits process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
