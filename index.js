const express=require('express')
const bodyParser=require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app=express()
app.use(bodyParser.urlencoded({extended:false}))
var y=0
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
y=1;
else
y=0
        
          db.close();
          console.log(y)
          next();
        });

      });
    
 });
 


app.post("/save",function(req,res){
    var name=req.body.uname
    var email=req.body.email
var x="<style>table, th, td { border: 1px solid black;}table {border-collapse: collapse;}</style><center><table><tr><th>Name</th><th>Email</th></tr>"
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("demo");
  
  dbo.collection("employee").find({}).toArray(function(err, result) {

    if (err) throw err;
     result.forEach((element, index, array) => {
      
    x+="<tr><td>"+element.name+"</td>"; // 100, 200, 300
    x+="<td>"+element.email+"</td></tr>"; // 0, 1, 2
   
  // same myArray object 3 times
});
x+="</table><br>"
x+="welcome "+name+" !!!email id "+email

if(y==1)
res.send("<center><h1>Email already exist</h1>")
else
res.send(x)  

    db.close();
  });
});


    
  
})

app.listen(3000)
