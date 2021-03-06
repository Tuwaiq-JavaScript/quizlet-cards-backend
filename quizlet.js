const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/quizlet'); //connect to db 
const express = require("express")
const app = express()
app.use(express.json())


//define thescheama 

const CourseSchema = mongoose.Schema({
    _id:"ObjectId",
        subject:"String",
        title:"String",
        cards:["string"]
  
})

//define  modle
const Course = mongoose.model("Course", CourseSchema)

//insert course
app.post("/Course/create", (req, res) => {
  const courses = new Course({
    _id:req.body.id,
    subject:req.body.subject,
    title:req.body.title,
    cards:req.body.cards
  })
  Course.save().then(() => res.json({ msg: "Course Added" }))
})

//find course
app.get("/Courses", (req, res) => {
  Course.find({}).then(data => {
    console.log(Course)
    res.json(data)
  })
})

// update course
app.put("/Course/update/", (req, res) => {
  Course.updateOne({ _id: req.body.id }, { title: req.body.title}).then(() => {
    res.json({ msg: "  course updated" })
  })
})

//   delete course
app.delete("/Course/delete/", (req, res) => {
  Course.deleteOne({ _id: req.body.id }).then(() => {
    res.json({ msg: "Course deleted" })
  })
})

const cardSchema = mongoose.Schema({ 
    question:String,
    answer:String,
    tag:String,
    comments:[Comments]
}); 
const Card = mongoose.model('Card', cardSchema);

//Card CRUD 
app.post('/card/create',(req,res)=>{
    const c = new Card(req.body);
     c.save().then(() => res.json({"msg":"Card added"})); 
 });

app.get('/cards',(req,res)=>{
    Card.find({}).then((data) => {
        res.json(data);
       });
 });

app.put('/card/update/:id',(req,res)=>{
    User.updateOne({_id:req.params.id},{question:req.body.question}).then(()=>{
        res.json({"msg":"Card updated"});
    });
 });

 app.delete('/card/delete/:id',(req,res)=>{
    Card.deleteOne({_id:req.params.id}).then(()=>{
        res.json({"msg":"Card deleted"});
    });
});



//**************************COMMENT schema and model************************* 
const Commentschema =mongoose.Schema(
    {
        Comment:"String",
        User_id:{////// take user_id from user
            type:mongoose.ObjectId,
            ref:user
    }});
const Comments = mongoose.model('comments',Commentschema);//create model



//******************************addd New Comment*************************
app.post('/Comment/Create',(req,res)=>{  
    new Comments((req.body)).save().then(()=>{  
      res.json({"msg":"user added a comment"});
  });
  });

//*********************************** show all comment*****************
  app.get('/Comment/show',(req,res)=>{
    Comments.find({}).populate('Userid').then((data)=>{
    res.json(data);
    });
    });

///*******************************Delet comment**********************

 app.delete('/Comment/delete', (req,res)=>{          
    Comments.deleteOne({_id:req.body.id}).then(()=>{
        res.json({"msg":"user deleted acomment "});
    });                                                      
    });



//**************************user schema and model************************* 
const userschema =mongoose.Schema(
    {
            user_id:ObjectId,
            name:String,
            email:String,
            passowrd:Number,
            cards:[card]

        });// create schema

const user= mongoose.model('user',userschema);//create model
  

//******user******* 
app.post('/user/create',(req,res)=>{  
    new user({
      name:req.body.name,
     email:req.body.email,
     passowrd:req.body.passowrd,
     cards:req.body.cards
    }).save().then(()=>{  
      res.json({"msg":"user created"});
  });
  });

//*********************************find*******************************
//*****find all users
app.get('/user',(req,res)=>{
  user.find({}).then((data)=>{
  res.json(data);
  });
  });
  


//*****************update*************
///update user title
 app.put('/user/update/:name',(req,res)=>{  
  task.updateOne({name:req.params.name},{email:req.body.email}).then(()=>{
   res.json({"msg":"title is update"});
   });
  });

 //***********************delete********
 //delete user 
    app.delete('/user/delete/:id', (req,res)=>{          
        user.deleteOne({_id:req.params.id}).then(()=>{
            res.json({"msg":"user deleted"});
        });                                                      
        });
        


  app.listen(3000, ()=> console.log('epress started'));
