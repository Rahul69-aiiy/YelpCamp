const mongoose = require('mongoose')

const connectDB = async (dbUrl) => {
    mongoose.connect(dbUrl);
    const db = mongoose.connection
    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", () => {
        console.log("Database connected")
    })
}

module.exports = connectDB;