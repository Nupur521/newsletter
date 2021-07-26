const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const { urlencoded } = require("body-parser");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true})); 

app.post("/", function(req,res){
var firstName=req.body.fname;
var lastName=req.body.lname;
var email=req.body.email;

const data={
    members:[{
        email_address: email,
        status: "subscribed",
        merger_fields:{
            FNAME: firstName,
            LNAME: lastName
        }
    }]
}

var jsonData=JSON.stringify(data); //this is what we are going to send to mailchimp
const url="https://us6.api.mailchimp.com/3.0/lists/f677c71062";
const options={
    method: "POST",
    auth: "Nupur243:13fd02979b025b96b052bbca10e71335-us6"
}
const request=https.request(url, options, function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    
    response.on("data", function(data){
        console.log(JSON.parse(data));
    } )
})
// request.write(jsonData);
request.end();
});

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT ||3000, function(){
    console.log("server is successfully running on port 3000");
})



