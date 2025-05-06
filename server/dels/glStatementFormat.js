module.exports = (sequelize, DataTypes) => {
    const GlStatementFormat = sequelize.define('GlStatementFormat', {
        seqno: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descrip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state_type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'gl_statements_format',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['seqno', 'descrip']
            }
        ]
    });

    return GlStatementFormat;
};
