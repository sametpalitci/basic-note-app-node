require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const indexRouter = require('./routes/IndexRouter');
const adminRouter = require('./routes/AdminRouter');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/admin', adminRouter);
app.use('/', indexRouter);

mongoose.connect(process.env.MONGODB,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        app.listen(process.env.PORT , () => {
            console.log(`App is listen ${process.env.PORT}, Mongodb is running.`);
        });
    }).catch(err => console.log(err));

