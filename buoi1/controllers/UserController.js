import pool from '../config/db';
const createUserForm = (req, res) => {
    res.render('user_create', { title: 'Add User' });
};
// Thêm người dùng mới
const createUser = async (req, res) => {
    const { username, password, fullname, address, sex, email } = req.body;
    try {
        await pool.query(
            'INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)',
            [username, password, fullname, address, sex, email]
        );
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
};
// Hiển thị danh sách người dùng
const getUsers = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        res.render('user_list', { title: 'Users', users }); // Pass title
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
};
// Xem chi tiết người dùng
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length > 0) {
            res.render('user_detail', { user: rows[0], title: 'User Detail' });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error details:', error.message);
        res.status(500).send('Error retrieving user');
    }
};

// Sửa thông tin người dùng
const getEditUserForm = async (req, res) => {
    const userId = req.params.id;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length > 0) {
            res.render('user_edit', { user: rows[0], title: 'Edit User' }); // Truyền dữ liệu user vào view
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error retrieving user for edit:', error.message);
        res.status(500).send('Error retrieving user for edit');
    }
};
const editUser = async (req, res) => {
    const { username, fullname, address } = req.body;
    const userId = req.params.id;
    try {
        await pool.query('UPDATE users SET username = ?, fullname = ?, address = ? WHERE id = ?', [username, fullname, address, userId]);
        res.redirect('/users');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
};


// Xóa người dùng
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [userId]);
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
};

export default { getUsers, getUserById, editUser, deleteUser, createUser, getEditUserForm, createUserForm };
