const reservationsSeed = require("../seed-data/01-reservations.json")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reservations').del()
    .then(function () {
      // Inserts seed entries
      return knex('reservations').insert(reservationsSeed);
    });
};
