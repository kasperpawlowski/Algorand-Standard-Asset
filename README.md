# Algorand-Standard-Asset

The following repository is an example application that creates Algorand wallet, creates Algorand Standard Asset (ASA) and displays given address balances.

## Prerequisites
Algorand Sandbox up and running in `testnet` mode. [Instruction](https://github.com/algorand/sandbox)


## How to run
1. Clone github repository and install dependencies
```
git clone https://github.com/kasperpawlowski/Algorand-Standard-Asset.git
cd Algorand-Standard-Asset
npm install
```
2. Open webpack configuration file (`./node_modules/react-scripts/config/webpack.config.js`) and add the following in the `resolve` section:
```
    fallback:  { 
        "crypto": false,
        "stream": false
    },
```
This step is only necessary in case of Webpack 5 related build errors.
3. Run the app
```
npm start
```
4. Go to [http://localhost:3000/](http://localhost:3000/)


## How to use
1. Click on `Create Wallet` to create a new wallet. Copy the address and mnemonic if you want to restore the wallet later, otherwise it will be forgotten.
2. Go to the faucet to fund wallet with test ALGO tokens
3. When balance > 0 detected, you can crate new Algorand Standard Assets
4. Go to `Explore` tab to view the balances