const knex = require('../db/connection')
const table = 'reservations';

function list(date){
    return knex(`${table}`)
    .where('reservation_date', date)
    .orderBy('reservation_time', 'asc')
}

function create(reservation){
    return knex(`${table}`)
    .insert(reservation)
    .returning('*')
    .then((reservation) => reservation[0]);
}

module.exports = {
list,
create
}