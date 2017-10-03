var express = require("express");
var router = express.Router();

router.get('/', function (req, res){
    res.json('Todos los clientes');
});

router.get('/:codigo', function (req, res){
    var codigo = req.params.codigo;
    res.json('cliente '+codigo);
});

router.post('/', function(req, res){
    var  body = req.body;
    res.json('Crear cliente <br> codigo: '+body.codigo+' <br>nombre: '+body.nombre);
});

router.put('/', function(req, res){
    if(!req.body.codigo){
        res.status(400).send('Formato incorrecto');
        return;
    }
    var body = req.body;
    res.json('Crear cliente <br> codigo: '+body.codigo+' <br>nombre: '+body.nombre)
});

router.delete('/:codigo', function (req, res){
    var codigo = req.params.codigo;
    res.json('Borrar cliente '+codigo);
});

console.log('Se ha ejecutado el controlador de clientes');

module.exports = router;