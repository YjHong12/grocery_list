const { Client } = require('pg')

// Establishes connection to database
const grocerylist = 'grocerylist'
const client = new Client(`postgres://localhost:5432/${grocerylist}`)

module.exports = client