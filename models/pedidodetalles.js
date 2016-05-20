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
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maquinaestadoid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'maquinaestados',
        key: 'maquinaestadoid'
      }
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'pedidodetalles',
    freezeTableName: true,
    timestamps: false
  });
};
