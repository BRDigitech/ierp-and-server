module.exports = (sequelize, DataTypes) => {
    const GLLevel2 = sequelize.define('GLLevel2', {
      ACCODE_1: {
        type: DataTypes.STRING
      },
      ACCODE_2: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      DESC_2: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'GL_LEVEL_2',
      timestamps: false
    });
  
    GLLevel2.associate = models => {
      GLLevel2.belongsTo(models.GLLevel1, { foreignKey: 'ACCODE_1' });
    };
  
    return GLLevel2;
  };
  