
/*
 * GET users listing.
 */

/**
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var pedido			= sequelize.import("../models/pedidos");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	pedido.findAll().then(function(pedido){
		pedido.forEach(function(item){
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			item['dataValues'].usuario = "/usuario/" + item['dataValues'].usuarioid;
			item['dataValues'].mesa = "/mesa/" + item['dataValues'].mesaid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].usuarioid;
			delete item['dataValues'].mesaid;
		});
		response.jsonp(pedido);
	});
};
var findById 		= function(request, response){
	pedido.findAll({
		where : {
			pedidoid : request.params.pedidoid
		}
	}).then(function(pedido){
		pedido.forEach(function(item){
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			item['dataValues'].usuario = "/usuario/" + item['dataValues'].usuarioid;
			item['dataValues'].mesa = "/mesa/" + item['dataValues'].mesaid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].usuarioid;
			delete item['dataValues'].mesaid;
		});
		response.jsonp(pedido);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     pedido.create({ 
		    	 maquinaestadoid : request.body.maquinaestadoid,
		    	 usuarioid : request.body.usuarioid,
		    	 mesaid : request.body.mesaid
		     }, {transaction : transaction})
		]);
	}).then(function(pedido){
		pedido.forEach(function(item){
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			item['dataValues'].usuario = "/usuario/" + item['dataValues'].usuarioid;
			item['dataValues'].mesa = "/mesa/" + item['dataValues'].mesaid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].usuarioid;
			delete item['dataValues'].mesaid;
		});
		response.jsonp(pedido);
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
		pedido.destroy(
			{ where : { pedidoid : request.params.pedidoid }, transaction : transaction }
		).then(function( rowdeleted ){
			if(rowdeleted != request.params.pedidoid ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el pedido" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ pedido : "/pedido/" + request.params.pedidoid }]);
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