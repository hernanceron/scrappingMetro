var json2xls = require('json2xls');
//var fs = require("fs");
var request = require('./scrapping');
var pagina = require('./paginaHandler');

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
    nomFile = nomFile + '.xlsx';
    fs.writeFileSync(nomFile,xls,'binary');    
}

cargarProductos();