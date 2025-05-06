module.exports = (sequelize, DataTypes) => {
    const PurchaseSummary = sequelize.define('PurchaseSummary', {
        SEQ_NO: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        PURCHASE_DATE: {
            type: DataTypes.DATE,
            allowNull: false
        },
        NARRATION: {
            type: DataTypes.STRING,
            allowNull: true
        },
        CURRENCY: {
            type: DataTypes.STRING,
            allowNull: true
        },
        INVOICE_NO: {
            type: DataTypes.STRING,
            allowNull: true
        },
        INVOICE_DATE: {
            type: DataTypes.DATE,
            allowNull: true
        },
        UOM_CODE: {
            type: DataTypes.STRING,
            allowNull: true
        },
        UOM_DESC: {
            type: DataTypes.STRING,
            allowNull: true
        },
        VENDOR_CODE: {
            type: DataTypes.STRING,
            allowNull: true
        },
        AMOUNT: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        AMOUNT_FCY: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        TAX_AMOUNT_LCY: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        TAX_AMOUNT_FCY: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        tableName: 'INV_TRANS_PURCHASE_HEADER',
        timestamps: false
    });

    return PurchaseSummary;
};
