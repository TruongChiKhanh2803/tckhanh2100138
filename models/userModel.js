import pool from '../config/db.js';
import bcrypt from 'bcrypt';
const getAllUser = async () => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM `users`');
        return rows;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
};


const addUser = async ({ username, password, fullname, address, sex, email }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [username, hashedPassword, fullname, address, sex, email];
    await pool.execute(sql, values);
};

const getUserByUsername = async (username) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.execute(sql, [username]);
    return rows[0];
};

const getUserById = async (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
};

const updateUser = async (id, { username, fullname, address }) => {
    const sql = `
        UPDATE users 
        SET username = ?, fullname = ?, address = ?
        WHERE id = ?
    `;
    const values = [username, fullname, address, id];
    await pool.execute(sql, values);
};


const deleteUser = async (id) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    await pool.execute(sql, [id]);
};


const updateUserProfile = async (id, { username, fullname, address, password }) => {
    const sql = `
        UPDATE users 
        SET username = ?, fullname = ?, address = ?, password = ?
        WHERE id = ?
    `;
    const values = [username, fullname, address, password, id];
    await pool.execute(sql, values);
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};


export default {
    getAllUser,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserByUsername,
    updateUserProfile,
    logout
};
