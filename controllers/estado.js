
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
	estado.findAll().then(function(estado){
		response.jsonp(estado);
	});
};
var findById 		= function(request, response){
	estado.findAll({
		where : {
			estadoid : request.params.estadoid
		}
	}).then(function(estado){
		response.jsonp(estado);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     estado.create({ 
		    	 descripcion : request.body.descripcion
		     }, {transaction : transaction})
		]);
	}).then(function(estado){
		response.jsonp(estado);
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