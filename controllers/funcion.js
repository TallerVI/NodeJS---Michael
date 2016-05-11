
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
	}).then(function(result){
		response.jsonp(result);
	}).catch(function(error){
		response.jsonp({response : error});
	});
};


/**
 * Export functions
 * 
 */
var updateAll		= function(request, response){
	response.jsonp({ response : "Implementar updateAll"});
};

var updatePart		= function(request,response){
	response.jsonp({ response : "Implementar udpatePart" });
};

var deleteById		= function(request, response){
	response.jsonp({ response : "Implementar deleteById" });
};

/**
 * Export functions
 * 
 */
exports.all 		= all;
exports.findById 	= findById;
exports.create 		= create;
exports.updateAll	= updateAll;
exports.udpatePart 	= updatePart;
exports.deleteById	= deleteById;