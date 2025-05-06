module.exports = (sequelize, DataTypes) => {
    const CuCustDirectors = sequelize.define('CuCustDirectors', {
        CUST_NO: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        OWNER_NAME: {
            type: DataTypes.STRING
        },
        FATHERS_NAME: {
            type: DataTypes.STRING
        },
        DESIGNATION: {
            type: DataTypes.STRING
        },
        SHARE_PC: {
            type: DataTypes.FLOAT
        },
        NATIONALITY: {
            type: DataTypes.STRING
        },
        NIC_NO: {
            type: DataTypes.STRING
        },
        PASSPORT_NO: {
            type: DataTypes.STRING
        },
        STATUS: {
            type: DataTypes.STRING
        },
        PG_HELD: {
            type: DataTypes.STRING
        },
        NET_WORTH: {
            type: DataTypes.FLOAT
        },
        ADD_RES: {
            type: DataTypes.STRING
        },
        TEL_NO: {
            type: DataTypes.STRING
        },
        N_TAX_NO: {
            type: DataTypes.STRING
        },
        DATEIN: {
            type: DataTypes.DATE
        },
        DATEOUT: {
            type: DataTypes.DATE
        },
        GRNTR: {
            type: DataTypes.STRING
        },
        GFATHER: {
            type: DataTypes.STRING
        },
        GNIC: {
            type: DataTypes.STRING
        },
        GRTNADD: {
            type: DataTypes.STRING
        },
        ASSETS: {
            type: DataTypes.FLOAT
        },
        LIAB: {
            type: DataTypes.FLOAT
        },
        UNFEXP: {
            type: DataTypes.FLOAT
        },
        DTYPE: {
            type: DataTypes.STRING
        },
        TNOM: {
            type: DataTypes.FLOAT
        },
        NNOM: {
            type: DataTypes.FLOAT
        },
        NICNEW: {
            type: DataTypes.STRING
        },
        CUST_OLD: {
            type: DataTypes.STRING
        },
        UPDATE_BY: {
            type: DataTypes.STRING
        },
        UPDATE_DT: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'CU_CUST_DIRECTORS',
        timestamps: false
    });

    return CuCustDirectors;
};
