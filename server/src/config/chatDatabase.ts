import { Sequelize } from "sequelize";

const db = new Sequelize('connectify', '', '', {
    storage: './connectify.sqlite',
    dialect: 'sqlite',
    logging: false
})

export default db;