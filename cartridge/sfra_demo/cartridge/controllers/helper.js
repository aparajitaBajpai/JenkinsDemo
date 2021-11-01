
function trying(elem){
    dw.system.Logger.error("working trying"+elem);
}

function createNewUser(email,password,name){
    var Transaction = require('dw/system/Transaction');
    var CustomerMgr = require('dw/customer/CustomerMgr');
    try {
        Transaction.wrap(function () {
            var newuser = CustomerMgr.createCustomer(email, password);
            newuser.getProfile().setEmail(email);
            newuser.getProfile().setFirstName(name[0]);
            newuser.getProfile().setLastName(name[1]);
        });
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    trying: trying,
    createNewUser:createNewUser
};