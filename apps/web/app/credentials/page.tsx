"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Share2, Plus, Calendar, Building, CheckCircle, User, Database } from "lucide-react"
import { getIdentity } from "@/lib/soroban"
import { getAddress } from "@stellar/freighter-api"

interface Credential {
  id: string
  title: string
  issuer: string
  issuerType: "NGO" | "Government" | "Organization"
  description: string
  issueDate: string
  status: "active" | "pending" | "expired"
}

interface IdentityData {
  name: string
  country: string
  doc_type: string
  doc_hash: string
  verified: string
}

export default function CredentialsPage() {
  const [credentials] = useState<Credential[]>([
    {
      id: "1",
      title: "Identity Verification",
      issuer: "NomadPass Foundation",
      issuerType: "NGO",
      description: "Basic identity verification completed with biometric data",
      issueDate: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      title: "Refugee Status Certificate",
      issuer: "UNHCR",
      issuerType: "Organization",
      description: "Official refugee status recognition for humanitarian aid eligibility",
      issueDate: "2024-01-10",
      status: "active",
    },
    {
      id: "3",
      title: "Skills Assessment",
      issuer: "Global Skills Initiative",
      issuerType: "NGO",
      description: "Verified skills in construction and manual labor",
      issueDate: "2024-01-08",
      status: "active",
    },
  ])

  const [identityData, setIdentityData] = useState<IdentityData | null>(null)
  const [isLoadingIdentity, setIsLoadingIdentity] = useState(false)
  const [identityError, setIdentityError] = useState<string | null>(null)

  const handleGetIdentity = async () => {
    try {
      setIsLoadingIdentity(true)
      setIdentityError(null)
      
      // Llamar a la función getIdentity
      const result = await getIdentity()
      
      console.log("Identity result:", result)
      
      // Procesar los datos de retorno de la simulación
      if (result && typeof result === 'object') {
        console.log("Converted result:", result)
        
        // Si los datos ya están convertidos (no tienen estructura XDR)
        if (result.country || result.name || result.doc_type) {
          // Los datos ya están en formato literal
          setIdentityData({
            name: result.name || "No name",
            country: result.country || "No country",
            doc_type: result.doc_type || "No doc type",
            doc_hash: result.doc_hash || "No hash",
            verified: result.verified || "false"
          })
        } else {
          // Si aún están en formato XDR, mostrar información de debugging
          setIdentityData({
            name: "Raw XDR data",
            country: "Check console for converted data",
            doc_type: "Data conversion needed",
            doc_hash: JSON.stringify(result).substring(0, 50) + "...",
            verified: "unknown"
          })
        }
      } else {
        setIdentityError("Unexpected result format")
      }
      
    } catch (error) {
      console.error("Error getting identity:", error)
      setIdentityError(error instanceof Error ? error.message : "Error desconocido")
    } finally {
      setIsLoadingIdentity(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIssuerIcon = (type: string) => {
    switch (type) {
      case "NGO":
        return "🏛️"
      case "Government":
        return "🏛️"
      case "Organization":
        return "🏢"
      default:
        return "📋"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Credentials</h1>
            <p className="text-xl text-gray-600">Manage your verifiable credentials and certificates</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button 
              onClick={handleGetIdentity} 
              disabled={isLoadingIdentity}
              variant="outline"
            >
              <Database className="w-4 h-4 mr-2" />
              {isLoadingIdentity ? "Loading..." : "Get Identity"}
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Request New Credential
            </Button>
          </div>
        </div>

        {/* Identity Data Display */}
        {identityError && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="text-red-600 font-medium">Error:</div>
                <div className="ml-2 text-red-700">{identityError}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {identityData && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800">Identity Data from Contract</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-green-700">Name:</label>
                  <p className="text-green-800">{identityData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-green-700">Country:</label>
                  <p className="text-green-800">{identityData.country}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-green-700">Document Type:</label>
                  <p className="text-green-800">{identityData.doc_type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-green-700">Document Hash:</label>
                  <p className="text-green-800 font-mono text-sm">{identityData.doc_hash}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-green-700">Verified:</label>
                  <Badge className={identityData.verified === "true" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {identityData.verified === "true" ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Credentials</p>
                  <p className="text-2xl font-bold text-gray-900">{credentials.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {credentials.filter((c) => c.status === "active").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Issuers</p>
                  <p className="text-2xl font-bold text-blue-600">{new Set(credentials.map((c) => c.issuer)).size}</p>
                </div>
                <Building className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credentials List */}
        <div className="space-y-6">
          {credentials.map((credential) => (
            <Card key={credential.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getIssuerIcon(credential.issuerType)}</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{credential.title}</h3>
                          <p className="text-sm text-gray-600">Issued by {credential.issuer}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(credential.status)}>{credential.status}</Badge>
                    </div>

                    <p className="text-gray-700 mb-4">{credential.description}</p>

                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      Issued on {new Date(credential.issueDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0 lg:ml-6">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for New Users */}
        {credentials.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Credentials Yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start building your verified identity by requesting credentials from trusted organizations.
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Request Your First Credential
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
