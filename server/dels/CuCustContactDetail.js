module.exports = (sequelize, DataTypes) => {
    const CuCustContactDetail = sequelize.define('CuCustContactDetail', {
        CUST_NO: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        CONTACT_PERSON: {
            type: DataTypes.STRING
        },
        TEL_NO: {
            type: DataTypes.STRING
        },
        FAX_NO: {
            type: DataTypes.STRING
        },
        EMAIL_ADD: {
            type: DataTypes.STRING
        },
        MOBILE_NO: {
            type: DataTypes.STRING
        },
        UPDATE_BY: {
            type: DataTypes.STRING
        },
        UPDATE_DT: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'CU_CUST_CONTACT_DETAIL',
        timestamps: false
    });

    return CuCustContactDetail;
};
