const mysql = require('mysql');
const Promise = require('bluebird');

const database = 'cowData'

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mln1',
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => db.queryAsync(
              `CREATE TABLE IF NOT EXISTS cows (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL UNIQUE,
                description VARCHAR(280)
              );`
  ))
  .catch((err) => {
    console.log('\n\nError occured: ', err)
  });


const insertOne = function(cowName, description) {
  return db.queryAsync(`INSERT INTO cows (name, description) VALUES (?, ?);`, [cowName, description]);
}


const selectAll = function() {
  return db.queryAsync(`SELECT name, description FROM cows;`);
}


module.exports = { insertOne , selectAll };