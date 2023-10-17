import express from "express";
const app = express()
const PORT = 8000
import path from "path";
import fs from "fs";
const _dirname=path.resolve();
app.use(express.urlencoded())
const fn=_dirname + "/userListas.csv";
console.log(_dirname)
app.get("/login", (req, res)=>{
    console.log("login", req.query);
    res.sendFile(_dirname + "/login.html")
})
app.post("/login", (req, res)=>{
    // console.log("login", (req.body));
    const {email, password}=req.body;
    const str =email + "|" + password;
    // reading the file and check if email and password exist
    fs.readFile(fn, (error, data)=>{
        if(error){
            return res.send(error.message);
        }
        const users = data.toString();
        users.includes(str)
        ? res.send("login successfully")
        : res.send("invalid details")
    })
})


app.get("/registration", (req, res)=>{
    console.log("registration", req.query);
    res.sendFile(_dirname +"/register.html")
})

app.post("/registration", (req, res)=>{
    // console.log("registration", (req.body));
    const {email, password}=req.body;
    
    const str =email + "|"+ password +"\n";
    console.log(str)
    // store in csv file
    fs.appendFile(fn, str,(error)=>{
        error 
        ? console.log("error")
        : console.log("data has been written in the file")
    })
    res.send("<h1>thank you, your registered</h1><hr /><a href=`/`>Home</ a>")
})

app.use("/", (req, res)=>{
// we do some server side code exe
res.send(` <div><a href="/registration">Registration</a><a href="/login">login</a>
<h1>Sathish bio <hr /><h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo voluptatem consequuntur corporis quam minus, voluptatibus facere. Ab impedit aut atque blanditiis magnam inventore iure, asperiores officiis ipsam beatae consequuntur fugiat!
</h1></h1></div>`);
 })

 app.listen(PORT, (error)=>{
    error
    ? console.log(error)
    : console.log("your srever is running at http://localhost:" +PORT)
 })
