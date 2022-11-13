// Dévi Certification// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
    let d = new Date();

    let resultat = {
        unix: d.getTime(),
        utc: d.toUTCString()
    }

    res.send(resultat);
});

app.get('/api/:date', (req, res) => {
    if (!Date.parse(req.params.date) && !Number(req.params.date)) {
        return res.send({ error: "Invalid Date" });
    } else if (!(/[-]/.test(req.params.date)) && Number(req.params.date)) {
        let d = new Date(Number(req.params.date));
        return res.send({
            unix: d.getTime(),
            utc: d.toUTCString()
        });
    } else {
        let d = new Date(req.params.date);

        let resultat = {
            unix: d.getTime(),
            utc: d.toUTCString()
        }
        res.status(200).send(resultat);
    }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});

//------------------------------------------------------------------------------------------
// Course

let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');
console.log("Hello World");

app.use('/public', express.static(__dirname + '/public'));

const mySecret = process.env['MESSAGE_STYLE '];

app.use(bodyParser.urlencoded({ extended: false }))

app.route('/name').get((req, res) => {
    var { first: firstName, last: lastName } = req.query;
    res.json({ name: `${firstName} ${lastName}` });
}).post((req, res) => {
    var chaine = req.body.first + " " + req.body.last;
    res.json({ name: chaine });
})

app.get('/:word/echo', (req, res) => {
    res.json({ echo: req.params.word });
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ time: req.time });
    console.log({ time: req.time });
});

app.use((req, res, next) => {
    let string = req.method + " " + req.path + " - " + req.ip;
    next();
});

app.get("/json", (req, res) => {
    var response = "Hello World".toUpperCase();
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        response = "Hello json".toUpperCase();
    } else {
        response = "Hello json";
    }
    res.json({ "message": response });
})

app.get("/", (req, res) => {
    let absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});
module.exports = app;