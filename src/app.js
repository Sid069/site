require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");

require("./db/conn.js");

const Register = require("./models/registers.js");

const port = process.env.PORT || 8080;

const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, '../views');


app.use(express.static(staticPath));
app.set("view engine", "html");
app.engine('html', require('ejs').renderFile);
app.set('views', viewPath);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/register",(req, res) => {
  res.render("signup.html");
});


app.get("/login", (req, res) => {
  res.render("loginpage.html");
});

app.get("/response",(req, res) => {
  res.render("response.html");
});
app.get("/right",(req, res) => {
  res.render("right.html");
});
app.get("/wrong",(req, res) => {
  res.render("wrong.html");
});

app.post("/register", async (req, res) => {
    try {

      const password = req.body.password;
      const cpassword = req.body.confpassword;

      if (password === cpassword) {

        const registerUser = new Register({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: password,
          confpassword: cpassword
        })

        const token = await registerUser.generateAuthToken();
        
        const registered = registerUser.save();

        res.status(201).render("loginpage");
        
      } else {
        res.send("passwrods are not matching");
      }


    } catch (error) {
      res.status(400).send(error);
    }
});

// login validation 

app.post("/login", async (req, res) => {
  try {

    const password = req.body.password;
    const email = req.body.email;

    const userEmail = await Register.findOne({email});

    const passwordMatch = await bcrypt.compare(password, userEmail.password)

    const token = await userEmail.generateAuthToken();
    console.log(token);
    

    if (passwordMatch) {
       res.status(201).render("ques");
    } else {
      res.send("invalid login details")
    }

  } catch (error) {
    res.status(400).send("invalid login details")
  }
});

  

app.listen(port, () => {
  console.log(`Yo listening on port ${port}`)
})