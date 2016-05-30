
/*
 * GET users listing.
 */

/**
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var maquinaestado		= sequelize.import("../models/maquinaestados");
var host			= require ("./host");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	var h = host.getHost(request, response);
	maquinaestado.findAll().then(function(maquinaestado){
		maquinaestado.forEach(function(item){
			item['dataValues'].estado = h + "/estado/" + item['dataValues'].estadoid;
			item['dataValues'].funcion = h + "/funcion/" + item['dataValues'].funcionid;
			delete item['dataValues'].estadoid;
			delete item['dataValues'].funcionid;
		});
		response.jsonp(maquinaestado);
	});
};
var findById 		= function(request, response){
	var h = host.getHost(request, response);
	maquinaestado.findAll({
		where : {
			maquinaestadoid : request.params.maquinaestadoid
		}
	}).then(function(maquinaestado){
		maquinaestado.forEach(function(item){
			item['dataValues'].estado = h + "/estado/" + item['dataValues'].estadoid;
			item['dataValues'].funcion = h + "/funcion/" + item['dataValues'].funcionid;
			delete item['dataValues'].estadoid;
			delete item['dataValues'].funcionid;
		});
		response.jsonp(maquinaestado);
	});
};
var create 			= function(request, response){
	var h = host.getHost(request, response);
	sequelize.transaction(function(transaction){
		return Promise.all([
		     maquinaestado.create({ 
		    	 funcionid : request.body.funcionid,
		    	 estadoid : request.body.estadoid
		     }, {transaction : transaction})
		]);
	}).then(function(maquinaestado){
		maquinaestado.forEach(function(item){
			item['dataValues'].estado = h + "/estado/" + item['dataValues'].estadoid;
			item['dataValues'].funcion = h + "/funcion/" + item['dataValues'].funcionid;
			delete item['dataValues'].estadoid;
			delete item['dataValues'].funcionid;
		});
		response.jsonp(maquinaestado);
	}).catch(function(error){
		response.jsonp({response : error});
	});
};
var updateAll 		= function(request, response){
	var h = host.getHost(request, response);
	sequelize.transaction(
	).then(function(transaction){
		maquinaestado.update(
			{ 
				funcionid : request.body.funcionid,
				estadoid : request.body.estadoid
			},
			{ where : { maquinaestadoid : request.body.maquinaestadoid } }, 
			{ transaction : transaction }
		).then(function( rowUpdated ){
			if(rowUpdated.pop() == 0){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido actualizar maquinaestado" });
			} else {
				transaction.commit();
				maquinaestado.findById(request.body.maquinaestadoid).then(function(maquinaestado){
					maquinaestado['dataValues'].estado = h + "/estado/" + maquinaestado['dataValues'].estadoid;
					maquinaestado['dataValues'].funcion = h + "/funcion/" + maquinaestado['dataValues'].funcionid;
					delete maquinaestado['dataValues'].estadoid;
					delete maquinaestado['dataValues'].funcionid;
					response.status(200).jsonp(maquinaestado);
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
		maquinaestado.destroy(
			{ where : { maquinaestadoid : request.params.maquinaestadoid }, transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el maquinaestado" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ maquinaestado : h + "/maquinaestado/" + request.params.maquinaestadoid }]);
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};
var findByFuncion	= function(request, response){
	var h = host.getHost(request, response);
	maquinaestado.findAll({
		where : {
			funcionid : request.params.funcionid
		}
	}).then(function(maquinaestado){
		maquinaestado.forEach(function(item){
			item['dataValues'].estado = h + "/estado/" + item['dataValues'].estadoid;
			item['dataValues'].funcion = h + "/funcion/" + item['dataValues'].funcionid;
			delete item['dataValues'].estadoid;
			delete item['dataValues'].funcionid;
		});
		response.jsonp(maquinaestado);
	});
};

var findByEstado	= function(request, response){
	var h = host.getHost(request, response);
	maquinaestado.findAll({
		where : {
			estadoid : request.params.estadoid
		}
	}).then(function(maquinaestado){
		maquinaestado.forEach(function(item){
			item['dataValues'].estado = h + "/estado/" + item['dataValues'].estadoid;
			item['dataValues'].funcion = h + "/funcion/" + item['dataValues'].funcionid;
			delete item['dataValues'].estadoid;
			delete item['dataValues'].funcionid;
		});
		response.jsonp(maquinaestado);
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
exports.findByFuncion 	= findByFuncion;
exports.findByEstado 	= findByEstado;