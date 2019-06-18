'use strict'
var request = require('request');
var cheerio = require('cheerio');

async function readProductos(ruta ) {
  return new Promise(function(resolve,reject){
    request(ruta, function(err, resp, html) {
      if (!err){
        const $ = cheerio.load(html, {
          decodeEntities: false
        });
        var nombreProducto = $("div .product-info .info-wrapper .productName").html();
        console.log(nombreProducto);
        var marca = $('div .aditional-info span div a').text();
        var codigoProducto = $('div .aditional-info span.code div').text();
        var precioRegular = $('div.is-available div.plugin-preco p.descricao-preco em .skuListPrice').html();
        var precioOnline = $('div.is-available div.plugin-preco p.descricao-preco em.valor-por .skuBestPrice').html();
        var imagen = $('div.product-info .image-wrapper div.image div.apresentacao #show #include #image a.image-zoom img').attr("src");
        let fecha = new Date();
        let strFecha = fecha.getFullYear().toString() + (fecha.getMonth()+1).toString() + fecha.getDate().toString();
        var obj = {fecha:strFecha,nombreProducto: nombreProducto, codigo: codigoProducto, marca: marca, rutaImagen : imagen,
                   precio : precioRegular, precioOferta: precioOnline};            
        resolve(obj);
      }
    });
  });
}
module.exports = {
  readProductos
}

//readProductos ("https://www.metro.pe/panales-huggies-active-sec-ahorrapack-talla-xl-paquete-96-unidades-732128003/p");
