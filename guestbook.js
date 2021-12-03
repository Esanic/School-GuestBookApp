const fs = require("fs");
const express = require ("express");
const bodyParser = require("body-parser");
const path = require("path");
const pug = require("pug");
const app = express();
const port = 5500;
const file = "./public/json/posts.json";
const credentials = "./credentials/credentials.json";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

function evilInput (string){
string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
return string;
}

app.get('/', async function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/login.html')); 
});

app.post('/loggedin', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let readData = fs.readFileSync(credentials);
    let parsedReadData = JSON.parse(readData);

    let userAccount = parsedReadData.find(user => username === user.username)
    if (userAccount) {
        let userPassword = userAccount.password;
        if (req.body.password === userPassword){
            console.log("1");
            res.sendFile(path.join(__dirname, '/index.html'));
        }
        else {
            res.redirect("/");

        }
    }
    else {
        res.redirect("/");

    }

});

app.post('/registered', async function(req, res) {
    const regUsername = evilInput(req.body.regUsername);
    const regPassword = evilInput(req.body.regPassword);

    let readData = fs.readFileSync(credentials);
    let parsedReadData = JSON.parse(readData);

    let dubbelanvändare = parsedReadData.find(user => regUsername === user.username)
    if (!dubbelanvändare)
    {
        let loginCredentials = {username: regUsername, password: regPassword}
        parsedReadData.push(loginCredentials);

        let newData = JSON.stringify(parsedReadData);
        fs.writeFile(credentials, newData, err => {
        if (err) throw err;
            res.send("<html><body><p>Du är nu registrerad!</p><p>Du skickas nu till inloggningssidan</p><script>var timer = setTimeout(function() {window.location='http://localhost:5500'}, 3000);</script></body></html>");
        })
        }
        else
        {
            res.send("<html><body><p>Detta användarnamnet fanns redan!</p><p>Du skickas nu till registreringssidan</p><script>var timer = setTimeout(function() {window.location='http://localhost:5500/html/register.html'}, 3000);</script></body></html>");
        }
    })

app.post('/sent', async function(req, res) {
    const usrname = evilInput(req.body.name);
    const usremail = evilInput(req.body.email);
    const usrcomment = evilInput(req.body.comment);
    let aktuellTid = new Date();

    aktuellDag = aktuellTid.getDate();
    aktuellDag = ("0"+aktuellDag).slice(-2);

    aktuellTimme = aktuellTid.getHours();
    aktuellTimme = ("0"+aktuellTimme).slice(-2);

    aktuellMinut = aktuellTid.getMinutes();
    aktuellMinut = ("0"+aktuellMinut).slice(-2);

    aktuellSekund = aktuellTid.getSeconds();
    aktuellSekund = ("0"+aktuellSekund).slice(-2);

    let aktuelltDatum = `${aktuellTid.getFullYear()}-${(aktuellTid.getMonth()+1)}-${aktuellDag} kl.${aktuellTimme}:${aktuellMinut}:${aktuellSekund}`;

    let jsonDataIn = { name: usrname, email: usremail, comment: usrcomment, time: aktuelltDatum };

    let readData = fs.readFileSync(file);
    let parsedReadData = JSON.parse(readData);

    parsedReadData.push(jsonDataIn);

    let newData = JSON.stringify(parsedReadData);
    fs.writeFile(file, newData, err => {
        if (err) throw err;
    })

    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});
