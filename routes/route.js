import express from 'express';
import HomeController from '../controllers/HomeController.js';
import AboutController from '../controllers/AboutController.js';
import ContactController from '../controllers/ContactController.js';
import UserController from '../controllers/UserController.js';
import AuthController from '../controllers/AuthController.js';
import { isAdmin, isUser, isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/login', AuthController.getLoginForm);
router.post('/login', AuthController.login);
router.get('/register', AuthController.getRegisterForm);
router.post('/register', AuthController.register);
router.get('/logout', AuthController.logout);

router.get('/', HomeController.getHomePage);
router.get('/about', AboutController.getAboutPage);
router.get('/contact', ContactController.getContactPage);

router.get('/users', isLoggedIn, UserController.getUsers); 
router.get('/users/new', isLoggedIn, UserController.createUserForm);
router.post('/users/new', isLoggedIn, UserController.createUser);
router.get('/users/detail/:id', UserController.getUserDetails);
router.get('/users/edit/:id', UserController.getEditUserForm); 
router.post('/users/edit/:id', UserController.updateUser); 
router.post('/users/:id/delete', isAdmin, UserController.deleteUser);

router.get('/users/edit-profile', isLoggedIn, AuthController.getEditProfileForm);
router.post('/users/edit-profile', isLoggedIn, AuthController.updateProfile); 

router.post('/users/delete-account', isLoggedIn, UserController.deleteOwnAccount);


export default router;
