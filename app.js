const express = require('express'),
    bodyParser = require('body-parser');

const database = require('./db');
const Convidado = require('./models/convidado');
const router = require('./routes/router');

var app = express();
var port = 80;

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.listen(port);

console.log('Servidor HTTP esta escutando na porta ' + port);

// app.get('/', async function(req, res) {
//     res.render("index");
// });

