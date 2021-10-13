const main = async () => {

  const waveContractFactory = await hre.ethers.getContractFactory('MyWavePortal');
  const waveContract = await waveContractFactory.deploy({
    // go and deploy my contract and fund it with 0.1 ETH"
    // it will remove ethereum of 0.1 from wallet and
    // to fund the contract
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await waveContract.deployed();
  console.log('Contract addy:', waveContract.address);

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  //  to test out to see if my contract actually has a balance of 0.1. 
  // I use a function that ethers gives me here called getBalance and 
  // pass it my contract's address!
  console.log('Contract Balance : ', 
    hre.ethers.utils.formatEther(contractBalance));


  /**
   * Let's send a few waves!
   */
  let waveTxn = await waveContract.wave('A message!');
  await waveTxn.wait();  // Wait for the transaction to be mined

  // const waveTxn = await waveContract.wave('This is wave #1');
  // await waveTxn.wait(); // Wait for the transaction to be mined

  // const waveTxn2 = await waveContract.wave('This is wave #2');
  // await waveTxn2.wait(); // Wait for the transaction to be mined
  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log('Contract Balance : ', 
    hre.ethers.utils.formatEther(contractBalance));


  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
