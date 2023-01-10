"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const request = require("request");
const { webScraper } = require("./scrapper");
const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        const url = "https://www.wikipedia.org";
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
                // console.log(resultData)
                res.end(JSON.stringify({
                    title,
                    imgArray,
                    description
                }));
            }
            ;
        });
    }
});
server.listen(3001, () => {
    console.log("server running on port 3001");
});
