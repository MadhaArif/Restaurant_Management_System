const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected To Database ${mongoose.connection.host}`.bgCyan);
    } catch (error) {
        console.error(`DB Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDb;
