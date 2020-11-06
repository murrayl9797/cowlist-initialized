const express = require('express');
const bodyParser = require('body-parser');
const { insertOneSQL, selectAllSQL } = require('../database/mysql.js');
const { insertOneMongo } = require('../database/mongo.js');

const app = express();
const port = 3000;

/***************************************/
/**************Middleware***************/
/***************************************/
app.use(express.static('./client/dist')) // serves up html to localhost at port
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



/***************************************/
/**************Routes*******************/
/***************************************/
app.post('/api/cows', (req, res) => {
  console.log('\n\nRequest body : ', req.body);
  var {name, description} = req.body;

  // Insert into database
  insertOneMYSQL(name, description).exec()
    .then((insertInfo) => {
      // console.log('Correctly inserted cow: ', insertInfo)
      res.status(201).send({name, description}); // send it back
    })
    .catch((err) => {
      console.log('Could not insert cow correctly: ', err)
      res.sendStatus(404);
    });
});


app.get('/api/cows', (req, res) => {
  selectAllSQL()
    .then((queryResults) => {
      // console.log('Correctly queried cows :', queryResults)
      // Get rid of FieldPacket at end of results
      res.status(200).send(queryResults[0])
    })
    .catch((err) => {
      console.log('Could not query cows :', err)
      res.sendStatus(404);
    });
});



/***************************************/
/************Initialization*************/
/***************************************/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});