const getContactPage = (req, res) => {
    res.render('contact', { title: 'Contact Us' });
};

export default { getContactPage };
