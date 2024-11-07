import pool from '../config/db.js';

const getAllProducts = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM sanpham');
        return rows;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error so it can be caught in the controller
    }
};

const getProductById = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM sanpham WHERE masp = ?', [id]);
        return rows.length ? rows[0] : null; // Return the product if found, or null if not
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error; // Rethrow the error to be caught by the controller
    }
};

export default {
    getAllProducts,
    getProductById
};
