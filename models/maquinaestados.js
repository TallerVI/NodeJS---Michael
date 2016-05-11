/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('maquinaestados', {
    maquinaestadoid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    funcionid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'funciones',
        key: 'funcionid'
      }
    },
    estadoid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'estados',
        key: 'estadoid'
      }
    },
    fechacreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW
    }
  }, {
    tableName: 'maquinaestados',
    freezeTableName: true,
    timestamps: false
  });
};
