const sql = require('mssql');

const config = {
    server: 'localhost\\SQLEXPRESS',
    database: 'tickets_db',
    user: 'jolapa',
    password: 'jose123',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function conectarDB() {
  try {
    let pool = await sql.connect(config);
    console.log('Conexión exitosa a SQL Server por Windows Auth');
    return pool;
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err);
    throw err;
  }
}

module.exports = { sql, conectarDB };