
/*
 * GET users listing.
 */

/**
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var funcion		= sequelize.import("../models/funciones");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	funcion.findAll().then(function(funcion){
		response.jsonp(funcion);
	});
};
var findById 		= function(request, response){
	funcion.findAll({
		where : {
			funcionid : request.params.funcionid
		}
	}).then(function(funcion){
		response.jsonp(funcion);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     funcion.create({ 
		    	 descripcion : request.body.descripcion
		     }, {transaction : transaction})
		]);
	}).then(function(funcion){
		response.jsonp(funcion);
	}).catch(function(error){
		response.jsonp({response : error});
	});
};
var updateAll 		= function(request, response){
	response.status(500).jsonp({ response : "Implementar updateAll" });
};
var updatePart 		= function(request, response){
	response.status(500).jsonp({ response : "Implementar updatePart" });
};
var deleteById 		= function(request, response){
	sequelize.transaction(
	).then(function(transaction){
		funcion.destroy(
			{ where : { funcionid : request.params.funcionid }, transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el funcion" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ funcion : "/funcion/" + request.params.funcionid }]);
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