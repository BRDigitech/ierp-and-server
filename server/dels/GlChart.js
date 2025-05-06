// models/GlChart.js
module.exports = (sequelize, DataTypes) => {
    const GlChart = sequelize.define('GlChart', {
        // Model attributes
        ACCODE: {
            type: DataTypes.STRING,
            primaryKey: true
        },

        // Other attributes
    }, {
        tableName: 'GL_CHART',
        timestamps: false
    });


// models/GlChart.js
GlChart.associate = (models) => {
    GlChart.hasMany(models.GlLedgerLease, {
        foreignKey: 'ACCODE',
        as: 'LedgerLeases'  // Ensure this alias matches
    });
};

    return GlChart;
};
