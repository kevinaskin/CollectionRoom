var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

var Zone = require('../models/zoneModel');
var ZonePrice = require('../models/zonePriceModel');

/**
 * 处理数据的函数
 */
function dealStatus(data) {
    $ = cheerio.load(data);
    var stringName = [];
    var stringPrice = [];
    var string = [];
    // var textName = $(".li-info h3 a");//anjuke
    // var textPrice = $(".li-side p strong");//anjuke
    var textName = $(".title a");
    var textPrice = $(".price span");
    // console.log(textName.length,textPrice.length);

    for (var j = 0; j < textName.length - 1; j++) {
        // console.log(textPrice[29]["children"][0]["data"]);
        // string.push(textName[j]["children"][0]["data"] + "=" + textPrice[j]["children"][0]["data"]);
        stringName[j] = textName[j]["children"][0]['data'];
        stringPrice[j] = textPrice[j]['children'][0]['data'];
        // textPrice[i]["children"][0]["data"]
    }
    string[0] = stringName;
    string[1] = stringPrice;
    return string;
}



/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("Loading...");
});

/**
 * requestHTTP抓取数据
 */
router.get('/getData', function (req, res, next) {
    var status = [];
    for (var i = 1; i <= 100; i++) {
        (function (i) {
            var URL = "http://hz.lianjia.com/xiaoqu/pg" + i + "/";
            request.get(URL, function (err, response, body) {
                function loop() {
                    if (!err && response.statusCode == 200) {
                        status[i - 1] = dealStatus(body);
                        if (status[i - 1]) {
                            console.log(i + '\n\n\n' + status[i - 1]);
                            for (var j = 0; j < 30; j++) {
                                var zonePrice = new ZonePrice({
                                    page: 'Page' + i,
                                    zone: status[i - 1][0][j],
                                    district: "Hangzhou",
                                    price: status[i - 1][1][j]
                                });
                                zonePrice.save(function (err, pZone) {
                                })
                            }
                        } else {
                            loop();
                        }
                    }
                }
                loop();
            })
        })(i);
    }
    res.send("/getData");
});

module.exports = router;
