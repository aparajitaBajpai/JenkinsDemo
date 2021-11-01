
function hello(req, res, next) {
    dw.system.Logger.error("working---->1");
    dw.system.Logger.error("working---->2");
    next();
    dw.system.Logger.error("working---->3");
    dw.system.Logger.error("working---->4");
    dw.system.Logger.error("working---->5");
}

function bye(req, res, next) {
    dw.system.Logger.error("working---->6");
    dw.system.Logger.error("working---->7");
    dw.system.Logger.error("working---->8");
    next();
    dw.system.Logger.error("working---->9");
    dw.system.Logger.error("working---->10");
}

module.exports = {hello : hello, bye: bye};