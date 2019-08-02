var inquirer = require('inquirer');
var mysql = require('mysql');

var product_name;
var product_value;
var product_desc;
var user_item_selection;
var user_bid_price;
var main_selection;

var tempBid;

function displayHome(){
    console.log("=============Great Bay=================")
    console.log("1. Post an Item");
    console.log("2. Bid an Item");

    inquirer.prompt([

        {
          type: "input",
          name: "selection",
          message: "Provide your selection"
        }]).then(function(res){
            main_selection = res.selection;
            console.log("selection by user" )
        })
}


function postAnItem() {

    inquirer.prompt([

        {
          type: "input",
          name: "product_name",
          message: "Enter product name: "
        },

        {
            type: "input",
            name: "product_value",
            message: "Enter bid value: "
          },

        {
            type: "input",
            name: "product_desc",
            message: "Enter description of your item: "
          }
    ]).then(function(items) {
        product_name = item.product_name;
        product_value = items.product_value;
        product_desc = items.product_desc;

      });



    console.log("Inserting a new item...\n");
    var query = connection.query(
      "INSERT INTO items SET ?",
      {
        itemName: product_name,
        bid: product_value,
        note: product_desc
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " item inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        //updateProduct();
      }
    );

    // logs the actual query being run
    console.log(query.sql);
  }

  function bidAnItem(){
    listItems();
    inquirer.prompt([

        {
          type: "input",
          name: "user_item_selection",
          message: "Select ID of Item you would like to bid on: "
        },
        {
            type: "input",
            name: "user_bid_price",
            message: "Enter your bid price: "
          },

    ]).then(function(res){
        user_item_selection = res.user_item_selection;
        user_bid_price = res.user_bid_price;
        });
        getItem();
        if(tempBid <= user_bid_price){
            console.log("Sorry you are not qualified for the bid!!!")
        }else{
            updateItem();
        }
  }

  function listItems(){
    var query = connection.query("SELECT * FROM items", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].id + " | " + res[i].itemName + " | " + res[i].bid + " | " + res[i].note);
        }
      });

      // logs the actual query being run
      console.log(query.sql);
      connection.end();
  }

  function getItem(){
    var query = connection.query("SELECT * FROM items WHERE user_item_selection?", [id], function(err, res) {
        if (err) throw err;
        tempBid = res.bid;
      });

      // logs the actual query being run
      console.log(query.sql);
      connection.end();
  }

  function updateItem(){
    console.log("Updating item...\n");
    var query = connection.query(
      "UPDATE items SET ? WHERE ?",
      [
        {
          id: user_item_selection
        },
        {
          bid: tempBid
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " item updated!\n");

      }
    );

    console.log("Updating item...\n");
    var query = connection.query(
      "INSERT INTO items SET ?",

        {
          item_id: user_item_selection,
          username: tempBid,
          bidByUser: tempBid
        },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " item updated!\n");

      }
    );

    // logs the actual query being run
    console.log(query.sql);
    insertItem();
  }

  function insertItem(){
    console.log("Updating item...\n");
    var query2 = connection.query(
      "INSERT INTO items SET ?",

        {
          item_id: user_item_selection,
          username: tempBid,
          bidByUser: tempBid
        },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " item updated!\n");

      }
    );

    // logs the actual query being run
    console.log(query2.sql);
  }

  displayHome();

  if(main_selection == "1"){
    postAnItem();
  }else{
      bidAnItem();
  }
