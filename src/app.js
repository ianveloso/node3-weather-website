const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Ian Veloso'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About', 
        name: 'Ian Veloso'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This page is to help you', 
        name: 'Ian Veloso'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    } 

    geocode(req.query.address, (error, data) => {
        if(error) {
            return res.send({ error })
        } 
        
        weather(data, (error, {location,forecast}) => {
            if(error) {
                return res.send({ error })
            }
            
            res.send({
                location,
                forecast
            })
        })
        
    })
        

})

app.get('/products', (req, res) => {
    
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
        
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ian Veloso',
        error: 'Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Ian Veloso',
        error: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})