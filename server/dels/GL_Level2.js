module.exports = (sequelize, DataTypes) => {
    const GL_Level_2 = sequelize.define('GL_Level_2', {
        ACCODE_1: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true  // Set this as the primary key if it's unique

        },
        ACCODE_2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DESC_2: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'GL_LEVEL_2',
        timestamps: false
    });

    return GL_Level_2;
};
