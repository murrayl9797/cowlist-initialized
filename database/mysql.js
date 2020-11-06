/***************************************/
/**********Pull in Dependencies*********/
/***************************************/
const mysql = require('mysql');
const Promise = require('bluebird');

const database = 'cowData';
const tableName = 'cows';


/***************************************/
/*********Setup Connection to DB********/
/***************************************/
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mln1',
});

// This step is needed only for mySQL
const gatewayToDB = Promise.promisifyAll(connection, { multiArgs: true });


/***************************************/
/****Connect to DB and format tables****/
/***************************************/
gatewayToDB.connect()
  .then((dbResponse) => console.log(`Connected to mySQL and ${database} database!`))
  .then((dbResponse) => gatewayToDB.query(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then((dbResponse) => gatewayToDB.query(`USE ${database}`))
  .then((dbResponse) => gatewayToDB.query(
              `CREATE TABLE IF NOT EXISTS ${tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) UNIQUE,
                description VARCHAR(280)
              );`
  ))
  .then((dbResponse) => {
    console.log(`Successfully created ${tableName} table!`);
    // insertOneSQL('MilkyTheCow', 'He loves milk a lot')
    //   .then((dbResponse) => {
    //     console.log(`Sucessfully added a cow to the DB!`);
    //     console.log(dbResponse);
    //   })
    //   .catch((err) => {
    //     console.log(`Error when adding a cow to the DB`, err);
    //   });
  })
  .catch((err) => {
    console.log('\n\nError occured connecting to DB: ', err)
  });



/***************************************/
/****Set up Queries to use in Server****/
/***************************************/
const insertOneSQL = function(cowName, description) {
  return gatewayToDB.queryAsync(
    `INSERT INTO ${tableName} (name, description) VALUES (?, ?);`,
    [cowName, description]
  );
}


const selectAllSQL = function() {
  return gatewayToDB.queryAsync(`SELECT name, description FROM ${tableName};`);
}



module.exports = { insertOneSQL , selectAllSQL };