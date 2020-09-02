const express = require("express");
const router = require('./routing/routes');

const  mongoose  = require("mongoose");

const app=express();

//middle wares
app.use(router);
app.set('view engine', 'ejs');


mongoose.connect('mongo url',{ useNewUrlParser: true ,
    useUnifiedTopology: true
});

mongoose.connection.on('error', err => {
    console.log(err);
  });
mongoose.connection.on('connected',()=>{
    console.log("connectd to db")
})


















app.listen(3000,()=>{
    console.log("up and running")
})