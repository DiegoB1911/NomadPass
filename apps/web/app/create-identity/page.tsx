"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Camera, MapPin, Shield, Lock, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { registerIdentity } from "@/lib/soroban"

export default function CreateIdentityPage() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    bio: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate identity creation
    registerIdentity({
      name: formData.name,
      country: formData.location,
      docType: "selfie",
      docHash: "1234567890",
    })
    // setTimeout(() => {
    //   setIsLoading(false)
    //   router.push("/credentials")
    // }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Create Your Digital Identity</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build your secure, self-sovereign identity. No traditional documents required.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Current Location</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="location"
                        type="text"
                        placeholder="City, Country (optional)"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Tell us about yourself (optional)</Label>
                    <Textarea
                      id="bio"
                      placeholder="Share your story, skills, or background..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div>
                    <Label>Identity Verification (optional)</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Upload a selfie or document to strengthen your identity. This is optional but recommended.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Take Selfie</p>
                        <p className="text-xs text-gray-500">Use your camera</p>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Upload Document</p>
                        <p className="text-xs text-gray-500">Any ID or document</p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full py-6 text-lg" disabled={!formData.name || isLoading}>
                    {isLoading ? "Creating Your NomadPass..." : "Generate My NomadPass"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Explanation Sidebar */}
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-primary" />
                  Your Data, Your Control
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>You will receive a self-sovereign identity that you fully control</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Your personal data is encrypted and stored securely</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>No central authority can access or control your identity</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>You decide who to share your information with</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  What You'll Get
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Digital identity that works globally</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Secure digital wallet for receiving funds</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Ability to collect verifiable credentials</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Access to financial services without a bank</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
