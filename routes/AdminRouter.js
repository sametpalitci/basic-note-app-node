const express = require('express');
const router = express.Router();

const adminMW = require('../middleware/AdminMW');

const {
    login,
    addNote,
    adminView,
    remove
} = require('../controllers/admin');

router.get('/', adminMW, adminView);

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/logout', adminMW, async(req, res) => {
    await localStorage.removeItem('token');
    res.redirect('/admin/login');
});

router.get('/remove/:removeId', adminMW, remove);

router.post('/addNote', addNote);
router.post('/login', login);

module.exports = router;