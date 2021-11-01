var server = require("server");
var helper = require("~/cartridge/controllers/helper")
server.get("loginuser", function (req, res, next) {

    dw.system.Logger.error("working --> " + req.querystring);
    var Transaction = require('dw/system/Transaction');
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var name = req.querystring.name.split(" ");
    
    var result = helper.createNewUser(req.querystring.email,req.querystring.password, name);

    var accountHelpers = require('*/cartridge/scripts/helpers/accountHelpers');
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var hooksHelper = require('*/cartridge/scripts/helpers/hooks');
    var customerLoginResult = accountHelpers.loginCustomer(req.querystring.email, req.querystring.password, false);

    if (customerLoginResult.error) {
        if (customerLoginResult.status === 'ERROR_CUSTOMER_LOCKED') {
            var context = {
                customer: CustomerMgr.getCustomerByLogin(email) || null
            };

            var emailObj = {
                to: email,
                subject: Resource.msg('subject.account.locked.email', 'login', null),
                from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com',
                type: emailHelpers.emailTypes.accountLocked
            };

            hooksHelper('app.customer.email', 'sendEmail', [emailObj, 'account/accountLockedEmail', context], function () { });
        }

        res.json({
            error: [customerLoginResult.errorMessage || Resource.msg('error.message.login.form', 'login', null)],
            status: false
        });

        return next();
    }

    if (customerLoginResult.authenticatedCustomer) {
        res.setViewData({ authenticatedCustomer: customerLoginResult.authenticatedCustomer });
        res.json({
            success: true,
            status: true,
            redirectUrl: accountHelpers.getLoginRedirectURL(req.querystring.rurl, req.session.privacyCache, false)
        });

        req.session.privacyCache.set('args', null);
    } else {
        res.json({ error: [Resource.msg('error.message.login.form', 'login', null)],
                    status: false });
    }

    return next();

});

server.get("checkuser",function(req,res,next){
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var result = CustomerMgr.getCustomerByLogin(req.querystring.email);
    res.json({status : result});
    return next();
});

module.exports = server.exports();