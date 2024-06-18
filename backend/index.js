const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const userInfo = require("./mongo/mongo.js")
const cors = require("cors")
const bodyParser = require("body-parser")


const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // or your specific origin
    credentials: true, // this will enable the Access-Control-Allow-Credentials CORS header
  };
  
  app.use(cors(corsOptions));
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",

    cookie:{
        secure:false,
        maxAge: 1000*5
    }
}))
app.use(cookieParser())

const conn = mongoose.connect("mongodb://127.0.0.1:27017/userDetail")

app.get("/user", (req, res) => {
    if(req.session.user)
        {
            return res.json({valid:true,user: req.session.user})
        }
        else{
            return res.json({valid:false})

        }
})
app.post("/signup", async (req, res) => {
    try {
        const data = await userInfo.find({ email: req.body.email })
        if (data.length > 0) {
            res.status(200).send({ message: "the email id is already present" })
        }
        else {


            const p = new userInfo({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            await p.save();
            res.status(200).send({ message: "succesfull" })
        }
    }
    catch (e) {
        console.log("error while submitting", e);
    }

})

app.post("/login", async (req, res) => {
    try {
        let data = await userInfo.find({ email: req.body.email })
        // let d = JSON.parse(data)
        if (data.length > 0) {
            if (data[0].password != req.body.password) {
                return res.send({ message: "incorrect password" })
            }
            else {
                req.session.user = data[0].name
                // await req.session.save();

                res.status(200).send({ message: "succesfull",name: data[0].name})
            }
        }
        else {
            res.status(200).send({ message: "No user found" })
        }
    }
    catch (e) {
        console.log(e);
    }

})


app.listen(5000, () => {
    console.log("listning...");
})