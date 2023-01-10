"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webScraper = void 0;
const path_1 = require("path");
const request = require("request");
const cheerio = require("cheerio");
const webScraper = (url) => {
    request(url, (error, response, html) => {
        if (!error && (response.statusCode == 200)) {
            const $ = cheerio.load(html);
            const title = $("title").html();
            let imgArray = [];
            const images = $('img').each((i, value) => {
                imgArray.push($(value).attr("src"));
                // console.log($(value).attr("src"))
            });
            // console.log("title: ", title);
            // console.log(images)
            // console.log(html);
            const description = $('meta[name="description"]').attr("content");
            const result = {
                title,
                description
            };
            path_1.resolve(JSON.stringify(result));
        }
    });
};
exports.webScraper = webScraper;
module.exports = {
    webScraper: exports.webScraper
};
