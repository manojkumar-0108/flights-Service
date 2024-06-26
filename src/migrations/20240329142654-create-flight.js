'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airplanes',
          key: 'id',
          name: 'FK_Flights_airplaneId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      departureAirportId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airports',
          key: 'id',
          name: 'FK_Flights_departureAirportId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      arrivalAirportId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airports',
          key: 'id',
          name: 'FK_Flights_arrivalAirportId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      totalSeats: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};