const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;
mongoose.connect(url);

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err)
    {
        console.log('db not connected');
        return false;
    }
    console.log('DB connected');
})

module.exports = db;