const knex = require('../db/connection')
const tableName = 'reservations';

function list(date){
    return knex(tableName)
    .where('reservation_date', date)
    .orderBy('reservation_time', 'asc')
}

function create(reservation){
    return knex(tableName)
    .insert(reservation)
    .returning('*')
    .then((reservation) => reservation[0]);
}

function update(reservation_id, status) {
    return knex(tableName)
      .where({ reservation_id })
      .update("status", status)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
}

function findByDateAndTime(reservation_date, reservation_time) {
    return knex(tableName).select("*").where({reservation_date}).where({reservation_time}).whereNot({"status": "finished"})
}

async function read(reservation_id) {
    return knex(tableName).select("*").where({"reservation_id": reservation_id}).first();
}

function search(mobile_phone) {
    return knex(tableName)
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_phone.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
}

module.exports = {
    list,
    create,
    findByDateAndTime,
    update,
    read,
    search
}