const express = require('express');
const router = express.Router();
const fs = require('fs');
const {json} = require("express");
const inputedInfo = [];
const USERS_FILE= "users.json";

router.get('/', function (req, res, next) {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('register', {error: null});
});

router.post('/', function (req, res, next) {


    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.render('register', { error: `Passwords do not match` });
    }


    const data=fs.readFileSync(USERS_FILE);
    const users = JSON.parse(data);

    if (users.find(user => user.email === email)) {
        res.render('register', { error: `Email is already registered` });
    }

    users.push({ email, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null,2));




    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('register', {error: null});
})


module.exports = router;
