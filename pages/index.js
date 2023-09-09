import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { formatEther } from "viem/utils";
import { useAccount, useBalance, useContractRead } from "wagmi";
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import { ConnectKitButton } from "connectkit";
import coffee from '../public/istockphoto-1175851148-612x612.jpg'

import {abi, contractAddress} from '../utils'
import { etherUnits } from 'viem';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  // const { address, isConnected } = useAccount();
  const [name, setName] = useState('')
  const [message, setMessage] = useState('');
  const [tx, setTx] = useState()
  const [txSuccess, setTxSuccess] = useState(false)

  async function buyCoffee() {
    try {
        const tx = await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: "buyCoffee",
        args: [name, message],
        value: 1000000000000000
      });
      await waitForTransaction(tx)
      setTxSuccess(true)
      setTx(tx)
    } catch (e) {
      console.log(e)
    }
  }

console.log(tx)

  return (
    <div>
      <div className='nav-wrapper'>
      <div className='nav'>
      <img id='logo' src={coffee.src}/>
      <p style={{fontFamily:'Montserrat', fontWeight:'600'}}>Buy me a coffee!</p>
     <ConnectKitButton/>
     </div>
     </div>
     <div className='submission-form'>
     
            <form id='form'>
              <div className='items-wrapper'>
              <div>
                <label>
                  Name
                </label>
                <br/>
                
                <input
                  id="name"
                  className='page-label'
                  type="text"
                  placeholder="anon"
                  onChange={e => setName(e.target.value)}
                  value={name}
                  />
              </div>
              <br/>
              <div>
                <label>
                  Send me a message
                </label>
                <br/>

                <textarea
                className='page-label'
                  rows={3}
                  placeholder="Enjoy your coffee!"
                  id="message"
                  onChange={e => setMessage(e.target.value)}
                  required
                  value={message}
                >
                </textarea>
              </div>
              <div>
                <button
                  type="button"
                  onClick={buyCoffee}
                  id='buy-button'
                >
                  Send 1 Coffee for 0.001ETH
                </button>
                
              </div>
                    {txSuccess && (
              <div id='tx-success'>
                Success! View your transaction <a target='_blank' href={`https://sepolia.etherscan.io/tx/${tx.hash}`}>here</a>
              </div>
            )}
              </div>
            </form>
            </div>

      
            <div className='footer'>
.
            </div>
    </div>
  )
}
