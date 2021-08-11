const knex = require('../db/connection')
const table = 'tables';

function list(){
    return knex(`${table}`)
    
}

module.exports = {
    list,

    }