
// GL_CHART Model
module.exports = (sequelize, DataTypes) => {
    const GL_Chart = sequelize.define('GL_Chart', {
        ACCODE: {
            type: DataTypes.STRING,
            primaryKey: true,
            field: 'ACCODE'
        },
        NAME: {
            type: DataTypes.STRING,
            field: 'NAME'
        }
    }, {
        tableName: 'GL_CHART',
        timestamps: false
    });

    return GL_Chart;
};