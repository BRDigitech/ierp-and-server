module.exports = (sequelize, DataTypes) => {
    const Level3 = sequelize.define('Level3', {
        ACCODE_1: { type: DataTypes.STRING 
            , primaryKey: true  // Set this as the primary key if it's unique

        },
        ACCODE_2: { type: DataTypes.STRING },
        ACCODE_3: { type: DataTypes.STRING },
        DESC_3: { type: DataTypes.STRING },
     
    }, {
        tableName: 'GL_LEVEL_3',
        timestamps: false,
    });

    return Level3;
};
