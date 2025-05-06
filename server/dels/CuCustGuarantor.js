module.exports = (sequelize, DataTypes) => {
    const CuCustGuarantor = sequelize.define('CuCustGuarantor', {
        CUST_NO: { type: DataTypes.STRING, primaryKey: true },
        GUARANTOR_NAME: { type: DataTypes.STRING },
        GUARANTOR_NIC: { type: DataTypes.STRING },
        GUARANTOR_PH_NO: { type: DataTypes.STRING },
        GUARANTOR_NTN: { type: DataTypes.STRING },
        GUARANTOR_ADDRESS: { type: DataTypes.STRING },
        UPDATE_BY: { type: DataTypes.STRING },
        UPDATE_DT: { type: DataTypes.DATE }
    }, {
        tableName: 'CU_CUST_GUARANTOR',
        timestamps: false
    });

    return CuCustGuarantor;
};
