"use strict";
exports.__esModule = true;
exports.webScraper = void 0;
var path_1 = require("path");
var request = require("request");
var cheerio = require("cheerio");
var webScraper = function (url) {
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
            var result = {
                title: title,
                description: description
            };
            (0, path_1.resolve)(JSON.stringify(result));
        }
    });
};
exports.webScraper = webScraper;
module.exports = {
    webScraper: exports.webScraper
};
