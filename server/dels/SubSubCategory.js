// models/SubSubCategory.js
module.exports = (sequelize, DataTypes) => {
    const SubSubCategory = sequelize.define('SubSubCategory', {
        subSubCategoryCode: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        subCategoryCode: DataTypes.STRING,
        subSubCategoryName: DataTypes.STRING,
        subSubCategoryDesc: DataTypes.STRING,
        subSubCategoryArabic: DataTypes.STRING
    }, {
        tableName: 'INV_SETUP_SUB_SUB_CATEGORY',
        timestamps: false
    });

    SubSubCategory.associate = function(models) {
        // Association with SubCategory
        SubSubCategory.belongsTo(models.SubCategory, { foreignKey: 'subCategoryCode', targetKey: 'subCategoryCode' });
    };

    return SubSubCategory;
};
