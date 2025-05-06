module.exports = (sequelize, DataTypes) => {
    const LeContract = sequelize.define('LeContract', {
      cust_no: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      enter_by: DataTypes.STRING

      // Add other fields as needed
    }, {
      tableName: 'LE_CONTRACT',
      timestamps: false
    });
  
    LeContract.associate = function(models) {
      LeContract.belongsTo(models.CuCustomer, { foreignKey: 'cust_no' });
    };
  
    return LeContract;
  };
  