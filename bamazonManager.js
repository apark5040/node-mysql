var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({

    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",

    database: "bamazonDB"
});


connection.connect(function (err) {

    if (err) throw err;

    inquirer.prompt([

        {
            name: "action",
            message: "Please select one of the following options: ",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }

    ]).then(function (answer) {

        switch (answer.action) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;
        }

    });

});


function viewProducts() {

    connection.query("SELECT * FROM products", function (error, response) {

        if (error) throw error;

        for (var i = 0; i < response.length; i++) {

            console.log("\nID: " + response[i].id + " | " + "Product Name: " + response[i].product_name + " | " + "Price: $" + response[i].price + " | " + "Quantity: " + response[i].stock_quantity + "\n------------------------------------------------------------------------------------");

        };

        connection.end();

    });

};


function viewInventory() {

    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (error, response) {

        if (error) throw error;

        for (var i = 0; i < response.length; i++) {

            console.log("\nID: " + response[i].id + " | " + "Product Name: " + response[i].product_name + " | " + "Price: $" + response[i].price + " | " + "Quantity: " + response[i].stock_quantity + "\n------------------------------------------------------------------------------------");

        };

        connection.end();

    });

};


function addInventory() {

    var inventory = [];

    connection.query("SELECT * FROM products", function (err, res) {

        for (var i = 0; i < res.length; i++) {
            inventory.push(res[i].product_name);
        }

        inquirer.prompt([

            {
                name: "itemPick",
                message: "Select which item you would like to add more of",
                type: "list",
                choices: inventory
            }

        ]).then(function (ans) {

            inquirer.prompt([
                {
                    name: "addMore",
                    message: "How much more do you want to add?",
                    validate: function (value) {
                        var valid = !isNaN(parseFloat(value));
                        return valid || "Please enter a number";
                    }
                }
            ]).then(function (answer) {

                connection.query("UPDATE products SET stock_quantity=stock_quantity + " + answer.addMore + " WHERE ?",

                    {

                        product_name: ans.itemPick

                    },

                    function (err, res) {

                        if (err) throw err;

                        console.log("Item has been updated");

                        connection.end();
                    });
            });

        });

    });



};


function addProduct() {

    inquirer.prompt([
        {
            name: "newProduct",
            message: "Type in the name of the new product to add"

        },
        {
            name: "newDepartment",
            message: "Type in the new department for the new product"
        },
        {
            name: "newPrice",
            message: "Type in the price of the new product",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            }
        },
        {
            name: "newQuantity",
            message: "Type in the quantity of the new product",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            }
        }

    ]).then(function (res) {

        var values = [[res.newProduct, res.newDepartment, res.newPrice, res.newQuantity]];

        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?",[values]
        , function (error, response) {

                if (error) throw error;

                console.log("New product has been added to the database");

                connection.end();

            });

    })


};