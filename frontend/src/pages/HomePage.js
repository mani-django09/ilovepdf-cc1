
import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  ChevronDown,
  Menu,
  X,
  Heart,
  Globe,
  Shield,
  Zap,
  Star,
  Clock,
  Users,
  Award,
  CheckCircle,
  Plus,
  Minus,
  ArrowRight,
  FileText,
  Image,
  Download,
  Upload,
  Smartphone,
  Monitor,
  Lock,
  Palette
} from "lucide-react"

// Enhanced PDF tools with PNG/PDF additions, removed unlock-pdf and watermark
const pdfTools = [
  {
    id: "merge",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document instantly. Perfect for consolidating reports, presentations, and documents.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        <path d="M16,11V13H14V15H12V13H10V11H12V9H14V11H16Z"/>
      </svg>
    ),
    color: "bg-red-500",
    href: "/merge-pdf",
    keywords: "merge pdf online, combine pdf files, join pdf documents"
  },
  {
    id: "split",
    title: "Split PDF",
    description: "Extract specific pages or split PDF into multiple files. Ideal for separating chapters, sections, or individual pages.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H13V20H6V4H13V9H18V10H20V8L14,2Z"/>
        <path d="M15,18V16H19V14L22,17L19,20V18H15Z"/>
        <path d="M13,14V12H9V10L6,13L9,16V14H13Z"/>
      </svg>
    ),
    color: "bg-red-500",
    href: "/split-pdf",
    keywords: "split pdf pages, extract pdf pages, divide pdf document"
  },
  {
    id: "compress",
    title: "Compress PDF",
    description: "Reduce PDF file size by up to 90% while maintaining excellent quality. Perfect for email attachments and storage.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        <path d="M8,12L10,14H9V17H11V14H10L8,12Z"/>
        <path d="M16,10L14,8H15V5H13V8H14L16,10Z"/>
      </svg>
    ),
    color: "bg-green-500",
    href: "/compress-pdf",
    keywords: "compress pdf online, reduce pdf size, optimize pdf files"
  },
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to editable Word documents with preserved formatting. Maintain layouts, fonts, and images perfectly.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-current">W</text>
      </svg>
    ),
    color: "bg-blue-500",
    href: "/pdf-to-word",
    keywords: "pdf to word converter, pdf to doc, pdf to docx online"
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Transform Word documents into professional PDF files. Preserve formatting and ensure universal compatibility.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-current">W</text>
      </svg>
    ),
    color: "bg-blue-500",
    href: "/word-to-pdf",
    keywords: "word to pdf converter, doc to pdf, docx to pdf online"
  },
  {
    id: "edit-pdf",
    title: "Edit PDF",
    description: "Add text, images, shapes, and annotations to PDF documents. Complete PDF editing solution online.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        <path d="M9,14L11,12L13,14L11,16L9,14Z"/>
      </svg>
    ),
    color: "bg-purple-500",
    href: "/edit-pdf",
    isNew: true,
    keywords: "edit pdf online, pdf editor, add text to pdf"
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to high-quality JPG images. Extract images from PDFs or convert entire documents.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        <rect x="8" y="11" width="8" height="6" rx="1"/>
        <circle cx="10" cy="13" r="1"/>
      </svg>
    ),
    color: "bg-yellow-500",
    href: "/pdf-to-jpg",
    keywords: "pdf to jpg converter, pdf to image, extract images from pdf"
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG images to PDF format with custom page sizes and orientations. Batch convert multiple images.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <rect x="4" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="8" cy="8" r="1"/>
        <path d="M14,14L12,12L10,14"/>
        <path d="M20,16V20A2,2 0 0,1 18,22H14V20H18V16H20Z"/>
      </svg>
    ),
    color: "bg-yellow-600",
    href: "/jpg-to-pdf",
    keywords: "jpg to pdf converter, image to pdf, photo to pdf online"
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG",
    description: "Convert PDF pages to PNG images with transparency support. Perfect for high-quality image extraction.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        <rect x="8" y="11" width="8" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="13" r="0.8"/>
        <text x="16" y="22" className="text-xs font-bold fill-current">PNG</text>
      </svg>
    ),
    color: "bg-indigo-500",
    href: "/pdf-to-png",
    keywords: "pdf to png converter, pdf to transparent image, extract png from pdf"
  },
  {
    id: "png-to-pdf",
    title: "PNG to PDF",
    description: "Convert PNG images to PDF format while preserving transparency and quality. Batch convert multiple PNGs.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <rect x="3" y="3" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="8" r="1.5"/>
        <path d="M3 17l4-4 3 3 6-6 5 5"/>
        <path d="M20,16V20A2,2 0 0,1 18,22H14V20H18V16H20Z"/>
      </svg>
    ),
    color: "bg-cyan-500",
    href: "/png-to-pdf",
    keywords: "png to pdf converter, image to pdf, convert transparent images to pdf"
  },
  {
    id: "webp-to-png",
    title: "WebP to PNG",
    description: "Convert modern WebP images to PNG format with transparency support and lossless quality.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <rect x="3" y="3" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="8" r="1.5"/>
        <path d="M3 17l4-4 3 3 6-6 5 5"/>
        <text x="19" y="20" className="text-xs font-bold fill-current">PNG</text>
      </svg>
    ),
    color: "bg-teal-500",
    href: "/webp-to-png",
    keywords: "webp to png converter, convert webp images, webp decoder"
  },
  {
    id: "png-to-webp",
    title: "PNG to WebP",
    description: "Convert PNG images to WebP format for better web performance and smaller file sizes.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <rect x="3" y="3" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="8" r="1.5"/>
        <path d="M3 17l4-4 3 3 6-6 5 5"/>
        <text x="18" y="20" className="text-xs font-bold fill-current">WebP</text>
      </svg>
    ),
    color: "bg-emerald-500",
    href: "/png-to-webp",
    keywords: "png to webp converter, optimize images for web, reduce image size"
  }
]

// Enhanced FAQ data with long-tail keywords
const faqData = [
  {
    question: "How to merge multiple PDF files online for free at ilovepdf8.com?",
    answer: "To merge PDF files online for free, simply visit ilovepdf8.com and select the 'Merge PDF' tool. Upload your PDF files by clicking 'Select PDF files' or drag and drop them. Arrange the files in your desired order, then click 'Merge PDF' to combine them into a single document. The merged PDF will be ready for download in seconds."
  },
  {
    question: "Is it safe to use online PDF tools on ilovepdf8.com?",
    answer: "Yes, ilovepdf8.com uses advanced SSL encryption to protect your files during upload and processing. All uploaded files are automatically deleted from our servers after 1 hour to ensure your privacy and security. We never store, share, or access your personal documents."
  },
  
  {
    question: "How much can I compress a PDF file size online?",
    answer: "Our PDF compression tool can reduce file sizes by up to 90% while maintaining excellent quality. The compression ratio depends on your original file content - documents with many images typically achieve higher compression rates than text-only files."
  },
  {
    question: "Can I use this PDF tools on mobile devices?",
    answer: "Absolutely! ilovepdf8.com is fully responsive and works perfectly on smartphones, tablets, and desktop computers. All our PDF tools are optimized for mobile use, allowing you to edit, convert, and manage PDFs on any device with an internet connection."
  },
  
  
  {
    question: "Are there any file size limits for PDF processing?",
    answer: "Free users can upload files up to 25MB per file. For larger files or batch processing, consider our premium plans which offer increased file size limits and faster processing speeds."
  }
]

// Enhanced features with better descriptions
const enhancedFeatures = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast Processing",
    description: "Process PDF files in seconds with our optimized cloud infrastructure. No waiting, no delays.",
    color: "bg-red-500"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Bank-Level Security",
    description: "SSL encryption protects your files. Auto-deletion after 1 hour ensures complete privacy.",
    color: "bg-green-500"
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Universal Compatibility",
    description: "Works on any device, any browser, any operating system. No software installation needed.",
    color: "bg-blue-500"
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Premium Quality",
    description: "Advanced algorithms maintain original quality while optimizing file size and performance.",
    color: "bg-purple-500"
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "24/7 Availability",
    description: "Access our PDF tools anytime, anywhere. Our servers are always ready to process your files.",
    color: "bg-indigo-500"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "10M+ Happy Users",
    description: "Trusted by millions worldwide. Join the largest community of PDF tool users.",
    color: "bg-pink-500"
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Award-Winning Tools",
    description: "Industry-recognized PDF processing technology used by professionals globally.",
    color: "bg-orange-500"
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Optimized",
    description: "Perfect mobile experience with touch-friendly interface and responsive design.",
    color: "bg-teal-500"
  }
]

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  // Convert PDF tools for dropdown - updated with PNG tools
  const convertTools = [
    { title: "PDF to Word", href: "/tools/pdf-to-word" },
    { title: "PDF to JPG", href: "/tools/pdf-to-jpg" },
    { title: "PDF to PNG", href: "/tools/pdf-to-png" },
    { title: "Word to PDF", href: "/tools/word-to-pdf" },
    { title: "JPG to PDF", href: "/tools/jpg-to-pdf" },
    { title: "PNG to PDF", href: "/tools/png-to-pdf" },
    { title: "WebP to PNG", href: "/tools/webp-to-png" },
    { title: "PNG to WebP", href: "/tools/png-to-webp" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Meta Tags */}
      <title>Free PDF Tools Online - Merge, Split, Compress PDF | ilovepdf8.com</title>
      <meta name="description" content="Free online PDF tools to merge, split, compress, convert, and edit PDF files. Fast, secure, and easy to use. No software installation required. Try ilovepdf8.com now!" />
      <meta name="keywords" content="pdf tools, merge pdf, split pdf, compress pdf, pdf to word, word to pdf, pdf converter, online pdf editor, png to pdf, pdf to png, ilovepdf8.com" />
      <meta name="author" content="ilovepdf8.com" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Free PDF Tools Online - Merge, Split, Compress PDF | ilovepdf8.com" />
      <meta property="og:description" content="Complete suite of free PDF tools. Merge, split, compress, convert, and edit PDF files online. Fast, secure, and works on any device." />
      <meta property="og:url" content="https://ilovepdf8.com" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ilovepdf8.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free PDF Tools Online - ilovepdf8.com" />
      <meta name="twitter:description" content="Free online PDF tools to merge, split, compress, convert, and edit PDF files. Fast, secure, and easy to use." />
      <link rel="canonical" href="https://ilovepdf8.com" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">iLove</span>
              <span className="text-2xl font-bold text-red-500">PDF8</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/tools/merge" 
                className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors"
              >
                Merge PDF
              </Link>
              <Link 
                to="/tools/split" 
                className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors"
              >
                Split PDF
              </Link>
              <Link 
                to="/tools/compress" 
                className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors"
              >
                Compress PDF
              </Link>
              
              <div className="relative">
                <button 
                  className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider flex items-center transition-colors"
                  onMouseEnter={() => setConvertDropdownOpen(true)}
                  onMouseLeave={() => setConvertDropdownOpen(false)}
                >
                  Convert PDF
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button>
                
                {convertDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                    onMouseEnter={() => setConvertDropdownOpen(true)}
                    onMouseLeave={() => setConvertDropdownOpen(false)}
                  >
                    {convertTools.map((tool, index) => (
                      <Link
                        key={index}
                        to={tool.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors"
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider flex items-center transition-colors"
                  onMouseEnter={() => setAllToolsDropdownOpen(true)}
                  onMouseLeave={() => setAllToolsDropdownOpen(false)}
                >
                  All PDF tools
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button>
                
                {allToolsDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                    onMouseEnter={() => setAllToolsDropdownOpen(true)}
                    onMouseLeave={() => setAllToolsDropdownOpen(false)}
                  >
                    <div className="grid grid-cols-1 gap-0">
                      {pdfTools.slice(0, 8).map((tool, index) => (
                        <Link
                          key={index}
                          to={tool.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors"
                        >
                          {tool.title}
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link
                        to="/tools"
                        className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors"
                      >
                        View all tools →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
             
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t shadow-lg">
              <div className="px-4 py-4 space-y-4">
                <Link 
                  to="/tools/merge" 
                  className="block text-gray-700 hover:text-red-500 font-medium text-sm uppercase transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Merge PDF
                </Link>
                <Link 
                  to="/tools/split" 
                  className="block text-gray-700 hover:text-red-500 font-medium text-sm uppercase transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Split PDF
                </Link>
                <Link 
                  to="/tools/compress" 
                  className="block text-gray-700 hover:text-red-500 font-medium text-sm uppercase transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compress PDF
                </Link>
                <div className="pt-4 border-t space-y-3">
                  
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Unchanged as requested */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Every tool you need to work with PDFs in one place
          </h1>
          <p className="text-lg text-gray-600 mb-0 max-w-4xl mx-auto">
            Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! 
            Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {pdfTools.map((tool) => (
              <Link key={tool.id} to={tool.href} className="group">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-6 text-center relative border border-gray-100 min-h-[160px] md:min-h-[180px] flex flex-col hover:transform hover:scale-105">
                  {tool.isNew && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      New
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg ${tool.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {tool.iconSvg}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-red-500 transition-colors mb-2">
                    {tool.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed flex-1 line-clamp-3">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ilovepdf8.com for Your PDF Needs?
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              ilovepdf8.com offers the most comprehensive suite of PDF tools with unmatched quality, speed, and security. 
              Join millions of users who trust us for their daily PDF processing needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enhancedFeatures.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} text-white rounded-lg mb-4 group-hover:shadow-lg transition-shadow duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Use PDF Tools on ilovepdf8.com
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Processing PDFs on ilovepdf8.com is simple and straightforward. Follow these three easy steps to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full mb-6 text-2xl font-bold">
                1
              </div>
              <div className="mb-4">
                <Upload className="h-12 w-12 text-red-500 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Your Files</h3>
              <p className="text-gray-600">
                Select your PDF files or drag and drop them into the upload area. We support multiple file formats and batch uploads.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full mb-6 text-2xl font-bold">
                2
              </div>
              <div className="mb-4">
                <Palette className="h-12 w-12 text-green-500 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Your Tool</h3>
              <p className="text-gray-600">
                Select from our comprehensive suite of PDF tools. Customize settings if needed - most tools work with default settings.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mb-6 text-2xl font-bold">
                3
              </div>
              <div className="mb-4">
                <Download className="h-12 w-12 text-blue-500 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Download Results</h3>
              <p className="text-gray-600">
                Your processed files are ready in seconds. Download them instantly or get shareable links for easy distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content Section with Long-tail Keywords */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete PDF Management Solution at ilovepdf8.com
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-6 w-6 text-red-500 mr-2" />
                  Professional PDF Processing
                </h3>
                <p className="text-gray-600 mb-4">
                  ilovepdf8.com provides enterprise-grade PDF processing capabilities for businesses, students, and professionals. 
                  Our advanced algorithms ensure perfect quality preservation while optimizing file sizes and processing speeds.
                </p>
                <p className="text-gray-600">
                  Whether you need to merge quarterly reports, split large documentation, or compress files for email distribution, 
                  our tools handle complex PDF operations with ease and precision.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Image className="h-6 w-6 text-green-500 mr-2" />
                  Advanced Image Conversion
                </h3>
                <p className="text-gray-600 mb-4">
                  Convert between multiple image formats including JPG, PNG, WebP, and TIFF with ilovepdf8.com's powerful 
                  conversion engine. Our tools maintain image quality while optimizing for web performance and storage efficiency.
                </p>
                <p className="text-gray-600">
                  Perfect for web developers, graphic designers, and content creators who need reliable batch conversion 
                  capabilities with consistent results across different file types and sizes.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Why Millions Choose ilovepdf8.com for PDF Processing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">No Software Installation Required</h4>
                    <p className="text-gray-600 text-sm">
                      Access all PDF tools directly in your browser. Works on Windows, Mac, Linux, iOS, and Android devices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Unlimited File Processing</h4>
                    <p className="text-gray-600 text-sm">
                      Process as many files as you need. No daily limits, no subscription requirements for basic features.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Batch Processing Capabilities</h4>
                    <p className="text-gray-600 text-sm">
                      Handle multiple files simultaneously. Perfect for bulk operations and productivity workflows.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cloud-Based Processing</h4>
                    <p className="text-gray-600 text-sm">
                      Powerful servers handle heavy processing, saving your device's resources and battery life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About ilovepdf8.com
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our PDF tools and services
            </p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ? (
                    <Minus className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            ilovepdf8.com has become the go-to platform for PDF processing globally
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-red-500 mb-2">10M+</div>
              <div className="text-gray-600 font-medium">Monthly Active Users</div>
              <div className="text-sm text-gray-500 mt-1">Growing daily</div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-red-500 mb-2">500M+</div>
              <div className="text-gray-600 font-medium">Files Processed</div>
              <div className="text-sm text-gray-500 mt-1">Since launch</div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-red-500 mb-2">15+</div>
              <div className="text-gray-600 font-medium">PDF Tools Available</div>
              <div className="text-sm text-gray-500 mt-1">And growing</div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-red-500 mb-2">170+</div>
              <div className="text-gray-600 font-medium">Countries Served</div>
              <div className="text-sm text-gray-500 mt-1">Worldwide reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Works on Every Device
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf8.com is fully responsive and optimized for all devices. Process PDFs anywhere, anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-lg mb-4">
                <Monitor className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Desktop & Laptop</h3>
              <p className="text-gray-600">
                Full-featured experience on Windows, Mac, and Linux. Perfect for heavy-duty PDF processing tasks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-lg mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile & Tablet</h3>
              <p className="text-gray-600">
                Touch-optimized interface for iOS and Android. Process PDFs on the go with the same powerful tools.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-lg mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Any Browser</h3>
              <p className="text-gray-600">
                Works with Chrome, Firefox, Safari, Edge, and more. No plugins or extensions required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Start Processing Your PDFs Now
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join millions of users who trust ilovepdf8.com for their daily PDF needs. All tools are free and work instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/merge"
              className="bg-white text-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg inline-flex items-center justify-center"
            >
              Merge PDFs Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/tools/compress"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors text-lg inline-flex items-center justify-center"
            >
              Compress PDFs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <p className="text-red-100 mt-6 text-sm">
            Free to use • No registration required • Works on ilovepdf8.com
          </p>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo & Description */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center mb-4">
                <span className="text-xl font-bold text-gray-900">iLove</span>
                <span className="text-xl font-bold text-red-500">PDF</span>
              </Link>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                ilovepdf8.com - Your complete PDF solution. Every tool you need to process, convert, and manage PDF files online. Fast, secure, and 100% free.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-gray-200 hover:bg-red-500 hover:text-white rounded flex items-center justify-center transition-colors">
                  <span className="text-xs font-bold">f</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-200 hover:bg-red-500 hover:text-white rounded flex items-center justify-center transition-colors">
                  <span className="text-xs font-bold">t</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-200 hover:bg-red-500 hover:text-white rounded flex items-center justify-center transition-colors">
                  <span className="text-xs font-bold">in</span>
                </a>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">FEATURES</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors">Compress PDF</Link></li>
                <li><Link to="/tools/pdf-to-word" className="text-gray-600 hover:text-red-500 transition-colors">PDF to Word</Link></li>
              </ul>
            </div>

            {/* Convert */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">CONVERT</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/word-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors">Word to PDF</Link></li>
                <li><Link to="/tools/jpg-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors">JPG to PDF</Link></li>
                <li><Link to="/tools/pdf-to-jpg" className="text-gray-600 hover:text-red-500 transition-colors">PDF to JPG</Link></li>
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors">PNG to PDF</Link></li>
              </ul>
            </div>

            {/* Image Tools */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">IMAGE TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/webp-to-png" className="text-gray-600 hover:text-red-500 transition-colors">WebP to PNG</Link></li>
                <li><Link to="/tools/png-to-webp" className="text-gray-600 hover:text-red-500 transition-colors">PNG to WebP</Link></li>
                <li><Link to="/tools/pdf-to-png" className="text-gray-600 hover:text-red-500 transition-colors">PDF to PNG</Link></li>

              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">COMPANY</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/about-us" className="text-gray-600 hover:text-red-500 transition-colors">About ilovepdf8.com</a></li>
                <li><a href="/contact-us" className="text-gray-600 hover:text-red-500 transition-colors">Contact Us</a></li>
                <li><a href="/privacy" className="text-gray-600 hover:text-red-500 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-600 hover:text-red-500 transition-colors">Terms of Service</a></li>

              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2025 ilovepdf8.com - Free Online PDF Tools. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PDF lovers worldwide. All rights reserved.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <Link to="/terms" className="hover:text-red-500 transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-red-500 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Schema.org JSON-LD for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ilovepdf8.com - Free PDF Tools Online",
          "description": "Free online PDF tools to merge, split, compress, convert, and edit PDF files. Fast, secure, and easy to use PDF processing.",
          "url": "https://ilovepdf8.com",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150000"
          },
          "creator": {
            "@type": "Organization",
            "name": "ilovepdf8.com",
            "url": "https://ilovepdf8.com"
          }
        })}
      </script>
    </div>
  )
}

export default HomePage