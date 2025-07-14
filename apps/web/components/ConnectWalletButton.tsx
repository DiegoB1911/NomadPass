"use client"

import { useEffect, useState } from "react"
import { isConnected, getAddress, setAllowed } from "@stellar/freighter-api"

export default function ConnectWalletButton() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const connectWallet = async () => {
    try {
      await setAllowed();
      const result = await getAddress()
      const pubKey = result.address
      setWalletAddress(pubKey)
      // onConnected(pubKey)
    } catch (error) {
      console.error("Error connecting to Freighter:", error)
    }
  }

  useEffect(() => {
    isConnected().then((connected) => {
      if (connected) {
        getAddress().then((result) => {
          const pubKey = result.address
          setWalletAddress(pubKey)
          // onConnected(pubKey)
        })
      }
    })
  }, [])

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
    </button>
  )
}
