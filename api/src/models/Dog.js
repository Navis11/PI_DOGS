const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    heightMin:{
      type: DataTypes.STRING(5),
      allowNull: false
    },

    heightMax:{
      type: DataTypes.STRING(5),
      allowNull: false
    },

    weightMin:{
      type: DataTypes.STRING(5),
      allowNull: false
    },

    weightMax:{
      type: DataTypes.STRING(5),
      allowNull: false
    },

    breeds: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    lifeSpan:{
      type: DataTypes.STRING(50),
      allowNull: true
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: false
  }
  )
};
