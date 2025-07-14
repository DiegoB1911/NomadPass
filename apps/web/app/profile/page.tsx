"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { getIdentity } from "@/lib/soroban"
import { getAddress } from "@stellar/freighter-api"
import {
  User,
  MapPin,
  Calendar,
  Shield,
  Edit3,
  Save,
  X,
  CheckCircle,
  Clock,
  Globe,
  Phone,
  Mail,
  Camera,
  Download,
  Share2,
  Eye,
  EyeOff,
  Database,
  RefreshCw,
} from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  location: string
  bio: string
  dateCreated: string
  verificationLevel: "Not Verified" | "Verified" | "Premium"
  profileImage?: string
}

interface IdentityMetrics {
  credentialsCount: number
  verificationScore: number
  trustLevel: string
  lastActivity: string
}

interface BlockchainIdentity {
  name: string
  country: string
  doc_type: string
  doc_hash: string
  verified: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false)
  const [blockchainIdentity, setBlockchainIdentity] = useState<BlockchainIdentity | null>(null)
  const [isLoadingIdentity, setIsLoadingIdentity] = useState(false)
  const [identityError, setIdentityError] = useState<string | null>(null)

  const [profile, setProfile] = useState<UserProfile>({
    id: "NP-2024-001547",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    phone: "+1 (555) 123-4567",
    location: "Mexico City, Mexico",
    bio: "Small business owner and mother of two. I run a local food stand and use NomadPass to receive payments from customers and support from family abroad.",
    dateCreated: "2024-01-15",
    verificationLevel: "Not Verified",
    profileImage: "/placeholder.svg?height=120&width=120",
  })

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile)

  const [identityMetrics] = useState<IdentityMetrics>({
    credentialsCount: 4,
    verificationScore: 85,
    trustLevel: "High",
    lastActivity: "2024-01-20T10:30:00Z",
  })

  const [recentActivity] = useState([
    {
      id: "1",
      action: "Credential Issued",
      description: "Skills Assessment from Global Skills Initiative",
      date: "2024-01-18",
      type: "credential",
    },
    {
      id: "2",
      action: "Payment Received",
      description: "Monthly aid payment of $500 USDC",
      date: "2024-01-15",
      type: "payment",
    },
    {
      id: "3",
      action: "Profile Updated",
      description: "Updated contact information",
      date: "2024-01-10",
      type: "profile",
    },
    {
      id: "4",
      action: "Identity Verified",
      description: "Biometric verification completed",
      date: "2024-01-08",
      type: "verification",
    },
  ])

  const loadBlockchainIdentity = async () => {
    try {
      setIsLoadingIdentity(true)
      setIdentityError(null)
      
      const result = await getIdentity()
      console.log("Blockchain identity result:", result)
      
      if (result && typeof result === 'object' && (result.country || result.name || result.doc_type)) {
        setBlockchainIdentity(result as BlockchainIdentity)
        
        // Actualizar el perfil con los datos del blockchain
        setProfile(prev => ({
          ...prev,
          name: result.name || prev.name,
          location: result.country || prev.location,
        }))
        
        setEditedProfile(prev => ({
          ...prev,
          name: result.name || prev.name,
          location: result.country || prev.location,
        }))
      }
      
    } catch (error) {
      console.error("Error loading blockchain identity:", error)
      setIdentityError(error instanceof Error ? error.message : "Error desconocido")
    } finally {
      setIsLoadingIdentity(false)
    }
  }

  // Cargar datos del blockchain al montar el componente
  useEffect(() => {
    loadBlockchainIdentity()
  }, [])

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const getVerificationColor = (level: string) => {
    switch (level) {
      case "Basic":
        return "bg-yellow-100 text-yellow-800"
      case "Verified":
        return "bg-green-100 text-green-800"
      case "Premium":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "credential":
        return <Shield className="w-4 h-4 text-blue-600" />
      case "payment":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "profile":
        return <User className="w-4 h-4 text-purple-600" />
      case "verification":
        return <Shield className="w-4 h-4 text-orange-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-xl text-gray-600">Manage your digital identity and personal information</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button 
              onClick={loadBlockchainIdentity} 
              disabled={isLoadingIdentity}
              variant="outline"
              className="bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingIdentity ? 'animate-spin' : ''}`} />
              {isLoadingIdentity ? "Loading..." : "Refresh Blockchain Data"}
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
          </div>
        </div>

        {/* Blockchain Identity Error */}
        {identityError && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="text-red-600 font-medium">Blockchain Error:</div>
                <div className="ml-2 text-red-700">{identityError}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Blockchain Identity Data */}
        {blockchainIdentity && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Database className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-green-800">Blockchain Identity Data</h3>
                </div>
                <Badge className={blockchainIdentity.verified === "true" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {blockchainIdentity.verified === "true" ? "Verified" : "Not Verified"}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-green-700">Name (Blockchain):</label>
                  <p className="text-green-800 font-medium">{blockchainIdentity.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-green-700">Country (Blockchain):</label>
                  <p className="text-green-800 font-medium">{blockchainIdentity.country}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-green-700">Document Type:</label>
                  <p className="text-green-800">{blockchainIdentity.doc_type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-green-700">Document Hash:</label>
                  <p className="text-green-800 font-mono text-sm">{blockchainIdentity.doc_hash}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profile.profileImage || "/placeholder.svg"} alt={profile.name} />
                      <AvatarFallback className="text-2xl">
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-transparent"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                      <Badge className={getVerificationColor(profile.verificationLevel)}>
                        {profile.verificationLevel}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profile.location}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Member since {new Date(profile.dateCreated).toLocaleDateString()}
                    </p>
                  </div>

                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className={isEditing ? "bg-transparent" : ""}
                  >
                    {isEditing ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editedProfile.location}
                          onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">About Me</Label>
                      <Textarea
                        id="bio"
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm text-gray-600">Full Name</Label>
                        <p className="font-medium text-gray-900">{profile.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Location</Label>
                        <p className="font-medium text-gray-900">{profile.location}</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm text-gray-600">Email Address</Label>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900">
                            {showSensitiveInfo ? profile.email : "••••••@example.com"}
                          </p>
                          <Button variant="ghost" size="sm" onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}>
                            {showSensitiveInfo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Phone Number</Label>
                        <p className="font-medium text-gray-900">
                          {showSensitiveInfo ? profile.phone : "+1 (•••) •••-••67"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm text-gray-600">About Me</Label>
                      <p className="font-medium text-gray-900 leading-relaxed">{profile.bio}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Identity Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Identity Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm text-gray-600">NomadPass ID</Label>
                    <p className="font-mono text-sm font-medium text-gray-900">{profile.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Verification Level</Label>
                    <div className="flex items-center space-x-2">
                      <Badge className={getVerificationColor(profile.verificationLevel)}>
                        {blockchainIdentity?.verified === "true" ? "Verified" : profile.verificationLevel}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        ({blockchainIdentity?.verified === "true" ? "100" : identityMetrics.verificationScore}% complete)
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{identityMetrics.credentialsCount}</p>
                    <p className="text-sm text-gray-600">Credentials</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {blockchainIdentity?.verified === "true" ? "100" : identityMetrics.verificationScore}%
                    </p>
                    <p className="text-sm text-gray-600">Verification Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {blockchainIdentity?.verified === "true" ? "High" : identityMetrics.trustLevel}
                    </p>
                    <p className="text-sm text-gray-600">Trust Level</p>
                  </div>
                </div>

                {/* Blockchain Status */}
                {blockchainIdentity && (
                  <>
                    <Separator />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Database className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-800">Blockchain Status</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-700">Document Type:</span>
                          <span className="ml-2 text-blue-900 font-medium">{blockchainIdentity.doc_type}</span>
                        </div>
                        <div>
                          <span className="text-blue-700">Verification:</span>
                          <span className={`ml-2 font-medium ${blockchainIdentity.verified === "true" ? "text-green-700" : "text-yellow-700"}`}>
                            {blockchainIdentity.verified === "true" ? "✓ Verified" : "⏳ Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Add Credential
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Globe className="w-4 h-4 mr-2" />
                  Update Location
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Verify Email
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Verify Phone
                </Button>
              </CardContent>
            </Card>

            {/* Verification Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Basic Info</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Verified</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Phone Verified</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Biometric Scan</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Document Upload</span>
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{identityMetrics.verificationScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${identityMetrics.verificationScore}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Privacy & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-blue-800">
                <div className="flex items-center justify-between">
                  <span>Profile Visibility</span>
                  <Badge variant="secondary">Private</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Sharing</span>
                  <Badge variant="secondary">Restricted</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Two-Factor Auth</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent border-blue-300">
                  Manage Privacy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
