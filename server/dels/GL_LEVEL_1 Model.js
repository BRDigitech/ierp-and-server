module.exports = (sequelize, DataTypes) => {
    const GLLevel1 = sequelize.define('GLLevel1', {
        ACCODE_1: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true  // Set this as the primary key if it's unique
        },
        DESC_1: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'GL_LEVEL_1',
        timestamps: false
    });

    return GLLevel1;
};
