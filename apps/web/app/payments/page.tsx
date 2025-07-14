"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Copy,
  QrCode,
  Eye,
  EyeOff,
  Clock,
  Share2,
  AlertCircle,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Transaction {
  id: string
  date: string
  sender: string
  amount: number
  type: "Aid" | "Salary" | "Donation" | "Remittance"
  status: "completed" | "pending"
}

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [walletAddress] = useState("GCKFBEIYTKP67PVLOHJPEQSVUQIEMQXVTCNWWQXLZQBQAAAAAAAAAAAA")
  const [balance] = useState(1247.5) // USDC balance
  const [copySuccess, setCopySuccess] = useState(false)

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2024-01-15",
      sender: "GDHJ...KFLA",
      amount: 500.0,
      type: "Aid",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-01-14",
      sender: "GBCD...MNOP",
      amount: 150.0,
      type: "Salary",
      status: "completed",
    },
    {
      id: "3",
      date: "2024-01-13",
      sender: "GEFG...QRST",
      amount: 75.0,
      type: "Donation",
      status: "completed",
    },
    {
      id: "4",
      date: "2024-01-12",
      sender: "GHIJ...UVWX",
      amount: 200.0,
      type: "Remittance",
      status: "pending",
    },
    {
      id: "5",
      date: "2024-01-11",
      sender: "GKLM...YZAB",
      amount: 300.0,
      type: "Aid",
      status: "completed",
    },
  ])

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Aid":
        return "bg-blue-100 text-blue-800"
      case "Salary":
        return "bg-green-100 text-green-800"
      case "Donation":
        return "bg-purple-100 text-purple-800"
      case "Remittance":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Receive Payments or Aid</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Verified users can receive funds directly into their NomadPass wallet for salaries, donations, or financial
            aid. Share your wallet address with employers, NGOs, or family members to receive payments instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Wallet Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-6 h-6" />
                    <span className="text-lg font-medium">Current Balance</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white hover:bg-white/20"
                  >
                    {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-white/80 text-sm">Available Funds</p>
                  <p className="text-4xl font-bold">{showBalance ? `$${balance.toFixed(2)} USDC` : "••••••"}</p>
                  <p className="text-white/80 text-sm">Ready to use or withdraw</p>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Address Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share2 className="w-5 h-5 mr-2" />
                  Your Payment Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">Public Wallet Address</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={walletAddress} readOnly className="font-mono text-sm bg-gray-50" />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyAddress}
                      className={copySuccess ? "bg-green-50 border-green-200" : ""}
                    >
                      {copySuccess ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  {copySuccess && <p className="text-sm text-green-600 mt-1">Address copied to clipboard!</p>}
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Share this wallet address</strong> to receive payments from NGOs, employers, or other
                    sources. Anyone can send USDC or other supported currencies to this address.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <QrCode className="w-4 h-4 mr-2" />
                    Show QR Code
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Address
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <ArrowDownLeft className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-medium text-gray-900">Payment Received</p>
                            <Badge className={getTypeColor(tx.type)}>{tx.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">From: {tx.sender}</p>
                          <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600 text-lg">+${tx.amount.toFixed(2)}</p>
                        <Badge variant={tx.status === "completed" ? "default" : "secondary"}>{tx.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Withdraw Section */}
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-8 text-center">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cash Out Your Funds</h3>
                <p className="text-gray-600 mb-4">
                  Convert your digital funds to local currency through our partner network.
                </p>
                <Button variant="outline" disabled className="bg-transparent">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Withdraw Funds (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Received</span>
                  <span className="font-semibold text-green-600">+$1,225.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Transactions</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Payment</span>
                  <span className="font-semibold">$102.08</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Humanitarian Aid</span>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Work Payments</span>
                  </div>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Family Support</span>
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
              </CardContent>
            </Card>

            {/* How to Receive Payments */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-900">How to Receive Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-green-800">
                <div className="flex items-start space-x-2">
                  <span className="font-semibold">1.</span>
                  <span>Share your wallet address with the sender</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold">2.</span>
                  <span>They send USDC or other supported currencies</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold">3.</span>
                  <span>Funds appear in your wallet instantly</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold">4.</span>
                  <span>Use funds or withdraw to local currency</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Security Tip</h4>
                <p className="text-sm text-blue-800">
                  Your wallet address is safe to share publicly. Never share your private keys or recovery phrase with
                  anyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
