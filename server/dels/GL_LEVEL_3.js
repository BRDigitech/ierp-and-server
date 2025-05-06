module.exports = (sequelize, DataTypes) => {
    const GLLevel3 = sequelize.define('GLLevel3', {
      ACCODE_1: {
        type: DataTypes.STRING
      },
      ACCODE_2: {
        type: DataTypes.STRING
      },
      ACCODE_3: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      DESC_3: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'GL_LEVEL_3',
      timestamps: false
    });
  
    GLLevel3.associate = models => {
      GLLevel3.belongsTo(models.GLLevel2, { foreignKey: 'ACCODE_2' });
    };
  
    return GLLevel3;
  };
  