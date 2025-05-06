module.exports = (sequelize, DataTypes) => {
    const Level4 = sequelize.define('Level4', {
        ACC_4: { type: DataTypes.STRING },
        DESC_44: { type: DataTypes.STRING },
        ACC3: { type: DataTypes.STRING },
        DEBIT: { type: DataTypes.FLOAT },
        CREDIT: { type: DataTypes.FLOAT },
    }, {
        tableName: 'GL_LEDGER',
        timestamps: false,
    });

    return Level4;
};
