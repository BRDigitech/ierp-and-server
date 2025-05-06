module.exports = (sequelize, DataTypes) => {
    const PurchaseDetailReport = sequelize.define('PurchaseDetailReport', {
      SEQ_NO: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      V_DATE: {
        type: DataTypes.DATE,
        allowNull: false
      },
      NARRATION: {
        type: DataTypes.STRING,
        allowNull: true
      },
      CURRENCY: {
        type: DataTypes.STRING,
        allowNull: false
      },
      RATE: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      INVOICE_NO: {
        type: DataTypes.STRING,
        allowNull: false
      },
      INVOICE_DATE: {
        type: DataTypes.DATE,
        allowNull: false
      },
      VENDOR_CODE: {
        type: DataTypes.STRING,
        allowNull: false
      },
      MEASUREMENT: {
        type: DataTypes.STRING,
        allowNull: false
      },
      AMOUNT: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      AMOUNT_FCY: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      VAT_PER: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      TAX_AMOUNT_LCY: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      TAX_AMOUNT_FCY: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      UNIT: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      QTY: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      tableName: 'PurchaseDetailReport', // The table name in the database
      timestamps: false
    });
  
    return PurchaseDetailReport;
  };
  