import express from 'express';
import HomeController from '../controllers/HomeController';
import AboutController from '../controllers/AboutController';
import ContactController from '../controllers/ContactController';

import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/', HomeController.getHomePage);
router.get('/about', AboutController.getAboutPage);
router.get('/contact', ContactController.getContactPage);

router.get('/users/new', UserController.createUserForm);
router.post('/users/new', UserController.createUser);
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.get('/users/:id/edit', UserController.getEditUserForm);
router.put('/users/:id', UserController.editUser);
router.post('/users/:id/delete', UserController.deleteUser);

// router.get('/home', (req, res) => {
//     res.render('home');
// });

// router.get('/about', (req, res) => {
//     res.render('about');
// });

// router.get('/date', (req, res) => {
//     res.send(`${new Date().toLocaleString()}<br/>`);
// });

// router.get('/ejs', (req, res) => {
//     res.render('test');
// });

// router.get('/', (req, res) => {
//     res.render('main');
// });





export default router;
