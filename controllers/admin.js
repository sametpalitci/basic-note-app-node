require('dotenv').config();
const adminModel = require('../models/AdminModel');
const articleModel = require('../models/ArticleModel');

const jwt = require('jsonwebtoken');

if (typeof localStorage === "undefined" || localStorage === null) {
    const { LocalStorage } = require('node-localstorage');
    localStorage = new LocalStorage('./scratch');
}
const adminView = async (req, res) => {
    const noteData = await articleModel.find({});
    res.render('admindashboard', { noteData });
}
const login = async (req, res, next) => {
    const { username, password } = req.body;
    const findUsername = await adminModel.findOne({ username });
    if (!findUsername)
        return res.status(403).json({ error: "loggin fail" });
    if (findUsername.password === password) {
        const TokenPayload = {
            username: findUsername.username,
            date: findUsername.date,
        }
        const token = jwt.sign(TokenPayload, process.env.SECRET_KEY, { expiresIn: '1h' });
        localStorage.setItem('token', token);
        res.redirect('/admin');
    } else {
        return res.status(403).json({ error: "loggin fail" });
    }
}
const addNote = (req, res, next) => {
    const { addNoteArea } = req.body;
    const newNote = new articleModel({
        description: addNoteArea
    });
    newNote.save()
        .then(() => res.redirect('/admin'))
        .catch(err => console.log(err));
}
const remove = (req, res, next) => {
    const { removeId } = req.params;
    articleModel.findByIdAndDelete({ _id: removeId })
        .then(() => res.redirect('/admin'))
        .catch(err => console.log(err));
}
module.exports = {
    login,
    addNote,
    adminView,
    remove
}