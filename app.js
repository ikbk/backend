const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function (req, res) {
    res.json({
        message: 'Hai Najib, welcome to node again!'
    })
    // res.send('<h1>hallo najib</h1>')
})

const router = require('./src/routes/customer')
app.use(router)

app.listen(3000, function () {
    console.log('Server running on port 3000.')
})