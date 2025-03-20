require('dotenv').config();
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 8080;
const url = process.env.MONGO_URL;
const fs = require('fs')

//models
const User = require('./Models/User')
const Task = require('./Models/Task')

//app listen
app.listen(PORT, () => {
    console.log("app is lintening");
})

//connect to db
main().then(() => {
    console.log("connected to db");
})
async function main(){
    mongoose.connect(url);
}

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'))

const CreateScreteToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_KEY, {
        expiresIn:'1h',
    })
}

const verifyuser = async(req, res, next) => {
    const auth = req.body.token;
    if(!auth){
        res.json({success:false, message: "Authentication declined"});
    }
    const token = jwt.verify(auth, process.env.TOKEN_KEY,
        async(error, data) => {
            if(error){
                res.json({success:false, message: "Try again!"});
            }else{
                req.userid = data.id;
                next();
            }
        }
    )
}
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage: storage})


//root route
app.get("/", (req, res) => {
    res.send("home page");
})

//add user
app.post("/adduser",async (req,res) => {
    try{
        const data = req.body;
        const newUser = new User(data);
        newUser.password = await bcryptjs.hash(newUser.password, 12);
        await newUser.save();
        const token = CreateScreteToken(newUser._id);
        res.cookie("Token", token, {
            withCredentials:true,
            httpOnly: true
        });
        res.json({success: true, message: "User Registered", token});
    }catch{
        res.json({success: false, message: "User already exist"});
    }
})

//login user
app.post("/loginuser", async(req, res) => {
    try {
        const {username, password} = req.body;
        const finduser = await User.findOne({username});
        if(!finduser){
            res.json({success: false, message: "User doesn't exist"});
        }
        const userpassword = finduser.password;
        const auth = await bcryptjs.compare(password,userpassword);
        if(!auth){
            res.json({success: false, message: "password is incorrect"});
        }
        const token = CreateScreteToken(finduser._id);
        res.cookie("Token", token, {
            withCredentials: true,
            httpOnly: true
        });
        res.json({success: true, message: "User logged in", token});
    } catch (error) {
        res.json({success: false, message: "Something went wrong, try again"});
    }
})

//enter task page
app.post("/entertask", verifyuser, async(req, res) => {
    const id = req.userid;
    const getuser = await User.findById(id);
    const tasklist = getuser.task;
    const taskli = []
    for(i = 0; i < tasklist.length; i++ ){
        const taskdata = await Task.findById(tasklist[i]);
        taskli.push(taskdata);
    }
    res.json({success: true, getuser, taskli});
})

//add task
app.post("/addtask",upload.single("file"), async(req, res) =>{
    let file = `${req.file.filename}`;
    let data = req.body;
    try {
        const newtask = new Task({
            heading: data.heading,
            date: data.date,
            time: data.time,
            file: file,
            details: data.details
        });

        const userdata = await User.findOne({username : data.username});
        userdata.task.push(newtask);
        await newtask.save();
        await userdata.save();
        res.json({success: true, message: "Data added"});
    } catch (error) {
        res.json({success: false, message: "Enter unique values"});
    }
})

//delete task
app.post("/:id/deletetask/:taskid",async (req, res) => {
    let {id, taskid} = req.params;
    await User.findByIdAndUpdate(id, {$pull: {task : taskid}});
    await Task.findByIdAndDelete(id);
    res.json({success: true, message: "Task deleted"});  
})

//view page
app.post("/view/:id", async(req, res) => {
    const {id} = req.params;
    const taskdetails = await Task.findById(id);
    res.json({success: true, taskdetails})

})