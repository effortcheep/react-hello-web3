import { useState, useEffect } from 'react'
// import { ethers } from 'ethers'

// const contractAddress = ''
// const contractABI = ''


function App() {
  const [account, setAccount] = useState(null)

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        console.log('metamask is available')
      }else {
        console.log('place install metamask')
        return
      }
      const accounts = await ethereum.request({
        method: "eth_accounts"
      })
      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log(`found accoutn with address`, account)
        setAccount(account)
      }else {
        console.log(`no authorized account found`)
      }
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const hi = async () => {
    try {
      const { ethereum } = window
      // const transactionParameters = {
      //   nonce: '0x00', // ignored by MetaMask
      //   gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
      //   gas: '0x2710', // customizable by user during MetaMask confirmation.
      //   to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
      //   from: ethereum.selectedAddress, // must match user's active address.
      //   value: '0x00', // Only required to send ether to the recipient from the initiating external account.
      //   data:
      //     '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
      //   chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      // };
      if (ethereum) {
        ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: account,
              to: '0x2c7cdb3712ba96327250c61f46c9332857e0fe59',
              value: '0x11c37937e08000',
              // gasPrice: '0x4c4b400',
              gasPrice: '0x12a05f200',
              gas: '0x2710',
            },
          ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
        // const provider = new ethers.providers.Web3Provider(ethereum)
        // const singer = provider.getSigner()
        // const CounterContract = new ethers.Contract(
        //   contractAddress, contractABI, singer
        // )

        // const tx = await CounterContract.add()
        // await tx.wait()
        //
      }
    }catch(err) {
      console.error(err)
    }
  }

  const  connectWallet = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        console.log('metamask is available')
      }else {
        console.log('place install metamask')
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      })
      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log(`found accoutn with address`, account)
        setAccount(account)
      }else {
        console.log(`no authorized account found`)
      }
    } catch(err) {
      console.error(err)
    }
  }
  return (
    <div className="w-full min-h-screen bg-blue-900 flex flex-col justify-center items-center">
      <h1 className="text-8xl font-bold text-white text-shadow text-center">Hello, web3</h1>

      {!account ? (
        <button className="rounded-full py-6 px-12 text-3xl mt-16 text-white bg-purple-700 hover:scale-105 hover:bg-purple-600 transition" onClick={connectWallet}>
          授权登录
        </button>
      ) : (
        <>
          {/* <h1 className="text-8xl font-bold text-white text-shadow text-center">Count: {count}</h1> */}
          <h3 className='text-3xl text-center text-white text-hold mt-12'>
            Logged id as
            <strong>
            {` ${account.substring(0, 6)}...${account.substring(account.length - 6)}`}
            </strong>
          </h3>

          <button className="rounded-full py-6 px-12 text-3xl mt-16 text-white bg-purple-700 hover:scale-105 hover:bg-purple-600 transition" onClick={hi}>
            交易
          </button>
        </>
      )}
    </div>
  )
}

export default App
