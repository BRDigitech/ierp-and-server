module.exports = (sequelize, DataTypes) => {
    const CuCustomer1 = sequelize.define('CuCustomer1', {
        // Define attributes here
        CUST_NO: { type: DataTypes.STRING, primaryKey: true },
        F_H_NAME: { type: DataTypes.STRING },
        NAME: { type: DataTypes.STRING, allowNull: false },
        TITLE: { type: DataTypes.STRING },
        CUST_OLD: { type: DataTypes.STRING },
        MAIL_ADDRESS: { type: DataTypes.STRING },
        ADD_S: { type: DataTypes.STRING },
        ADD_M: { type: DataTypes.STRING },
        ADD_C: { type: DataTypes.STRING },
        ADD_P: { type: DataTypes.STRING },
        NIC_NO: { type: DataTypes.STRING },
        NIC_N: { type: DataTypes.STRING },
        N_TAX_NO: { type: DataTypes.STRING },
        REG_ADDRESS: { type: DataTypes.STRING },
        COUNTRY_CD: { type: DataTypes.STRING },
        TEL_NO: { type: DataTypes.STRING },
        FAX_NO: { type: DataTypes.STRING },
        EMAIL: { type: DataTypes.STRING },
        MOBILE_NO: { type: DataTypes.STRING },
        ORG_TYPE: { type: DataTypes.STRING },
        NATIONALITY: { type: DataTypes.STRING },
        PASSPORT_NO: { type: DataTypes.STRING },
        DATE_OF_BIRTH: { type: DataTypes.DATE },
        ACC_OPEN_DATE: { type: DataTypes.DATE },
        RESIDENT: { type: DataTypes.STRING },
        INTRODUCED_BY: { type: DataTypes.STRING },
        BRANCH_CD: { type: DataTypes.STRING },
        CLIENT_TYPE_CODE: { type: DataTypes.STRING },
        PUB_PVT: { type: DataTypes.STRING },
        RES_NON: { type: DataTypes.STRING },
        PS_CODE: { type: DataTypes.STRING },
        IND_SEC: { type: DataTypes.STRING },
        BOROWER_CODE: { type: DataTypes.STRING },
        GENDER: { type: DataTypes.STRING },
        MARITAL_STATUS: { type: DataTypes.STRING },
        EDUCATION: { type: DataTypes.STRING },
        MOTHER_NAME: { type: DataTypes.STRING },
        RESIDENT_TYPE: { type: DataTypes.STRING },
        NO_OF_DEPENDENT: { type: DataTypes.INTEGER },
        OCCUPATION: { type: DataTypes.STRING },
        ENT_BY: { type: DataTypes.STRING }, 
        ENT_DT: { type: DataTypes.DATE }
    }, {
        tableName: 'CU_CUSTOMER',
        timestamps: false
    });

    return CuCustomer1;
};
