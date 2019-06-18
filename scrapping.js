'use strict'
var request = require('request');
var cheerio = require('cheerio');
var pagina = require('./paginaHandler');

var rutas=[];
const rutaPrincipal = process.env.RUTA_PRINCIPAL;
//const rutaPrincipal = "https://www.metro.pe/ninos-y-bebes/panales-y-toallitas-humedas/panales?PS=72";

async function scrapeRutas() {
    return new Promise(function (resolve,reject) {
        request(rutaPrincipal, function(err, resp, html) {
            if (!err){
                const $ = cheerio.load(html);            
                $('li div').each(function(i,elem){
                    if($(this).attr('data-sku')){
                        var ruta = $(this).attr('data-uri');
                        rutas.push(ruta);
                    }
                });
                console.log("Termino la carga de rutas " + rutas.length);                     
            }
            else
                reject(err);
            resolve(rutas);
        });      
    });
};

module.exports = {
    scrapeRutas
}