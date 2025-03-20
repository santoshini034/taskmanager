const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    heading:{
        type : String,
        require: true,
        unique: true,
    },
    date:{
        type: String,
        require: true
    },
    time:{
        type: String,
        require: true
    },
    file:{
        type: String,
    },
    details:{
        type: String,
        require: true
    },
    
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;