module.exports = (sequelize, DataTypes) => {
    const VochDet = sequelize.define('VochDet', {
        SEQ_NO: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ACCODE: {
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
        DETAILS: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'GL_VOCH_DET',
        timestamps: false
    });

    return VochDet;
};
