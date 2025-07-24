import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import {
  Upload,
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
  Menu,
  ArrowUp,
  ArrowDown,
  Plus,
  Scissors,
  GripVertical,
  Settings,
  Palette,
  FileText,
  Heart,
  Minimize2,
  Split,
  Layers,
  Copy,
  RotateCcw,
  RefreshCw,
  Merge,
  Edit3,
  Sparkles,
  ArrowRight,
  ImageIcon,
  HardDrive,
  Monitor,
  Smartphone,
  Camera,
  BarChart3,
  Package,
  Users,
  Award,
  BookOpen,
  Lock
} from "lucide-react"

function PdfSplitPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [pdfFile, setPdfFile] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isSplitting, setIsSplitting] = useState(false)
  const [splitComplete, setSplitComplete] = useState(false)
  const [error, setError] = useState("")
  const [splitResult, setSplitResult] = useState(null)
  const [progress, setProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [splitSettings, setSplitSettings] = useState({
    splitMethod: 'pages',
    customRanges: []
  })
  const [showSettings, setShowSettings] = useState(false)
  const [pageCount, setPageCount] = useState(null)
  const [newRangeStart, setNewRangeStart] = useState('')
  const [newRangeEnd, setNewRangeEnd] = useState('')
  const fileInputRef = useRef(null)

  // Convert tools for dropdown
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

  // Enhanced FAQ with PDF split focus
  const faqData = [
    {
      question: "How to split PDF files online free with ilovepdf.cc?",
      answer: "ilovepdf.cc offers the best online PDF splitter for dividing PDF documents into separate files. Simply upload your PDF file, choose split method (individual pages, ranges, or split in half), and download the split PDFs instantly. Our PDF splitter maintains original quality and formatting."
    },
    {
      question: "What PDF split methods are available in the online splitter?",
      answer: "Our PDF splitter offers three methods: Individual Pages (each page becomes a separate PDF), Split in Half (divide PDF into two equal parts), and Custom Ranges (extract specific page ranges). Choose the method that best fits your document organization needs."
    },
    {
      question: "Can I split specific page ranges from a PDF document?",
      answer: "Yes! Choose 'Custom Ranges' in our PDF splitter and specify which pages to extract. For example, enter '1-5' to get pages 1 through 5, or '1,3,7' to get specific pages only. This gives you precise control over PDF splitting."
    },
    {
      question: "Will the PDF splitter preserve document quality and formatting?",
      answer: "Absolutely! Our online PDF splitter maintains the original quality, formatting, fonts, images, and layout. The split PDF files are identical in quality to the original document, ensuring professional results for all your split documents."
    },
    {
      question: "What's the maximum PDF file size for online splitting?",
      answer: "Our PDF splitter supports files up to 50MB in size. This handles most business documents, academic papers, and reports efficiently. For larger files, consider using our PDF compression tool first to reduce file size before splitting."
    },
    {
      question: "Is the online PDF splitter secure for sensitive documents?",
      answer: "Yes! ilovepdf.cc's PDF splitter uses enterprise-grade SSL encryption to protect your documents during processing. All uploaded PDF files are automatically deleted from our servers after splitting for complete privacy and security."
    },
    {
      question: "Can I split password-protected PDF files?",
      answer: "Currently, our PDF splitter works with non-password-protected PDFs only. You'll need to remove the password protection before using our online PDF splitting tool. This ensures proper processing and accurate results."
    },
    {
      question: "Does the PDF splitter work on mobile devices and tablets?",
      answer: "Yes! ilovepdf.cc's PDF splitter is fully optimized for mobile devices including smartphones and tablets. Split PDF documents on Android, iPhone, iPad, and any device with a web browser for convenient document management anywhere."
    }
  ]

  // PDF split features for benefits section
  const splitFeatures = [
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Advanced PDF Splitting",
      description: "Split PDF documents with precision using multiple methods. Our PDF splitter offers individual pages, custom ranges, and half-split options for flexible document management.",
      color: "blue"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Smart Split Control",
      description: "Choose from multiple splitting methods with custom page range selection. Our PDF splitter provides complete control over document organization and page extraction.",
      color: "green"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure PDF Processing",
      description: "Enterprise-grade encryption protects your PDF documents during splitting. All files are automatically deleted for complete privacy and security.",
      color: "purple"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning-Fast Splitting",
      description: "Instant PDF splitting with optimized processing algorithms. Extract pages and divide documents quickly without compromising quality or formatting.",
      color: "orange"
    }
  ]

  // PDF split capabilities
  const splitCapabilities = [
    {
      icon: <Layers className="h-7 w-7" />,
      title: "Flexible Split Methods",
      description: "Multiple splitting options including individual pages, custom ranges, and half-split functionality for complete document organization control."
    },
    {
      icon: <Copy className="h-7 w-7" />,
      title: "Batch Page Extraction",
      description: "Extract multiple page ranges simultaneously with efficient processing, saving time for large document workflows and organization tasks."
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Quality Preservation",
      description: "Maintain original document quality, formatting, and structure in all split PDF files ensuring professional appearance and functionality."
    }
  ]

  // PDF split use cases
  const useCases = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Document Organization",
      description: "Split large reports, manuals, and presentations into focused sections for better organization and targeted distribution using our PDF splitter.",
      color: "blue"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Academic Materials",
      description: "Extract specific chapters, assignments, or sections from academic documents and textbooks for focused study and research purposes.",
      color: "green"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Business Workflows",
      description: "Split invoices, contracts, and business documents for department-specific distribution and streamlined workflow management processes.",
      color: "purple"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Content Distribution",
      description: "Divide large documents into smaller, manageable files for easier sharing, reduced file sizes, and improved user accessibility.",
      color: "orange"
    }
  ]

  const splitMethods = [
    { 
      value: 'pages', 
      label: 'Split into individual pages', 
      description: 'Each page becomes a separate PDF file',
      icon: <Layers className="h-4 w-4" />,
      expectedOutput: pageCount || 'Multiple'
    },
    { 
      value: 'half', 
      label: 'Split in half', 
      description: 'Divide PDF into two equal parts',
      icon: <Split className="h-4 w-4" />,
      expectedOutput: 2
    },
    { 
      value: 'ranges', 
      label: 'Custom page ranges', 
      description: 'Extract specific page ranges',
      icon: <Scissors className="h-4 w-4" />,
      expectedOutput: 'Custom'
    }
  ]

  const handleFileSelect = (selectedFiles) => {
    const file = selectedFiles[0]
    if (!file) return

    const isValidType = file.type === 'application/pdf' || 
                       file.name.toLowerCase().endsWith('.pdf')
    const isValidSize = file.size <= 50 * 1024 * 1024 // 50MB limit
    
    if (!isValidType) {
      setError("Please select a PDF file")
      return
    }
    if (!isValidSize) {
      setError("PDF file must be less than 50MB")
      return
    }

    setError("")
    setPdfFile({
      id: Date.now(),
      file,
      name: file.name,
      size: file.size,
      status: 'ready'
    })
    setPageCount(null)
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

  const addCustomRange = () => {
    const start = parseInt(newRangeStart)
    const end = parseInt(newRangeEnd) || start
    
    if (!start || start < 1) {
      setError("Please enter a valid start page number")
      return
    }
    
    if (pageCount && start > pageCount) {
      setError(`Start page cannot be greater than ${pageCount}`)
      return
    }
    
    if (end < start) {
      setError("End page cannot be less than start page")
      return
    }
    
    if (pageCount && end > pageCount) {
      setError(`End page cannot be greater than ${pageCount}`)
      return
    }

    const newRange = { start, end, id: Date.now() }
    setSplitSettings({
      ...splitSettings,
      customRanges: [...splitSettings.customRanges, newRange]
    })
    setNewRangeStart('')
    setNewRangeEnd('')
    setError("")
  }

  const removeCustomRange = (rangeId) => {
    setSplitSettings({
      ...splitSettings,
      customRanges: splitSettings.customRanges.filter(range => range.id !== rangeId)
    })
  }

  const getEstimatedOutput = () => {
    if (!pdfFile) return { files: 0, description: '' }
    
    if (splitSettings.splitMethod === 'pages') {
      const estimatedPages = pageCount || 10 // Default estimate
      return {
        files: estimatedPages,
        description: `${estimatedPages} individual PDF files (one per page)`
      }
    } else if (splitSettings.splitMethod === 'half') {
      return {
        files: 2,
        description: '2 PDF files (split in half)'
      }
    } else if (splitSettings.splitMethod === 'ranges') {
      return {
        files: splitSettings.customRanges.length,
        description: `${splitSettings.customRanges.length} PDF files (custom ranges)`
      }
    }
    
    return { files: 0, description: '' }
  }

  const splitPdf = async () => {
    if (!pdfFile) {
      setError("Please select a PDF file to split")
      return
    }

    if (splitSettings.splitMethod === 'ranges' && splitSettings.customRanges.length === 0) {
      setError("Please add at least one page range for custom splitting")
      return
    }

    setIsSplitting(true)
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
    }, 500)

    try {
      const formData = new FormData()
      
      // Add PDF file
      formData.append('file', pdfFile.file)

      // Add split settings
      formData.append('splitMethod', splitSettings.splitMethod)
      if (splitSettings.splitMethod === 'ranges') {
        formData.append('customRanges', JSON.stringify(splitSettings.customRanges))
      }

      console.log("Starting split for PDF:", pdfFile.name)

      // Use the PDF split API endpoint
      const response = await fetch('/api/pdf-split', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("Split successful:", result)

      clearInterval(progressInterval)
      setProgress(100)
      setPageCount(result.totalPages)

      setTimeout(() => {
        setSplitResult(result)
        setIsSplitting(false)
        setSplitComplete(true)
        setProgress(0)
      }, 500)

    } catch (err) {
      console.error('Split failed:', err)
      clearInterval(progressInterval)
      
      let errorMessage = 'Split failed. Please try again.'
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = 'Cannot connect to the PDF split server. Please make sure it is running on port 5000.'
      } else if (err.message.includes('ECONNREFUSED')) {
        errorMessage = 'PDF split server is not running. Please start the server on port 5000.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      setIsSplitting(false)
      setProgress(0)
    }
  }

  const downloadFile = async (fileUrl, fileName) => {
    if (!fileUrl) {
      setError('No split file available for download')
      return
    }

    try {
      const response = await fetch(fileUrl)
      
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
      link.download = fileName
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

  const startOver = () => {
    setPdfFile(null)
    setSplitComplete(false)
    setSplitResult(null)
    setError("")
    setIsSplitting(false)
    setProgress(0)
    setShowPreview(false)
    setPageCount(null)
    setSplitSettings({
      splitMethod: 'pages',
      customRanges: []
    })
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const previewPdf = () => {
    setShowPreview(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced SEO Meta Tags */}
      {typeof document !== 'undefined' && (
        <>
          {(() => {
            // Set document title properly
            document.title = "Split PDF Online Free - PDF Splitter Tool | ilovepdf.cc"
            
            // Set meta tags
            const metaTags = [
              { name: "description", content: "Split PDF files online free with ilovepdf.cc PDF splitter. Extract pages, divide documents into sections, and organize PDF content with professional quality preservation. No software required." },
              { name: "keywords", content: "split pdf, pdf splitter, online split pdf, extract pdf pages, divide pdf, pdf split tool, separate pdf pages, split pdf online free" },
              { name: "author", content: "ilovepdf.cc" },
              { name: "robots", content: "index, follow" },
              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
              { property: "og:title", content: "Free Online PDF Splitter - Extract Pages and Divide PDFs | ilovepdf.cc" },
              { property: "og:description", content: "Professional PDF splitter for dividing documents into separate files. Extract specific pages or ranges with quality preservation and secure processing." },
              { property: "og:url", content: "https://ilovepdf.cc/tools/split" },
              { property: "og:type", content: "website" },
              { property: "og:site_name", content: "ilovepdf.cc" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Free PDF Splitter Tool | ilovepdf.cc" },
              { name: "twitter:description", content: "Split PDF documents online free. Professional PDF splitter with page extraction and document organization." }
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
            canonical.setAttribute('href', 'https://ilovepdf.cc/tools/split')
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
                className="text-red-500 hover:text-red-600 font-medium text-sm uppercase tracking-wider transition-colors duration-200"
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
                  className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider flex items-center transition-colors duration-200"
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
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200"
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
                    <Link to="/tools/split" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">Split PDF</Link>
                    <Link to="/tools/compress" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">Compress PDF</Link>
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
                  to="/tools/split" 
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Split PDF
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
            Split PDF Online Free - Extract Pages and Divide PDF Documents
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional PDF splitter for dividing documents into separate files. Extract specific pages, split into ranges, or divide PDFs in half with quality preservation and secure processing.
          </p>
        </div>
      </section>

      {/* Main Content - More compact mobile design */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
          {!splitComplete ? (
            <>
              {/* Upload Area - Ultra compact when file selected */}
              <div 
                className={`border-2 border-dashed rounded-xl text-center transition-all duration-300 cursor-pointer mb-4 lg:mb-6 ${
                  isDragOver 
                    ? 'border-red-400 bg-red-50 scale-105 p-4 lg:p-6' 
                    : pdfFile 
                      ? 'border-green-400 bg-green-50 p-3' 
                      : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50 hover:scale-105 p-4 lg:p-6' }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !isSplitting && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={isSplitting}
                />
                
                {!pdfFile ? (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative">
                        <FileText className="h-10 lg:h-12 w-10 lg:w-12 text-gray-400" />
                        <Scissors className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                      {isDragOver ? 'Drop your PDF file here' : 'Select PDF file to split'}
                    </h3>
                    <p className="text-gray-600 mb-3 lg:mb-4 text-sm">
                      Professional PDF splitter • Extract pages • Secure processing
                    </p>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      disabled={isSplitting}
                    >
                      Choose PDF File
                    </button>
                    <p className="text-xs text-gray-500 mt-2 lg:mt-3">
                      Supports: PDF format • Max 50MB • Free PDF splitting
                    </p>
                  </>
                ) : (
                  <>
                    <HardDrive className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      PDF file ready to split
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {pdfFile.name} • {formatFileSize(pdfFile.size)}
                      {pageCount && <span className="ml-2 text-blue-600">• {pageCount} pages</span>}
                    </p>
                    {!isSplitting && (
                      <button className="text-red-500 hover:text-red-600 font-medium text-xs">
                        Click to select a different PDF
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Split Output Preview - Compact */}
              {pdfFile && !isSplitting && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center text-sm">
                    <Split className="h-3 w-3 mr-1" />
                    Split Output Preview
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-base font-bold text-gray-900">{getEstimatedOutput().files}</div>
                      <div className="text-xs text-gray-500">Output Files</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-purple-600">
                        {splitSettings.splitMethod === 'pages' ? 'Individual' : 
                         splitSettings.splitMethod === 'half' ? 'Half Split' : 'Custom'}
                      </div>
                      <div className="text-xs text-gray-500">Split Method</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-blue-600">PDF</div>
                      <div className="text-xs text-gray-500">File Format</div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-2 text-center">
                    {getEstimatedOutput().description}
                  </p>
                </div>
              )}

              {/* Split Settings - Compact */}
              {pdfFile && !isSplitting && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Split Settings</h4>
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="flex items-center text-xs text-gray-600 hover:text-red-500"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      {showSettings ? 'Hide' : 'Show'} Options
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                    {/* Split Method Selection - Compact */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        How would you like to split this PDF?
                      </label>
                      <div className="space-y-1">
                        {splitMethods.map(method => (
                          <label key={method.value} className="flex items-start cursor-pointer p-2 hover:bg-white rounded">
                            <input
                              type="radio"
                              name="splitMethod"
                              value={method.value}
                              checked={splitSettings.splitMethod === method.value}
                              onChange={(e) => setSplitSettings({
                                ...splitSettings, 
                                splitMethod: e.target.value
                              })}
                              className="mt-0.5 mr-2 text-red-500 focus:ring-red-500 text-xs"
                            />
                            <div className="flex items-center">
                              <div className="mr-2 text-gray-500">{method.icon}</div>
                              <div>
                                <div className="font-medium text-gray-900 text-xs">{method.label}</div>
                                <div className="text-xs text-gray-600">{method.description}</div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Custom Ranges - Compact */}
                    {splitSettings.splitMethod === 'ranges' && (
                      <div className="border-t pt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Custom Page Ranges
                        </label>
                        
                        {/* Add New Range - Compact */}
                        <div className="flex items-center space-x-1 mb-2">
                          <input
                            type="number"
                            min="1"
                            max={pageCount || 999}
                            placeholder="Start"
                            value={newRangeStart}
                            onChange={(e) => setNewRangeStart(e.target.value)}
                            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                          />
                          <span className="text-gray-500 text-xs">to</span>
                          <input
                            type="number"
                            min={newRangeStart || 1}
                            max={pageCount || 999}
                            placeholder="End"
                            value={newRangeEnd}
                            onChange={(e) => setNewRangeEnd(e.target.value)}
                            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                          />
                          <button
                            onClick={addCustomRange}
                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        {/* Range List - Compact */}
                        {splitSettings.customRanges.length > 0 && (
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-gray-700">Page ranges to extract:</div>
                            {splitSettings.customRanges.map((range, index) => (
                              <div key={range.id} className="flex items-center justify-between bg-white border rounded-md p-2">
                                <span className="text-xs">
                                  Pages {range.start}{range.end !== range.start && `-${range.end}`}
                                  <span className="text-gray-500 ml-1">
                                    ({range.end - range.start + 1} page{range.end - range.start + 1 > 1 ? 's' : ''})
                                  </span>
                                </span>
                                <button
                                  onClick={() => removeCustomRange(range.id)}
                                  className="text-red-500 hover:text-red-700 p-0.5"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {splitSettings.customRanges.length === 0 && (
                          <p className="text-xs text-gray-500 italic">
                            Add page ranges above. Example: pages 1-5, 10-15, etc.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-medium mb-1 text-sm">Error</p>
                    <p className="text-red-600 text-xs">{error}</p>
                  </div>
                </div>
              )}

              {/* File Preview - Ultra compact */}
              {pdfFile && !isSplitting && (
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 mb-2 text-xs">PDF file to split</h4>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center mr-2 flex-shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-xs truncate">{pdfFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(pdfFile.size)}
                            {pageCount && <span className="ml-1 text-blue-600">{pageCount} pages</span>}
                          </p>
                          <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full mt-1">
                            Ready to split
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={previewPdf}
                          className="text-gray-400 hover:text-green-500 p-1"
                          title="Preview"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => setPdfFile(null)}
                          className="text-gray-400 hover:text-red-500 p-1"
                          title="Remove"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Split Button */}
              {pdfFile && !isSplitting && (
                <div className="text-center">
                  <button
                    onClick={splitPdf}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
                  >
                    <Scissors className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Split PDF ({getEstimatedOutput().files} file{getEstimatedOutput().files > 1 ? 's' : ''})
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    {getEstimatedOutput().description}
                  </p>
                </div>
              )}

              {/* Splitting State */}
              {isSplitting && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-red-100 rounded-full mb-4">
                    <Loader className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Splitting your PDF file...</h3>
                  <p className="text-gray-600 text-sm mb-4">Extracting pages and creating separate files</p>
                  
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
            /* Split Complete - Compact design */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 lg:w-16 h-12 lg:h-16 bg-green-100 text-green-600 rounded-full mb-4 lg:mb-6">
                <Check className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">PDF Split Complete!</h2>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
                Your PDF has been successfully split into {splitResult?.download?.fileCount} file{splitResult?.download?.fileCount > 1 ? 's' : ''}.
              </p>

              {/* Split Summary - Compact */}
              {splitResult && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 lg:p-6 max-w-md mx-auto mb-4 lg:mb-6">
                  <div className="flex items-center justify-center mb-3 lg:mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-gray-900">1</div>
                        <div className="text-xs text-gray-500">Original PDF</div>
                      </div>
                      <div className="flex-shrink-0">
                        <Scissors className="h-4 lg:h-5 w-4 lg:w-5 text-green-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-green-600">
                          {splitResult.download.fileCount}
                        </div>
                        <div className="text-xs text-gray-500">Split Files</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center px-2 lg:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs lg:text-sm font-medium">
                      <FileText className="h-3 lg:h-4 w-3 lg:w-4 mr-1" />
                      {splitResult.totalPages} pages • {splitResult.splitMethod} method
                    </div>
                  </div>
                  
                  {/* Split Details - Compact */}
                  {splitResult.splitFiles && splitResult.splitFiles.length > 0 && (
                    <div className="mt-3 lg:mt-4 space-y-1">
                      <div className="text-xs lg:text-sm font-medium text-gray-700">Split breakdown:</div>
                      {splitResult.splitFiles.slice(0, 3).map((file, index) => (
                        <div key={index} className="text-xs text-gray-600 bg-white rounded px-2 py-1">
                          {file.name} • {file.pageRange} • {formatFileSize(file.size)}
                        </div>
                      ))}
                      {splitResult.splitFiles.length > 3 && (
                        <div className="text-xs text-gray-500 italic">
                          +{splitResult.splitFiles.length - 3} more files...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Download Section - Compact */}
              {splitResult?.download && (
                <div className="max-w-md mx-auto mb-4 lg:mb-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 lg:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-8 lg:w-10 h-8 lg:h-10 bg-red-500 text-white rounded-lg flex items-center justify-center mr-2 lg:mr-3">
                          {splitResult.download.type === 'zip' ? <Download className="h-4 lg:h-5 w-4 lg:w-5" /> : <FileText className="h-4 lg:h-5 w-4 lg:w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{splitResult.download.name}</p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(splitResult.download.size)}
                            <span className="ml-2 text-blue-600">
                              {splitResult.download.fileCount} file{splitResult.download.fileCount > 1 ? 's' : ''}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => downloadFile(splitResult.download.downloadUrl, splitResult.download.name)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors ml-2 lg:ml-3"
                      >
                        <Download className="h-3 lg:h-4 w-3 lg:w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => splitResult?.download && downloadFile(splitResult.download.downloadUrl, splitResult.download.name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Split Files
                </button>
                <button
                  onClick={startOver}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Split Another PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PDF Preview Modal - Compact */}
      {showPreview && pdfFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[70vh] overflow-hidden">
            <div className="flex justify-between items-center p-3 lg:p-4 border-b">
              <h3 className="text-lg font-semibold">PDF File Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 lg:p-6 text-center">
              <div className="bg-white border border-gray-300 rounded-lg p-4 lg:p-6 mx-auto shadow-lg">
                <div className="text-center border-b border-gray-300 pb-2 lg:pb-3 mb-3 lg:mb-4">
                  <div className="text-red-500 text-xs font-medium mb-1">PDF DOCUMENT</div>
                  <h1 className="text-base lg:text-lg font-bold text-gray-900 truncate">{pdfFile.name}</h1>
                </div>
                
                <div className="space-y-3 text-gray-700">
                  <div className="bg-gray-100 p-3 rounded flex items-center justify-center">
                    <FileText className="h-8 lg:h-12 w-8 lg:w-12 text-gray-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center">
                      <span className="font-medium text-gray-600 text-xs">Document Size</span>
                      <div className="text-base lg:text-lg font-bold text-gray-900">
                        {formatFileSize(pdfFile.size)}
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-gray-600 text-xs">Split Method</span>
                      <div className="text-base lg:text-lg font-bold text-red-600">
                        {splitSettings.splitMethod === 'pages' ? 'Individual' : 
                         splitSettings.splitMethod === 'half' ? 'Half Split' : 'Custom'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-2 lg:p-3 rounded">
                    <h3 className="font-semibold mb-1 text-red-900 text-sm">PDF Splitting</h3>
                    <p className="text-xs text-red-800">
                      Extract and organize PDF pages with {splitSettings.splitMethod} splitting method.
                    </p>
                  </div>
                </div>

                <div className="text-center text-gray-500 text-xs mt-3 lg:mt-4">
                  <p>✓ Quality preserved ✓ Fast splitting ✓ Secure processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Features Section for PDF Splitter */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Why Choose ilovepdf.cc's PDF Splitter?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional PDF splitting capabilities with advanced page extraction and document organization for all your splitting needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {splitFeatures.map((feature, index) => (
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

          {/* Additional PDF Split Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 lg:mt-12">
            {splitCapabilities.map((capability, index) => (
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

      {/* How to Use PDF Splitter Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              How to Split PDF Files Online with ilovepdf.cc
            </h2>
            <p className="text-lg text-gray-600">
              Professional PDF splitting in 3 simple steps using our advanced online splitter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">1. Upload PDF Document</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select your PDF file for splitting or drag and drop it into our secure online PDF splitter. Supports files up to 50MB each.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">2. Choose Split Method</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select splitting method and customize settings. Our PDF splitter offers individual pages, custom ranges, and half-split options for flexible organization.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">3. Download Split Files</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Download your split PDF files instantly. Quality-preserved documents organized exactly as specified for immediate use and distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Split Use Cases Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Professional PDF Splitting for Every Purpose
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF splitter serves professionals, students, and businesses with comprehensive document organization and page extraction capabilities
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
              Frequently Asked Questions About PDF Splitting
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about splitting PDF documents with ilovepdf.cc's online splitter
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
              Complete Guide to Online PDF Splitting with ilovepdf.cc
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Why Use an Online PDF Splitter?
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  ilovepdf.cc's online PDF splitter revolutionizes document organization by providing professional-grade splitting directly in your browser. Unlike traditional PDF software that requires expensive licenses and complex installations, our web-based PDF splitter offers instant access to powerful document organization tools. This cloud-based approach ensures you can split PDF documents from any device, anywhere, without compromising on functionality or security.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  The online PDF splitter extracts pages while preserving document quality and formatting, creating organized separate files. With advanced splitting algorithms and intelligent page extraction, every split PDF maintains professional appearance and functionality, making it perfect for professionals who need document organization, students working on research, or businesses requiring content distribution.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Professional PDF Splitting Features
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Multiple splitting methods for flexible document organization
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Custom page range extraction with precise control
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Quality preservation and formatting maintenance
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Individual page splitting and batch extraction
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Secure cloud processing with automatic file deletion
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Professional-quality output for business use
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Advanced PDF Splitting Technology
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Our PDF splitter utilizes cutting-edge document processing technology to intelligently analyze PDF documents and extract pages with precision. This sophisticated approach processes PDF content to maintain document integrity, preserve formatting elements, and ensure quality output. The splitter automatically handles different content types including text, images, tables, and graphics, ensuring optimal splitting results for each document section.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              PDF Splitter Security and Privacy
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Security is paramount when processing sensitive PDF documents online. ilovepdf.cc's PDF splitter employs enterprise-grade SSL encryption to protect your documents during the splitting process. All uploaded PDF files are processed on secure servers and automatically deleted within one hour of completion. This ensures that your confidential documents, whether they're business reports, legal contracts, academic papers, or personal documents, remain completely private throughout the splitting session.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              PDF Splitting Best Practices and Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="bg-blue-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center text-sm lg:text-base">
                  <Scissors className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Splitting Optimization
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Plan your splitting strategy before processing. Consider logical content breaks, page ranges, and intended use for optimal document organization and user experience.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center text-sm lg:text-base">
                  <Settings className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Method Selection
                </h4>
                <p className="text-green-800 text-sm leading-relaxed">
                  Choose the appropriate splitting method for your needs. Individual pages for maximum flexibility, custom ranges for specific sections, or half-split for simple division.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Why Choose ilovepdf.cc for PDF Splitting?
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
              ilovepdf.cc stands as the premier choice for online PDF splitting, combining powerful functionality with user-friendly design. Our PDF splitter offers professional-grade document organization capabilities typically found only in expensive desktop software, but with the convenience and accessibility of a web-based platform. The intuitive interface makes PDF splitting simple for beginners while providing the advanced features that professionals require.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
              With support for files up to 50MB, multiple splitting methods, and instant processing, our PDF splitter handles everything from simple page extraction to complex document organization workflows. The combination of powerful splitting tools, robust security measures, and seamless user experience makes ilovepdf.cc the trusted choice for millions of users worldwide who need to split PDF documents online.
            </p>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Split PDF Files on Any Device
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF splitter works seamlessly across all devices and platforms for ultimate flexibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-blue-500 text-white rounded-xl mb-4">
                <Monitor className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Desktop PDF Splitting</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Full-featured PDF splitting on Windows, Mac, and Linux computers. Professional workflow support with advanced page extraction and document organization.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-green-500 text-white rounded-xl mb-4">
                <Smartphone className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Mobile PDF Splitting</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Touch-optimized PDF splitting on smartphones and tablets. Split PDF documents on iOS and Android devices with responsive interface and mobile-friendly controls.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-purple-500 text-white rounded-xl mb-4">
                <Globe className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Browser-Based Splitter</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                No downloads required. Works in Chrome, Firefox, Safari, Edge, and all modern browsers. Access the PDF splitter instantly from any device with internet connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions for PDF Splitting Worldwide
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
            More than 10 million users worldwide rely on our PDF splitter every month for document organization
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">8M+</div>
              <div className="text-gray-600 text-sm lg:text-base">PDF documents split</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">3</div>
              <div className="text-gray-600 text-sm lg:text-base">Splitting methods</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">20s</div>
              <div className="text-gray-600 text-sm lg:text-base">Average split time</div>
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
                <Merge className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Merge PDF Files</h3>
              <p className="text-gray-600 text-sm mb-4">Combine multiple PDF documents into one file with professional results and quality preservation.</p>
              <Link to="/tools/merge" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Merge PDFs →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-green-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Minimize2 className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Compress PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Reduce PDF file sizes while maintaining quality for easier sharing and storage management.</p>
              <Link to="/tools/compress" className="text-green-600 hover:text-green-700 font-medium text-sm">
                Compress PDFs →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-purple-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <RefreshCw className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">PDF to Word</h3>
              <p className="text-gray-600 text-sm mb-4">Convert PDF documents to editable Word format with text extraction and formatting preservation.</p>
              <Link to="/tools/pdf-to-word" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Convert to Word →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
            Ready to Split Your PDF Documents?
          </h2>
          <p className="text-lg lg:text-xl text-red-100 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Experience professional PDF splitting with ilovepdf.cc's advanced online splitter. Extract pages and organize documents with secure processing and instant download.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/merge"
              className="bg-white text-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <Merge className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              Merge PDF Files
            </Link>
            <Link
              to="/tools/compress"
              className="border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <Minimize2 className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              Compress PDF Files
            </Link>
          </div>
          <p className="text-red-100 mt-4 lg:mt-6 text-sm">
            Free PDF splitting tools • No registration required • Secure processing on ilovepdf.cc
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
                Professional PDF splitter and document tools. All tools are 100% FREE and designed for professional document organization.
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
                <li><Link to="/tools/split" className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium">Split PDF</Link></li>
                <li><Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Merge PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Compress PDF</Link></li>
                <li><Link to="/tools/pdf-to-word" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to Word</Link></li>
                <li><Link to="/tools/edit-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Edit PDF</Link></li>
              </ul>
            </div>

            {/* Organize */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">ORGANIZE</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Split PDF Pages</Link></li>
                <li><Link to="/tools/extract-pages" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Extract Pages</Link></li>
                <li><Link to="/tools/remove-pages" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Remove Pages</Link></li>
                <li><Link to="/tools/rotate" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Rotate PDF</Link></li>
                <li><Link to="/tools/reorder" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Reorder Pages</Link></li>
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
              © 2024 ilovepdf.cc. Professional PDF Splitter Tool. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PDF splitting professionals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PdfSplitPage