import React from "react"
import { ArrowLeft, Shield, Lock, Eye, Trash2, Globe, Clock, Server } from "lucide-react"

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <title>Privacy Policy - ilovepdf8.com | Your Data Security & Privacy</title>
      <meta name="description" content="Learn how ilovepdf8.com protects your privacy and handles your data. We use SSL encryption, auto-delete files, and never store your personal documents." />
      <meta name="keywords" content="privacy policy, ilovepdf8.com privacy, data protection, file security, ssl encryption" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://ilovepdf8.com/privacy" />

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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-lg mb-6">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect 
            your information when you use ilovepdf8.com services.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated: December 15, 2024
          </div>
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-900 mb-2">SSL Encrypted</h3>
            <p className="text-blue-800 text-sm">All file transfers are protected with bank-level encryption</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <Trash2 className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 mb-2">Auto-Delete</h3>
            <p className="text-green-800 text-sm">Files automatically deleted after 1 hour</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <Eye className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-900 mb-2">No Access</h3>
            <p className="text-purple-800 text-sm">We never access or view your uploaded files</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Files You Upload</h3>
            <p className="text-gray-600 mb-4">
              When you use ilovepdf8.com, you may upload PDF files and other documents for processing. These files are:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Processed temporarily on our secure servers</li>
              <li>Never stored permanently in our systems</li>
              <li>Automatically deleted after 1 hour</li>
              <li>Not accessed, viewed, or analyzed by our staff</li>
              <li>Protected with SSL encryption during transfer</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
            <p className="text-gray-600 mb-4">
              We automatically collect certain technical information to improve our service:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>IP address (anonymized for analytics)</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>File processing statistics (file types, sizes)</li>
              <li>Error logs and performance metrics</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies and Local Storage</h3>
            <p className="text-gray-600 mb-4">
              We use minimal cookies and local storage for:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Remembering your preferences (language, settings)</li>
              <li>Analytics to understand how you use our service</li>
              <li>Ensuring the security and functionality of our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Server className="h-5 w-5 mr-2" />
                File Processing Purpose Only
              </h3>
              <p className="text-gray-600 mb-0">
                Your uploaded files are used exclusively for the PDF processing service you requested. 
                We do not analyze, store, or use your files for any other purpose.
              </p>
            </div>

            <p className="text-gray-600 mb-4">We use collected information to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Process your PDF files according to your requested operation</li>
              <li>Improve our service performance and reliability</li>
              <li>Understand usage patterns to enhance user experience</li>
              <li>Detect and prevent abuse or security threats</li>
              <li>Provide customer support when needed</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security Measures</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Encryption in Transit
                </h3>
                <p className="text-blue-800 text-sm">
                  All data transfers use TLS/SSL encryption. Your files are protected during upload and download.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Secure Servers
                </h3>
                <p className="text-green-800 text-sm">
                  Our servers are hosted in secure data centers with physical and digital security measures.
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Temporary Processing
                </h3>
                <p className="text-purple-800 text-sm">
                  Files exist on our servers only during processing and are automatically deleted within 1 hour.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Access Controls
                </h3>
                <p className="text-red-800 text-sm">
                  Strict access controls ensure only authorized systems can process files. No human access to your content.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
            <p className="text-gray-600 mb-4">
              We use certain third-party services to operate ilovepdf8.com effectively:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Services</h3>
            <p className="text-gray-600 mb-4">
              We use privacy-focused analytics to understand how our service is used. This helps us improve 
              performance and user experience. We do not share personal information with analytics providers.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cloud Infrastructure</h3>
            <p className="text-gray-600 mb-4">
              Our servers are hosted on secure cloud infrastructure. These providers offer enterprise-grade 
              security and comply with international data protection standards.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">CDN Services</h3>
            <p className="text-gray-600 mb-4">
              We use Content Delivery Networks (CDN) to ensure fast loading times globally. CDNs only handle 
              website assets, not your uploaded files.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention and Deletion</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center">
                <Trash2 className="h-5 w-5 mr-2" />
                Automatic File Deletion
              </h3>
              <p className="text-yellow-800 mb-0">
                All uploaded files are automatically and permanently deleted from our servers within 1 hour of upload. 
                This ensures your sensitive documents never remain on our systems longer than necessary.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">File Retention Policy</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li><strong>Uploaded Files:</strong> Deleted within 1 hour automatically</li>
              <li><strong>Processed Files:</strong> Available for download for 1 hour, then deleted</li>
              <li><strong>Temporary Data:</strong> Processing cache cleared immediately after completion</li>
              <li><strong>Analytics Data:</strong> Anonymized usage statistics retained for 24 months</li>
              <li><strong>Log Data:</strong> Server logs retained for 90 days for security purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Right to Deletion</h3>
            <p className="text-gray-600 mb-4">
              Since we automatically delete all files within 1 hour, there's typically no need for manual deletion requests. 
              However, if you have concerns about any data, you can contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Under GDPR (EU Users)</h3>
            <p className="text-gray-600 mb-4">If you're in the European Union, you have these rights:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li><strong>Right to Access:</strong> Request information about data we process</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
              <li><strong>Right to Restrict:</strong> Limit how we process your data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Under CCPA (California Users)</h3>
            <p className="text-gray-600 mb-4">California residents have additional rights:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of the sale of personal information (we don't sell data)</li>
              <li>Right to non-discrimination for exercising privacy rights</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Exercise Your Rights</h3>
            <p className="text-gray-600 mb-4">
              To exercise any of these rights, contact us at privacy@ilovepdf8.com. We'll respond within 30 days 
              and may need to verify your identity to protect your privacy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. International Data Transfers</h2>
            <p className="text-gray-600 mb-4">
              ilovepdf8.com operates globally and may process your data in different countries. We ensure adequate 
              protection through:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Using servers in countries with adequate data protection laws</li>
              <li>Implementing appropriate technical and organizational measures</li>
              <li>Following international data transfer frameworks</li>
              <li>Ensuring all processors meet our security standards</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-600 mb-4">
              ilovepdf8.com is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you're a parent and believe your child has provided us with 
              personal information, please contact us immediately.
            </p>
            <p className="text-gray-600 mb-4">
              If we discover we have collected personal information from a child under 13, we will delete such 
              information from our systems immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, 
              operational, or regulatory reasons. When we make changes:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>We'll update the "Last updated" date at the top of this policy</li>
              <li>Significant changes will be prominently displayed on our website</li>
              <li>We may notify users via email for material changes</li>
              <li>Continued use of our service constitutes acceptance of the updated policy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us About Privacy</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please don't hesitate to contact us:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Globe className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="font-semibold text-gray-900">Website:</span>
                  </div>
                  <span className="text-gray-600 ml-7">https://ilovepdf8.com</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="font-semibold text-gray-900">Privacy Email:</span>
                  </div>
                  <span className="text-gray-600 ml-7">privacy@ilovepdf8.com</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-sm text-gray-600">
                  For privacy-related inquiries, please include "Privacy Request" in your email subject line. 
                  We'll respond within 30 days.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Data Protection Officer</h2>
            <p className="text-gray-600 mb-4">
              Our Data Protection Officer is responsible for overseeing our privacy compliance and can be reached at:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800 font-medium mb-2">Data Protection Officer</p>
              <p className="text-blue-700">Email: dpo@ilovepdf8.com</p>
              <p className="text-blue-700 text-sm mt-2">
                Available for questions about data processing, privacy rights, and compliance matters.
              </p>
            </div>
          </section>
        </div>

        {/* Privacy Summary */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4 text-center">
            Your Privacy in Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div>
              <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">Always Encrypted</h3>
              <p className="text-green-800 text-sm">All file transfers protected with SSL encryption</p>
            </div>
            <div>
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">1-Hour Deletion</h3>
              <p className="text-green-800 text-sm">Files automatically deleted after 1 hour</p>
            </div>
            <div>
              <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">No Human Access</h3>
              <p className="text-green-800 text-sm">Your files are never viewed by our staff</p>
            </div>
            <div>
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">GDPR Compliant</h3>
              <p className="text-green-800 text-sm">Full compliance with international privacy laws</p>
            </div>
          </div>
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
                href="/terms" 
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Terms of Service
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

export default PrivacyPolicy