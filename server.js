//to test always run [node server.js] in the terminal

const express = require('express')
const app = express()

const cors = require('cors') // cors untuk akses domain BE-FE
const apiRoutes = require("./src/routes")
app.use(express.json())

const PORT = process.env.PORT || 5500;

//list alamat domain yg bisa membuka web
app.use(cors({
    origin: ['https://localhost:5500', 'https://127.0.0.1:5500'],
    credentials: true
}));

app.use(express.json());
app.use('/upload', express.static('uploads')) //untuk bagian upload file's

//routes lists
const apiRoutes = require("./src/routes");
app.use('/api/auth', authController);
app.use('/api/admin', adminRoutes);
app.use("/api", apiRoutes)

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));



app.listen(5500, () => {console.log('Server is running')})
