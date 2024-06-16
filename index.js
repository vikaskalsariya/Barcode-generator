const express = require('express');

const port = 8003;

const db = require('./config/mongoose.js');

const Task = require('./models/task.js');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.get('/', (req, res) => {
    return res.render('addForm');
})


app.post('/addData', async(req, res) => {
    var allData = {};
    var data = req.body;
    var loatarr = [];
    var loatObj = {};
    for (const ops in data) {
        if (ops != 'Weight') {
            let part = ops.slice(0, 5);
            if (part == 'count') {
                loatObj.count = data[ops];
            }
            else {
                loatObj.loatWeight = data[ops];
            };

            if (Object.keys(loatObj).length == 2) {
                loatObj.id = Math.round(Math.random() * 90000) + 10000;
                loatarr.push(loatObj);
                loatObj = {};
            };
        }
        else 
        {
            allData.weight = data[ops];
        }
    }
    allData.loat = loatarr;

    await Task.create(allData);
    return res.redirect('back');
})

app.get('/showData',async (req,res)=>{
    let data = await Task.find({});
    return res.render('showData',{
        data : data,
    });
})
app.listen(port, (err) => {
    if (err) {
        console.log('somthing is wrong');
        return false;
    }
    console.log('run successfully with port : ' + port);
})