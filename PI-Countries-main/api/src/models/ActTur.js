const { DataTypes, UUID, UUIDV1, INTEGER, STRING } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "actTur",
    {
      id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV1,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
        isIn: [["verano", "otoño", "invierno", "primavera"]],
      },
    },
    { timestamps: false }
  );
};
