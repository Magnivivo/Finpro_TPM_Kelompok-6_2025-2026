//to test always run [node server.js] in the terminal

const express = require('express')
const app = express()

const cors = require('cors') // cors untuk akses domain BE-FE
const apiRoutes = require("./src/routes")
app.use(express.json())

//list alamat domain yg bisa membuka web
app.use(cors({
    origin: ['https://localhost:5500', 'https://127.0.0.1:5500']
}))

app.use(express.json());
app.use('/upload', express.static('uploads')) //untuk bagian upload file's

//routes lists
app.use('/api/auth', authController);
app.use('/api/admin', adminRoutes);
app.use("/api", apiRoutes)


app.listen(5500, () => {console.log('Server is running')})
