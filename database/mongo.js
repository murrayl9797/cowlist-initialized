/***************************************/
/**********Pull in Dependencies*********/
/***************************************/
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/cowData`, {useNewUrlParser: true});



/***************************************/
/*********Setup Connection to DB********/
/***************************************/
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(`Connected to Mongo!`);
});


/***************************************/
/*******Format schemas/collections******/
/***************************************/
const cowSchema = mongoose.Schema({
  name: {type: String, unique: true},
  description: String
});

// 'Cow' is our gatewayToDB now
const CowModel = mongoose.model('CowCollection', cowSchema);


const insertOneMongo = function(cowName, inputDescription) {
  return CowModel.findOneAndUpdate({
    name: cowName
  },
  {
    name: cowName,
    description: inputDescription
  },
  {
    upsert: true
  });
}

insertOneMongo('MilkyTheCowwww', 'He really loves milk').exec()
  .then((dbResponse) => {
    console.log(`Successfully added to mongoDB!`, dbResponse);
  })
  .catch((err) => {
    console.log(`Error when adding to mongoDB!`, err);
  })

module.exports = { insertOneMongo }