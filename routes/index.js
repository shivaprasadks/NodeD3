var express = require('express');
var router = express.Router();
var http = require('http');

//fetching data from server
var getJSON = function (option, callback) {
    http.request(option, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;

        });

        res.on('end', function () {
            price = JSON.parse(body);
            console.log(price);
            var temp_array = [];
            for (var item in price) {
                temp_array.push(price[item].Year)
            }


            callback(null, price);
            //  app.locals.dataset = body;

        });
        res.on('error', callback);
    }).on('error', callback).end();

}

var weekData = {
    host: 'demo9745249.mockable.io',
    port: 80,
    path: '/weeklydata',
    method: 'GET'
};
var DailyData = {
    host: 'demo9745249.mockable.io',
    port: 80,
    path: '/dailydata',
    method: 'GET'
};

/* GET home page. */
router.get('/', function (req, res, next) {
    getJSON(weekData, function (err, result) {
        if (err) {
            console.log('error in the callback: ', err);
        } else {
            //console.log(result);
            res.render('index', {data: result});
        }
    });

});

router.post('/page', function (req, res) {
    getJSON(DailyData, function (err, result) {
        if (err) {
            console.log('error in the callback: ', err);
        } else {
            //console.log(result);
            res.send(result);
        }
    });

});

module.exports = router;




