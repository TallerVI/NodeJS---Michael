
/*
 * GET users listing.
 */

/**
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var pedido			= sequelize.import("../models/pedidos");
var host			= require ("./host");


/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	var h = host.getHost(request, response);
	pedido.findAll().then(function(pedidos){
		pedidos.forEach(function( pedido ){
			pedido['dataValues'].pedidodetalle = h + "/pedido/" + pedido['dataValues'].pedidoid + '/pedidodetalle';
			pedido['dataValues'].usuario = h + "/usuario/" + pedido['dataValues'].usuarioid;
			pedido['dataValues'].mesa = h + "/mesa/" + pedido['dataValues'].mesaid;
			pedido['dataValues'].maquinaestado = h + "/maquinaestado/" + pedido['dataValues'].maquinaestadoid;
			delete pedido['dataValues'].usuarioid;
			delete pedido['dataValues'].mesaid;
			delete pedido['dataValues'].maquinaestadoid;
		});
		response.jsonp(pedidos);
	});
};
var findById 		= function(request, response){
	var h = host.getHost(request, response);
	pedido.findAll({
		where : {
			pedidoid : request.params.pedidoid
		}
	}).then(function(pedidos){
		pedidos.forEach(function( pedido ){
			pedido['dataValues'].pedidodetalle = h + "/pedido/" + pedido['dataValues'].pedidoid + '/pedidodetalle';
			pedido['dataValues'].usuario = h + "/usuario/" + pedido['dataValues'].usuarioid;
			pedido['dataValues'].mesa = h + "/mesa/" + pedido['dataValues'].mesaid;
			pedido['dataValues'].maquinaestado = h + "/maquinaestado/" + pedido['dataValues'].maquinaestadoid;
			delete pedido['dataValues'].usuarioid;
			delete pedido['dataValues'].mesaid;
			delete pedido['dataValues'].maquinaestadoid;
		});
		response.jsonp(pedidos);
	});
};
var create 			= function(request, response){
	var h = host.getHost(request, response);
	sequelize.transaction(function(transaction){
		return Promise.all([
		     pedido.create({ 
		    	 usuarioid : request.body.usuarioid,
		    	 mesaid : request.body.mesaid,
		    	 maquinaestadoid : request.body.maquinaestadoid
		     }, {transaction : transaction})
		]);
	}).then(function(pedidos){
		var pedido = pedidos.pop();
		pedido['dataValues'].pedidodetalle = h + "/pedido/" + pedido['dataValues'].pedidoid + '/pedidodetalle';
		pedido['dataValues'].usuario = h + "/usuario/" + pedido['dataValues'].usuarioid;
		pedido['dataValues'].mesa = h + "/mesa/" + pedido['dataValues'].mesaid;
		pedido['dataValues'].maquinaestado = h + "/maquinaestado/" + pedido['dataValues'].maquinaestadoid;
		delete pedido['dataValues'].usuarioid;
		delete pedido['dataValues'].mesaid;
		delete pedido['dataValues'].maquinaestadoid;
		response.jsonp(pedido);
	}).catch(function(error){
		response.jsonp({response : error});
	});
};
var updateAll 		= function(request, response){
	var h = host.getHost(request, response);
	sequelize.transaction(
	).then(function(transaction){
		pedido.update(
			{ 
		    	usuarioid : request.body.usuarioid,
		    	mesaid : request.body.mesaid,
				maquinaestadoid : request.body.maquinaestadoid
			},
			{ where : { pedidoid : request.body.pedidoid } }, 
			{ transaction : transaction }
		).then(function( rowUpdated ){
			if(rowUpdated.pop() == 0){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido actualizar pedido" });
			} else {
				transaction.commit();
				pedido.findById(request.body.pedidoid).then(function(pedido){
					pedido['dataValues'].pedidodetalle = h + "/pedido/" + pedido['dataValues'].pedidoid + '/pedidodetalle';
					pedido['dataValues'].usuario = h + "/usuario/" + pedido['dataValues'].usuarioid;
					pedido['dataValues'].mesa = h + "/mesa/" + pedido['dataValues'].mesaid;
					pedido['dataValues'].maquinaestado = h + "/maquinaestado/" + pedido['dataValues'].maquinaestadoid;
					delete pedido['dataValues'].usuarioid;
					delete pedido['dataValues'].mesaid;
					delete pedido['dataValues'].maquinaestadoid;
					response.status(200).jsonp(pedido);
				});
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};
var updatePart 		= function(request, response){
	var h = host.getHost(request, response);
	response.status(500).jsonp({ response : "Implementar updatePart" });
};
var deleteById 		= function(request, response){
	var h = host.getHost(request, response);
	sequelize.transaction(
	).then(function(transaction){
		pedido.destroy(
			{ where : { pedidoid : request.params.pedidoid }, transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el pedido" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ pedido : h + "/pedido/" + request.params.pedidoid }]);
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};

var findByMesa		= function(request, response){
	var h = host.getHost(request, response);
	pedido.findAll({
		where : {
			mesaid : request.params.mesaid,
			maquinaestadoid : { 
				$ne : 10
			}
		}
	}).then(function(pedidos){
		pedidos.forEach(function( pedido ){
			pedido['dataValues'].pedidodetalle = h + "/pedido/" + pedido['dataValues'].pedidoid + '/pedidodetalle';
			pedido['dataValues'].usuario = h + "/usuario/" + pedido['dataValues'].usuarioid;
			pedido['dataValues'].mesa = h + "/mesa/" + pedido['dataValues'].mesaid;
			pedido['dataValues'].maquinaestado = h + "/maquinaestado/" + pedido['dataValues'].maquinaestadoid;
			delete pedido['dataValues'].usuarioid;
			delete pedido['dataValues'].mesaid;
			delete pedido['dataValues'].maquinaestadoid;
		});
		response.jsonp(pedidos);
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
exports.findByMesa	= findByMesa;