module.exports = (sequelize, DataTypes) => {
    const DisbursementContract = sequelize.define('DisbursementContract', {
        lease_no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LEASE_AMT: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: false
        },
        SEC_DPST_PC: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false
        },
        disb_Dt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        disbursement_type: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'LE_CONTRACT',
        timestamps: false
    });

    return DisbursementContract;
};
