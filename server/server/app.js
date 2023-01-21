"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
//import * as data from "./database.json";
var dataBase = require("./database.json");
/*
implement your server code here
*/
var dateNow = new Date();
var server = http.createServer(function (req, res) {
    var _a, _b, _c;
    if (req.url == '/' && req.method === "GET") {
        console.log(req.url);
        res.end(JSON.stringify({ dataBase: dataBase }));
    }
    else if (((_a = req.url) === null || _a === void 0 ? void 0 : _a.match(/\/[0-9]+/)) && req.method === "GET") {
        var splitted = req.url.split('/');
        var idd_1 = Number(splitted[splitted.length - 1]);
        var record = dataBase.find(function (each) { return each.id === idd_1; });
        if (!record) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Record Not Found' }));
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ record: record }));
            console.log(req.url);
        }
    }
    else if (req.url == '/' && req.method === "POST") {
        // res.end(JSON.stringify({name:"hello"}));
        //const newData = "";
        var dataInput_1;
        req.on("data", function (chunk) {
            var newData = JSON.parse(chunk);
            dataInput_1 = __assign({}, newData);
        });
        req.on("end", function () {
            var inputObj = {
                "organization": dataInput_1.organization,
                "createdAt": dateNow,
                "updatedAt": dateNow,
                "products": dataInput_1.products,
                "marketValue": dataInput_1.marketValue,
                "address": dataInput_1.address,
                "ceo": dataInput_1.ceo,
                "country": dataInput_1.country,
                "id": dataBase.length + 1,
                "noOfEmployees": dataInput_1.noOfEmployees,
                "employees": dataInput_1.employees
            };
            dataBase.push(inputObj);
            try {
                fs.writeFileSync("/Users/decagon/Documents/GitHub/week-5-task-devgirl-esther/server/server/database.json", JSON.stringify(dataBase, null, 2), { encoding: "utf8", flag: "w" });
                console.log("DATA>>>>>>>", dataBase);
            }
            catch (error) {
                console.log(error);
            }
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Successful',
                data: inputObj
            }));
        });
    }
    else if (((_b = req.url) === null || _b === void 0 ? void 0 : _b.match(/\/[0-9]+/)) && req.method === "PUT") {
        // res.end(JSON.stringify({name:"hello"}));
        var idEdit = req.url.split("/");
        var idUse_1 = idEdit[idEdit.length - 1];
        // dataBase[Number(idUse) - 1]
        var idRecord_1 = dataBase.find(function (value) {
            return value.id === Number(idUse_1);
        });
        var completeData_1;
        req.on("data", function (chunk) {
            var chunked = JSON.parse(chunk);
            completeData_1 = __assign({}, chunked);
        });
        req.on("end", function () {
            if (!idRecord_1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Record Not Found' }));
            }
            else {
                var newUpdate = {
                    "organization": completeData_1.organization || idRecord_1.organization,
                    "createdAt": dateNow,
                    "updatedAt": dateNow,
                    "products": completeData_1.products || idRecord_1.products,
                    "marketValue": completeData_1.marketValue || idRecord_1.marketValue,
                    "address": completeData_1.address || idRecord_1.completeData,
                    "ceo": completeData_1.ceo || idRecord_1.ceo,
                    "country": completeData_1.country || idRecord_1.country,
                    "id": idRecord_1.id,
                    "noOfEmployees": completeData_1.noOfEmployees || idRecord_1.noOfEmployees,
                    "employees": completeData_1.employees || idRecord_1.employees
                };
                var updateEd = dataBase.findIndex(function (value) { return value.id === Number(idUse_1); });
                dataBase[updateEd] = newUpdate;
                try {
                    fs.writeFileSync("/Users/decagon/Desktop/week-5-task-devgirl-esther/server/lib/database.json", JSON.stringify(dataBase), { encoding: "utf8", flag: "w" });
                    //  console.log(dataBase);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ newUpdate: newUpdate }));
                    console.log(dataBase);
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
    else if (((_c = req.url) === null || _c === void 0 ? void 0 : _c.match(/\/[0-9]+/)) && req.method === "DELETE") {
        // res.end(JSON.stringify({name:"hello"}));
        var splittedd = req.url.split("/");
        var extension_1 = splittedd[splittedd.length - 1];
        var toDelete = dataBase.filter(function (value) { return value.id !== Number(extension_1); });
        var Delete = dataBase.find(function (value) { return value.id === Number(extension_1); });
        if (Delete) {
            try {
                fs.writeFileSync("/Users/decagon/Documents/GitHub/week-5-task-devgirl-esther/server/server/database.json", JSON.stringify(toDelete), { encoding: "utf8", flag: "w" });
                //  console.log(dataBase);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "record deleted succesfully" }));
                console.log(dataBase);
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Record Not Found' }));
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
});
server.listen(3005, function () {
    console.log("Running on port 3005");
});
