const express = require('express');
const path = require('path');

const bodyparser = require("body-parser");

const app = express();
const port = 8000;

// CONNETCTING WITH DATA BASE 

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/blogsite');
  console.log('we are connected With Database')};

  // MONGOOSE SCHEMA
const contactschema = new mongoose.Schema({
     name: String,
     email: String,
     gender: String,
     password: String,
     address: String,
     age: String,
     locaction: String,
     con: String,
   });

 const contact = mongoose.model('blogdata', contactschema);

// For Serving static files 
app.use('/static' , express.static('static')); 
app.use(express.urlencoded());


//PUG SPEACIFIC STUFF/CUNFUGRATION
app.set('view engine' , 'pug'); // Use template engine as a pug
app.set('views' , path.join(__dirname , 'views')); // Set the views directory

// END POINTS
app.get('/' , (req , res)=>{
     res.status(200).render('index.pug');
});

app.get('/write' , (req , res)=>{
     res.status(200).render('write.pug');
});

app.get('/blog' , (req , res)=>{
     res.status(200).render('blog.pug');
});

app.get('/contact' , (req , res)=>{
     res.status(200).render('contact.pug');
});

app.post('/contact' , (req , res)=>{
     var mydata = new contact(req.body);
     mydata.save().then(()=>{
          res.status(400).render('feedback.pug');
     }).catch(()=>{
          res.status(402).render('errorcontact.pug');
     });
});

app.get('/search' , (req , res)=>{
     res.status(200).render('search.pug');
});

app.get('/signup' , (req , res)=>{
     res.status(200).render('signup.pug');
});

app.post('/signup' , (req , res)=>{
     var mydata = new contact(req.body);
     mydata.save().then(()=>{
       res.status(200).render('signup-sucessfully.pug');
     }).catch(()=>{
          res.status(200).render('failed-signup.pug');
     });
});

app.get('/signin' , (req , res)=>{
     res.status(200).render('signin.pug');
});

app.post('/signin' , async(req , res)=>{
  
      try {
           const email =  req.body.email;
           const password =  req.body.password;
          //  const check = await blogdata.findOne({ email: req.body.email });
  
          if (check.password === req.body.password) {
              res.status(202).render("home.pug");
          }
  
          else {
              res.send("Invalid User Name Or Password")
          }
      } 
      
      catch{
          res.status(404).send(" <h1>User Not Found </h1>");
      }
  
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
