/**
 * New node file
 */
var appFastplate = require("../app");
var estado = require("../controllers/estado");

appFastplate.get('/estado', estado.all);
appFastplate.get('/estado/:estadoid', estado.findById);
appFastplate.post('/estado', estado.create);
appFastplate.put('/estado', estado.updateAll);
appFastplate.path('/estado', estado.updatePart);
appFastplate.delete('/estado/:estadoid', estado.deleteById);