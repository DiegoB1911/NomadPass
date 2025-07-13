"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, ArrowDownLeft, ArrowUpRight, Copy, QrCode, Eye, EyeOff, TrendingUp, Clock } from "lucide-react"

interface Transaction {
  id: string
  type: "received" | "sent"
  amount: number
  currency: "XLM" | "USDC"
  from?: string
  to?: string
  date: string
  status: "completed" | "pending"
  description: string
}

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [walletAddress] = useState("GCKFBEIYTKP67PVLOHJPEQSVUQIEMQXVTCNWWQXLZQBQAAAAAAAAAAAA")
  const [balance] = useState({ xlm: 1250.75, usdc: 890.5 })

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "received",
      amount: 500,
      currency: "USDC",
      from: "UNHCR Aid Program",
      date: "2024-01-15T10:30:00Z",
      status: "completed",
      description: "Monthly humanitarian aid",
    },
    {
      id: "2",
      type: "received",
      amount: 150,
      currency: "XLM",
      from: "Family Remittance",
      date: "2024-01-14T15:45:00Z",
      status: "completed",
      description: "Support from family",
    },
    {
      id: "3",
      type: "sent",
      amount: 25,
      currency: "USDC",
      to: "Local Merchant",
      date: "2024-01-13T09:15:00Z",
      status: "completed",
      description: "Food purchase",
    },
    {
      id: "4",
      type: "received",
      amount: 75,
      currency: "XLM",
      from: "Work Payment",
      date: "2024-01-12T14:20:00Z",
      status: "pending",
      description: "Daily labor payment",
    },
  ])

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    // You could add a toast notification here
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Wallet</h1>
          <p className="text-xl text-gray-600">Manage your digital assets and transactions</p>
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
                    <span className="text-lg font-medium">NomadPass Wallet</span>
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

                <div className="space-y-4">
                  <div>
                    <p className="text-white/80 text-sm">Total Balance (USD equivalent)</p>
                    <p className="text-3xl font-bold">
                      {showBalance ? `$${(balance.usdc + balance.xlm * 0.12).toFixed(2)}` : "••••••"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-white/80 text-sm">XLM</p>
                      <p className="text-xl font-semibold">{showBalance ? balance.xlm.toFixed(2) : "••••••"}</p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">USDC</p>
                      <p className="text-xl font-semibold">{showBalance ? balance.usdc.toFixed(2) : "••••••"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Button size="lg" className="py-6">
                <ArrowDownLeft className="w-5 h-5 mr-2" />
                Receive Funds
              </Button>
              <Button size="lg" variant="outline" className="py-6 bg-transparent">
                <ArrowUpRight className="w-5 h-5 mr-2" />
                Cash Out
              </Button>
            </div>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "received" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {tx.type === "received" ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tx.description}</p>
                          <p className="text-sm text-gray-600">
                            {tx.type === "received" ? `From: ${tx.from}` : `To: ${tx.to}`}
                          </p>
                          <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${tx.type === "received" ? "text-green-600" : "text-red-600"}`}>
                          {tx.type === "received" ? "+" : "-"}
                          {tx.amount} {tx.currency}
                        </p>
                        <Badge variant={tx.status === "completed" ? "default" : "secondary"}>{tx.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Wallet Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600">Public Address</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input value={formatAddress(walletAddress)} readOnly className="text-sm" />
                    <Button size="sm" variant="outline" onClick={copyAddress}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <QrCode className="w-4 h-4 mr-2" />
                  Show QR Code
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Received</span>
                  <span className="font-semibold text-green-600">+$725.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Spent</span>
                  <span className="font-semibold text-red-600">-$25.00</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Net Change</span>
                  <span className="font-semibold text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +$700.00
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Security Tip</h4>
                <p className="text-sm text-blue-800">
                  Never share your private keys or seed phrase. NomadPass will never ask for this information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
