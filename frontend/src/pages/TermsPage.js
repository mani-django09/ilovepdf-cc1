import React from "react"
import { ArrowLeft, Shield, FileText, Clock, Globe } from "lucide-react"

function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <title>Terms of Service - ilovepdf8.com | Free PDF Tools Online</title>
      <meta name="description" content="Read the terms of service for ilovepdf8.com. Understand your rights and responsibilities when using our free PDF tools and services." />
      <meta name="keywords" content="terms of service, ilovepdf8.com terms, pdf tools terms, legal agreement" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://ilovepdf8.com/terms" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </a>
            <div className="ml-4 flex items-center">
              <span className="text-xl font-bold text-gray-900">iLove</span>
              <span className="text-xl font-bold text-red-500">PDF</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-lg mb-6">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using ilovepdf8.com services. 
            By using our website, you agree to be bound by these terms.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated: December 15, 2024
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Quick Summary
            </h2>
            <p className="text-blue-800 mb-0">
              ilovepdf8.com provides free PDF processing tools. By using our service, you agree to use it responsibly, 
              respect intellectual property rights, and understand that we process files temporarily for conversion purposes only.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using ilovepdf8.com ("the Service"), you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p className="text-gray-600">
              These Terms of Service ("Terms") govern your use of our website located at ilovepdf8.com (the "Service") 
              operated by ilovepdf8.com ("us", "we", or "our").
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              ilovepdf8.com provides free online PDF processing tools including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>PDF merging and splitting</li>
              <li>PDF compression and optimization</li>
              <li>PDF to various format conversions (Word, JPG, PNG, etc.)</li>
              <li>Various format to PDF conversions</li>
              <li>PDF editing and annotation tools</li>
              <li>PDF security tools (unlock, watermark)</li>
            </ul>
            <p className="text-gray-600">
              All services are provided "as is" and are available free of charge for personal and commercial use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">By using our service, you agree to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Use the service only for lawful purposes and in accordance with these Terms</li>
              <li>Not upload files that violate copyright, trademark, or other intellectual property rights</li>
              <li>Not upload malicious files, viruses, or harmful content</li>
              <li>Not attempt to interfere with, compromise, or disrupt the service</li>
              <li>Respect the rights and privacy of others</li>
              <li>Not use the service for illegal activities or to distribute inappropriate content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. File Processing and Privacy</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                File Handling Policy
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Files are processed on secure servers and automatically deleted after 1 hour</li>
                <li>We do not store, access, or share your files with third parties</li>
                <li>All file transfers are protected with SSL encryption</li>
                <li>You retain all rights to your uploaded content</li>
              </ul>
            </div>
            <p className="text-gray-600">
              We take your privacy seriously. Our file processing is designed to be temporary and secure. 
              For more details, please review our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
            <p className="text-gray-600 mb-4">
              You retain all ownership rights to files you upload to ilovepdf8.com. By uploading files, you grant us 
              a temporary, limited license to process your files solely for the purpose of providing the requested service.
            </p>
            <p className="text-gray-600 mb-4">
              The ilovepdf8.com website, including its design, functionality, and content (excluding user-uploaded files), 
              is owned by us and protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Service Availability and Limitations</h2>
            <p className="text-gray-600 mb-4">
              We strive to provide reliable service but cannot guarantee 100% uptime. The service may be temporarily 
              unavailable for maintenance, updates, or due to technical issues.
            </p>
            <p className="text-gray-600 mb-4">Service limitations include:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>File size limits (currently 25MB for free users)</li>
              <li>Processing time limits to ensure fair usage</li>
              <li>Bandwidth limitations during peak usage</li>
              <li>Feature restrictions for certain file types</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-600 mb-4">
              The service is provided "as is" without warranties of any kind, either express or implied. We do not 
              warrant that the service will be uninterrupted, error-free, or completely secure.
            </p>
            <p className="text-gray-600">
              While we make every effort to ensure the quality and accuracy of our PDF processing tools, we cannot 
              guarantee perfect results for all file types and formats.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              In no event shall ilovepdf8.com be liable for any indirect, incidental, special, consequential, or punitive 
              damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
            <p className="text-gray-600">
              Our total liability to you for any damages arising from or related to this agreement or your use of the 
              service shall not exceed the amount you paid us in the past twelve months.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Prohibited Uses</h2>
            <p className="text-gray-600 mb-4">You may not use our service:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>For any unlawful purpose or to solicit others to unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-600 mb-4">
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason 
              whatsoever, including without limitation if you breach the Terms.
            </p>
            <p className="text-gray-600">
              You may discontinue using the service at any time. Upon termination, your right to use the service 
              will cease immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
              is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p className="text-gray-600">
              What constitutes a material change will be determined at our sole discretion. By continuing to access or 
              use our service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which ilovepdf8.com operates, 
              without regard to its conflict of law provisions.
            </p>
            <p className="text-gray-600">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-2">
                <Globe className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-semibold text-gray-900">Website:</span>
                <span className="ml-2 text-gray-600">https://ilovepdf8.com</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-semibold text-gray-900">Email:</span>
                <span className="ml-2 text-gray-600">legal@ilovepdf8.com</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <a 
              href="/" 
              className="text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              ← Back to ilovepdf8.com
            </a>
            <div className="flex gap-4 text-sm">
              <a 
                href="/privacy" 
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/about" 
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                About Us
              </a>
              <a 
                href="/contact" 
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TermsOfService