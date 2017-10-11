var express = require("express");
var router = express.Router();
var usuariosDb = require("./usuarios.db_mysql");

router.get('/', function (req, res) {
    usuariosDb.get(function (err, data) {
        if (err) return res.status(500).send(err.message);
        res.json(data);
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    usuariosDb.getById(id, function (err, data) {
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send('Cliente no encontrado');
        res.json(data);
    });
});

router.post('/', function (req, res) {
    var usuario = req.body;
    if (!usuario) return res.status(400).send('Se tiene que introducir un usuario');
    if (usuario.nombre == undefined || usuario.nombre == "" || usuario.password == undefined ||
        usuario.password == "") return res.status(404).send('Los campos nombre y password son obligatorios');
    usuariosDb.post(usuario, function (err, data) {
        if (err) return res.status(500).send(err.message);
        res.json(data);
    })
});

router.put('/', function (req, res) {
    var usuario = req.body;
    if (!usuario.usuarioId) return res.status(400).send('Se tiene que introducir la ID del usuario');
    usuariosDb.put(usuario, function (err, data) {
        if (err) return res.status(500).send(err.message);
        usuariosDb.getById(usuario.usuarioId, function (err, usuario) {
            if (err) return res.status(500).send(err.message);
            res.json(usuario);
        });
    });
})

router.delete('/:usuarioId', function (req, res) {
    var usuarioId = req.params.usuarioId;
    if (usuarioId == "" || usuarioId == undefined) return res.status(400).send('Tiene que introducir la ID del usurio');
    usuariosDb.delete(usuarioId, function (err, data) {
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 0) return res.status(404).send('Usuario no encontrado' + usuarioId);
        res.send('Usuario no encontrado');
    });
});

router.post('/login', function (req, res) {
    var usuario = req.body;
    if (usuario.length == 0) return res.status(400).res.send('Los campos login y password son obligatorios');
    usuariosDb.login(usuario.login, usuario.password, function (err, data) {
        if (err) return res.status(500).send(err.message);
        if(data.length == 0) return res.status(401).send('Login o password incorrectos, No autorizado');
        
        usuariosDb.put(data[0], function(err, data){
            if (err) return res.status(500).send(err.message);
            res.send(data);
        });
    })
});

module.exports = router;