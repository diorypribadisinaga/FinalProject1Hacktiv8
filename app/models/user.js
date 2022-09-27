module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },    
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'db_user'
    })
    return user;
}