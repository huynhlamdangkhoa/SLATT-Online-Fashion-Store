const b = require('bcryptjs');
(async ()=>{
  try{
    const admin = b.hashSync('admin123',10);
    const user = b.hashSync('user123',10);
    console.log('ADMIN|'+admin);
    console.log('USER|'+user);
  }catch(e){
    console.error(e);
    process.exit(1);
  }
})();