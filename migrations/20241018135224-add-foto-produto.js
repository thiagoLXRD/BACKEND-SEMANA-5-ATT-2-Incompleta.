'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Produto', 'foto', {
    type: Sequelize.STRING
  })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Produto', 'foto')
  }
  };
   
