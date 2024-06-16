const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    weight : {
        type : String,
        required : true,
    },
    loat : {
        type : Array,
        required : true
    }
})


const Task = mongoose.model('Task',taskSchema);

module.exports = Task;