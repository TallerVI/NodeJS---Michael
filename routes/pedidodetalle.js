/**
 * New node file
 */
var appFastplate = require("../app");
var pedidodetalle = require("../controllers/pedidodetalle");

appFastplate.get('/pedidodetalle', pedidodetalle.all);
appFastplate.get('/pedidodetalle/:pedidodetalleid', pedidodetalle.findById);
appFastplate.post('/pedidodetalle', pedidodetalle.create);
appFastplate.put('/pedidodetalle', pedidodetalle.updateAll);
appFastplate.path('/pedidodetalle', pedidodetalle.updatePart);
appFastplate.delete('/pedidodetalle/:pedidodetalleid', pedidodetalle.deleteById);