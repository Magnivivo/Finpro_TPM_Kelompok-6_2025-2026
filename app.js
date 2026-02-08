const express = require('express');
const app = express();
const port = 3000;

// Set EJS & Folder Public
app.set('view engine', 'ejs');
app.use(express.static('public'));

// --- ROUTES ---

// 1. Landing Page
app.get('/', (req, res) => {
  res.render('index');
});

// 2. Login Page
app.get('/login', (req, res) => {
    res.render('login');
});

// 3. Register Page
app.get('/register', (req, res) => {
    res.render('register');
});

// 4. Dashboard (User)
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// 5. Admin Panel
app.get('/admin', (req, res) => {
    res.render('admin');
});

// Jalanin Server
app.listen(port, () => {
  console.log(`Websitenya udah jalan di http://localhost:${port}`);
});