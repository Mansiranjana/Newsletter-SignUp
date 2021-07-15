const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public")); //to access local files or static using express.
app.use(bodyParser.urlencoded({extended: true})); // to use body parser



app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");

});

app.post("/",function(req, res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }


      }
    ]
  }
const jsonData=JSON.stringify(data);
const url="https://us6.api.mailchimp.com/3.0/lists/a92be6536e"
const options={
  method:"POST",
  auth:"mansi:1595f83ede972b074135111895249a30-us6"
}
const request=https.request(url,options,function(response){
  if(response.statusCode==200){
    res.sendFile(__dirname+"/success.html");
  }else{
    res.sendFile(__dirname +"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();
});

//to redirect to hme page on clicking try again button at failure.
app.post("/failure",function(req,res){
  res.redirect("/");

})


//process.env.PORT instead of 3000 as it is required for running app on online server
app.listen(process.env.PORT || 3000,function(){
  console.log("Listening on port 3000");
});
