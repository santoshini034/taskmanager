const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type : String,
        require: true,
        unique: true,
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    task:[
        {
           type: Schema.Types.ObjectId,
           ref:"Task"
        }
    ],
})

const User = mongoose.model("User", userSchema);
module.exports = User;