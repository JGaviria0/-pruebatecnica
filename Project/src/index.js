const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const { extname } = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const mysqlStore = require('express-mysql-session')
const { database } = require('./keys')

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
})) 
app.set('view engine', '.hbs');

// Middleawares
app.use(session({
    secret: 'PruebaLumon',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
 
// Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    next()
})

// Routes
app.use(require('./routes'))
app.use('/task',require('./routes/tasks'))

app.use(express.static(path.join(__dirname, 'public')));


// Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})