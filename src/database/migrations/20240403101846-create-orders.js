'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS orders(
            uuid uuid DEFAULT gen_random_uuid() primary key,
            user_uuid uuid not null,
            price DECIMAL(10, 2)
        ) 
      `,
    );

    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS orders_books(
            uuid uuid DEFAULT gen_random_uuid() primary key,
            book_uuid uuid not null,
            order_uuid uuid not null
        ) 
      `,
    );

    await queryInterface.sequelize.query(
      `
            ALTER TABLE orders_books
            ADD FOREIGN KEY (book_uuid) REFERENCES books(uuid)
      `,
    );

    await queryInterface.sequelize.query(
      `
            ALTER TABLE orders_books
            ADD FOREIGN KEY (order_uuid) REFERENCES orders(uuid)
      `,
    );

    await queryInterface.sequelize.query(
      `
            ALTER TABLE orders
            ADD FOREIGN KEY (user_uuid) REFERENCES users(uuid)
      `,
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('orders_books');
    await queryInterface.dropTable('orders');
  },
};
