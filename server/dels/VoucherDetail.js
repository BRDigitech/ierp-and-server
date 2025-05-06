module.exports = (sequelize, DataTypes) => {
    const VoucherDetail = sequelize.define('VoucherDetail', {
      SEQ_NO: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      ACCODE: {
        type: DataTypes.STRING,
        allowNull: false
      },
      DEBIT: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
      },
      CREDIT: {
        type: DataTypes.DECIMAL(15, 2),
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
  
    VoucherDetail.associate = models => {
      VoucherDetail.belongsTo(models.VoucherMaster, {
        foreignKey: 'SEQ_NO',
        targetKey: 'SEQ_NO'
      });
    };
  
    return VoucherDetail;
  };
  