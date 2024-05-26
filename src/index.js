const express = require('express');
require('dotenv').config()

const PORT = 3000

const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, { autoIndex: true}).then(r => console.log('Connected to FreecubeDB')).catch(e => console.log(`Error connecting to MongoDB : ${e}`))

// routes
const plotsRoutes = require('./plots/plotsRoutes')


app.use('/api/v1/plots', plotsRoutes);
 
//logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.listen(PORT, () => {
    console.log(`Freecube API listening on port ${PORT}`)
})