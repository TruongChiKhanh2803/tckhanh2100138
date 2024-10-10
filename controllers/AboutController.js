const getAboutPage = (req, res) => {
    res.render('about', { title: 'About Us' });
};

export default { getAboutPage };
