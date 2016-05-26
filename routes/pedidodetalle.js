/**
 * New node file
 */
var appFastplate = require("../app");
var pedidodetalle = require("../controllers/pedidodetalle");

appFastplate.get('/pedidodetalle/:pedidoid', pedidodetalle.all);
appFastplate.get('/pedidodetalle/:pedidoid/articulo/:articuloid', pedidodetalle.findById);
appFastplate.post('/pedidodetalle', pedidodetalle.create);
appFastplate.put('/pedidodetalle', pedidodetalle.updateAll);
appFastplate.patch('/pedidodetalle', pedidodetalle.updatePart);
appFastplate.delete('/pedidodetalle/:pedidoid/articulo/:articuloid', pedidodetalle.deleteById);