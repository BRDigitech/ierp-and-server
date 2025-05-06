
module.exports = (sequelize, DataTypes) => {
    const CuCustBusiness = sequelize.define('CuCustBusiness', {
        CUST_NO: { type: DataTypes.STRING, primaryKey: true },
        BUISNESS_NAME: { type: DataTypes.STRING },
        ORG_TYPE: { type: DataTypes.STRING },
        BUSTYPE: { type: DataTypes.STRING },
        IND_SEC: { type: DataTypes.STRING },
        ADDRESS: { type: DataTypes.STRING },
        PHONE_NO: { type: DataTypes.STRING },
        SHARE_PC: { type: DataTypes.STRING }
    }, {
        tableName: 'CU_CUST_BUSINESS',
        timestamps: false
    });

    return CuCustBusiness;
};
