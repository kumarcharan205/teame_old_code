// const { USER } = require("..");
// const user_table = require("../user/user_table");

module.exports = (sequelize, DataTypes) => {
    const Training = sequelize.define('registered_users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        training_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
           
    },
    {
        timestamps: false, 
    });


    return Training;
}
