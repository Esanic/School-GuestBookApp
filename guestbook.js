const fs = require("fs");
const express = require ("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 5500;
const file = "./posts.json";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

function displayData(data) {
        let postContainer = document.getElementById("postsContainer");
        for (let i = 0; i < data.length; i++){
            let div = document.createElement("div");
            div.innerHTML= "Namn" + data[i].name + "<br>" + "E-post" + data[i].email + "<br>" + "Inlägg" + data[i].comment + "<br>";
            postContainer.appendChild("div");
        }
    }

app.get('/', async function (req, res) {
    
    res.sendFile(path.join(__dirname, '/index.html'));
    
    let readData = fs.readFileSync(file);
    let parsedReadData = JSON.parse(readData);

    displayData(parsedReadData);

});

app.post('/test', async function(req, res) {
    const usrname = req.body.name;
    const usremail = req.body.email;
    const usrcomment = req.body.comment;
    const time = new Date();

    let jsonDataIn = { name: usrname, email: usremail, comment: usrcomment, time: time };

    let readData = fs.readFileSync(file);
    let parsedReadData = JSON.parse(readData);

    parsedReadData.posts.push(jsonDataIn);

    let newData = JSON.stringify(parsedReadData);
    fs.writeFile(file, newData, err => {
        if (err) throw err;
    })

    res.send("Inlägg skickat!");
});

app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});


