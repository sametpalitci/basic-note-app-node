require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const verifed = jwt.verify(token, process.env.SECRET_KEY);
            if (verifed)
                next();
        } else {
            res.redirect('/admin/login');
        }
    } catch (error) {
        console.log(error);
    }
}