var json2xls = require('json2xls');
var aws = require('aws-sdk');

var request = require('./scrapping');
var pagina = require('./paginaHandler');

var s3 = new aws.S3();


function putS3File(file,bucket, key) {
    var base64data = new Buffer(file,'binary');
    var params = {
        Body: base64data, 
        Bucket: bucket, 
        Key: key
       };
    s3.putObject(params, function(err, data) {
        if (err) console.log(err); // an error occurred
        else     console.log("Se cargo") ;         // successful response      
    });
}

async function cargarProductos() {
    var arrProductos = [];
    //cargo las rutas
    let rutas = await request.scrapeRutas();
    
    for (let index = 0; index < rutas.length; index++) {
        const element = rutas[index];        
        let producto = await pagina.readProductos(element);
        arrProductos.push(producto);      
    }
    let fecha = new Date();
    let nomFile = fecha.getFullYear().toString() + (fecha.getMonth()+1).toString() + fecha.getDate().toString();
    
    var xls = json2xls(arrProductos);
    nomFile = nomFile + '-metro' + '.xlsx';
    putS3File(xls,"repo-tiendas-42052757",nomFile);
}

exports.handler = function(event, context, callback) {
    cargarProductos();
}