'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      { name: 'Грейпфрут', price: 48.9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Манго', price: 44.99, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Аджика «Верес» «Кавказька» гостра', price: 17.99, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Крупа гречана «Ситий двір» ядриця', price: 44.99, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Виноград білий без кісточки', price: 159.9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Батат', price: 109.9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Буряк «Грінвіль» по-корейськи', price: 23.99, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Капуста «Грінвіль» пелюстки по-корейськи', price: 4.99, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Авокадо Ready to eat', price: 69.99, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Кеш\'ю смажений', price: 149.0, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Мигдаль «Премія»® ядра смажені', price: 69.99, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Фісташки Almond в лушпинні смажені', price: 119.00, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
