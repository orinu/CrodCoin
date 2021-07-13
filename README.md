# CrodCoin-Ethereum    React - NextJS - Solidity

## Summary
The react app simulates Kickstarts on the blockchain. The app deploys contracts that allow users to create and deploy contract in order to raise money for their projects/products.
Money that was contributed to a project is stored in the campaign-contract on the blockchain.

### Raising money

Every user can watch active contracts that are deployed to the blockchain, and contribute money to them. After the money is transferred, the user is registered
on the contract as contributor and becomes a part of the community that can approve or disapprove money transactions from the contract.


### Transfer money

In order to send money from a contract, the creator of the project needs to send a request to the contract and specify the description, amount and the recipient of the transfer. 
The contributors can approve the request. If more than half of the contributors approve the transfer, the creator can finalize the request and transfer the money to the approver recipient.
