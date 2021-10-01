const { DataTypes } = require("sequelize");
const { STRING, INTEGER , FLOAT} = DataTypes;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "countrie",
    {
      id: {
        type: STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      imgflat: {
        allowNull: false,
        type: STRING,
      },
      continent: {
        type: STRING,
        allowNull: false,
      },
      cap: {
        allowNull: false,
        type: STRING,
      },
      subRegion: {
        type: STRING,
      },
      area: {
        type: FLOAT,
      },
      poblation: {
        type: FLOAT,
      },
    },
    { timestamps: false }
  );
};
