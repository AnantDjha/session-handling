const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const userInfo = mongoose.model("userInfo",userSchema)

module.exports = userInfo