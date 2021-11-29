const fs = require("fs");
const express = require ("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 5500;
const file = "./posts.json";

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/test', function(req, res) {
    const usrname = req.body.name;
    const usremail = req.body.email;
    const usrcomment = req.body.comment;

    let obj = { name: usrname, email: usremail, comment: usrcomment };

    let data = fs.readFileSync("posts.json");
    let myobject = JSON.parse(data);

    myobject.posts.push(obj);

    let newData = JSON.stringify(myobject);
    fs.writeFile(file, newData, err => {
        if (err) throw err;
    })

    res.write("Inlägg skickat!");
    // fs.appendFile(file, obj, (err)=> {
    //     if(err) throw err;
    // })
});

app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});


