var server = require('server');
var x = require("*/cartridge/controllers/Test");
server.extend(x);
server.prepend('start',function(req,res,next){
    var x = res.getViewData();
    res.setViewData({t1: "hello Deepanshu"});
    res.render("test");
    next();
});

module.exports = server.exports();