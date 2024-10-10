// import express from 'express';
// import dotenv from 'dotenv/config';
// import getURL from './getURL';
// import { default as date } from './date';
// import viewEngine from './viewEngine';
// import route from './routes/route';

// const app = express();
// const port = process.env.PORT || 6868;

// viewEngine(app);

// app.use('/', route);

// app.get('/', (req, res) => {
//     res.send('Hello Home');
// });

// app.get('/about', (req, res) => {
//     res.send('Hello World! Page about');
// });

// app.get('/date', (req, res) => {
//     res.send(`${date()}<br/>`);
// });

// app.get('*', (req, res) => {
//     const path = req.path;
//     res.send(`URL: ${path}`);
// });

// app.get('/ejs', (req, res) => {
//     res.render('test');
// });
// app.get('/', (req, res) => {
//     res.render('home');
// });
// app.get('/about', (req, res) => {
//     res.render('about');
// });

// app.listen(port, () => {
//     console.log(`Web run: ${port}`);
// });


import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import dotenv from 'dotenv/config';
import getURL from './getURL';
import { default as date } from './date';
import viewEngine from './viewEngine';
import route from './routes/route';
import db from './config/db';
import methodOverride from 'method-override';

const app = express();
const port = process.env.PORT || 6868;

app.use(expressLayouts); // Use express-ejs-layouts
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('layout', 'main'); // Use 'main.ejs' as the default layout

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
viewEngine(app);



app.use('/', route);

app.listen(port, () => {
    console.log(`Web run: ${port}`);
});
