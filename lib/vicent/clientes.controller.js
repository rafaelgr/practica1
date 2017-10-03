var express = require("express");
var router = express.Router();
var clientesDb = require("./clientes.db_mysql");

router.get('/', function (req, res){
    //res.json('Todos los clientes');
    clientesDb.get(function(err, data){
        if (err) return res.status(500).send(err.message);
        res.json(data);
    })
});

router.get('/:codigo', function (req, res){
    var codigo = req.params.codigo;
    //res.json('cliente '+codigo);
    clientesDb.getByCodigo(codigo, function(err, data){
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('Cliente no encontrado');
        res.json(data[0]);
    })
});

router.post('/', function(req, res){
    var cliente = req.body
    //res.json('Crear cliente <br> codigo: '+body.codigo+' <br>nombre: '+body.nombre);
    if (!cliente) return res.status(400).send('Se tiene que introducir un cliente');
    if (cliente.codigo == 0 || cliente.nombre == "") return res.send('Se tiene que introducir un cliente');
    clientesDb.post(cliente, function(err, cliente){
        if (err) return res.status(500).send(err.message);
        res.json(cliente);
    });
});

router.put('/', function(req, res){
    var cliente = req.body;
    if(!cliente.clienteID)  return res.status(400).send('Tiene que introducir la ID del cliente');
    clientesDb.put(cliente, function(err, cliente){
        if (err) return res.status(500).send(err.message);
        res.json(cliente);
    });
});

router.delete('/:clienteID', function (req, res){
    var clienteID = req.params.clienteID;
    //res.json('Borrar cliente '+codigo);
    if (!clienteID) return res.status(400).send('Tiene que introducir la ID del cliente');
    clientesDb.delete(clienteID, function(err, cliente){
        if (err) return res.status(500).send(err.message);
        res.json(cliente);
    });
});



console.log('Se ha ejecutado el controlador de clientes');

module.exports = router;