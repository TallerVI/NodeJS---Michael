
/*
 * GET users listing.
 */

/**
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var maquinaestado		= sequelize.import("../models/maquinaestados");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	maquinaestado.findAll().then(function(maquinaestado){
		maquinaestado.forEach(function(item){
			item['dataValues'].estado = "/estado/" + item['dataValues'].estadoid;
			item['dataValues'].funcion = "/funcion/" + item['dataValues'].funcionid;
			delete item['dataValues'].estadoid;
			delete item['dataValues'].funcionid;
		});
		response.jsonp(maquinaestado);
	});
};
var findById 		= function(request, response){
	maquinaestado.findAll({
		where : {
			maquinaestadoid : request.params.maquinaestadoid
		}
	}).then(function(maquinaestado){
		maquinaestado.forEach(function(item){
			item['dataValues'].estado = "/estado/" + item['dataValues'].estadoid;
			item['dataValues'].funcion = "/funcion/" + item['dataValues'].funcionid;
			delete item['dataValues'].estadoid;
			delete item['dataValues'].funcionid;
		});
		response.jsonp(maquinaestado);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     maquinaestado.create({ 
		    	 funcionid : request.body.funcionid,
		    	 estadoid : request.body.estadoid
		     }, {transaction : transaction})
		]);
	}).then(function(maquinaestado){
		maquinaestado.forEach(function(item){
			item['dataValues'].estado = "/estado/" + item['dataValues'].estadoid;
			item['dataValues'].funcion = "/funcion/" + item['dataValues'].funcionid;
			delete item['dataValues'].estadoid;
			delete item['dataValues'].funcionid;
		});
		response.jsonp(maquinaestado);
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
		maquinaestado.destroy(
			{ where : { maquinaestadoid : request.params.maquinaestadoid }, transaction : transaction }
		).then(function( rowdeleted ){
			if(rowdeleted != request.params.maquinaestadoid ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el maquinaestado" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ maquinaestado : "/maquinaestado/" + request.params.maquinaestadoid }]);
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