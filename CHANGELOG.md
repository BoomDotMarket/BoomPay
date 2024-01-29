# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-01-29

### Changed

- Boom migrated from multi-currency wallets to one single Boomcoin (BMC) wallet per user.
- Payment Intents nolonger need a wallet and currency to collect the payments in.

### Added

- Wallet.getDefaultWallet() - returns the default BMC wallet generated from the Boom App (download [here](https://boom.market/dl)).

### Removed

- Wallet.createWallet() - Wallets are now generated from the Boom App only.
- Wallet.getWallet()
- 'walletAddress' and 'currency' properties from the PaymentIntentCreateOptions  interface.


## [1.0.0] - 2023-06-16

### Added

- Initial public release: BoomPay SDK now available! 🌐 [@aymenhamada](https://github.com/aymenhamada).
- Ability to create multiple wallets in the supported currencies.
- Ability to list wallets.
- Ability to create payment intents specifying a wallet to receive the payments in.
- Ability to get a payment intent including the status of the payment.
- Simple e-commerce example.

