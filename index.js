var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var moment = require('moment');
var usuariosDb = require("./lib/usuarios/usuarios.db_mysql");

var app = express();
var jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// using cors for cross class
app.use(cors());

var router = express.Router();

router.use(function (req, res, next) {
    var clave = req.header('calveUsuario');
    if (!clave) return res.status(401).send('No se ha encontrado clave API');
    usuariosDb.verificarClave(clave, function (err, verificada) {
        if (err) return res.status(500).send(err.message);
        if (!verificada) return res.status(401).send('No autorizado');
        next();
    });
});


// comentario git


app.use('/api/vicent', require('./lib/vicent/vicent.controller'));
app.use('/api/clientes', require('./lib/clientes/clientes.controller'));
app.use('/api/usuarios', require('./lib/usuarios/usuarios.controller'));


app.listen(8099);
console.log('Estoy escuichando en el localhost:8099');