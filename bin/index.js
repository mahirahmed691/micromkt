#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");

const options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .option("s", { alias: "search", describe: "Search term", type: "string" })
 .argv;

 
const greeting = `Hello, ${options.name}!`;
console.log(greeting);

if (options.search) {
 console.log(`Grabbing the price of bitcoin in ${options.search}...`)
} else {
 console.log("Here's the price of bitcoin");
}

// The url depends on searching or not
const url = options.search ? `https://api.coindesk.com/v1/bpi/currentprice.json)}` : "https://api.coindesk.com/v1/bpi/currentprice.json";

axios.get(url, { headers: { Accept: "application/json" } })
 .then(res => {
   if (options.search) {
     // if searching, loop over the results
     res.data.bpi.code.forEach( j => {
       console.log(j);
     });
     if (res.data.results.length === 0) {
       console.log("Sorry that cuurency isn't availble");
     }
   } else {
     console.table(res.data.bpi);
   }
 });
