const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const catchAsync=require('./utils/catchAsync');
const {campgroundSchema, reviewSchema}= require('./schemas')
const ExpressError=require('./utils/ExpressError')
const ejsMate = require('ejs-mate');
const session= require('express-session');
const flash= require('connect-flash')
const Review= require('./models/review');
// const { Recoverable } = require('repl');

const campgrounds = require('./routes/campground')
const reviews = require('./routes/reviews')

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('mongo connection open');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }

const app = express();

app.engine('ejs',ejsMate)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'secretCheck',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly : true,
        expires: Date.now() + 1000* 60*60*24*7,
        maxAge: 1000* 60*60*24*7 
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success= req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews);

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));



app.get('/',(req,res)=>{
    res.render('home');
})

app.all('*',(req,res,next)=>{
    next(new ExpressError('page not found', 404))
    // res.send('404!!!!!')
})

app.use((err,req,res,next)=>{
    const{statusCode=500,message='Something went wrong'}=err
    if(!err.message) err.message='Something went wrong';
    res.status(statusCode).render('error',{err});

})


app.listen(3000, ()=> console.log('serving on port 3000'))