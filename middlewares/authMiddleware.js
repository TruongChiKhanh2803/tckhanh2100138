const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.status(403).send('Bạn không có quyền truy cập.');
};

const isUser = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'user' && req.session.user.id == req.params.id) {
        return next();
    }
    res.status(403).send('Bạn chỉ có thể chỉnh sửa tài khoản của mình.');
};

const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

export { isAdmin, isUser, isLoggedIn };
