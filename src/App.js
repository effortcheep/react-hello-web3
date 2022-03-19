import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const contractAddress = ''
const contractABI = ''


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
      if (ethereum) {
        ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: account,
              to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
              value: '0x29a2241af62c0000',
              gasPrice: '0x09184e72a000',
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
            {` ${account.substring(0, 4)}...${account.substring(account.length - 4)}`}
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
