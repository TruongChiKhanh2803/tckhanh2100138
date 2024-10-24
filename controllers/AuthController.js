import userModel from '../models/userModel';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const getLoginForm = (req, res) => {
    res.render('main', { title: 'Login', data: { page: 'login' } });
};
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return res.render('main', { title: 'Login', data: { page: 'login', error: 'Invalid username or password' } });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render('main', { title: 'Login', data: { page: 'login', error: 'Invalid username or password' } });
        }

        req.session.user = user;
        res.redirect('/users');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getUserByUsername = async (username) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.execute(sql, [username]);
    return rows[0];
};


const getRegisterForm = (req, res) => {
    res.render('main', { title: 'Register', data: { page: 'register' } });
};

const register = async (req, res) => {
    const { username, password, fullname, address, sex, email } = req.body;

    try {
        await userModel.addUser({ username, password, fullname, address, sex, email });

        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/login');
    });
};


const getEditProfileForm = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('main', {
        title: 'Edit Profile',
        data: { page: 'edit-profile', user: req.session.user }
    });
};

const updateProfile = async (req, res) => {
    const userId = req.session.user.id;
    const { username, fullname, address, password, newPassword } = req.body;

    try {
       
        let hashedPassword = req.session.user.password;
        if (newPassword) {
            const match = await bcrypt.compare(password, req.session.user.password);
            if (!match) {
                return res.render('main', {
                    title: 'Edit Profile',
                    data: { page: 'edit-profile', error: 'Incorrect current password', user: req.session.user }
                });
            }
            hashedPassword = await bcrypt.hash(newPassword, 10); 
        }

        
        await userModel.updateUserProfile(userId, { username, fullname, address, password: hashedPassword });

        
        req.session.user.username = username;
        req.session.user.fullname = fullname;
        req.session.user.address = address;
        req.session.user.password = hashedPassword;

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export default {
    getLoginForm, login, getRegisterForm, register, logout,
    getUserByUsername, getEditProfileForm, updateProfile
};
