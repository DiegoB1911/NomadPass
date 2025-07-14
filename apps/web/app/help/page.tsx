import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, Smartphone, Globe, Users, Lock, Heart } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About NomadPass</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn how NomadPass empowers the unbanked with secure digital identity and financial access
          </p>
        </div>

        {/* What is NomadPass */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Heart className="w-6 h-6 mr-3 text-primary" />
              What is NomadPass?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-lg leading-relaxed mb-4">
              NomadPass is a digital identity and wallet platform designed specifically for unbanked individuals,
              including migrants, refugees, and people in underserved communities. We believe everyone deserves access
              to financial services and the ability to prove their identity, regardless of their documentation status.
            </p>
            <p className="text-lg leading-relaxed">
              Our platform uses cutting-edge blockchain technology to create self sovereign identities that you control
              completely. No government, bank, or corporation can take away your NomadPass identity or access to your
              digital wallet.
            </p>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Globe className="w-6 h-6 mr-3 text-primary" />
              How NomadPass Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">1. Create Identity</h3>
                <p className="text-gray-600">
                  Build your digital identity using basic information. No traditional documents required.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">2. Get Verified</h3>
                <p className="text-gray-600">
                  Trusted organizations can issue you verifiable credentials to strengthen your identity.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">3. Access Services</h3>
                <p className="text-gray-600">
                  Use your digital wallet to receive payments, aid, and access financial services globally.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Privacy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Lock className="w-6 h-6 mr-3 text-primary" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-1">Self Sovereign Identity</h4>
                  <p className="text-gray-600">
                    You own and control your identity completely. No central authority can revoke or modify it.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-1">Encrypted Data</h4>
                  <p className="text-gray-600">
                    All your personal information is encrypted and stored securely. Only you have the keys.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-1">Privacy by Design</h4>
                  <p className="text-gray-600">
                    We collect minimal data and never share your information without your explicit consent.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold mb-1">Blockchain Security</h4>
                  <p className="text-gray-600">
                    Built on secure blockchain technology that's transparent, immutable, and decentralized.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Do I need an ID or official documents to use NomadPass?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">
                    No! NomadPass is specifically designed for people without traditional identification documents. You
                    can create your digital identity using just basic information like your name and location. While
                    uploading a photo or document can strengthen your identity, it's completely optional.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">What if I lose my phone or device?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">
                    Your NomadPass identity is secured with a recovery phrase (seed phrase) that you should write down
                    and store safely when you first create your account. If you lose your device, you can restore your
                    complete identity and wallet on any new device using this recovery phrase. Never share this phrase
                    with anyone.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Who can issue credentials to me?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">
                    Trusted organizations like NGOs, humanitarian agencies, educational institutions, employers, and
                    government agencies can issue verifiable credentials to your NomadPass. These credentials help prove
                    things like your refugee status, skills, work history, or educational background. You always control
                    who can see these credentials.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">How do I receive money in my wallet?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">
                    Your NomadPass wallet has a unique address that others can use to send you money. You can share this
                    address or show a QR code to receive payments. The wallet supports multiple currencies including XLM
                    (Stellar Lumens) and USDC (US Dollar Coin). Organizations can send aid directly to your wallet, and
                    family members can send remittances from anywhere in the world.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">Is NomadPass free to use?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, creating your NomadPass identity and wallet is completely free. There are small network fees
                    for sending transactions (typically less than $0.01), but receiving money is always free. We believe
                    financial inclusion should be accessible to everyone, regardless of their economic situation.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">Can I use NomadPass in any country?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">
                    Yes! NomadPass works globally because it's built on blockchain technology that isn't controlled by
                    any single country or government. Your digital identity and wallet will work wherever you are in the
                    world, making it perfect for migrants, refugees, and anyone who travels frequently.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">How is my data protected?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">
                    Your data is protected through multiple layers of security. All personal information is encrypted
                    before being stored, and only you have the keys to decrypt it. We use blockchain technology to
                    ensure your identity can't be tampered with or deleted by others. We follow strict privacy
                    principles and never sell or share your data with third parties.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
