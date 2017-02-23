var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
//app.locals.dataset = "4, 8, 15, 16, 23, 42";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//fetching data from server
var getJSON = function (option, callback) {
    http.request(option, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;

        });

        res.on('end', function () {
            var price = JSON.parse(body);
            console.log(body);
            var temp_array = [];
            for (var item in price) {
                temp_array.push(price[item].barvalue)
            }

            app.locals.dataset = temp_array;

            callback(null, body);
            //  app.locals.dataset = body;
        });
        res.on('error', callback);
    }).on('error', callback).end();

}

var option = {
    host: 'demo9745249.mockable.io',
    port: 80,
    path: '/linegraphdata',
    method: 'GET'
};
getJSON(option, function (err, result) {
    if (err) {
        console.log('error in the callback: ', err);
    } else {
        //console.log(result);
    }
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.get('/', function (req, res) {
    res.render('index', {fixtureData: fixtureData});
});
module.exports = app;
