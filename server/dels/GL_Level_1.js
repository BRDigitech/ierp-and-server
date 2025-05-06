module.exports = (sequelize, DataTypes) => {
    const GL_Level_1 = sequelize.define('GL_Level_1', {
        ACCODE_1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DESC_1: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'GL_LEVEL_1',
        timestamps: false,
        primaryKey: false // Explicitly state that there is no primary key
    });

    return GL_Level_1;
};
