module.exports = (sequelize, DataTypes) => {
    const GLLedger = sequelize.define('GLLedger', {
        ACCODE: {
            type: DataTypes.STRING,
            primaryKey: true,
            field: 'ACCODE'
        },
        DEBIT: {
            type: DataTypes.DECIMAL,
            field: 'DEBIT'
        },
        CREDIT: {
            type: DataTypes.DECIMAL,
            field: 'CREDIT'
        },
        
        // CREDIT_FR: {
        //     type: DataTypes.DECIMAL,
        //     field: 'CREDIT_FR'
        // },
        V_DATE: {
            type: DataTypes.DATE,
            field: 'V_DATE'
        }
    }, {
        tableName: 'GL_LEDGER',
        timestamps: false
    });

    return GLLedger;
};
