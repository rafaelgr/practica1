var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
    res.json('/ vicent');
});

router.get('/:codigo', function (req, res) {
    var codigo = req.params.codigo;
    res.json('/ vicent' + codigo);
});


router.get('/producto', function (req, res) {
    var p1 = req.query.p1;
    var p2 = req.query.p2;
    res.json('Resultado ' + (p1 *p2));
    
});

router.post('/', function(req, res){
    var body = req.body;
    res.json('Soy post');
})

router.put('/', function(req, res){
    res.json('Soy put');
})

router.delete('/', function(req, res){
    res.json('Soy delete');
})


module.exports = router;