'use strict';

const authors = [
  {
    first_name: 'Fedor',
    patronymic: 'Mikhailovich',
    last_name: 'Dostoevsky',
  },
  {
    first_name: 'Alexandr',
    patronymic: 'Sergeevich',
    last_name: 'Pushkin',
  },
];

const books = [
  {
    name: 'Prestupleniye i Nakazaniye',
    price: 499,
    author: 'Fedor Mikhailovich Dostoevsky',
  },
  {
    name: 'Kapitanskaya dochka',
    price: 649,
    author: 'Alexandr Sergeevich Pushkin',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    for (const author of authors) {
      await queryInterface.sequelize.query({
        query: `
        INSERT INTO authors (first_name, patronymic, last_name)
        VALUES (?, ?, ?)
      `,
        values: [author.first_name, author.patronymic, author.last_name],
      });
    }

    for (const book of books) {
      await queryInterface.sequelize.query({
        query: `
            INSERT INTO books (name, price, author_uuid)
            SELECT ?, ?, uuid
            FROM authors
            WHERE CONCAT(first_name, ' ', patronymic, ' ', last_name) LIKE ?
        `,
        values: [book.name, book.price, `%${book.author}%`],
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('books', null, {});
    await queryInterface.bulkDelete('authors', null, {});
  },
};
