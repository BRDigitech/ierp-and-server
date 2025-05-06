module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        cust_no: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        ENT_dT: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'CU_CUSTOMER',
        timestamps: false
    });

    return Customer;
};
