var mysql = require('mysql');

var clientesDbApi = {
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
        clientesDbApi.conectar(function(err, con){
            if (err) return done(err);
            var sql = "SELECT * FROM clientes";
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        });
    },
    getByCodigo: function(codigo, done){
        clientesDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "SELECT * FROM clientes WHERE codigo = ?";
            sql = mysql.format(sql, codigo);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                done(null, data);
            });
        })
           
        
    },
    
    post: function(cliente, done){
        clientesDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "INSERT INTO clientes SET ?";
            sql = mysql.format(sql, cliente);
            con.query(sql, function(err, data){
                con.end();
                if (err) return done(err);
                cliente.clienteId = data.insertId;
                done(null, cliente);
            });
        })
    },

    put : function(cliente, done){
        clientesDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "UPDATE clientes SET ? WHERE clienteID = ?";
            sql = mysql.format(sql, [cliente, cliente.clienteID]);
            con.query(sql, function(err, data){
                con.end;
                if (err) return done(err);
                done(null, cliente);
            });
        });
    },

    delete: function(clienteID, done){
        clientesDbApi.conectar(function(err, con){
            if(err) return done(err);
            var sql = "DELETE FROM clientes WHERE clienteID = ?";
            sql = mysql.format(sql, clienteID);
            con.query(sql, function(err, data){
                con.end;
                if (err) return done(err)
                done(null, data);
            });
        });
    }
}

module.exports = clientesDbApi;