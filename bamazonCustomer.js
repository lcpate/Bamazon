var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  console.log("--------------------");
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
    connection.query('SELECT * FROM Products', function(err, res) {
        console.log('Available Bamazon Products');
        console.log('---------------------------------');
            var table = new Table({
                head: ['ID', 'ProductName', 'Department', 'Price', 'Quantity'],
                colWidths: [7, 25, 20, 10, 10]
            });
        for (var i=0; i < res.length; i++) {
            var productArray = [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity];
            table.push(productArray);
        }
        console.log(table.toString());
        buyItem();
        });
    };


// function which prompts the user for what action they should take
function buyItem() {
  inquirer.prompt([
  {
      name: "id",
      type: "input",
      message: "What is the ID of the item that you would like to buy?",
      validate: function(value) {
            //validates answer
        if (isNaN(value) === false) {
            return true;
        } else {
            console.log("\nPlease enter only the Item number of the item you'd like to buy\n");
            return false;
            }
      }
    },{
      name: "stock_quantity",
      type: "input",
      message: "How many would you like to buy?",
      validate: function(value){
        if (isNaN(value) === false){
            return true;
        } else { 
            console.log("\nPlease enter a valid quantity\n");
            return false;
        }
      }
    },
    ])
    .then(function(answer) {
        var Item = parseInt(answer.stock_quantity);

            //Queries the database
            connection.query("SELECT * FROM products WHERE ?", {id: answer.id}, function(err, data) { 
              if (err) throw err;
              console.log(data);
              //Checks if sufficient quantity exists
              if (data[0].stock_quantity < Item) {
                console.log("We're sorry, that item is currently out of stock\n");
                console.log("Please choose another product\n");
                start(); 
              } else {
                  //if quantity exists updates database
                  var updateQty = data[0].stock_quantity - Item;
                  var totalPrice = data[0].price * Item;
            connection.query('UPDATE products SET stock_quantity = ? WHERE id = ?', [updateQty, answer.id], function(err, results) {
              if(err) {
                  throw err;
              } else {
                  console.log("Purchase successfull!\n");
                  console.log("Your total cost is: $ " + totalPrice);
                  //Asks the buyer if they would like to continue
                  inquirer.prompt({
                    name: "buyMore",
                    type: "confirm",
                    message: "Would you like to buy another Product?",
              }).then(function(answer) {
                if (answer.buyMore === true) {
                  start();
                } else {
                    console.log("Thank your for shopping with Bamazon!");
                    connection.end();
                  }
            });
                }
              });
            }               
          });
    });
}













