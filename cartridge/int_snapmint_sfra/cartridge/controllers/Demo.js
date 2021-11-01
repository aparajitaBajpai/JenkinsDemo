var server = require('server');

server.get('Start',(req,res,next)=>{
    res.render('demo',{price: 2000});
    next();
});

module.exports = server.exports();