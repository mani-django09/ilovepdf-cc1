import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import {
  Upload,
  FileText,
  Download,
  Check,
  AlertCircle,
  Loader,
  X,
  Star,
  Shield,
  Zap,
  Globe,
  ChevronDown,
  ChevronUp,
  Eye,
  Trash2,
  Clock,
  Users,
  Award,
  Heart,
  BookOpen,
  Lock,
  Menu,
  File,
  RefreshCw,
  Merge,
  Plus,
  Settings,
  BarChart3,
  Package,
  HardDrive,
  Monitor,
  Smartphone,
  Camera,
  Layers,
  ArrowRight,
  ImageIcon,
  Edit3,
  Sparkles,
  Minimize2
} from "lucide-react"

function PdfToWordConverter() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [files, setFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionComplete, setConversionComplete] = useState(false)
  const [error, setError] = useState("")
  const [convertedFile, setConvertedFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const fileInputRef = useRef(null)

  // Convert PDF tools for dropdown
  const convertTools = [
    { title: "PDF to Word", href: "/tools/pdf-to-word" },
    { title: "PDF to Excel", href: "/tools/pdf-to-excel" },
    { title: "PDF to PowerPoint", href: "/tools/pdf-to-powerpoint" },
    { title: "PDF to JPG", href: "/tools/pdf-to-jpg" },
    { title: "Word to PDF", href: "/tools/word-to-pdf" },
    { title: "Excel to PDF", href: "/tools/excel-to-pdf" },
    { title: "PowerPoint to PDF", href: "/tools/powerpoint-to-pdf" },
    { title: "JPG to PDF", href: "/tools/jpg-to-pdf" },
  ]

  // Enhanced FAQ with PDF to Word focus
  const faqData = [
    {
      question: "How to convert PDF to Word online free with ilovepdf.cc?",
      answer: "ilovepdf.cc offers the best online PDF to Word converter for transforming PDF documents into editable Word format. Simply upload your PDF file, click convert, and download the DOCX instantly. Our PDF to Word converter extracts text and maintains formatting for professional editing capabilities."
    },
    {
      question: "Does the PDF to Word converter preserve document formatting?",
      answer: "Yes! Our advanced PDF to Word converter maintains text structure, paragraphs, basic formatting, and document layout. While complex designs may need minor adjustments, the online converter ensures your Word document retains maximum readability and editability."
    },
    {
      question: "What PDF formats can I convert to Word documents?",
      answer: "Our PDF to Word converter supports standard PDF files and converts them to .DOCX Word format for full compatibility with Microsoft Word and other word processors. You can convert text-based PDFs, scanned documents, and multi-page files up to 25MB."
    },
    {
      question: "Is the online PDF to Word conversion secure and private?",
      answer: "Absolutely! ilovepdf.cc's PDF to Word converter uses enterprise-grade SSL encryption to protect your documents during conversion. All uploaded PDF files are processed securely and automatically deleted from our servers after conversion for complete privacy."
    },
    {
      question: "Can I edit the converted Word document after conversion?",
      answer: "Yes! The converted Word document is fully editable in Microsoft Word, Google Docs, or any compatible word processor. You can modify text, change formatting, add content, insert images, and save changes just like any standard Word document."
    },
    {
      question: "How long does PDF to Word conversion take online?",
      answer: "PDF to Word conversion typically takes 10-30 seconds depending on document size and complexity. Our optimized converter processes most PDF files instantly, making it the fastest online PDF to Word solution for immediate editing needs."
    },
    {
      question: "Can I convert multiple PDF files to Word simultaneously?",
      answer: "Currently, our PDF to Word converter processes one document at a time for optimal quality and accuracy. For multiple conversions, simply repeat the process for each PDF file you want to convert to Word format."
    },
    {
      question: "Does the PDF to Word converter work on mobile devices?",
      answer: "Yes! ilovepdf.cc's PDF to Word converter is fully optimized for mobile devices including smartphones and tablets. Convert PDF documents to Word on Android, iPhone, iPad, and any device with a web browser for convenient editing anywhere."
    }
  ]

  // PDF to Word features for benefits section
  const conversionFeatures = [
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: "Advanced PDF to Word Conversion",
      description: "Convert PDF files to editable Word documents with intelligent text extraction. Our PDF to Word converter maintains structure and formatting for professional editing.",
      color: "blue"
    },
    {
      icon: <Edit3 className="h-8 w-8" />,
      title: "Fully Editable Word Output",
      description: "Generate completely editable DOCX files from PDF documents. Modify text, formatting, and content with full Microsoft Word compatibility and editing freedom.",
      color: "green"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Document Processing",
      description: "Enterprise-grade encryption protects your PDF documents during Word conversion. All files are automatically deleted for complete privacy and security.",
      color: "purple"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning-Fast Conversion",
      description: "Instant PDF to Word conversion with optimized processing algorithms. Transform documents quickly without compromising quality or formatting accuracy.",
      color: "orange"
    }
  ]

  // PDF to Word capabilities
  const conversionCapabilities = [
    {
      icon: <FileText className="h-7 w-7" />,
      title: "Text Extraction Excellence",
      description: "Extract and preserve text content from PDF documents with intelligent recognition and structure maintenance for accurate Word conversion."
    },
    {
      icon: <Edit3 className="h-7 w-7" />,
      title: "Full Editing Capability",
      description: "Create fully editable Word documents from PDF files, enabling complete text modification, formatting changes, and content additions."
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Professional Quality Output",
      description: "Generate high-quality DOCX files from PDF documents with maintained readability and professional appearance for business use."
    }
  ]

  // PDF to Word use cases
  const useCases = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Business Documents",
      description: "Convert business reports, contracts, and presentations from PDF to Word for easy editing, collaboration, and content modification.",
      color: "blue"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Academic Research",
      description: "Transform research papers, thesis documents, and academic materials from PDF to Word format for citation, editing, and revision purposes.",
      color: "green"
    },
    {
      icon: <Edit3 className="h-5 w-5" />,
      title: "Content Editing",
      description: "Convert PDF content to Word for text extraction, content rewriting, translation, and comprehensive document editing workflows.",
      color: "purple"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Collaborative Work",
      description: "Transform PDF documents to Word format for team collaboration, shared editing, review processes, and version control management.",
      color: "orange"
    }
  ]

  const handleFileSelect = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      const isValidType = file.type === 'application/pdf' || 
                         file.name.toLowerCase().endsWith('.pdf')
      const isValidSize = file.size <= 25 * 1024 * 1024 // 25MB limit
      
      if (!isValidType) {
        setError("Please select only PDF documents")
        return false
      }
      if (!isValidSize) {
        setError("File size must be less than 25MB")
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      setError("")
      setFiles(validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        status: 'ready',
        preview: generateFilePreview(file)
      })))
    }
  }

  const generateFilePreview = (file) => {
    return {
      type: 'pdf',
      icon: File,
      content: `PDF Document\n${file.name}\n${formatFileSize(file.size)}`,
      pages: Math.ceil(file.size / 100000)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFiles = e.dataTransfer.files
    handleFileSelect(droppedFiles)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInputChange = (e) => {
    handleFileSelect(e.target.files)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const convertToWord = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setError("")
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      const formData = new FormData()
      formData.append('file', files[0].file)

      console.log("Starting conversion for:", files[0].name)

      const response = await fetch('/api/pdf-to-word', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("Conversion successful:", result)

      if (!result.downloadUrl || !result.downloadUrl.startsWith('/api/download/')) {
        console.error('Invalid download URL format:', result.downloadUrl)
        throw new Error('Invalid download URL received from server')
      }

      clearInterval(progressInterval)
      setProgress(100)

      setTimeout(() => {
        setConvertedFile({
          name: files[0].name.replace(/\.pdf$/i, '.docx'),
          downloadUrl: result.downloadUrl,
          size: result.convertedSize || Math.floor(files[0].size * 0.6),
          originalName: result.originalName || files[0].name
        })
        
        setIsConverting(false)
        setConversionComplete(true)
        setProgress(0)
      }, 500)

    } catch (err) {
      console.error('Conversion failed:', err)
      clearInterval(progressInterval)
      
      let errorMessage = 'Conversion failed. Please try again.'
      
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to the conversion server. Please make sure the backend server is running on port 5000.'
      } else if (err.message.includes('NetworkError')) {
        errorMessage = 'Network error. Please check your backend server is running.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      setIsConverting(false)
      setProgress(0)
    }
  }

  const downloadFile = async () => {
    if (!convertedFile || !convertedFile.downloadUrl) {
      console.error('No converted file available for download')
      setError('No file available for download')
      return
    }

    try {
      console.log('Attempting download from:', convertedFile.downloadUrl)
      
      const response = await fetch(convertedFile.downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }
      })
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`)
      }
      
      const blob = await response.blob()
      
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty')
      }
      
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = convertedFile.name
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setTimeout(() => window.URL.revokeObjectURL(url), 100)
      
    } catch (error) {
      console.error('Download failed:', error)
      setError(`Download failed: ${error.message}`)
    }
  }

  const previewFile = (file) => {
    setShowPreview(true)
  }

  const startOver = () => {
    setFiles([])
    setConversionComplete(false)
    setConvertedFile(null)
    setError("")
    setIsConverting(false)
    setProgress(0)
    setShowPreview(false)
  }

  const removeFile = (fileId) => {
    setFiles(files.filter(f => f.id !== fileId))
    setError("")
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced SEO Meta Tags */}
      {typeof document !== 'undefined' && (
        <>
          {(() => {
            // Set document title properly
            document.title = "PDF to Word Converter Online Free - Convert PDF to DOCX | ilovepdf.cc"
            
            // Set meta tags
            const metaTags = [
              { name: "description", content: "Convert PDF to Word online free with ilovepdf.cc. Professional PDF to Word converter for transforming PDF documents to editable DOCX format. Extract text with preserved formatting." },
              { name: "keywords", content: "pdf to word, pdf to word converter, online pdf to word, pdf to docx, convert pdf to word, pdf to word online, free pdf to word converter, pdf text extraction" },
              { name: "author", content: "ilovepdf.cc" },
              { name: "robots", content: "index, follow" },
              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
              { property: "og:title", content: "Free Online PDF to Word Converter - Convert PDF to DOCX | ilovepdf.cc" },
              { property: "og:description", content: "Professional PDF to Word converter for transforming PDF documents to editable Word format. Extract text and maintain formatting with our free online converter." },
              { property: "og:url", content: "https://ilovepdf.cc/tools/pdf-to-word" },
              { property: "og:type", content: "website" },
              { property: "og:site_name", content: "ilovepdf.cc" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Free PDF to Word Converter | ilovepdf.cc" },
              { name: "twitter:description", content: "Convert PDF documents to editable Word format online free. Professional PDF to Word converter with text extraction." }
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
            
            // Set canonical link
            let canonical = document.querySelector('link[rel="canonical"]')
            if (!canonical) {
              canonical = document.createElement('link')
              canonical.setAttribute('rel', 'canonical')
              document.head.appendChild(canonical)
            }
            canonical.setAttribute('href', 'https://ilovepdf.cc/tools/pdf-to-word')
          })()}
        </>
      )}

      {/* Header - Enhanced with proper active state */}
      <header className="bg-white shadow-sm border-b-2 border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">iLove</span>
              <span className="text-2xl font-bold text-red-500">PDF</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/tools/merge" 
                className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors duration-200"
              >
                Merge PDF
              </Link>
              <Link 
                to="/tools/split" 
                className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors duration-200"
              >
                Split PDF
              </Link>
              <Link 
                to="/tools/compress" 
                className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors duration-200"
              >
                Compress PDF
              </Link>
              
              <div className="relative">
                <button 
                  className="text-red-500 hover:text-red-600 font-medium text-sm uppercase tracking-wider flex items-center transition-colors duration-200"
                  onMouseEnter={() => setConvertDropdownOpen(true)}
                  onMouseLeave={() => setConvertDropdownOpen(false)}
                >
                  Convert Files
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
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          tool.title === "PDF to Word" 
                            ? "text-red-500 hover:bg-gray-50 font-medium" 
                            : "text-gray-700 hover:text-red-500 hover:bg-gray-50"
                        }`}
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/tools/edit-pdf" 
                className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider transition-colors duration-200"
              >
                Edit PDF
              </Link>
              
              <div className="relative">
                <button 
                  className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider flex items-center transition-colors duration-200"
                  onMouseEnter={() => setAllToolsDropdownOpen(true)}
                  onMouseLeave={() => setAllToolsDropdownOpen(false)}
                >
                  All Tools
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button>
                
                {allToolsDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                    onMouseEnter={() => setAllToolsDropdownOpen(true)}
                    onMouseLeave={() => setAllToolsDropdownOpen(false)}
                  >
                    <Link to="/tools/merge" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">Merge PDF</Link>
                    <Link to="/tools/split" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">Split PDF</Link>
                    <Link to="/tools/compress" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">Compress PDF</Link>
                    <Link to="/tools/pdf-to-word" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">PDF to Word</Link>
                    <Link to="/tools/edit-pdf" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">Edit PDF</Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link to="/" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">View all tools →</Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-red-500 font-medium text-sm transition-colors duration-200">
                Log in
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium text-sm transition-colors duration-200">
                Sign up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
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
                  className="block text-gray-700 hover:text-red-500 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Merge PDF
                </Link>
                <Link 
                  to="/tools/pdf-to-word" 
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  PDF to Word
                </Link>
                <div className="pt-4 border-t space-y-3">
                  <button className="block w-full text-left text-gray-700 hover:text-red-500 font-medium text-sm transition-colors duration-200">
                    Log in
                  </button>
                  <button className="block w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            PDF to Word Converter Online Free - Convert PDF to DOCX
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional PDF to Word converter for transforming PDF documents into editable Word format. Convert PDF files to DOCX online with intelligent text extraction and formatting preservation.
          </p>
        </div>
      </section>

      {/* Main Content - More compact mobile design */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
          {!conversionComplete ? (
            <>
              {/* Upload Area - Ultra compact when files selected */}
              <div 
                className={`border-2 border-dashed rounded-xl text-center transition-all duration-300 cursor-pointer mb-4 lg:mb-6 ${
                  isDragOver 
                    ? 'border-red-400 bg-red-50 scale-105 p-4 lg:p-6' 
                    : files.length > 0 
                      ? 'border-green-400 bg-green-50 p-3' 
                      : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50 hover:scale-105 p-4 lg:p-6' }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !isConverting && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={isConverting}
                />
                
                {files.length === 0 ? (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative">
                        <File className="h-10 lg:h-12 w-10 lg:w-12 text-gray-400" />
                        <ArrowRight className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                      {isDragOver ? 'Drop your PDF files here' : 'Select PDF documents to convert to Word'}
                    </h3>
                    <p className="text-gray-600 mb-3 lg:mb-4 text-sm">
                      Professional PDF to Word converter • Extract text • Secure processing
                    </p>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      disabled={isConverting}
                    >
                      Choose PDF Files
                    </button>
                    <p className="text-xs text-gray-500 mt-2 lg:mt-3">
                      Supports: PDF • Max file size: 25MB • Free PDF to Word conversion
                    </p>
                  </>
                ) : (
                  <>
                    <HardDrive className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {files.length} PDF document{files.length > 1 ? 's' : ''} ready to convert
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Total: {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))} • Ready for Word conversion
                    </p>
                    {!isConverting && (
                      <button className="text-red-500 hover:text-red-600 font-medium text-xs">
                        Click to add more PDF documents
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="h-4 lg:h-5 w-4 lg:w-5 text-red-500 mr-2 lg:mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-medium mb-1 text-sm lg:text-base">Error</p>
                    <p className="text-red-600 text-xs lg:text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* File List - Ultra compact */}
              {files.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 mb-2 text-xs">PDF document to convert ({files.length})</h4>
                  
                  <div className="space-y-1">
                    {files.map((fileObj) => (
                      <div key={fileObj.id} className="bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center justify-between">
                        <div className="flex items-center min-w-0 flex-1">
                          {/* PDF Icon - Very small */}
                          <div className="w-5 h-6 bg-red-500 text-white rounded flex items-center justify-center mr-2 flex-shrink-0">
                            <File className="h-2.5 w-2.5" />
                          </div>
                          
                          {/* File Info - Very compact */}
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-xs truncate">{fileObj.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(fileObj.size)} • Ready for Word conversion</p>
                          </div>
                        </div>
                        
                        {/* Controls - Minimal */}
                        <div className="flex items-center space-x-1 ml-2">
                          <button
                            onClick={() => previewFile(fileObj)}
                            className="text-blue-500 hover:text-blue-600 p-0.5"
                            title="Preview"
                          >
                            <Eye className="h-3 w-3" />
                          </button>
                          
                          {!isConverting && (
                            <button
                              onClick={() => removeFile(fileObj.id)}
                              className="text-gray-400 hover:text-red-500 p-0.5"
                              title="Remove"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Convert Button */}
              {files.length > 0 && !isConverting && (
                <div className="text-center">
                  <button
                    onClick={convertToWord}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
                  >
                    <RefreshCw className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Convert to Word
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Transform PDF document to editable Word format
                  </p>
                </div>
              )}

              {/* Converting State */}
              {isConverting && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-red-100 rounded-full mb-4">
                    <Loader className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Converting PDF to Word...</h3>
                  <p className="text-gray-600 text-sm mb-4">Extracting text and preserving formatting</p>
                  
                  {/* Progress Bar */}
                  <div className="max-w-xs mx-auto mb-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{width: `${progress}%`}}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{progress}% complete</p>
                </div>
              )}
            </>
          ) : (
            /* Conversion Complete - Compact design */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 lg:w-16 h-12 lg:h-16 bg-green-100 text-green-600 rounded-full mb-4 lg:mb-6">
                <Check className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">PDF to Word Conversion Complete!</h2>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
                Your PDF document has been successfully converted to editable Word format.
              </p>

              {/* Download Card */}
              {convertedFile && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 lg:p-4 max-w-sm mx-auto mb-4 lg:mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-2 lg:mr-3">
                        <FileText className="h-4 lg:h-5 w-4 lg:w-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900 text-xs lg:text-sm">{convertedFile.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(convertedFile.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={downloadFile}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors"
                    >
                      <Download className="h-3 lg:h-4 w-3 lg:w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={downloadFile}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Word Document
                </button>
                <button
                  onClick={startOver}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Convert Another File
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PDF Document Preview Modal - More compact */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[70vh] overflow-hidden">
            <div className="flex justify-between items-center p-3 lg:p-4 border-b">
              <h3 className="text-lg font-semibold">PDF Document Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 lg:p-6 text-center">
              {/* Very compact PDF Preview Content */}
              <div className="bg-white border border-gray-300 rounded-lg p-4 lg:p-6 mx-auto shadow-lg">
                <div className="text-center border-b border-gray-300 pb-2 lg:pb-3 mb-3 lg:mb-4">
                  <div className="text-red-500 text-xs font-medium mb-1">PDF DOCUMENT</div>
                  <h1 className="text-base lg:text-lg font-bold text-gray-900 truncate">{files[0]?.name}</h1>
                </div>
                
                <div className="space-y-3 text-gray-700">
                  <div className="bg-gray-100 p-3 rounded flex items-center justify-center">
                    <File className="h-8 lg:h-12 w-8 lg:w-12 text-gray-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center">
                      <span className="font-medium text-gray-600 text-xs">Document Size</span>
                      <div className="text-base lg:text-lg font-bold text-gray-900">
                        {files[0] && formatFileSize(files[0].size)}
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-gray-600 text-xs">Output Format</span>
                      <div className="text-base lg:text-lg font-bold text-blue-600">
                        DOCX
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-2 lg:p-3 rounded">
                    <h3 className="font-semibold mb-1 text-blue-900 text-sm">PDF to Word Conversion</h3>
                    <p className="text-xs text-blue-800">
                      Extract text and convert to editable Word document with preserved formatting.
                    </p>
                  </div>
                </div>

                <div className="text-center text-gray-500 text-xs mt-3 lg:mt-4">
                  <p>✓ Text extraction ✓ Fast conversion ✓ Editable output</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Features Section for PDF to Word */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Why Choose ilovepdf.cc's PDF to Word Converter?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional PDF to Word conversion capabilities with advanced text extraction and formatting preservation for all your editing needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {conversionFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-blue-500 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional PDF to Word Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 lg:mt-12">
            {conversionCapabilities.map((capability, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-red-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  {capability.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">{capability.title}</h3>
                <p className="text-gray-600 text-sm">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use PDF to Word Converter Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              How to Convert PDF to Word Online with ilovepdf.cc
            </h2>
            <p className="text-lg text-gray-600">
              Professional PDF to Word conversion in 3 simple steps using our advanced online converter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">1. Upload PDF Documents</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select PDF files for conversion or drag and drop them into our secure online PDF to Word converter. Supports files up to 25MB each.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <RefreshCw className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">2. Convert PDF to Word</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Click convert and our PDF to Word converter will process your document with intelligent text extraction and formatting preservation.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">3. Download Editable Word File</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Download your converted DOCX file instantly. Fully editable Word document with extracted text perfect for editing and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF to Word Use Cases Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Professional PDF to Word Conversion for Every Purpose
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF to Word converter serves professionals, students, and businesses with comprehensive document transformation capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center text-sm lg:text-base">
                  {useCase.icon}
                  <span className="ml-2">{useCase.title}</span>
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About PDF to Word Conversion
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about converting PDF documents to Word with ilovepdf.cc's online converter
            </p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <button
                  className="w-full px-4 lg:px-6 py-4 lg:py-5 text-left flex justify-between items-start hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-gray-900 pr-4 leading-tight text-sm lg:text-base">{faq.question}</span>
                  <div className="flex-shrink-0 mt-1">
                    {expandedFaq === index ? (
                      <ChevronUp className="h-4 lg:h-5 w-4 lg:w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 lg:h-5 w-4 lg:w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-4 lg:px-6 pb-4 lg:pb-5 border-t border-gray-100">
                    <p className="text-gray-600 pt-4 leading-relaxed text-sm lg:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced SEO Content Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to Online PDF to Word Conversion with ilovepdf.cc
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Why Use an Online PDF to Word Converter?
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  ilovepdf.cc's online PDF to Word converter revolutionizes document editing by providing professional-grade conversion directly in your browser. Unlike traditional PDF software that requires expensive licenses and complex installations, our web-based PDF to Word converter offers instant access to powerful text extraction tools. This cloud-based approach ensures you can convert PDF documents to Word from any device, anywhere, without compromising on functionality or security.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  The online PDF to Word converter extracts text content while preserving document structure and basic formatting, creating fully editable DOCX files. With advanced extraction algorithms and intelligent text recognition, every converted Word document maintains readability and professional appearance, making it perfect for professionals who need to edit documents, students working on assignments, or businesses requiring content modification.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Professional PDF to Word Conversion Features
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Advanced text extraction algorithms for accurate content recovery
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Intelligent formatting preservation and document structure maintenance
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Full DOCX compatibility with Microsoft Word and other processors
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Paragraph and text block recognition for proper document flow
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Secure cloud processing with automatic file deletion
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Professional-quality editable output for business use
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Advanced PDF to Word Conversion Technology
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Our PDF to Word converter utilizes cutting-edge text extraction technology to intelligently analyze PDF documents and recreate editable Word format. This sophisticated approach processes PDF content to identify text blocks, maintain paragraph structure, and preserve basic formatting elements. The converter automatically handles different content types including headers, body text, lists, and tables, ensuring optimal conversion results for each document section.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              PDF to Word Converter Security and Privacy
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Security is paramount when converting sensitive PDF documents online. ilovepdf.cc's PDF to Word converter employs enterprise-grade SSL encryption to protect your documents during the conversion process. All uploaded PDF files are processed on secure servers and automatically deleted within one hour of completion. This ensures that your confidential documents, whether they're business reports, legal contracts, research papers, or personal documents, remain completely private throughout the conversion session.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              PDF to Word Conversion Best Practices and Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="bg-blue-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center text-sm lg:text-base">
                  <File className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Document Optimization
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Text-based PDF files convert better than scanned documents. Ensure your PDF has selectable text for optimal Word conversion results and formatting preservation.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center text-sm lg:text-base">
                  <Edit3 className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Editing Preparation
                </h4>
                <p className="text-green-800 text-sm leading-relaxed">
                  The PDF to Word converter creates editable DOCX files ready for modification. Review formatting after conversion and make adjustments as needed for perfect results.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Why Choose ilovepdf.cc for PDF to Word Conversion?
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
              ilovepdf.cc stands as the premier choice for online PDF to Word conversion, combining powerful functionality with user-friendly design. Our PDF to Word converter offers professional-grade text extraction capabilities typically found only in expensive desktop software, but with the convenience and accessibility of a web-based platform. The intuitive interface makes PDF to Word conversion simple for beginners while providing the advanced features that professionals require.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
              With support for files up to 25MB, intelligent text extraction, and instant conversion processing, our PDF to Word converter handles everything from simple document conversion to complex text extraction workflows. The combination of powerful conversion tools, robust security measures, and seamless user experience makes ilovepdf.cc the trusted choice for millions of users worldwide who need to convert PDF documents to Word format online.
            </p>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Convert PDF to Word on Any Device
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF to Word converter works seamlessly across all devices and platforms for ultimate flexibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-blue-500 text-white rounded-xl mb-4">
                <Monitor className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Desktop PDF to Word</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Full-featured PDF to Word conversion on Windows, Mac, and Linux computers. Professional workflow support with advanced text extraction and document processing.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-green-500 text-white rounded-xl mb-4">
                <Smartphone className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Mobile PDF to Word</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Touch-optimized PDF to Word conversion on smartphones and tablets. Convert PDF documents on iOS and Android devices with responsive interface and mobile-friendly controls.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-purple-500 text-white rounded-xl mb-4">
                <Globe className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Browser-Based Converter</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                No downloads required. Works in Chrome, Firefox, Safari, Edge, and all modern browsers. Access the PDF to Word converter instantly from any device with internet connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions for PDF to Word Conversion Worldwide
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
            More than 10 million users worldwide rely on our PDF to Word converter every month for document editing
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">12M+</div>
              <div className="text-gray-600 text-sm lg:text-base">PDF documents converted</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">95%</div>
              <div className="text-gray-600 text-sm lg:text-base">Text extraction accuracy</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">15s</div>
              <div className="text-gray-600 text-sm lg:text-base">Average conversion time</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">170+</div>
              <div className="text-gray-600 text-sm lg:text-base">Countries served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">More PDF Tools for Complete Workflow</h2>
            <p className="text-lg text-gray-600">Explore additional PDF tools to enhance your document management workflow</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-blue-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <RefreshCw className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Word to PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Convert Word documents to PDF format with preserved formatting and professional quality.</p>
              <Link to="/tools/word-to-pdf" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Convert to PDF →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-green-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Minimize2 className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Compress PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Reduce PDF file sizes while maintaining quality for easier sharing and storage.</p>
              <Link to="/tools/compress" className="text-green-600 hover:text-green-700 font-medium text-sm">
                Compress PDFs →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-purple-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Merge className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Merge PDF Files</h3>
              <p className="text-gray-600 text-sm mb-4">Combine multiple PDF documents into one file with professional results.</p>
              <Link to="/tools/merge" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Merge PDFs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
            Ready to Convert Your PDF Documents to Word?
          </h2>
          <p className="text-lg lg:text-xl text-red-100 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Experience professional PDF to Word conversion with ilovepdf.cc's advanced online converter. Extract text and create editable documents with secure processing and instant download.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/word-to-pdf"
              className="bg-white text-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <RefreshCw className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              Word to PDF Converter
            </Link>
            <Link
              to="/tools/merge"
              className="border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <Merge className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              Merge PDF Files
            </Link>
          </div>
          <p className="text-red-100 mt-4 lg:mt-6 text-sm">
            Free PDF to Word conversion tools • No registration required • Secure processing on ilovepdf.cc
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
            {/* Logo & Description */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center mb-4">
                <span className="text-xl font-bold text-gray-900">iLove</span>
                <span className="text-xl font-bold text-red-500">PDF</span>
              </Link>
              <p className="text-gray-600 text-sm mb-4 lg:mb-6 leading-relaxed">
                Professional PDF to Word converter and document tools. All tools are 100% FREE and designed for professional use.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors">
                  <span className="text-xs font-bold text-gray-600">f</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors">
                  <span className="text-xs font-bold text-gray-600">t</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors">
                  <span className="text-xs font-bold text-gray-600">in</span>
                </a>
              </div>
            </div>

            {/* PDF Tools */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">PDF TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/pdf-to-word" className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium">PDF to Word</Link></li>
                <li><Link to="/tools/word-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Word to PDF</Link></li>
                <li><Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Compress PDF</Link></li>
              </ul>
            </div>

            {/* Convert */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">CONVERT</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/pdf-to-word" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to Word</Link></li>
                <li><Link to="/tools/word-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Word to PDF</Link></li>
                <li><Link to="/tools/pdf-to-jpg" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to JPG</Link></li>
                <li><Link to="/tools/jpg-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">JPG to PDF</Link></li>
                <li><Link to="/tools/excel-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Excel to PDF</Link></li>
              </ul>
            </div>

            {/* Optimize */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">OPTIMIZE</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Reduce PDF Size</Link></li>
                <li><Link to="/tools/edit-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Edit PDF</Link></li>
                <li><Link to="/tools/unlock" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Unlock PDF</Link></li>
                <li><Link to="/tools/protect" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Protect PDF</Link></li>
                <li><Link to="/tools/watermark" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Watermark PDF</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">COMPANY</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/about" className="text-gray-600 hover:text-red-500 transition-colors duration-200">About us</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Blog</a></li>
                <li><a href="/help" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Help</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Contact</a></li>
                <li><a href="/privacy" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Privacy</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-8 lg:mt-12 pt-6 lg:pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2024 ilovepdf.cc. Professional PDF to Word Converter. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PDF to Word conversion professionals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PdfToWordConverter