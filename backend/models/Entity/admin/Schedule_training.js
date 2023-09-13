module.exports = (sequelize, DataTypes) => {
    const Training = sequelize.define('admin_training', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        training_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trainer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        skill_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startdate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        enddate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        no_of_seats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        initial_seats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isdelete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
            
    },{
        timestamps: false, 
    });

    return Training;
}
