import  { IncomingMessage, Server, ServerResponse } from "http";
import * as http from "http"
const fs = require("fs");
const databaseURL = "/Users/decagon/Desktop/week-5-task-devgirl-esther/server/lib/database.json";


const dataBase = require("./database.json");
/*
implement your server code here
*/

const dateNow = new Date()
interface org {
  
    organization: string;
    createdAt: string;
    updatedAt: string;
    products: Array<string>;
    marketValue: string;
    address: string;
    ceo: string;
    country: string;
    id: number;
    noOfEmployees:number;
    employees:Array<string>;
  
}

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url == '/' && req.method === "GET") {
    
      res.end(JSON.stringify({ dataBase }));
    }
    else if (req.url?.match(/\/[0-9]+/) && req.method === "GET"){
     let splittedUrl = req.url.split('/')
     let idAfterSplit:number = Number(splittedUrl[splittedUrl.length - 1]);
     let record  = dataBase.find((each:org) => each.id === idAfterSplit);
     if (!record){
      res.writeHead(404, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({message:'Record Not Found'}))
     }else {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({ record }));
      
     }
     

    }
    else if (req.url == '/' && req.method ==="POST") {
      
      let dataInput:org;
      req.on("data",(chunk:string) => {
      const newData = JSON.parse(chunk)
       dataInput = {...newData}
      })
      req.on("end",  ()=>{
        const inputObj = 
        {
  
          "organization": dataInput.organization,
          "createdAt": dateNow,
          "updatedAt": dateNow,
          "products": dataInput.products,
          "marketValue": dataInput.marketValue,
          "address": dataInput.address,
          "ceo": dataInput.ceo,
          "country": dataInput.country,
          "id": dataBase.length + 1,
          "noOfEmployees":dataInput.noOfEmployees,
          "employees":dataInput.employees,
        
      };

      dataBase.push(inputObj);
      try {
         fs.writeFileSync(databaseURL, JSON.stringify(dataBase, null, 2), {encoding: "utf8", flag: "w"});
       
      } catch (error) {
        console.log(error)
      }
      res.writeHead(201,{'Content-Type':'application/json'})
      res.end(JSON.stringify(
        {
          message:'Successful',
          data: inputObj
        }))
      })
    } 
    else if ( req.url?.match(/\/[0-9]+/) && req.method === "PUT") {
     
      const splittedArray = req.url.split("/");
      let idAfterSplit2 = splittedArray[splittedArray.length - 1];
      
      let  idRecord = dataBase.find((value:org)=> {
        return value.id === Number(idAfterSplit2)
      });
      let completeData:org
      req.on("data",(chunk:string) => {
        let chunked = JSON.parse(chunk)
        completeData = {...chunked}
      })
      req.on("end", () => {
        if(!idRecord) {
          res.writeHead(404, {'Content-Type': 'application/json'})
          res.end(JSON.stringify({message:'Record Not Found'}))
         }else {
          let newUpdate = {
            "organization": completeData.organization || idRecord.organization ,
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "products": completeData.products || idRecord.products,
            "marketValue": completeData.marketValue || idRecord.marketValue,
            "address": completeData.address || idRecord.completeData,
            "ceo": completeData.ceo || idRecord.ceo,
            "country": completeData.country || idRecord.country,
            "id": idRecord.id,
            "noOfEmployees":completeData.noOfEmployees || idRecord.noOfEmployees,
            "employees":completeData.employees || idRecord.employees,
          
          }
          let updateEd = dataBase.findIndex((value:org) => value.id === Number(idAfterSplit2))
          dataBase[updateEd] = newUpdate;
          try {
            fs.writeFileSync(databaseURL, JSON.stringify(dataBase), {encoding: "utf8", flag: "w"});
         

          res.writeHead(200, {'Content-Type': 'application/json'})
          res.end(JSON.stringify({ newUpdate }));
          
         } catch (error) {
           console.log(error)
         }
        
        }
      })
      
    }
    else if (req.url?.match(/\/[0-9]+/) && req.method === "DELETE"){
      // res.end(JSON.stringify({name:"hello"}));
     const splittedd = req.url.split("/") ;
     const extension = splittedd[splittedd.length - 1]
      const toDelete = dataBase.filter((value:org) => value.id !== Number(extension))
      const Delete = dataBase.find((value:org) => value.id === Number(extension))
      if (Delete){
        try {
          fs.writeFileSync(databaseURL, JSON.stringify(toDelete), {encoding: "utf8", flag: "w"});
        
  
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message: "record deleted succesfully" }));
  
       } catch (error) {
         console.log(error)
       }  
      }else{
        res.writeHead(404, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({message:'Record Not Found'}))
      }
    }else {
      res.writeHead(404, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({message:'Route Not Found'}))
    }

  }
);

server.listen(3005, () => {
  console.log("Running on port 3005");
});

