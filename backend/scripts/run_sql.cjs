const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function run(filePath, user, password) {
  const sql = fs.readFileSync(filePath, 'utf8');
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: user || process.env.MYSQL_USER || 'root',
    password: password || process.env.MYSQL_PASSWORD || '',
    multipleStatements: true,
  });
  try {
    const [results] = await conn.query(sql);
    console.log('Executed', filePath);
    await conn.end();
  } catch (e) {
    console.error('Error executing', filePath, e.message);
    process.exit(1);
  }
}

const arg = process.argv[2];
if(!arg){
  console.error('Usage: node run_sql.cjs <relative-path-to-sql>');
  process.exit(1);
}
const userArg = process.argv[3];
const passArg = process.argv[4];
run(path.resolve(arg), userArg, passArg);
