const mysql = require('mysql2/promise');
(async ()=>{
  const user = process.argv[2] || 'slatt_user';
  const pass = process.argv[3] || 'slatt_pass';
  const conn = await mysql.createConnection({host:'localhost', user, password: pass, database: 'slatt_fashion'});
  try{
    const [u] = await conn.query('SELECT COUNT(*) as c FROM users');
    const [p] = await conn.query('SELECT COUNT(*) as c FROM products');
    console.log('users:', u[0].c);
    console.log('products:', p[0].c);
    await conn.end();
  }catch(e){
    console.error(e.message);
    process.exit(1);
  }
})();