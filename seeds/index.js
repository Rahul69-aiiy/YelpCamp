const mongoose = require('mongoose')
const cities = require('./cities')
const Campground= require('../models/campground')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({})
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 354);
        const price = Math.floor(Math.random()*20) + 10
        const camp = new Campground({
                    author: '68f96f8c85157bbeb52ea968',
                    location: `${cities[random1000].city}, ${cities[random1000].state}`,
                    geometry: {
                        type: "Point",
                        coordinates: [
                            cities[random1000].longitude,
                            cities[random1000].latitude,
                        ]
                    },
                    title: `${sample(descriptors)} ${sample(places)}`,
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eveniet quibusdam similique, alias voluptas aut ducimus nulla sit explicabo placeat id nisi praesentium iusto tempora expedita eos minus quia et!',
                    price,
                    images: [
                        {
                            url: 'https://res.cloudinary.com/dwg7l1bpq/image/upload/v1761566189/YelpCamp/wnclb1bfrjg973hcjtuz.jpg',
                            filename: 'YelpCamp/wnclb1bfrjg973hcjtuz',
                        },
                        {
                            url: 'https://res.cloudinary.com/dwg7l1bpq/image/upload/v1761576925/YelpCamp/gwbuychsutuvrkqoopng.jpg',
                            filename: 'YelpCamp/gwbuychsutuvrkqoopng',
                        }
                    ]
                })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})