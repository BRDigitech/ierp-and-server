module.exports = (sequelize, DataTypes) => {
    const CuCustomer = sequelize.define('CuCustomer', {
        CUST_NO: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        NAME: {
            type: DataTypes.STRING,
            allowNull: false
        },
        F_H_NAME: {
            type: DataTypes.STRING
        },
        TEL_NO: {
            type: DataTypes.STRING
        },
        FAX_NO: {
            type: DataTypes.STRING
        },
        EMAIL: {
            type: DataTypes.STRING
        },
        MOBILE_NO: {
            type: DataTypes.STRING
        },
        NIC_NO: {
            type: DataTypes.STRING
        },
        NIC_N: {
            type: DataTypes.STRING
        },
        INTRODUCED_BY: {
            type: DataTypes.STRING
        },
        ACC_OPEN_DATE: {
            type: DataTypes.DATE
        },
        CUST_OLD: {
            type: DataTypes.STRING
        },
        CLIENT_TYPE_CODE: {
            type: DataTypes.STRING
        },
        DEACTIVE: {
            type: DataTypes.STRING
        },
        ENT_BY: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'CU_CUSTOMER',
        timestamps: false
    });

    return CuCustomer;
};
