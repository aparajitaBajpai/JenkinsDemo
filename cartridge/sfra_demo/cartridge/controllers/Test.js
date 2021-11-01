var server = require('server');

var test3 = require("*/cartridge/scripts/middleware/Test3")

server.get('start',test3.hello,test3.bye,function(req,res,next){
    dw.system.Logger.error("working");
    res.render("test",{t1:"hii"});
    next();
});

module.exports = server.exports();


