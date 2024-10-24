const getContactPage = (req, res) => {
    res.render('main', { title: 'Contact', data: { page: 'contact' } });
};

export default {
    getContactPage
};
