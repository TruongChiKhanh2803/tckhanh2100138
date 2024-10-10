const getHomePage = (req, res) => {
    res.render('home', { title: 'Home' });
};

export default { getHomePage };


