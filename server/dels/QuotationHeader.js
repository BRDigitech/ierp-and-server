// models/QuotationHeader.js
module.exports = (sequelize, DataTypes) => {
    const QuotationHeader = sequelize.define('QuotationHeader', {
        quotationId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        quotationDate: DataTypes.DATE,
        warehouseCode: DataTypes.STRING,
        customerId: DataTypes.STRING
    }, {
        tableName: 'INV_TRANS_QUOTATION_HEADER',
        timestamps: false
    });

    QuotationHeader.associate = function(models) {
        QuotationHeader.belongsTo(models.Customer, { foreignKey: 'customerId', targetKey: 'cust_no' });
        QuotationHeader.belongsTo(models.Warehouse, { foreignKey: 'warehouseCode', targetKey: 'warehouseCode' });
    };

    return QuotationHeader;
};
