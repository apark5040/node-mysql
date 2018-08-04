var mysql = require("mysql");

var inquirer = require("inquirer");

var idList = [];

var idItem = 0;

var itemStock = 0;

var connection = mysql.createConnection({

    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",

    database: "bamazonDB"
});


connection.connect(function (err) {

    if (err) throw err;

    showItems();

});


function showItems() {

    connection.query("SELECT * FROM products", function (error, response) {

        if (error) throw error;

        for (i = 0; i < response.length; i++) {

            idList.push(response[i].id);

            console.log("\nID: " + response[i].id + " | " + "Product Name: " + response[i].product_name + " | " + "Price: $" + response[i].price + "\n------------------------------------------------------------------------------------");

        };

        firstMessage();
    });


}


function firstMessage() {

    inquirer.prompt([
        {
            name: "firstSelect",
            message: "Please type in the ID of the product you would like to buy",

        }
    ]).then(function (answer) {

        if (!idList.includes(parseInt(answer.firstSelect))) {

            console.log("Please input a valid ID number");
            connection.end();

        }
        else {

            connection.query("SELECT * FROM products WHERE ?",
                {
                    id: answer.firstSelect
                },
                function (err, res) {

                    if (err) throw err;

                    itemStock = res[0].stock_quantity;

                    idItem = res[0].id;

                    console.log("You have selected " + res[0].product_name);

                    secondMessage();

                })

        }

    });

}


function secondMessage() {

    inquirer.prompt([
        {
            name: "howMany",
            message: "How many units do you want to buy?",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            }
        }
    ]).then(function (ans) {

        if (ans.howMany > itemStock) {
            console.log("No way");
            connection.end();
        }
        else {

            var quantityDiff = itemStock - ans.howMany;

            connection.query("UPDATE products SET ? WHERE ?",
                [{
                    stock_quantity: quantityDiff
                },
                {
                    id: idItem
                }],
                function (error, secondAns) {

                    console.log("Stock quantity for the item has been updated");

                    connection.end();

                });

        }

    });
}