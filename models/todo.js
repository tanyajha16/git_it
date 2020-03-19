// to require the library
const mongoose=require('mongoose');

// to create the Schema for tasks to be used in robo 3t
const todoSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    category:
    {
        type:String,
        required:true
    },
    date:
    {
        type:Date,
        required:true
    }
});

const Todo = mongoose.model('Todo',todoSchema);

// to export the Schema
 module.exports=Todo;