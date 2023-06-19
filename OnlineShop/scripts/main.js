// JavaScript source code
import { createConnection } from "mysql";
var connection_data = createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

//Creating Database.
connection_data.query(
    "CREATE DATABASE IF NOT EXISTS cars",
    function (err, result) {
        //Display message in our console.
        console.log("Database cars is created");
    }
);
connection_data.end();

//Creating connection to database and creating a Table.
var con = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cars",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
        "CREATE TABLE IF NOT EXISTS cars (id INT AUTO_INCREMENT PRIMARY KEY, brand VARCHAR(255), model VARCHAR(255), price INT, description TINYTEXT)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table cars created");
    });

    //Insert records to the cars table
    sql = "INSERT INTO cars (brand, model, price) VALUES ?";
    var values = [
        ["Peugeot", "208", 12_000],
        ["Dacia", "Sandero", 16_000],
        ["Volkswagen", "T-Roc", 21_000],
        ["Fiat/Abarth", "500", 3_200],
        ["Volkswagen", "Golf", 4_500],
        ["Toyota", "Yaris", 6_000],
        ["Opel/Vhall", "Corsa", 9_000],
        ["Hyundai", "Tucson", 14_000],
        ["Dacia", "Duster", 24_000],
        ["Renault", "Clio", 54_000],
        ["Citroen", "C3", 36_000],
        ["Peugeot", "2008", 6_300],
        ["Tesla", "Model Y", 100_000],
        ["Kia", "Sportage", 14_000],
        ["Toyota", "Yaris Cross", 16_000],
        ["Ford", "Puma", 12_000],
        ["Renault", "Captur", 47_000],
        ["Toyota", "Corolla", 15_000],
        ["Ford", "Kuga", 13_000],
        ["Fiat", "Panda", 61_000],
        ["Nissan", "Qashqai", 49_000],
        ["Volkswagen", "Tiguan", 95_000],
        ["Mini", "Hatch", 21_000],
        ["Volkswagen", "Polo", 2_500],
        ["Skoda", "Octavia", 15_000],
    ];

    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});

export default con;
