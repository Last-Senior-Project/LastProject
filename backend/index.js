const express = require('express');
const cors =require('cors');
const port = 5000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());
const stripe = require('stripe')('sk_test_51N7gQfAZRX59Sn8GprnH5UDtFNhgbNNlzJS6sWZedMJUopy53pisrpM0SjA3nkv0JXK5ILn5MdHGjd6PJA6w5ENK00YYMvK6BU')

app.post('/payments/intents',async(req,res)=>{
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:'usd',
        automatic_payment_methods:{
            enabled:true
        }
    })
    res.json({paymentIntent:paymentIntent.client_secret})
    } catch (e) {
        res.json(e)
    }
    
    })



app.listen(port, ()=>{
console.log(`listening on ${port}`);
})