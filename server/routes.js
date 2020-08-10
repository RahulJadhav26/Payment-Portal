const express = require("express")
const router = express.Router()
const checksumLib =  require('./Paytm/checksum/checksum')
const dev = require('./config/Paytmdev')
const sdev = require('./config/StripeDev')
const { v4: uuidv4 } = require('uuid');



//Variables Declared
const stripe = require('stripe')(sdev.skey);
var amount = 0
var email = ''
var name = ''
//This POST endpoint is for Stripe Payment Portal
router.post('/pay',async (req,res)=>{
    name = req.body.name
    email = req.body.email
    amount = req.body.amount
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'Inr',
            unit_amount: amount*100,
            product_data: {
                name: name,
              }
          },
          quantity: 1,
        }],
        customer_email: email ,
        mode: 'payment',
        success_url: 'http://localhost:8080/pay',
        cancel_url: 'http://localhost:8080/cancel',
      });
    
    res.send({
        message:`Hello ${req.body.name} !!. Your payment request of ${req.body.amount} has been generated !`,
        sessionId:session.id
    })
})
   
//This POST endpoint is for Paytm Payment portal
router.post('/paytmpay', async(req,res)=>{
    
    let params = {}
    params['MID'] = dev.mid, //Test Merchant ID
    params["WEBSITE"] = 'WEBSTAGING',
    params["CHANNEL_ID"] = 'WEB',
    params["INDUSTRY_TYPE_ID"] = 'Retail'
    params['ORDER_ID'] = 'ORDER_ID'+ uuidv4(),
    params['CUST_ID'] = 'CUST_ID'+ uuidv4() ,
    params['TXN_AMOUNT'] = req.body.amount.toString(),
    params['CALLBACK_URL'] = 'http://localhost:8080/pay',
    params['EMAIL'] = req.body.email,
    params['MOBILE_NO'] = req.body.phone.toString()
                                  //test Merchant Key
    await checksumLib.genchecksum(params,dev.mkey, (err,checksum)=>{
            params['CHECKSUMHASH'] = checksum
            console.log(params)
            res.send(params)
    })
})


router.get('/success',(req,res)=>{
        res.send('Success')
    })
    
router.get('/failed',(req,res)=>{
        res.send('Failed')
    })

module.exports = router
