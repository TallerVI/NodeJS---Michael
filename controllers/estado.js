
/*
 * GET users listing.
 */

/**
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var estado		= sequelize.import("../models/estados");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	estado.findAll().then(function(estados){
		estados.forEach(function(estado){
			estado['dataValues'].maquinaestado = "/estado/" + estado['dataValues'].estadoid + '/maquinaestado';
		});
		response.jsonp(estados);
	});
};
var findById 		= function(request, response){
	estado.findAll({
		where : {
			estadoid : request.params.estadoid
		}
	}).then(function(estados){
		estados.forEach(function(estado){
			estado['dataValues'].maquinaestado = "/estado/" + estado['dataValues'].estadoid + '/maquinaestado';
		});
		response.jsonp(estados);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     estado.create({ 
		    	 descripcion : request.body.descripcion
		     }, {transaction : transaction})
		]);
	}).then(function(estados){
		estados.forEach(function(estado){
			estado['dataValues'].maquinaestado = "/estado/" + estado['dataValues'].estadoid + '/maquinaestado';
		});
		response.jsonp(estados);
	}).catch(function(error){
		response.jsonp({response : error});
	});
};
var updateAll 		= function(request, response){
	sequelize.transaction(
	).then(function(transaction){
		estado.update(
			{ descripcion : request.body.descripcion },
			{ where : { estadoid : request.body.estadoid } }, 
			{ transaction : transaction }
		).then(function( rowUpdated ){
			if(rowUpdated.pop() == 0){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido actualizar el estado" });
			} else {
				transaction.commit();
				estado.findById(request.body.estadoid).then(function(estado){
					response.status(200).jsonp(estado);
				});
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};
var updatePart 		= function(request, response){
	response.status(500).jsonp({ response : "Implementar updatePart" });
};
var deleteById 		= function(request, response){
	sequelize.transaction(
	).then(function(transaction){
		estado.destroy(
			{ where : { estadoid : request.params.estadoid }, transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el estado" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ estado : "/estado/" + request.params.estadoid }]);
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};

/**
 * Export functions
 * 
 */
exports.all 		= all;
exports.findById 	= findById;
exports.create 		= create;
exports.updateAll 	= updateAll;
exports.updatePart 	= updatePart;
exports.deleteById 	= deleteById;