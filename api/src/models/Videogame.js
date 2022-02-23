const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// let incre =  (parseInt(Date.now() - (Date.now()/2)).toString();
// incre = incre.slice(incre.length/2,incre.length)

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    idGame: {
      type: DataTypes.STRING,
      primaryKey: true, 
      set(value){
        //console.log((incre + value.split(' ')[0]));
        this.setDataValue('idGame', (value.split(' ')[0] + Date.now()));
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageURL: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      allowNull : false
    },
    released: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.FLOAT
    },
    plataform: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  },{
    timestamps: true, 
    createdAt: false,
    updatedAt: false
  });
};
