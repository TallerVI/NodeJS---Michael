
/*
 * GET users listing.
 */

/**
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var funcion		= sequelize.import("../models/funciones");
var host			= require ("./host");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	var h = host.getHost(request, response);
	funcion.findAll().then(function(funciones){
		funciones.forEach(function(funcion){
			funcion['dataValues'].maquinaestado = h + "/funcion/" + funcion['dataValues'].funcionid + '/maquinaestado';
		});
		response.jsonp(funciones);
	});
};
var findById 		= function(request, response){
	var h = host.getHost(request, response);
	funcion.findAll({
		where : {
			funcionid : request.params.funcionid
		}
	}).then(function(funciones){
		funciones.forEach(function(funcion){
			funcion['dataValues'].maquinaestado = h + "/funcion/" + funcion['dataValues'].funcionid + '/maquinaestado';
		});
		response.jsonp(funciones);
	});
};
var create 			= function(request, response){
	var h = host.getHost(request, response);
	sequelize.transaction(function(transaction){
		return Promise.all([
		     funcion.create({ 
		    	 descripcion : request.body.descripcion
		     }, {transaction : transaction})
		]);
	}).then(function(funciones){
		funciones.forEach(function(funcion){
			funcion['dataValues'].maquinaestado = h + "/funcion/" + funcion['dataValues'].funcionid + '/maquinaestado';
		});
		response.jsonp(funciones);
	}).catch(function(error){
		response.jsonp({response : error});
	});
};
var updateAll 		= function(request, response){
	var h = host.getHost(request, response);
	sequelize.transaction(
	).then(function(transaction){
		funcion.update(
			{ descripcion : request.body.descripcion },
			{ where : { funcionid : request.body.funcionid } }, 
			{ transaction : transaction }
		).then(function( rowUpdated ){
			if(rowUpdated.pop() == 0){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido actualizar la funcion" });
			} else {
				transaction.commit();
				funcion.findById(request.body.funcionid).then(function(funcion){
					funcion['dataValues'].maquinaestado = h + "/funcion/" + funcion['dataValues'].funcionid + '/maquinaestado';
					response.status(200).jsonp(funcion);
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
		funcion.destroy(
			{ where : { funcionid : request.params.funcionid }, transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el funcion" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ funcion : h + "/funcion/" + request.params.funcionid }]);
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