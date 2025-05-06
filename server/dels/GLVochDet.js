module.exports = (sequelize, DataTypes) => {
    const GLVochDet = sequelize.define('GLVochDet', {
        SEQ_NO: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ACCODE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DEBIT: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        CREDIT: {
            type: DataTypes.FLOAT,
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

    return GLVochDet;
};
