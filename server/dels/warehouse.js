// models/Warehouse.js
module.exports = (sequelize, DataTypes) => {
    const Warehouse = sequelize.define('Warehouse', {
        warehouseCode: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        warehouseName: DataTypes.STRING
    }, {
        tableName: 'INV_SETUP_WAREHOUSE',
        timestamps: false
    });

    return Warehouse;
};
