
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
	pedidodetalle.findAll(pedidoDetalleUtils.getParamsForAllFromRequest(request)).then(function(pedidodetalles){
		pedidodetalles.forEach(function(pedidodetalle){
			pedidodetalle = pedidoDetalleUtils.toHATEOAS( pedidodetalle );
		});
		response.jsonp(pedidodetalles);
	});
};
var findById 		= function(request, response){
	pedidodetalle.findAll(pedidoDetalleUtils.getParamsForFindByIdFromRequest(request)).then(function(pedidosdetalles){
		pedidosdetalles.forEach(function(pedidodetalle){
			pedidodetalle = pedidoDetalleUtils.toHATEOAS( pedidodetalle );
		});
		response.jsonp(pedidosdetalles);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     pedidodetalle.create(pedidoDetalleUtils.getParamsForCreateFromRequest(request), {transaction : transaction})
		]);
	}).then(function(pedidodetalles){
		pedidodetalles.forEach(function(pedidodetalle){
			pedidodetalle = pedidoDetalleUtils.toHATEOAS( pedidodetalle );
		});
		response.jsonp(pedidodetalles);
	}).catch(function(error){
		response.jsonp({response : error});
	});
};
var updateAll 		= function(request, response){
	sequelize.transaction(
	).then(function(transaction){
		var params = pedidoDetalleUtils.getParamsForUpdateAllFromRequest(request)
		pedidodetalle.upsert(params.fields, params.options,	{ transaction : transaction }
		).then(function( rowUpdated ){
			if(rowUpdated){
				transaction.commit();
				pedidodetalle.findAll({
					where : {
						pedidoid : request.body.pedidoid,
						articuloid :  request.body.articuloid
					}
				}).then(function(pedidodetalles){
					pedidodetalles.forEach(function( pedidodetalle ){
						pedidodetalle = pedidoDetalleUtils.toHATEOAS( pedidodetalle );
					});
					response.status(200).jsonp(pedidodetalles);
				});
			} else {
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido actualizar pedidodetalle" });
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
		pedidodetalle.destroy(pedidoDetalleUtils.getParamsForDeleteByIdFromRequest(request), { transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el pedidodetalle" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ pedidodetalle : "/pedidodetalle/" + request.params.pedidoid }]);
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};

/*
 * PedidoDetalle functions
 */

var PedidoDetalleUtils = function(){};

PedidoDetalleUtils.prototype.toHATEOAS = function( model ) {
	model['dataValues'].articulo = "/articulo/" + model['dataValues'].articuloid;
	model['dataValues'].maquinaestado = "/maquinaestado/" + model['dataValues'].maquinaestadoid;
	delete model['dataValues'].articuloid;
	delete model['dataValues'].maquinaestadoid;
	return model;
};

PedidoDetalleUtils.prototype.getParamsForAllFromRequest = function( request ) {
	return { 
		where : {
			pedidoid : request.params.pedidoid
		}
	}
};

PedidoDetalleUtils.prototype.getParamsForFindByIdFromRequest = function( request ) {
	return {
		where : {
			pedidoid : request.params.pedidoid,
			articuloid : request.params.articuloid
		}
	}
};

PedidoDetalleUtils.prototype.getParamsForCreateFromRequest = function( request ) {
	return {
		pedidoid : request.body.pedidoid,
		articuloid : request.body.articuloid,
		cantidad : request.body.cantidad,
		maquinaestadoid : request.body.maquinaestadoid,
		precio : request.body.precio
	}
};

PedidoDetalleUtils.prototype.getParamsForUpdateAllFromRequest = function( request ) {
	return {
		fields : {
			pedidoid : request.body.pedidoid, 
	    	articuloid : request.body.articuloid,
	    	cantidad : request.body.cantidad,
	    	maquinaestadoid : request.body.maquinaestadoid,
	    	precio : request.body.precio
		},
		options : {
			where : { 
				pedidoid : request.body.pedidoid, 
				articuloid : request.body.articuloid
			}
		}
	}
};

PedidoDetalleUtils.prototype.getParamsForUpdatePartFromRequest = function( request ) {
	return { 
		where : {
			pedidoid : request.params.pedidoid
		}
	}
};

PedidoDetalleUtils.prototype.getParamsForDeleteByIdFromRequest = function( request ) {
	return { 
		where :	{ 
			pedidoid : request.params.pedidoid,
			articuloid : request.params.articuloid
		}
	}
};

var pedidoDetalleUtils = new PedidoDetalleUtils();

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