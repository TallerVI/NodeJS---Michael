/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedidodetalles', {
    pedidoid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pedidos',
        key: 'pedidosid'
      }
    },
    articuloid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'articulos',
        key: 'articuloid'
      }
    },
    maquinaestadoid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'maquinaestados',
        key: 'maquinaestadoid'
      }
    }
  }, {
    tableName: 'pedidodetalles',
    freezeTableName: true,
    timestamps: false
  });
};
