"use strict";
exports.__esModule = true;
var http = require("http");
var axios = require("axios");
var cheerio = require("cheerio");
var pretty = require("pretty");
var request = require("request");
var webScraper = require("./scrapper").webScraper;
var server = http.createServer(function (req, res) {
    if (req.method === "GET") {
        var url = "https://www.wikipedia.org";
        request(url, function (error, response, html) {
            if (!error && (response.statusCode == 200)) {
                var $_1 = cheerio.load(html);
                var title = $_1("title").html();
                var imgArray_1 = [];
                var images = $_1('img').each(function (i, value) {
                    imgArray_1.push($_1(value).attr("src"));
                    // console.log($(value).attr("src"))
                });
                // console.log("title: ", title);
                // console.log(images)
                // console.log(html);
                var description = $_1('meta[name="description"]').attr("content");
                // console.log(resultData)
                res.end(JSON.stringify({
                    title: title,
                    imgArray: imgArray_1,
                    description: description
                }));
            }
            ;
        });
    }
});
server.listen(3001, function () {
    console.log("server running on port 3001");
});
