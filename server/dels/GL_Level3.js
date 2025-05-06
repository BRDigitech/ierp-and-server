module.exports = (sequelize, DataTypes) => {
    const GL_Level_3 = sequelize.define('GL_Level_3', {
        ACCODE_1: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true  // Set this as the primary key if it's unique

        },
        ACCODE_2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ACCODE_3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DESC_3: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'GL_LEVEL_3',
        timestamps: false
    });

    return GL_Level_3;
};
