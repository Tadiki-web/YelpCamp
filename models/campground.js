const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Schema = mongoose.Schema;
const Review= require('./review')
const User = require('./user')
    
const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema= new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    price: Number,
    description: String,
    location: String,
    author: {
        type:Schema.Types.ObjectId,
        ref: 'User'
        },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
});

CampgroundSchema.post('findOneAndDelete', async function(doc){
    console.log(doc)
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports=mongoose.model('Campground', CampgroundSchema);


