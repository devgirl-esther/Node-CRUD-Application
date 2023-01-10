import { IncomingMessage, Server, ServerResponse } from "http";
import { resolve } from "path";
const request = require("request");
const cheerio = require("cheerio");
interface resultType {
    title?: string;
    images?: string[];
    description?: string
}
export const webScraper = (url:string) => {
    request(url, (error:ServerResponse, response:ServerResponse, html:ServerResponse)=>{
    if (!error && (response.statusCode == 200)) {
      const $ = cheerio.load(html);
      const title = $("title").html();
        let imgArray: string[] = []
      const images = $('img').each((i:number,value:string)=>{
        imgArray.push($(value).attr("src"));
        // console.log($(value).attr("src"))
      });

        // console.log("title: ", title);
        // console.log(images)
        // console.log(html);

      const description = $('meta[name="description"]').attr("content")
      const result: resultType = {
        title,
        description
      }
      resolve(JSON.stringify(result));
    }
  })
}

module.exports = {
    webScraper
}