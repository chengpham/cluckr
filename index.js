const express = require('express')
const app = express()
const logger = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(logger('dev'))
app.use((req, res, next) => {
    console.log('COOKIES:', req.cookies);
    res.locals.username = "";
    if (req.cookies.username) {
      res.locals.username = req.cookies.username
    }
    next();
  })
app.use(methodOverride((req,res)=>{
    if (req.body && req.body._method){
        const method = req.body._method
        return method
    }
}))
app.get('/', (req,res)=>{
    res.redirect('/clucks')
})
app.get('/sign_in', (req,res)=>{
    res.render('sign_in')
})
app.post('/sign_in', (req, res) => {
    res.cookie('username', req.body.username, { maxAge: 604800000 });
    res.redirect('/');
    })
app.post('/sign_out', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
})

const clucksRouter = require('./routes/clucks')
app.use('/clucks', clucksRouter)


const ADDRESS = 'localhost';
const PORT = 3000;
app.listen(PORT, ADDRESS, ()=>{
    console.log(`Server listening on ${ADDRESS}:${PORT}`)
})