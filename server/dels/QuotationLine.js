module.exports = (sequelize, DataTypes) => {
    const QuotationLine = sequelize.define('QuotationLine', {
      quotationId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      categoryCode: DataTypes.STRING,
      subCategoryCode: DataTypes.STRING,
      subSubCategoryCode: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      amount: DataTypes.FLOAT,
    }, {
      tableName: 'INV_TRANS_QUOTATION_LINES',
      timestamps: false,
    });
  
    QuotationLine.associate = function(models) {
      QuotationLine.belongsTo(models.Category, { foreignKey: 'categoryCode' });
      QuotationLine.belongsTo(models.SubCategory, { foreignKey: 'subCategoryCode' });
      QuotationLine.belongsTo(models.SubSubCategory, { foreignKey: 'subSubCategoryCode' });
    };
  
    return QuotationLine;
  };
  