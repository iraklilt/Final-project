const express = require('express');
const fs = require("fs");
const router = express.Router();
const USERS_FILE= "users.json";


router.get('/', function(req, res, next) {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login', { error: null });
});


router.post('/', function(req, res, next) {

    const { email, password} = req.body;

    console.log(req.body);

    const data=fs.readFileSync(USERS_FILE);
    const users = JSON.parse(data);

    if (users.find(users => user.email === email, user.password === password)) {
        res.render('/profile', { error: null });
    } else {
        res.render('login', { error: `mail or password not match` });
    }
})





module.exports = router;
