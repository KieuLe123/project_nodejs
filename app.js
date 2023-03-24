var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');


const mongoose = require('mongoose');



var expressLayouts = require('express-ejs-layouts');


//MODULE
const systemConfig = require('./configs/system');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://admin:admin123@zendvn.y1zb0.mongodb.net/project_nodejs', {useNewUrlParser: true, useUnifiedTopology: true});




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layouts/backend');




// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//LOCAL VARIABLES
app.locals.systemConfig = systemConfig;



//ROUTER
app.use('/',      require('./routes/frontend/index'));
app.use(`/${systemConfig.prefixAdmin}`, require('./routes/backend/index'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
