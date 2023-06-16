const express = require("express")
const BoomPay = require('boompay-sdk');

const app = express()

// Initialize BoomPay with your API key
const boomPay = new BoomPay({
  apiKey: 'your-api-key',
});

// Endpoint to create a new payment intent for a product
app.post('/payment/:productId', async (req, res) => {
  const productId = req.params.productId

  const customerId = 'XXXX-XXXX'

  let wallet
  let payment
  try {
    // Create a new wallet
    wallet = await boomPay.wallets.createWallet({
      currency: 'EMTCN',
    });
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).send("Unvailable")
  }

  try {
    // Create a new payment intent
    payment = await boomPay.payments.createIntent({
      walletAddress: wallet.address,
      amount: 5,  // Adjust amount as needed
      currency: 'EMTCN',
      successUrl: 'https://your-success-url.com/success',  // Replace with actual success URL
      failureUrl: 'https://your-failure-url.com/success',  // Replace with actual failure URL
      metadata: {
        productId: productId,
        customerId: customerId
      },
      label: 'Payment Label',  // Replace with a suitable label for the payment
    });
  } catch (error) {
    console.log('Error creating payment:', error)
    res.status(500).send("Unvailable")
  }

  // Redirect to the payment URL
  return res.redirect(payment.link)
})

// Webhook endpoint for successful payments
app.get("/success", boomPay.webhooks(), async (req, res) => {
  const paymentIntentId = req.query.paymentIntentId

  try {
    // Retrieve the payment intent
    const payment = await boomPay.payments.getPayment(paymentIntentId)

    const productId = payment.metadata.productId
    const customerId = payment.metadata.customerId

    // TODO: Add your own logic here to handle successful payments
    // such as marking the product as paid or updating your database
    //

  } catch (error) {
    console.log('Error retrieving payment:', error)
    res.status(500).send("Unvailable")
  }
})

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
