module.exports = (sequelize, DataTypes) => {
    const GLLevel4 = sequelize.define('GLLevel4', {
      ACCODE_1: {
        type: DataTypes.STRING
      },
      ACCODE_2: {
        type: DataTypes.STRING
      },
      ACCODE_3: {
        type: DataTypes.STRING
      },
      ACCODE_4: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      DESC_4: {
        type: DataTypes.STRING
      },
      OLD_ACCODE: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'GL_LEVEL_4',
      timestamps: false
    });
  
    GLLevel4.associate = models => {
      GLLevel4.belongsTo(models.GLLevel3, { foreignKey: 'ACCODE_3' });
    };
  
    return GLLevel4;
  };
  