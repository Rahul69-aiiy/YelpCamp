const mongoose = require('mongoose')
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp-camp';

const connectDB = async () => {
    mongoose.connect(dbUrl);
    const db = mongoose.connection
    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", () => {
        console.log("Database connected")
    })
}

module.exports = connectDB;