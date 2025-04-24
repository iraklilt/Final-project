const express = require('express');
const router = express.Router();
const fs = require("fs")

const BLOGS_FILE = "blogs.json";


const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/', requireAuth, function (req, res, next) {
    res.render('blogs', {error: null});

});

router.post('/', requireAuth, function (req, res, next) {
    const {name, title, date, content} = req.body;

    const data = fs.readFileSync(BLOGS_FILE);
    const posts = JSON.parse(data)

    posts.push({name, title, date, content});
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(posts, null, 2));

    res.render('blogs', {error: null});
})


module.exports = router;
