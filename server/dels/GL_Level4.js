// Model definition
module.exports = (sequelize, DataTypes) => {
    const GL_Level_4 = sequelize.define('GL_Level_4', {
        ACC_4: { // Corrected column name
            type: DataTypes.STRING, // Adjust the type if needed
            allowNull: false
        },
        DESC_44: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ACC3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DEBIT: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        CREDIT: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        DEBIT_NAS: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        CREDIT_NAS: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    }, {
        tableName: 'GL_LEVEL_4',
        timestamps: false
    });

    return GL_Level_4;
};
