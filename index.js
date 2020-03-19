// to require the express library for setting up the express server
const express=require ('express');

//Path module included to give relative path to views directory
const path = require('path');

// to set the port
const port=8000;

// to import the database
const db=require('./confi/mongoose');

//to import the Schema for the todo task
const Todo=require('./models/todo');

// using express app
const app=express();

// to set up view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// using the encrypted data
app.use(express.urlencoded());

// using static files
app.use(express.static(path.join(__dirname,'assets')));

//to render home.ejs
app.get("/",function(req,res)
{
    Todo.find({},function(err,todo)
    {
        
        if(err)
        {
            console.log("error in fetching the data from the database");
        return;
    }
    return res.render('home',{
        tittle:"my todo app",
        todo:todo
    });
}
  )});

//   now creating new tasks
app.post('/create-task',function(req,res)
{
    console.log("creating new task");
    Todo.create({
        description:req.body.description,
        category:req.body.category,
        date:req.body.date
    },function(err,newTask)
    {
        if(err)
        {
            console.log("error in creating the task",err);
            return;
        }
        else{
            console.log(newTask);
            return res.redirect('back');
        }
    });
});

// deleting the task
app.get('/delete-task',function(req,res)
{
    console.log(req.query);
    var id=req.query;

    // to check the number of tasks to be deleted
    var count=Object.keys(id).length;
    for(let i=0;i<count;i++)
    {
        // deleting the task from the database by using their individual ids
        Todo.findByIdAndDelete(Object.keys(id)[i],function(err)
        {
            if(err)
            {
                console.log("error in deleting the task");
            }
        })
    }
    return res.redirect('back');
});

// app to listen and run on the assigned port number on local host
app.listen(port,function(err)
{
    if(err)
    {
        console.log("the server is having error",err);
    }
    console.log("the server is on the port",port);
});