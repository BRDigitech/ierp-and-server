module.exports = (sequelize, DataTypes) => {
    const CuEmployeeInfo = sequelize.define('CuEmployeeInfo', {
        CUST_NO: { type: DataTypes.STRING, primaryKey: true },
        EMPLOYER_NAME: { type: DataTypes.STRING },
        EMPLOYER_TYPE: { type: DataTypes.STRING },
        EMPLOYER_STATUS: { type: DataTypes.STRING },
        DESIGNATION: { type: DataTypes.STRING },
        EMPLOYED_SINCE: { type: DataTypes.DATE },
        OFF_ADDRESS: { type: DataTypes.STRING },
        PHONE_NO: { type: DataTypes.STRING },
        GROSS_SALARY: { type: DataTypes.STRING },
        DEDUCTION: { type: DataTypes.STRING },
        SALARY_MODE: { type: DataTypes.STRING },
        UPDATE_BY: { type: DataTypes.STRING },
        UPDATE_DT: { type: DataTypes.DATE }
    }, {
        tableName: 'CU_EMPLOYEE_INFO',
        timestamps: false
    });

    return CuEmployeeInfo;
};
