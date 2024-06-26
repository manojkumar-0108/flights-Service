'use strict';



const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane, {
        as: "AirplaneDetails",
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      this.belongsTo(models.Airport, {
        as: 'DepartureAirport',
        foreignKey: 'departureAirportId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      this.belongsTo(models.Airport, {
        as: 'ArrivalAirport',
        foreignKey: 'arrivalAirportId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }

  }
  Flight.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    boardingGate: {
      type: DataTypes.STRING
    },
    totalSeats: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: async (flight, options) => {
        //trigger 
        const { AirplaneService } = require('../services');

        const airplane = await AirplaneService.getAirplane(flight.airplaneId);

        flight.totalSeats = airplane.dataValues.capacity;

      }
    },
    sequelize,
    modelName: 'Flight',
  });

  return Flight;
};