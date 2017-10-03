const Sequelize = require('sequelize');
const {INTEGER, STRING, TEXT, VIRTUAL, ARRAY} = Sequelize;

const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

module.exports = {db};
