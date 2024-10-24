const getHomePage = (req, res) => {
    res.render('main', { title: 'Home', data: { page: 'home' } });
};

export default {
    getHomePage
};
