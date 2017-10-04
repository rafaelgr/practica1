var mysql = require('mysql');

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
            var sql = "SELECT * FROM usuarios WHERE usuarioid = ?";
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
                usuario.usuarioid = data.insertarid;
                done(null, usuario);
            });
        });
    },

    put: function(usuario, done){
        usuariosDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "UPDATE usuarios SET ? WHERE usuarioid = ?"
            sql = mysql.format(sql, [usuario, usuario.usuarioid]),
            con.query(sql, function(err, data){
                if (err) return done(data);
                done(null, data);
            });
            
        });
    },

    delete: function(usuarioId, done){
        usuariosDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "DELETE FROM usuarios WHERE usuarioid = ?";
            sql = mysql.format(sql, usuarioId);
            con.query(sql, function(err, data){
                con.end;
                if (err) return done(err)
                done(null, data);
            });
        });
    },

    login : function(login, password, done){
        usuariosDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "select login, password from usuarios where login = ? and password = ?";
            sql = mysql.format(sql, [login, password]);
            con.query(sql, function(err, data){
                con.end;
                if(err) return done(err);
                done(null, data);
            });
        });
    }
    
}

module.exports = usuariosDbApi;