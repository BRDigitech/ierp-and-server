module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'ierp',
    password: process.env.DB_PASSWORD || 'ierp',
    database: process.env.DB_NAME || 'ierp.com.sa',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'oracle'
  }
}
