const { DataTypes, UUID, UUIDV1 } = require("sequelize");
const { INTEGER, STRING}=DataTypes;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "ActTur",
    {
      id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV1,
      },
      name: {
        type: STRING,
        allowNull: false,
        unique:true
      },
      difficulty: {
        type: INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        type: INTEGER,
      },
      season: {
        type: STRING,
        validate: {
          isIn: [["verano", "otoño", "invierno", "primavera"]],
        },
      },
    },
    { timestamps: false }
  );
};
