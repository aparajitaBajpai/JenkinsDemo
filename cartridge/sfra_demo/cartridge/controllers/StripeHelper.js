

function handle(totalAmount) {
    // $.ajax({
    //     type: "post",
    //     url: "https://api.stripe.com/v1/payment_intents",
    //     async: true,
    //     headers: { "authorization": "Bearer sk_test_51JZVy4SAFgEvVMHXHjLNVGAcVhu8VjiK66KNo12L0XPHqtQPaYN1L9D8PBL9l6EF9xL19u5bZtOHXVnNrA24Ralz00oVobjeWR" },
    //     data: {
    //         amount: totalAmount * 100,
    //         currency: "usd",
    //         description: "for testing purpose"
    //     },
    //     success: function (response) {
    //         console.log(response);
    //         return response;
    //     },
    //     error: function (error) {
    //         return {error: true};
    //     }
    // });

    try {
    var data = "amount=" + totalAmount * 100 + "&currency=USD&description=ZYAMPAYMENT";
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
    var service = LocalServiceRegistry.createService("int_stripe_intent", {
        createRequest: function (svc, param) {
            svc.setRequestMethod("POST");
            svc.addHeader("authorization", "Bearer sk_test_51JZVy4SAFgEvVMHXHjLNVGAcVhu8VjiK66KNo12L0XPHqtQPaYN1L9D8PBL9l6EF9xL19u5bZtOHXVnNrA24Ralz00oVobjeWR");
            return param;
        },
        parseResponse: function (svc, result) {
            dw.system.Logger.error("res-->" + JSON.stringify(result));
            return result;
        },
        filterLogMessage: function (msg) {
            return 'PaymentProfile | ' + msg;
        }
    });

    //dw.system.Logger.error(JSON.stringify(param).replace(/\"/g,""));
    var data1 = service.call(data);
    dw.system.Logger.error("--->"+JSON.stringify(data1));

    var responseObj = JSON.parse(data1.object.text);
    dw.system.Logger.error('Complete payment result' + data1.object.text);


    return { response: responseObj, error: false };
    } catch (e) {
        return { msg: "worked", error: true };
    }


    // dw.system.Logger.error("worked");
    // fetch('https://api.stripe.com/v1/payment_intents', {
    //     method: 'POST',
    //     body: {amount: 100}, // string or object
    //     headers: {
    //     'authorization': 'Bearer sk_test_51JZVy4SAFgEvVMHXHjLNVGAcVhu8VjiK66KNo12L0XPHqtQPaYN1L9D8PBL9l6EF9xL19u5bZtOHXVnNrA24Ralz00oVobjeWR'
    //     }
    // }).then(function(response){
    //         dw.system.Logger.error("response");
    // }).catch(function(error){
    //         dw.system.Logger.error("error occured");
    // });

    //   return {error: true};
}

function finalHandle(){
    return {error: false};
}

exports.handle = handle;
exports.finalHandle = finalHandle;

