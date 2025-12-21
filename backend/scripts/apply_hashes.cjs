const fs = require('fs');
const path = require('path');
const b = require('bcryptjs');

const seedPath = path.join(__dirname, '..', 'db', 'seed.sql');
let sql = fs.readFileSync(seedPath, 'utf8');
const adminHash = b.hashSync('admin123',10);
const userHash = b.hashSync('user123',10);
sql = sql.replace(/__BCRYPT_ADMIN__/g, adminHash);
sql = sql.replace(/__BCRYPT_USER__/g, userHash);
fs.writeFileSync(seedPath, sql, 'utf8');
console.log('Replaced placeholders in', seedPath);
console.log('ADMIN_HASH|'+adminHash);
console.log('USER_HASH|'+userHash);
