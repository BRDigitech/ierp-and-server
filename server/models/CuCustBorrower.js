module.exports = (sequelize, DataTypes) => {
    const CuCustBorrower = sequelize.define('CuCustBorrower', {
        CUST_NO: { type: DataTypes.STRING, primaryKey: true },
        BNAME: { type: DataTypes.STRING },
        ONIC: { type: DataTypes.STRING },
        NCNIN: { type: DataTypes.STRING },
        RELATION: { type: DataTypes.STRING },
        ADDRESS: { type: DataTypes.STRING }
    }, {
        tableName: 'CU_CUST_BORROWER',
        timestamps: false
    });

    return CuCustBorrower;
};
