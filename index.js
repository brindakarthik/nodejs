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
        var myobj = { name: name, email: email,_id:email };
        dbo.collection("employee").insertOne(myobj, function(err, res) {
          if (err) 
res.send(err);
          console.log("1 document inserted");
          db.close();
        });
      });
    next();
 });
 


app.post("/save",function(req,res){
    var name=req.body.uname
    var email=req.body.email
var x=""
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("demo");
  
  dbo.collection("employee").find({}).toArray(function(err, result) {
    if (err) throw err;
     result.forEach((element, index, array) => {
    x+=element.name+"&emsp"; // 100, 200, 300
    x+=element.email+"<br>"; // 0, 1, 2
  // same myArray object 3 times
});
   

    db.close();
  });
});


    x="welcome "+name+" !!!email id "+email
res=send(x)   
})

app.listen(3000)
