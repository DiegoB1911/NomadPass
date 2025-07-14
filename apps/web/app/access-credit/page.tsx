"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, DollarSign, CheckCircle, Clock, AlertCircle, TrendingUp, Heart } from "lucide-react"

type ServiceType = "microcredit" | "microinsurance"
type ApplicationStatus = "idle" | "submitting" | "success" | "error"

interface MicrocreditForm {
  amount: string
  purpose: string
  repaymentPeriod: string
}

interface MicroinsuranceForm {
  insuranceType: string
  coverageAmount: string
  duration: string
}

export default function AccessCreditPage() {
  const [serviceType, setServiceType] = useState<ServiceType>("microcredit")
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>("idle")
  const [applicationId, setApplicationId] = useState<string>("")

  const [microcreditForm, setMicrocreditForm] = useState<MicrocreditForm>({
    amount: "",
    purpose: "",
    repaymentPeriod: "",
  })

  const [microinsuranceForm, setMicroinsuranceForm] = useState<MicroinsuranceForm>({
    insuranceType: "",
    coverageAmount: "",
    duration: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApplicationStatus("submitting")

    // Simulate API call
    setTimeout(() => {
      setApplicationStatus("success")
      setApplicationId(`APP-${Date.now().toString().slice(-6)}`)
    }, 2000)
  }

  const resetForm = () => {
    setApplicationStatus("idle")
    setApplicationId("")
    setMicrocreditForm({ amount: "", purpose: "", repaymentPeriod: "" })
    setMicroinsuranceForm({ insuranceType: "", coverageAmount: "", duration: "" })
  }

  const isFormValid = () => {
    if (serviceType === "microcredit") {
      return microcreditForm.amount && microcreditForm.purpose && microcreditForm.repaymentPeriod
    } else {
      return microinsuranceForm.insuranceType && microinsuranceForm.coverageAmount && microinsuranceForm.duration
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Apply for Microcredit or Microinsurance</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Eligible users with a verified identity can request access to financial services. Build your financial
            future with our trusted microcredit and microinsurance options.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  Financial Services Application
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Type Selection */}
                <div>
                  <Label className="text-base font-medium mb-4 block">Choose Service Type</Label>
                  <RadioGroup
                    value={serviceType}
                    onValueChange={(value) => setServiceType(value as ServiceType)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="microcredit" id="microcredit" />
                      <Label htmlFor="microcredit" className="flex items-center cursor-pointer flex-1">
                        <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                        <div>
                          <p className="font-medium">Microcredit</p>
                          <p className="text-sm text-gray-600">Small loans for business or personal needs</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="microinsurance" id="microinsurance" />
                      <Label htmlFor="microinsurance" className="flex items-center cursor-pointer flex-1">
                        <Shield className="w-5 h-5 mr-2 text-blue-600" />
                        <div>
                          <p className="font-medium">Microinsurance</p>
                          <p className="text-sm text-gray-600">Affordable insurance coverage</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Dynamic Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {serviceType === "microcredit" ? (
                    <>
                      <div>
                        <Label htmlFor="amount">Amount Requested (USD) *</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount (e.g., 500)"
                          value={microcreditForm.amount}
                          onChange={(e) => setMicrocreditForm({ ...microcreditForm, amount: e.target.value })}
                          min="50"
                          max="5000"
                          className="mt-1"
                          required
                        />
                        <p className="text-sm text-gray-600 mt-1">Minimum: $50, Maximum: $5,000</p>
                      </div>

                      <div>
                        <Label htmlFor="purpose">Purpose of Loan *</Label>
                        <Textarea
                          id="purpose"
                          placeholder="Describe how you plan to use this loan (e.g., start a small business, buy equipment, emergency expenses)"
                          value={microcreditForm.purpose}
                          onChange={(e) => setMicrocreditForm({ ...microcreditForm, purpose: e.target.value })}
                          className="mt-1"
                          rows={4}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="repayment">Repayment Period *</Label>
                        <Select
                          value={microcreditForm.repaymentPeriod}
                          onValueChange={(value) => setMicrocreditForm({ ...microcreditForm, repaymentPeriod: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select repayment period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Month (5% interest)</SelectItem>
                            <SelectItem value="3">3 Months (12% interest)</SelectItem>
                            <SelectItem value="6">6 Months (20% interest)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="insurance-type">Type of Insurance *</Label>
                        <Select
                          value={microinsuranceForm.insuranceType}
                          onValueChange={(value) =>
                            setMicroinsuranceForm({ ...microinsuranceForm, insuranceType: value })
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select insurance type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="health">Health Insurance</SelectItem>
                            <SelectItem value="work">Work/Disability Insurance</SelectItem>
                            <SelectItem value="life">Life Insurance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="coverage">Coverage Amount (USD) *</Label>
                        <Input
                          id="coverage"
                          type="number"
                          placeholder="Enter coverage amount (e.g., 1000)"
                          value={microinsuranceForm.coverageAmount}
                          onChange={(e) =>
                            setMicroinsuranceForm({ ...microinsuranceForm, coverageAmount: e.target.value })
                          }
                          min="100"
                          max="10000"
                          className="mt-1"
                          required
                        />
                        <p className="text-sm text-gray-600 mt-1">Minimum: $100, Maximum: $10,000</p>
                      </div>

                      <div>
                        <Label htmlFor="duration">Duration *</Label>
                        <Select
                          value={microinsuranceForm.duration}
                          onValueChange={(value) => setMicroinsuranceForm({ ...microinsuranceForm, duration: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select coverage duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Month ($5/month)</SelectItem>
                            <SelectItem value="6">6 Months ($4/month)</SelectItem>
                            <SelectItem value="12">12 Months ($3/month)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <Button
                    type="submit"
                    className="w-full py-6 text-lg rounded-full"
                    disabled={!isFormValid() || applicationStatus === "submitting"}
                  >
                    {applicationStatus === "submitting" ? "Submitting Application..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Application Result */}
            {applicationStatus !== "idle" && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  {applicationStatus === "submitting" && (
                    <div className="text-center">
                      <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-spin" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Your Application</h3>
                      <p className="text-gray-600">Please wait while we review your application...</p>
                    </div>
                  )}

                  {applicationStatus === "success" && (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-green-900 mb-2">Application Submitted Successfully!</h3>
                      <p className="text-gray-600 mb-4">
                        Your application has been received and is under review. You will be notified within 24-48 hours.
                      </p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-sm text-green-800">
                          <strong>Application ID:</strong> {applicationId}
                        </p>
                        <p className="text-sm text-green-800 mt-1">Please save this ID for your records.</p>
                      </div>
                      <Button onClick={resetForm} variant="outline">
                        Submit Another Application
                      </Button>
                    </div>
                  )}

                  {applicationStatus === "error" && (
                    <div className="text-center">
                      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-red-900 mb-2">Application Failed</h3>
                      <p className="text-gray-600 mb-4">
                        There was an error processing your application. Please try again or contact support.
                      </p>
                      <Button onClick={() => setApplicationStatus("idle")} variant="outline">
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Eligibility Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Eligibility Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓
                  </Badge>
                  <span className="text-sm">Verified NomadPass Identity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓
                  </Badge>
                  <span className="text-sm">At least 1 Credential</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓
                  </Badge>
                  <span className="text-sm">Active Wallet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    !
                  </Badge>
                  <span className="text-sm">No Outstanding Loans</span>
                </div>
              </CardContent>
            </Card>

            {/* Service Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  {serviceType === "microcredit" ? (
                    <>
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Microcredit Info
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2 text-blue-600" />
                      Microinsurance Info
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {serviceType === "microcredit" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-medium">5-20% APR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Range:</span>
                      <span className="font-medium">$50 - $5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Approval Time:</span>
                      <span className="font-medium">24-48 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Repayment:</span>
                      <span className="font-medium">Flexible terms</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Premium:</span>
                      <span className="font-medium">$3-5/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coverage:</span>
                      <span className="font-medium">$100 - $10,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Activation:</span>
                      <span className="font-medium">Immediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Claims:</span>
                      <span className="font-medium">24/7 support</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Blockchain Security
                </h4>
                <p className="text-sm text-blue-800">
                  All applications are processed through secure smart contracts on the Stellar blockchain, ensuring
                  transparency and immutable records.
                </p>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">Our support team is here to help with your application.</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
