module.exports = (sequelize, DataTypes) => {
    const GL_Ledger = sequelize.define('GL_Ledger', {
        ACCODE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DEBIT: {
            type: DataTypes.FLOAT
        },
        CREDIT: {
            type: DataTypes.FLOAT
        },
        V_DATE: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'GL_LEDGER',
        timestamps: false,
        primaryKey: false // Explicitly state that there is no primary key
    });

    return GL_Ledger;
};
