const knex = require('../db/connection')
const table = 'reservations';

function list(){
    return knex(`${table}`)
    .select('*')
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