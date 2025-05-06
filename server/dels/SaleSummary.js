module.exports = (sequelize, DataTypes) => {
    const SaleSummary = sequelize.define('SaleSummary', {
        VENDOR_SEQ_NO: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        SEQ_NO: DataTypes.STRING,
        V_DATE: DataTypes.DATE,
        CCY: DataTypes.STRING,
        RATE: DataTypes.FLOAT,
        INVOICE_NO: DataTypes.STRING,
        NARRATION: DataTypes.STRING,
        INVOICE_DATE: DataTypes.DATE,
        LEASENO: DataTypes.STRING,
        UOM_CODE: DataTypes.STRING,
        UOM_DESC: DataTypes.STRING,
        AMOUNT: DataTypes.FLOAT,
        AMOUNT_FCY: DataTypes.FLOAT,
        TAX_AMOUNT_LCY: DataTypes.FLOAT,
        TAX_AMOUNT_FCY: DataTypes.FLOAT
    }, {
        tableName: 'INV_TRANS_SALE_HEADER',
        timestamps: false,
    });

    return SaleSummary;
};
