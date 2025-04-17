const express = require('express');
const router = express.Router();

let inputinfo= [];

router.get('/', function(req, res, next) {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login', { error: null });
});

router.post('/', function(req, res, next) {
    let emailInput = req.body.inputemail
    let passwordInput = req.body.inputpassword
    inputinfo.push({
        emailInput,
        passwordInput
    })

    res.render('login', { title: 'Login page' });

    console.log(emailInput);
    console.log(passwordInput);
    console.log(inputinfo);
})



module.exports = router;

