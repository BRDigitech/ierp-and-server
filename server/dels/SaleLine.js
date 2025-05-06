module.exports = (sequelize, DataTypes) => {
    const SaleLine = sequelize.define('SaleLine', {
      saleId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      categoryCode: DataTypes.STRING,
      subCategoryCode: DataTypes.STRING,
      subSubCategoryCode: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      amount: DataTypes.FLOAT,
    }, {
      tableName: 'INV_TRANS_SALE_LINES',
      timestamps: false,
    });
  
    return SaleLine;
  };
  