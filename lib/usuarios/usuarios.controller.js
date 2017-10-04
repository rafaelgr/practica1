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
    });
});

router.post('/', function (req, res) {
    var usuario = req.body;
    if (!usuario) return res.status(400).send('Se tiene que introducir un usuario');
    if (!usuario.nombre || !usuario.password) return res.send('Los campos nombre y password son obligatorios');
    usuariosDb.post(usuario, function (err, data) {
        if (err) return res.status(500).send(err.message);
        res.json(data);
    })
});

router.put('/', function (req, res) {
    var usuario = req.body;
    if (!usuario.usuarioid) return res.status(400).send('Se tiene que introducir la ID del usuario');
    usuariosDb.put(usuario, function (err, data) {
        if (err) return res.status(500).send(err.message);
        usuariosDb.getById(usuario.usuarioid, function (err, usuario) {
            if (err) return res.status(500).send(err.message);
            res.json(usuario);
        });
    });
})

router.delete('/:usuarioid', function (req, res) {
    var usuarioid = req.params.usuarioid;
    if (!usuarioid) return res.status(400).send('Tiene que introducir la ID del usurio');
    usuariosDb.delete(usuarioid, function (err, data) {
        if (err) return res.status(500).send(err.message);
        if (data.affectedRows == 1) return res.status(404).send('Se ha borrado el usuario ' + usuarioid);
        res.send('Usuario no encontrado');
    });
});

router.post('/login', function (req, res) {
    var usuario = req.body;
    if (!usuario) return res.status(400).send('Se tiene que introducir un usuario');
    if (!usuario.login || !usuario.password) return res.send('Los campos login y password son obligatorios');
    usuariosDb.login(usuario.login, usuario.password ,function (err, data) {
        if (err) return res.status(500).send(err.message);
        if(data.login == usuario.login && data.password == usuario.password) return res.json(data);
        res.status(401).send('usuario o contraseña incorrectos');
    })
});

module.exports = router;