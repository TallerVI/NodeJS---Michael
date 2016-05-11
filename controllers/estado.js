
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
	}).then(function(result){
		response.jsonp(result);
	}).catch(function(error){
		response.jsonp({response : error});
	});
};
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