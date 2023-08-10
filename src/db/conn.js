const mongoose = require('mongoose');
const dbname = process.env.DBNAME;

const uri = "mongodb+srv://admin:admin1234@cluster0.m6djqsb.mongodb.net/dbname?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(uri,connectionParams)
          .then( () => {
            console.log('Connected to the database ')
          })
          .catch( (err) => {
            console.error(`Error connecting to the database. n${err}`);
          })