const getAboutPage = (req, res) => {
    res.render('main', { title: 'About', data: { page: 'about' } });
};

export default {
    getAboutPage
};
