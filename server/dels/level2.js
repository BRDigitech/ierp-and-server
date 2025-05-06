module.exports = (sequelize, DataTypes) => {
    const Level2 = sequelize.define('Level2', {
        ACCODE_1: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true  // Set this as the primary key if it's unique

        },
        ACCODE_2: { type: DataTypes.STRING },
        DESC_2: { type: DataTypes.STRING },
     
    }, {
        tableName: 'GL_LEVEL_2',
        timestamps: false,
    });

    return Level2;
};
