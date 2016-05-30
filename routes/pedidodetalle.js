/**
 * New node file
 */
var appFastplate = require("../app");
var pedidodetalle = require("../controllers/pedidodetalle");

appFastplate.get('/pedido/:pedidoid/pedidodetalle', pedidodetalle.all);
appFastplate.get('/pedido/:pedidoid/articulo/:articuloid', pedidodetalle.findById);
appFastplate.post('/pedidodetalle', pedidodetalle.create);
appFastplate.put('/pedidodetalle', pedidodetalle.updateAll);
appFastplate.patch('/pedidodetalle', pedidodetalle.updatePart);
appFastplate.delete('/pedido/:pedidoid/articulo/:articuloid', pedidodetalle.deleteById);