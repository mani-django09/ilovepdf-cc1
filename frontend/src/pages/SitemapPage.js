import React from "react"
import { Link } from "react-router-dom"
import {
  FileText,
  Image,
  RefreshCw,
  Settings,
  Info,
  Book,
  Shield,
  Users,
  Heart,
  Menu,
  X,
  ChevronDown
} from "lucide-react"

function SitemapPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // Organized sitemap data
  const sitemapSections = [
    {
      title: "Main PDF Tools",
      icon: <FileText className="h-6 w-6" />,
      description: "Essential PDF processing tools for everyday use",
      links: [
        { title: "Merge PDF", href: "/tools/merge", description: "Combine multiple PDF files into one document" },
        { title: "Split PDF", href: "/tools/split", description: "Extract pages or split PDF into multiple files" },
        { title: "Compress PDF", href: "/tools/compress", description: "Reduce PDF file size while maintaining quality" },
        { title: "Edit PDF", href: "/tools/edit-pdf", description: "Add text, images, and annotations to PDFs" },
        { title: "Rotate PDF", href: "/tools/rotate-pdf", description: "Rotate PDF pages to correct orientation" },
        { title: "Protect PDF", href: "/tools/protect-pdf", description: "Add password protection to PDF files" }
      ]
    },
    {
      title: "PDF Conversion Tools",
      icon: <RefreshCw className="h-6 w-6" />,
      description: "Convert PDFs to and from various file formats",
      links: [
        { title: "PDF to Word", href: "/tools/pdf-to-word", description: "Convert PDF to editable Word documents" },
        { title: "Word to PDF", href: "/tools/word-to-pdf", description: "Convert Word documents to PDF format" },
        { title: "PDF to Excel", href: "/tools/pdf-to-excel", description: "Extract data from PDF to Excel spreadsheets" },
        { title: "Excel to PDF", href: "/tools/excel-to-pdf", description: "Convert Excel files to PDF format" },
        { title: "PDF to PowerPoint", href: "/tools/pdf-to-powerpoint", description: "Convert PDF to editable presentations" },
        { title: "PowerPoint to PDF", href: "/tools/powerpoint-to-pdf", description: "Convert presentations to PDF format" }
      ]
    },
    {
      title: "Image & PDF Tools",
      icon: <Image className="h-6 w-6" />,
      description: "Convert between PDF and image formats",
      links: [
        { title: "PDF to JPG", href: "/tools/pdf-to-jpg", description: "Convert PDF pages to JPG images" },
        { title: "JPG to PDF", href: "/tools/jpg-to-pdf", description: "Convert JPG images to PDF format" },
        { title: "PDF to PNG", href: "/tools/pdf-to-png", description: "Convert PDF pages to PNG with transparency" },
        { title: "PNG to PDF", href: "/tools/png-to-pdf", description: "Convert PNG images to PDF documents" },
        { title: "Extract Images", href: "/tools/extract-images", description: "Extract all images from PDF files" }
      ]
    },
    {
      title: "Image Format Conversion",
      icon: <Image className="h-6 w-6" />,
      description: "Convert between modern image formats",
      links: [
        { title: "WebP to PNG", href: "/tools/webp-to-png", description: "Convert WebP images to PNG format" },
        { title: "PNG to WebP", href: "/tools/png-to-webp", description: "Optimize PNG images to WebP format" },
        { title: "JPG to PNG", href: "/tools/jpg-to-png", description: "Convert JPG images to PNG format" },
        { title: "PNG to JPG", href: "/tools/png-to-jpg", description: "Convert PNG images to JPG format" },
        { title: "Image Resize", href: "/tools/image-resize", description: "Resize images to custom dimensions" },
        { title: "Image Compress", href: "/tools/image-compress", description: "Reduce image file sizes" }
      ]
    },
    {
      title: "Advanced PDF Tools",
      icon: <Settings className="h-6 w-6" />,
      description: "Professional PDF editing and management tools",
      links: [
        { title: "Extract Pages", href: "/tools/extract-pages", description: "Extract specific pages from PDF files" },
        { title: "Remove Pages", href: "/tools/remove-pages", description: "Delete unwanted pages from PDFs" },
        { title: "Reorder Pages", href: "/tools/reorder-pages", description: "Rearrange PDF pages in custom order" },
        { title: "Watermark PDF", href: "/tools/watermark-pdf", description: "Add text or image watermarks to PDFs" },
        { title: "Unlock PDF", href: "/tools/unlock-pdf", description: "Remove password protection from PDFs" },
        { title: "Add Page Numbers", href: "/tools/add-page-numbers", description: "Add page numbers to PDF documents" }
      ]
    },
    {
      title: "Information & Support",
      icon: <Info className="h-6 w-6" />,
      description: "Learn more about our platform and get help",
      links: [
        { title: "About ilovepdf.cc", href: "/about", description: "Learn about our mission and team" },
        { title: "Help Center", href: "/help", description: "Find answers to common questions" },
        { title: "FAQ", href: "/faq", description: "Frequently asked questions" },
        { title: "Contact Us", href: "/contact", description: "Get in touch with our support team" },
        { title: "Features", href: "/features", description: "Explore all platform features" },
        { title: "API Documentation", href: "/api", description: "Developer resources and API docs" }
      ]
    },
    {
      title: "Blog & Resources",
      icon: <Book className="h-6 w-6" />,
      description: "Tutorials, guides, and tips for PDF management",
      links: [
        { title: "Blog", href: "/blog", description: "Latest articles and tutorials" },
        { title: "How to Merge PDFs", href: "/blog/how-to-merge-pdf-files", description: "Complete guide to merging PDF files" },
        { title: "PDF Compression Guide", href: "/blog/how-to-compress-pdf-files", description: "Best practices for PDF compression" },
        { title: "PDF to Word Guide", href: "/blog/pdf-to-word-conversion-guide", description: "Converting PDFs to editable Word documents" },
        { title: "WebP vs PNG", href: "/blog/webp-vs-png-comparison", description: "Image format comparison and guide" },
        { title: "Image Optimization", href: "/blog/image-optimization-guide", description: "Optimize images for web performance" }
      ]
    },
    {
      title: "Business & Education",
      icon: <Users className="h-6 w-6" />,
      description: "Solutions for organizations and educational institutions",
      links: [
        { title: "For Business", href: "/for-business", description: "Enterprise PDF solutions and features" },
        { title: "For Education", href: "/for-education", description: "Educational discounts and tools" },
        { title: "Pricing", href: "/pricing", description: "Compare our free and premium plans" },
        { title: "Premium Features", href: "/premium", description: "Advanced features for power users" }
      ]
    },
    {
      title: "Security & Legal",
      icon: <Shield className="h-6 w-6" />,
      description: "Privacy, security, and legal information",
      links: [
        { title: "Security", href: "/security", description: "How we protect your files and data" },
        { title: "Privacy Policy", href: "/privacy-policy", description: "Our commitment to your privacy" },
        { title: "Terms of Service", href: "/terms-of-service", description: "Terms and conditions of use" },
        { title: "Cookie Policy", href: "/cookie-policy", description: "How we use cookies" },
        { title: "GDPR Compliance", href: "/gdpr-compliance", description: "GDPR compliance information" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      {typeof document !== 'undefined' && (
        <>
          {(() => {
            document.title = "Sitemap - All PDF Tools and Pages | ilovepdf.cc"
            
            const metaTags = [
              { name: "description", content: "Complete sitemap of ilovepdf.cc with all PDF tools, image conversion tools, and resources. Find merge PDF, split PDF, compress PDF, and more." },
              { name: "robots", content: "index, follow" },
              { property: "og:title", content: "Sitemap - All PDF Tools and Pages | ilovepdf.cc" },
              { property: "og:description", content: "Complete sitemap with all PDF tools and resources available on ilovepdf.cc" }
            ]
            
            metaTags.forEach(tag => {
              const existing = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`)
              if (existing) {
                existing.setAttribute('content', tag.content)
              } else {
                const meta = document.createElement('meta')
                if (tag.name) meta.setAttribute('name', tag.name)
                if (tag.property) meta.setAttribute('property', tag.property)
                meta.setAttribute('content', tag.content)
                document.head.appendChild(meta)
              }
            })
          })()}
        </>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">iLove</span>
              <span className="text-2xl font-bold text-red-500">PDF</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
                <Link to="/tools/merge" className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors">
                Merge PDF
              </Link>
              <Link to="/tools/split" className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors">
                Split PDF
              </Link>
              <Link to="/tools/compress" className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors">
                Compress PDF
              </Link>
              <Link to="/tools" className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors">
                All Tools
              </Link>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-red-500 font-medium text-sm transition-colors">
                Log in
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium text-sm transition-colors">
                Sign up
              </button>
            </div>

            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t shadow-lg">
              <div className="px-4 py-4 space-y-4">
                <Link to="/tools/merge" className="block text-gray-700 hover:text-red-500 font-medium text-sm uppercase transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Merge PDF
                </Link>
                <Link to="/tools/split" className="block text-gray-700 hover:text-red-500 font-medium text-sm uppercase transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Split PDF
                </Link>
                <Link to="/tools/compress" className="block text-gray-700 hover:text-red-500 font-medium text-sm uppercase transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Compress PDF
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Sitemap - All PDF Tools and Resources
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Complete directory of all PDF tools, image conversion tools, and resources available on ilovepdf.cc. 
            Find exactly what you need for your document processing requirements.
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Homepage
          </Link>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {sitemapSections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center mr-4">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <div key={linkIndex} className="border-l-4 border-red-500 pl-4 py-2 hover:bg-gray-50 rounded-r transition-colors">
                      <Link
                        to={link.href}
                        className="block group"
                      >
                        <h3 className="font-semibold text-gray-900 group-hover:text-red-500 transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {link.description}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Most Popular Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link
              to="/tools/merge"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <FileText className="h-8 w-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 group-hover:text-red-500 transition-colors">
                Merge PDF
              </h3>
            </Link>
            <Link
              to="/tools/split"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <FileText className="h-8 w-8 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 group-hover:text-green-500 transition-colors">
                Split PDF
              </h3>
            </Link>
            <Link
              to="/tools/compress"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <Settings className="h-8 w-8 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-500 transition-colors">
                Compress PDF
              </h3>
            </Link>
            <Link
              to="/tools/png-to-webp"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <Image className="h-8 w-8 text-purple-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-500 transition-colors">
                PNG to WebP
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center mb-4">
                <span className="text-xl font-bold text-gray-900">iLove</span>
                <span className="text-xl font-bold text-red-500">PDF</span>
              </Link>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Complete sitemap of all PDF tools and resources available on ilovepdf.cc. Find everything you need for document processing.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">MAIN TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors">Compress PDF</Link></li>
                <li><Link to="/tools/edit-pdf" className="text-gray-600 hover:text-red-500 transition-colors">Edit PDF</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">CONVERT</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/pdf-to-word" className="text-gray-600 hover:text-red-500 transition-colors">PDF to Word</Link></li>
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors">PNG to PDF</Link></li>
                <li><Link to="/tools/png-to-webp" className="text-gray-600 hover:text-red-500 transition-colors">PNG to WebP</Link></li>
                <li><Link to="/tools/webp-to-png" className="text-gray-600 hover:text-red-500 transition-colors">WebP to PNG</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">RESOURCES</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/blog" className="text-gray-600 hover:text-red-500 transition-colors">Blog</Link></li>
                <li><Link to="/help" className="text-gray-600 hover:text-red-500 transition-colors">Help</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-red-500 transition-colors">FAQ</Link></li>
                <li><Link to="/api" className="text-gray-600 hover:text-red-500 transition-colors">API</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">COMPANY</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-gray-600 hover:text-red-500 transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-red-500 transition-colors">Contact</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-600 hover:text-red-500 transition-colors">Privacy</Link></li>
                <li><Link to="/terms-of-service" className="text-gray-600 hover:text-red-500 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2024 ilovepdf.cc. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PDF lovers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SitemapPage