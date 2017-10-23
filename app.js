const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
//const flash = require('connect-flash');


//Connect mongoose
mongoose.connect('mongodb://localhost/sportsblog', {useMongoClient: true});
const db = mongoose.connection;


const port = 3000;
//init app
const app = express();


const index = require('./routes/index');
const articles = require('./routes/articles');
const manage = require('./routes/manage');
const categories = require('./routes/categories');

//View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Set static folder
app.set(express.static(path.join(__dirname, 'public')));


//Body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


//Express validator
//app.use(expressValidator(middlewareOptions));

app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);


app.listen(port, () => {
    console.log('Server started on port: ', port);
});
