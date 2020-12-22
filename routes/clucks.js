const express = require('express')
const knex = require('../db/client')
const router = express.Router()

router.get('/', (req,res)=>{
    knex('clucks')
        .orderBy('created_at', 'desc')
        .then(clucks=>{
            if (clucks){
                res.render('clucks/index', { clucks: clucks })
            } else {
                res.render('clucks/index', { clucks: false })
            }
        })
})
router.get('/new', (req, res) => {
    res.render('clucks/new', {clucks:false});
});
router.post('/new', (req, res) => {
    knex('clucks')
        .insert({
        id: req.body.id,
        username: req.cookies.username,
        image_url: req.body.image_url,
        content: req.body.content
        })
        .returning('*')
        .then( () => {
        res.redirect('/clucks');
    })
})

module.exports = router;