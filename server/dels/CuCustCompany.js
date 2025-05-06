module.exports = (sequelize, DataTypes) => {
    const CuCustCompany = sequelize.define('CuCustCompany', {
        CUST_NO: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        COMPANY: {
            type: DataTypes.STRING
        },
        SIS_CONC_ADD: {
            type: DataTypes.STRING
        },
        SIS_CONC_BRWR_CODE: {
            type: DataTypes.STRING
        },
        UPDATE_BY: {
            type: DataTypes.STRING
        },
        UPDATE_DT: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'CU_CUST_COMPANY',
        timestamps: false
    });

    return CuCustCompany;
};
