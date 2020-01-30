const qtumjsWallet = require('qtumjs-wallet');

class cryptoWallet {

  constructor(){
    this.network = qtumjsWallet.networks.testnet;
    this.mnemonic = qtumjsWallet.generateMnemonic();
    this.bank = this.network.fromWIF('');
    this.wallet = this.network.fromWIF('');
  };

  // createNewWallet(){
  //   const newWallet = this.network.fromMnemonic(this.mnemonic);
  //   const privatekey = newWallet.toWIF();
  //   const publicaddress = newWallet.address;
  //   return newWallet;
  // }

  loadWallet(privatekey){
    const loadedWallet = this.network.fromWIF(privatekey);
    return loadedWallet;
  }

  // getInfo(){
  //   return this.wallet.getInfo();
  // }
  //
  // async getBankInfo() {
  //   const info = await this.bank.getInfo();
  //   console.log(info);
  // }

  async send() {
    const contractAddress = '';
    // ABI encoded data for the send-to-method transaction
    const encodedData = "";

    const tx = await this.wallet.contractSend(contractAddress, encodedData, {
      amount: 0.05 * 1e8,
    })
    console.log(tx);
    return tx;
  }

};

module.exports = cryptoWallet;


const x = new cryptoWallet;
x.send();
// const wallet = x.createNewWallet();
// x.send(wallet.address).catch((err) => console.log(err));
// x.getBankInfo().catch((err) => console.log(err));
