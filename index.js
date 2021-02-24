const express=require('express')
const bodyParser=require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app=express()
app.use(bodyParser.urlencoded({extended:false}))

app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/login.html")
})

app.use("/save",function(req, res, next){
    var name=req.body.uname
    var email=req.body.email
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("demo");
        var myobj = { name: name, email: email };
        dbo.collection("employee").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    next();
 });
 


app.post("/save",function(req,res){
    var name=req.body.uname
    var email=req.body.email
    res.send("welcome "+name+" !!!email id "+email)
   
})

app.listen(3000)
