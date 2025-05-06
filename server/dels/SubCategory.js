// models/SubCategory.js
module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define('SubCategory', {
        subCategoryCode: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        categoryCode: DataTypes.STRING,
        subCategoryName: DataTypes.STRING,
        subCategoryDetails: DataTypes.STRING,
        subCategoryArabic: DataTypes.STRING
    }, {
        tableName: 'INV_SETUP_SUB_CATEGORY',
        timestamps: false
    });

    SubCategory.associate = function(models) {
        // Association with Category
        SubCategory.belongsTo(models.Category, { foreignKey: 'categoryCode', targetKey: 'categoryCode' });
    };

    return SubCategory;
};
