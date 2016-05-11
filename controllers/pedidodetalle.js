
/*
 * GET users listing.
 */

/**
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var pedidodetalle		= sequelize.import("../models/pedidodetalles");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	pedidodetalle.findAll().then(function(pedidodetalle){
		pedidodetalle.forEach(function(item){
			item['dataValues'].articulo = "/articulo/" + item['dataValues'].articuloid;
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].articuloid;
			delete item['dataValues'].maquinaestadoid;
		});
		response.jsonp(pedidodetalle);
	});
};
var findById 		= function(request, response){
	pedidodetalle.findAll({
		where : {
			pedidoid : request.params.pedidoid 
		}
	}).then(function(pedidodetalle){
		pedidodetalle.forEach(function(item){
			item['dataValues'].articulo = "/articulo/" + item['dataValues'].articuloid;
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].articuloid;
			delete item['dataValues'].maquinaestadoid;
		});
		response.jsonp(pedidodetalle);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     pedidodetalle.create({
		    	 pedidoid : request.body.pedidoid,
		    	 articuloid : request.body.articuloid,
		    	 maquinaestadoid : request.body.maquinaestadoid
		     }, {transaction : transaction})
		]);
	}).then(function(pedidodetalle){
		pedidodetalle.forEach(function(item){
			item['dataValues'].articulo = "/articulo/" + item['dataValues'].articuloid;
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].articuloid;
			delete item['dataValues'].maquinaestadoid;
		});
		response.jsonp(pedidodetalle);
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