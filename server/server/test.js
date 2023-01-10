
const fs = require("fs");
const data = [
    {
      "organization": "node ninja",
      "createdAt": "2020-08-12T19:04:55.455Z",
      "updatedAt": "2020-08-12T19:04:55.455Z",
      "products": ["developers","pizza"],
      "marketValue": "90%",
      "address": "sangotedo",
      "ceo": "cn",
      "country": "Taiwan",
      "id": 1,
      "noOfEmployees":2,
      "employees":["james bond","jackie chan"]
    },
    {
        "organization": "node",
        "createdAt": "2020-08-12T19:04:55.455Z",
        "updatedAt": "2020-08-12T19:04:55.455Z",
        "products": ["developers","pizza"],
        "marketValue": "90%",
        "address": "sangotedo",
        "ceo": "cn",
        "country": "Taiwan",
        "id": 2,
        "noOfEmployees":2,
        "employees":["james bond","jackie chan"]
      },
      {
        "organization": "dev",
        "createdAt": "2020-08-12T19:04:55.455Z",
        "updatedAt": "2020-08-12T19:04:55.455Z",
        "products": ["developers","pizza"],
        "marketValue": "90%",
        "address": "sangotedo",
        "ceo": "cn",
        "country": "Taiwan",
        "id": 3,
        "noOfEmployees":2,
        "employees":["james bond","jackie chan"]
      },
      {
        "organization": "colors",
        "createdAt": "2020-08-12T19:04:55.455Z",
        "updatedAt": "2020-08-12T19:04:55.455Z",
        "products": ["developers","pizza"],
        "marketValue": "90%",
        "address": "sangotedo",
        "ceo": "cn",
        "country": "Taiwan",
        "id": 4,
        "noOfEmployees":2,
        "employees":["james bond","jackie chan"]
      },
      {
        "organization": "rush",
        "createdAt": "2020-08-12T19:04:55.455Z",
        "updatedAt": "2020-08-12T19:04:55.455Z",
        "products": ["developers","pizza"],
        "marketValue": "90%",
        "address": "sangotedo",
        "ceo": "cn",
        "country": "Taiwan",
        "id": 5,
        "noOfEmployees":2,
        "employees":["james bond","jackie chan"]
      }
      
];


fs.writeFileSync("./database.json", JSON.stringify(data), {encoding: "utf8", flag: "w"});