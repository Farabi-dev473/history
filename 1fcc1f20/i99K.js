const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const user = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expert: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export default user