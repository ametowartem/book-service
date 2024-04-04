'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS users(
            uuid uuid DEFAULT gen_random_uuid() primary key, 
            first_name varchar(255) not null, 
            last_name varchar(255) not null, 
            patronymic varchar(255)
        )
      `,
    );

    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS books(
            uuid uuid DEFAULT gen_random_uuid() primary key, 
            name varchar(255) not null,
            author_uuid uuid not null,
            price DECIMAL(15, 2)
        )
      `,
    );

    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS authors(
            uuid uuid DEFAULT gen_random_uuid() primary key, 
            first_name varchar(255) not null, 
            last_name varchar(255) not null, 
            patronymic varchar(255)
        )
      `,
    );

    await queryInterface.sequelize.query(
      `
            ALTER TABLE books 
            ADD FOREIGN KEY (author_uuid) REFERENCES authors(uuid)
      `,
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('books');
    await queryInterface.dropTable('authors');
  },
};
