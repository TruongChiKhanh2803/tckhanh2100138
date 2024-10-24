import express from 'express';
import pool from '../models/userModel';
import userModel from '../models/userModel';

const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUser();
        res.render('main', { title: 'Users', data: { page: 'user_list', rows: users } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    // try {
    //     const users = await userModel.getAllUser();
    //     res.json(users); // Send users as JSON response
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Internal Server Error' }); // Send JSON error response
    // }
};

const createUserForm = (req, res) => {
    res.render('main', { title: 'Add User', data: { page: 'user_create' } });
};

const createUser = async (req, res) => {
    const { username, password, fullname, address, sex, email } = req.body;
    try {
        await userModel.addUser({ username, password, fullname, address, sex, email });
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.getUserById(userId);

        if (user) {
            res.render('main', { title: 'User Details', data: { page: 'user_detail', user } });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
const getEditUserForm = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.getUserById(userId);

        if (user) {
            res.render('main', { title: 'Edit User', data: { page: 'user_edit', user } });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, fullname, address } = req.body;

    try {
        await userModel.updateUser(userId, { username, fullname, address });

        if (req.session.user && req.session.user.id == userId) {
            req.session.user.username = username;
            req.session.user.fullname = fullname;
        }

        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await userModel.deleteUser(userId);
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getUserByUsername = async (username) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.execute(sql, [username]);
    return rows[0];
};

const RegisterUser = async ({ username, password, fullname, address, sex, email }) => {
    const sql = `
        INSERT INTO users (username, password, fullname, address, sex, email)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [username, password, fullname, address, sex, email];
    await pool.execute(sql, values);
};

const deleteOwnAccount = async (req, res) => {
    const userId = req.session.user.id;
    try {
        await userModel.deleteUser(userId); 
        req.session.destroy();
        res.redirect('/'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export default {
    getUsers,
    createUserForm,
    createUser,
    getUserDetails,
    getEditUserForm,
    updateUser,
    deleteUser,
    deleteOwnAccount,
};
