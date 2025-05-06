module.exports = (sequelize, DataTypes) => {
    const CuCustBank = sequelize.define('CuCustBank', {
        CUST_NO: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        BANK_NAME: {
            type: DataTypes.STRING
        },
        BRANCH_NAME: {
            type: DataTypes.STRING
        },
        ACCOUNT_NO: {
            type: DataTypes.STRING
        },
        ACCOUNT_TITLE: {
            type: DataTypes.STRING
        },
        UPDATE_BY: {
            type: DataTypes.STRING
        },
        UPDATE_DT: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'CU_CUST_BANK',
        timestamps: false
    });

    return CuCustBank;
};
