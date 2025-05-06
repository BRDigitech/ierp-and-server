module.exports = (sequelize, DataTypes) => {
    const VochMast = sequelize.define('VochMast', {
        SEQ_NO: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        V_TYPE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        VOUCHNO: {
            type: DataTypes.STRING,
            allowNull: false
        },
        V_DATE: {
            type: DataTypes.DATE,
            allowNull: false
        },
        CREAT_BY: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CREAT_DT: {
            type: DataTypes.DATE,
            allowNull: false
        },
        CANCEL_BY: {
            type: DataTypes.STRING,
            allowNull: true
        },
        CANCEL_DT: {
            type: DataTypes.DATE,
            allowNull: true
        },
        POSTED_BY: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NARRATION: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'GL_VOCH_MAST',
        timestamps: false
    });

    return VochMast;
};
