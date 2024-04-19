const express = require('express')
const router= express.Router({mergeParams: true});
const User = require('../models/user');
const users = require('../controllers/users')
const catchAsync=require('../utils/catchAsync');
const passport = require('passport');
const review = require('../models/review');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports=router;