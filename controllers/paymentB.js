var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "dvm5nr83wd9pdq64",
  publicKey: "n787tpsj27cqb3jj",
  privateKey: "ade81cb8e3ad4a5b32fa05afac6fd7c2"
});


exports.getToken = (req, res)=>{
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.send(response)
        }
      });
}

exports.processPayment = (req, res) =>{
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount 
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err)
          {
              res.status(500).json(err)
          }
          else{
              res.json(result)
          }
      });
}