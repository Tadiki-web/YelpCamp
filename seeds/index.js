const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors}= require('./seedHelpers');

const Campground = require('../models/campground');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('mongo connection open');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }


const sample= array => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0; i<50;i++){
        const random1000= Math.floor(Math.random()*1000);
        const price= Math.floor(Math.random()*20)+10;
        const camp= new Campground({
            author:'661de2a7b5f1f2a01d013278',
            title:`${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            price,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda culpa eaque ipsa odit neque aut sunt hic quibusdam explicabo, exercitationem dignissimos obcaecati doloribus, maxime laborum amet, expedita illo placeat nulla!',
            images: [
                {
                    url: 'https://res.cloudinary.com/dmjhya84q/image/upload/v1714050146/YelpCamp/urttoudarapxpazlcl8p.webp',        
                    filename: 'YelpCamp/urttoudarapxpazlcl8p'
                    
                  },
                  {
                    url: 'https://res.cloudinary.com/dmjhya84q/image/upload/v1714050146/YelpCamp/v2nbpts6seo89fcjuxht.jpg',
                    filename: 'YelpCamp/v2nbpts6seo89fcjuxht'
                    
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});