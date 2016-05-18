/**
 * New node file
 */
var appFastplate = require("../app");
var maquinaestado = require("../controllers/maquinaestado");

appFastplate.get('/maquinaestado', maquinaestado.all);
appFastplate.get('/maquinaestado/:maquinaestadoid', maquinaestado.findById);
appFastplate.post('/maquinaestado', maquinaestado.create);
appFastplate.put('/maquinaestado', maquinaestado.updateAll);
appFastplate.path('/maquinaestado', maquinaestado.updatePart);
appFastplate.delete('/maquinaestado/:maquinaestadoid', maquinaestado.deleteById);