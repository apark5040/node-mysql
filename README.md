# node-mysql

### Overview

This is a homework that incorporates node with SQL. It uses the same tables with preset values and has different `.js` files that has different functions. 


### Instructions

1.) Use the code in `bamazon.sql` to create a new database with a table. This will create a table called `products` and populate it with 10 different rows. 

2.) Once you have cloned the repo, go to the folder in your terminal and run `npm i` to unpackage the `package.json`. This will install `inquirer` and `mysql` npm package which is required to run the node files. 

3.) To run one of the files, type in `node ***INSERT .JS FILE NAME HERE***`


### bamazonCustomer.js

1.) When you type in `node bamazonCustomer.js` into the terminal, you will be shown the products in the database: 

![bamazonCustomer_01](images/01.png)

2.) Typing an ID will show the item you have chosen and ask how much of the product you want. If there is enough quantity of the chosen item, it will update the quantity in the database based on how much you decided to buy:

![bamazonCustomer_02](images/02.png)

3.) If there is not enough quantity of an item, it will show "Insufficient Quantity" and end the program. 

![bamazonCustomer_03](images/03.png)