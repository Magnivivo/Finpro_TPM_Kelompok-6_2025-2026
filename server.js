//to test always run [node server.js] in the terminal

const cors = require('cors') // cors untuk akses domain BE-FE

const express = require('express')
const app = express()

//list alamat domain yg bisa membuka web
app.use(cors({
    origin: ['https://localhost:5500', 'https://127.0.0.1:5500']
}))

//app.get('/about', (req, res) => {}) -> request datanf pada path spesifik bagian function jalankan sebuah respons
app.get('/', (req, res) => { res.send('Hello from Express') })

app.get('/about', (req, res) => {res.send('This is the about page')})

//list database
app.get('/product', (req, res) => {
    res.json([
        { id: 1, name: 'ali', division: 'Back End', Team: 'unknown' },
        { id: 2, name: 'Paijo', division: 'Front-End', Team : 'Redbone'}
    ])
} )



app.listen(3000, () => {console.log('Server is running')})