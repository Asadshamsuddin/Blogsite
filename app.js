const express = require('express');
const path = require('path');

const bodyparser = require("body-parser");

const app = express();
const port = 8000;

const collection = require("./mongodb");
// For Serving static files 
app.use('/static' , express.static('static')); 
app.use(express.urlencoded({extended:true}));

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
     var mydata = new collection(req.body);
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

app.post('/signup' ,async (req , res)=>{

     const data = {
          email: req.body.email,
           password: req.body.password
      }
       await collection.insertMany(data);
      res.render("signin.pug");
     
});

app.get("/signin" , (req,res)=>{
     res.render("signin.pug");
})


app.post('/signin' , async(req , res)=>{
  try {
     const check = await collection.findOne({email:req.body.email});
     if(check.password===req.body.password){

          res.render("home.pug")
     }
     else{
         res.send("wrong password");
     }
  } catch (error) {
     res.status(404).render("signinfail.pug");
  }
   
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
