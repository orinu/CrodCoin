import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // In browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else {
  // on the server or user not using metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/7251b34a4b0644e98765f35a78178112"
  );
  web3 = new Web3(provider);
}

export default web3;
