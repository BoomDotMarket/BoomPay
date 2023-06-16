# BoomPay SDK

BoomPay SDK is a powerful library allowing developers to interact seamlessly with the BoomPay API. The key features encompassed by this SDK include:

- Payment intent creation and retrieval
- Wallet creation and retrieval
- Convenient Webhook integration

The SDK is built to support both TypeScript and JavaScript.

## Installation

Use the following command to install the BoomPay SDK via npm:

```sh
npm install boompay-sdk
```

## Basic Usage

Start by importing the SDK and initializing it with your API key:

```javascript
const BoomPay = require('boompay-sdk');

const boomPay = new BoomPay({
  apiKey: 'your-api-key',
  sandbox: true, // Optional: Enable the sandbox mode for testing purposes.
});

// Rest of your code
```

## SDK Methods

### Create a Wallet

Create a new wallet specifying the currency:

```javascript
const wallet = await boomPay.wallets.createWallet({
  currency: 'EMTCN',
});

console.log(wallet);
```

### Create a Payment Intent

Create a new payment intent by specifying the wallet address, amount, currency, URLs for success and failure scenarios, additional metadata, and a label:

```javascript
const payment = await boomPay.payments.createIntent({
  walletAddress: wallet.address,
  amount: 5,
  currency: 'EMTCN',
  successUrl: 'https://your-success-url.com',
  failureUrl: 'https://your-failure-url.com',
  metadata: {
    anyKey: 'anyValue',
  },
  label: 'Payment Label',
});

console.log(payment);
```

### Retrieve a Payment

Retrieve details of a specific payment using its ID:

```javascript
const payment = await boomPay.payments.getPayment('payment-id');

console.log(payment);
```

### Retrieve a Wallet

Retrieve details of a specific wallet using its address:

```javascript
const wallet = await boomPay.wallets.getWallet('wallet-address');

console.log(wallet);
```

### Retrieve the Default Wallet

Retrieve details of the default wallet:

```javascript
const defaultWallet = await boomPay.wallets.getDefaultWallet();

console.log(defaultWallet);
```

## Webhooks

BoomPay SDK provides an Express middleware for webhook handling. In addition to delivering the data payload, each webhook event comes with a signature in the request header. This signature is essential for verifying the authenticity of the event.

```javascript
app.get('/webhook/success', boomPay.webhooks({
  apiKey: 'zHTRNaf6gaTE3YC2HI72PJjiyBtik1Q8',
}), (req, res) => {
  return res.status(200).send('OK');
});
```

The BoomPay SDK handles this verification process automatically when you use the provided `boomPay.webhooks()` function, ensuring the data received is indeed from BoomPay.

## Error Handling

Ensure you handle exceptions for each function as they would throw an Error if the request fails:

```javascript
try {
  const wallet = await boomPay.wallets.createWallet({
    currency: 'EMTCN',
  });
} catch (error) {
  console.error('Error creating wallet:', error);
}
```

## Sandbox Mode

The SDK offers a sandbox mode to aid testing. Enable it by setting the `sandbox` option to `true`:

```javascript
const boomPay = new BoomPay({
  apiKey: 'your-api-key',
  sandbox: true, // Enable sandbox mode
});
```

## Supported Currencies

The SDK supports the following currencies:

- EMTCN
- EUR
- USD
- GBP
- NGN
- INR
- XOF
- ZAR
- GHS
- THB
- IDR
- BRL
- MAD
- TRY
- ILS

You can specify the currency as a string when creating a wallet or a payment intent.

## TypeScript Support

TypeScript definitions for all types and interfaces are included. Simply import `BoomPay` from `boompay-sdk`:

```typescript
import BoomPay from 'boompay-sdk';
```

Use the SDK just as in the JavaScript examples.
