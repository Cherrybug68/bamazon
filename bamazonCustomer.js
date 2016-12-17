"use strict";

var mysql = require("mysql");

// Connects to database
    var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Knights#1",
    database: "bamazon"
    });

// Checks connection
    connection.connect(function(err) {
        if (err) throw err;
    });



// Runs the program
function start(){
    var query = "SELECT * FROM product";
     connection.query(query, function(err, res){
         if(err){
             throw err;
         }
         displayResults(res);
         promptCustomer();
});
}



// Pulls inventory list and puts into pretty table
var Table = require("cli-table");

var ourTable = new Table();

function displayResults(results){
   var ourTable = new Table({
       head: ['Item ID', 'Product Name', 'Price (USD)', 'Department'],
       colAligns: ['left', 'left', 'right', 'left']
   });
   for(var i = 0; i < results.length; i++){
       var record = results[i];
      // console.log(JSON.parse(JSON.stringify(record)));
       ourTable.push([record.item_id, record.product_name, record.price.toFixed(2), record.department_name]);
   }
   console.log(ourTable.toString());
};


// Puts Customer's purchases into a pretty table
function displayPurchases(results, quantityOrdered, cost){
   var ourTable = new Table({
       head: ['Item ID', 'Product Name', 'Price (USD)', 'Quantity', 'Cost'],
       colAligns: ['left', 'left', 'right', 'right', 'right']
   });
   for(var i = 0; i < results.length; i++){
       var record = results[i];
      // console.log(JSON.parse(JSON.stringify(record)));
       ourTable.push([record.item_id, record.product_name, record.price.toFixed(2), quantityOrdered, cost.toFixed(2)]);
   }
   console.log(ourTable.toString());
};



// Inquire Customer on what they want to buy
var inquirer = require('inquirer');

function promptCustomer(){
    inquirer.prompt([
        //Prompt user on what item they want to purchase
        {
            type: "input",
            message: "Please enter the id for the item you would like to purchase. Or enter Q to quit.",
            name: "itemToPurchase",
        },

        // Get quantity to be purchased
        {
            when: function (response) {
                        return response.itemToPurchase.toUpperCase() != 'Q';
                    },
            type: "input",
            message: "How many woud you like?",
            name: "quantityToPurchase"
        }
    ]).then(processOrder);
}


    var totalPurchase = 0;

function processOrder(answers){

    if (answers.itemToPurchase.toUpperCase() == "Q")
    {
        console.log("Thank You for visiting.");
        console.log("Your total purchase was: $" + totalPurchase);
        connection.end();
        return;
    }

    var queryItem = "SELECT * FROM product WHERE item_id = '" + answers.itemToPurchase + "'";
    connection.query(queryItem, function(err, res){
        if(err) {
            throw err;
        }

        // Checks to see if it is a valid item
        if(res.length == 0){
            console.log("Item " + answers.itemToPurchase + " is not a valid item.");
            promptCustomer();
            return;
        }

        // Checks to see if the stock quantity is more than the requested purchase quantity
        var quantityOrdered = parseInt(answers.quantityToPurchase);
        if(quantityOrdered > res[0].stock_quantity){
            console.log("Sorry, we do not have that many in stock");
            promptCustomer();
            return;
        }

        var cost = quantityOrdered * res[0].price;

        // Displays what they purchased
        displayPurchases(res, quantityOrdered, cost);

        // console.log("Item(s) cost you $" + cost);

        // Displays the total cost of their purchases
        totalPurchase += cost;

        var newQuantity = res[0].stock_quantity - quantityOrdered;
        var query = "UPDATE product SET stock_quantity = " + newQuantity + " WHERE item_id = '" + answers.itemToPurchase + "'";
        connection.query(query, function(err, res){
            if(err) {
                throw err;
            }
            start();
        });
    });
};

// calling the function
start();