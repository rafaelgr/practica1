var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// using cors for cross class
app.use(cors());


// comentario git

app.use('/api/vicent', require('./lib/vicent/vicent.controller'));
app.use('/api/clientes', require('./lib/clientes/clientes.controller'));
app.use('/api/usuarios', require('./lib/usuarios/usuarios.controller'));
app.listen(8099);
console.log('Estoy escuichando en el localhost:8099');