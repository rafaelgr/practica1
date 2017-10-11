var mysql = require('mysql');
var moment = require('moment');
var express = require('express');


var usuariosDbApi = {
    conectar: function(done){
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "aritel",
            database: "practica1",
            port: 3306
        });
        con.connect(function(err){
            if (err) return done(err);
            done(null, con);
        })
    },

    claveAleatoria: function(){
        var text =  "";
        var posible =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += posible.charAt(Math.floor(Math.random() * posible.length));
        
        return text;
    },

    get: function(done){
        usuariosDbApi.conectar(function(err, con){
            if (err) return done(err);
            var sql = "SELECT * FROM usuarios";
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },

    getById: function(id, done){
        usuariosDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "SELECT * FROM usuarios WHERE usuarioId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        })
    },

    post: function(usuario, done){
        usuariosDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "INSERT INTO usuarios SET ?"
            sql = mysql.format(sql, usuario);
            con.query(sql, function(err, data){
                con.end;
                if(err) return done(err);
                usuario.usuarioId = data.insertarid;
                done(null, usuario);
            });
        });
    },

    put: function(usuario, done){
        usuariosDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "UPDATE usuarios SET ? WHERE usuarioId = ?"
            sql = mysql.format(sql, [usuario, usuario.usuarioId]),
            con.query(sql, function(err, data){
                if (err) return done(data);
                done(null, data);
            });
            
        });
    },

    delete: function(usuarioId, done){
        usuariosDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "DELETE FROM usuarios WHERE usuarioId = ?";
            sql = mysql.format(sql, usuarioId);
            con.query(sql, function(err, data){
                con.end;
                if (err) return done(err)
                done(null, data);
            });
        });
    },

    login: function(login, password, done){
        usuariosDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "select * from usuarios where login = ? and password = ?";
            sql = mysql.format(sql, [login, password]);
            con.query(sql, function(err, data){
                con.end();
                if(err) return done(err);
                data[0].ticket =   usuariosDbApi.claveAleatoria();
                data[0].ticketFin = moment(new Date()).add(5, 'h').format('YYYY-MM-DD HH:mm:ss');
                return done (null, data);
            });
        });
    },

    verificarClave: function (clave, done) {
        usuariosDbApi.conectar(function (err, con) {
            if (err) return done(err);
            var ahora = moment(new Date).format('YYYY-MM-DD HH:mm:ss');
            var sql = "SELECT * FROM usuarios WHERE ticket = ? AND ticketFin > ?";
            sql = mysql.format(sql, [clave, ahora]);
            con.query(sql, function (err, usuarios) {
                con.end();
                if (err) return done(err);
                if (usuarios.length == 0) return done(null, false);
                return done(null, true);
            });
        });
    },

    
}

module.exports = usuariosDbApi;