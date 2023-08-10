
















const express = require('express');
const path = require('path');
const http = require("http");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));

app.set("view engine", "hbs");

const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// const user = document.getElementById("user");
// const answer = document.getElementById("answer");

async function listDB(client){
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  }; 

async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
  }

async function main() {
  const uri = "mongodb+srv://admin:admin1234@cluster0.m6djqsb.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      
      await createListing(client, newListing);
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  
}

// main().catch(console.error)

async function createListing(client, newListing){
    const result = await client.db("AnswerDB").collection("Answers").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}







// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/views/LoginPage.html'));
});

app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/views/SignUp.html'));
});

app.get('/ques', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/views/ques.html'));
});

app.get('/response', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/views/Response.html'));
});

app.get('/right', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/views/right.html'));
});

app.get('/wrong', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/views/wrong.html'));
});

const httpServer = http.Server(app);

app.listen(port);
console.log('Server started at http://localhost:' + port);

newListing = {
  "user" : "steve",
  "answer" : "nothing"
}

