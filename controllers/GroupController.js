const getGroups = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM nhom');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default {
    getGroups
};