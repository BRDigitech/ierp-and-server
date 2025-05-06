module.exports = (sequelize, DataTypes) => {
    const SaleHeader = sequelize.define('SaleHeader', {
      saleId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      saleDate: DataTypes.DATE,
      doId: DataTypes.STRING,
    }, {
      tableName: 'INV_TRANS_SALE_HEADER',
      timestamps: false,
    });
  
    SaleHeader.associate = function(models) {
      SaleHeader.hasMany(models.SaleLine, { foreignKey: 'saleId' });
    };
  
    return SaleHeader;
  };
  