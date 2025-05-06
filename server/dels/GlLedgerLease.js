// models/GlLedgerLease.js
module.exports = (sequelize, DataTypes) => {
    const GlLedgerLease = sequelize.define('GlLedgerLease', {
        V_TYPE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        VOUCHNO: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true  // Set VOUCHNO as primary key
        },
        V_DATE: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ACCODE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SEQ_NO: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DEBIT: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        CREDIT: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        DETAILS: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DEBIT_FR: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        CREDIT_FR: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        STATUS: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NARRATION: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'GL_LEDGER_LEASE',
        timestamps: false
    });

    GlLedgerLease.associate = (models) => {
        GlLedgerLease.belongsTo(models.GlChart, {
            foreignKey: 'ACCODE',
            targetKey: 'ACCODE',
            as: 'Chart'  // Ensure this alias matches
        });
    };

    return GlLedgerLease;
};
