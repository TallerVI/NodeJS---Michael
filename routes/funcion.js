/**
 * New node file
 */
var appFastplate = require("../app");
var funcion = require("../controllers/funcion");

appFastplate.get('/funcion', funcion.all);
appFastplate.get('/funcion/:funcionid', funcion.findById);
appFastplate.post('/funcion', funcion.create);
appFastplate.put('/funcion', funcion.updateAll);
appFastplate.path('/funcion', funcion.updatePart);
appFastplate.delete('/funcion', funcion.deleteById);