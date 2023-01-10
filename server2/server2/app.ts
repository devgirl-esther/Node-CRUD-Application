import { IncomingMessage, Server, ServerResponse } from "http";
import * as http from "http";
const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const request = require("request");
const { webScraper } = require("./scrapper")
/*
implement your server code here
*/

  interface resultType {
    title?: string;
    images?: string[];
    description?: string
}

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
      const url = "https://www.wikipedia.org";
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
      // console.log(resultData)
      res.end(JSON.stringify({ 
        title,
        imgArray,
        description
      }));
      
    };


  }
  
);
    }
})

server.listen(3001, ()=> {
  console.log("server running on port 3001")
});
