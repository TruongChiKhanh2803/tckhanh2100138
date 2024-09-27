import express from 'express';
import dotenv from 'dotenv/config';
import getURL from './getURL';
import { default as date } from './date';
import viewEngine from './viewEngine';

const app = express();
const port = process.env.PORT || 6868;

// Cấu hình view engine thông qua viewEngine.js
viewEngine(app);

// app.get('/', (req, res) => {
//     res.send('Hello Home');
// });

// app.get('/about', (req, res) => {
//     res.send('Hello World! Page about');
// });

app.get('/date', (req, res) => {
    res.send(`${date()}<br/>`);
});

// app.get('*', (req, res) => {
//     const path = req.path;
//     res.send(`URL: ${path}`);
// });

app.get('/ejs', (req, res) => {
    res.render('test');
});
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Web run: ${port}`);
});
