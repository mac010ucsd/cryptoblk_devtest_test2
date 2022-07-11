# Level 2

A NodeJS server that does a transaction on the BNB Testnet, issuing tokens from
the DSTT contract to a specific address. The user will send a request via
a POST request with a JSON payload

## Dependencies

The package *ethers* should be installed, if it is not then run the following
```npm install ethers```

## Usage

Configure the contract address, provider, and server port in the file ```config.json```

Use the script by running the command ```node test2.js``` in the current
directory.

The post request shall be structured as 

```
{
    "mnemonic" : <12 word mnemonic, string>,
    "to_address" : <destination wallet address, string>,
    "value": <value of transaction in DSTT, int>
}
```
