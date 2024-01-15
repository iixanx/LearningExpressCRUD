const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(("Write"), {
        writeId: {
            type: DataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
        },
        user: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        head: {
            type: DataTypes.STRING(),
            allowNull: false,
            defaultValue: '...' // 아무거나 쓰세요
        },
        body: {
            type: DataTypes.STRING(),
            allowNull: false,
            defaultValue: '...'
        }
    })
}