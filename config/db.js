const mongoose = require('mongoose')

const connectDB = async (dbUrl) => {
    try {
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"));
        db.once("open", () => {
            console.log("Database connected");
        });
        await mongoose.connect(dbUrl);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;