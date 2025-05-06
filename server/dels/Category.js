// models/Category.js
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        categoryCode: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        categoryName: DataTypes.STRING
    }, {
        tableName: 'INV_SETUP_CATEGORY',
        timestamps: false
    });

    return Category;
};
