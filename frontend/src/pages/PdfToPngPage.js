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
  Image as ImageIcon,
  Edit3,
  Sparkles,
  Minimize2,
  Grid3x3,
  Palette,
  MousePointer,
  Target,
  Scissors,
  ArrowUp,
  ArrowDown,
  GripVertical
} from "lucide-react"

function PdfToPngConverter() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [pdfFiles, setPdfFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionComplete, setConversionComplete] = useState(false)
  const [error, setError] = useState("")
  const [convertedFiles, setConvertedFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [conversionSettings, setConversionSettings] = useState({
    outputFormat: 'png',
    quality: 'high',
    dpi: '300',
    pageRange: 'all',
    startPage: '1',
    endPage: '1',
    colorSpace: 'rgb',
    transparency: true
  })
  const [showSettings, setShowSettings] = useState(false)
  const fileInputRef = useRef(null)

  // Enhanced SEO Meta Tags
  if (typeof document !== 'undefined') {
    // Set document title properly
    document.title = "PDF to PNG Converter Online Free - Convert PDF to PNG Images | ilovepdf.cc"
    
    // Set meta tags
    const metaTags = [
      { name: "description", content: "Convert PDF to PNG online free with ilovepdf.cc. Professional PDF to PNG converter for extracting pages as high-quality images with custom DPI settings. Extract PDF pages to PNG format instantly." },
      { name: "keywords", content: "pdf to png, pdf to png converter, online pdf to png, convert pdf to png, pdf to png online free, extract pdf pages, pdf to image, pdf page to png" },
      { name: "author", content: "ilovepdf.cc" },
      { name: "robots", content: "index, follow" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { property: "og:title", content: "Free Online PDF to PNG Converter - Extract PDF Pages as PNG Images | ilovepdf.cc" },
      { property: "og:description", content: "Professional PDF to PNG converter for extracting document pages as high-quality PNG images. Custom DPI settings, transparency support, and batch conversion." },
      { property: "og:url", content: "https://ilovepdf.cc/tools/pdf-to-png" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ilovepdf.cc" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free PDF to PNG Converter | ilovepdf.cc" },
      { name: "twitter:description", content: "Convert PDF documents to PNG images online free. Professional PDF to PNG converter with quality settings." }
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
    canonical.setAttribute('href', 'https://ilovepdf.cc/tools/pdf-to-png')
  }

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

  // Enhanced FAQ with PDF to PNG focus
  const faqData = [
    {
      question: "How to convert PDF to PNG online free with ilovepdf.cc?",
      answer: "ilovepdf.cc offers the best online PDF to PNG converter for extracting PDF pages as high-quality PNG images. Simply upload your PDF file, choose quality settings like DPI and transparency, select pages to convert, and download PNG images instantly. Our PDF to PNG converter maintains image quality with customizable settings."
    },
    {
      question: "What PNG quality settings are available in the PDF to PNG converter?",
      answer: "Our PDF to PNG converter offers multiple quality options: High Quality (300 DPI) for printing, Medium Quality (150 DPI) for general use, Web Quality (72 DPI) for online use, and Professional (600 DPI) for premium printing. Choose the DPI setting that best fits your PDF to PNG conversion needs."
    },
    {
      question: "Can I convert specific pages from PDF to PNG format?",
      answer: "Yes! Our PDF to PNG converter allows you to convert all pages or specify custom page ranges. For example, enter '1-5' to convert pages 1 through 5 to PNG, or '1,3,5' to convert specific pages only. This gives you precise control over PDF to PNG extraction."
    },
    {
      question: "Does the PDF to PNG converter preserve transparency and image quality?",
      answer: "Absolutely! Our PDF to PNG converter can preserve transparency from PDF files when enabled, maintaining alpha channels for professional results. The converter uses lossless PNG compression to ensure maximum image quality preservation during PDF to PNG conversion."
    },
    {
      question: "What's the maximum PDF file size for PNG conversion?",
      answer: "Our PDF to PNG converter supports files up to 50MB per PDF, with batch conversion of up to 10 files simultaneously. Total batch size limit is 200MB for optimal PDF to PNG processing speed and quality."
    },
    {
      question: "How are PNG images organized after PDF to PNG conversion?",
      answer: "Each PDF page becomes a separate PNG file, numbered sequentially (page-1.png, page-2.png, etc.). When converting multiple PDFs to PNG, files are organized in separate folders within a ZIP archive for easy download and organization."
    },
    {
      question: "Is the online PDF to PNG converter secure for sensitive documents?",
      answer: "Yes! ilovepdf.cc's PDF to PNG converter uses enterprise-grade SSL encryption to protect your documents during PNG conversion. All uploaded PDF files are automatically deleted from our servers after conversion for complete privacy and security."
    },
    {
      question: "Does the PDF to PNG converter work on mobile devices?",
      answer: "Yes! Our PDF to PNG converter is fully optimized for mobile devices including smartphones and tablets. Convert PDF documents to PNG images on Android, iPhone, iPad, and any device with a web browser for convenient image extraction anywhere."
    }
  ]

  // PDF to PNG conversion features
  const conversionFeatures = [
    {
      icon: <ImageIcon className="h-8 w-8" />,
      title: "Advanced PDF to PNG Conversion",
      description: "Convert PDF pages to high-quality PNG images with intelligent extraction. Our PDF to PNG converter offers custom DPI settings and transparency preservation for professional results.",
      color: "blue"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Customizable PNG Settings",
      description: "Control PNG output quality with DPI selection, color space options, and transparency settings. Our PDF to PNG converter provides complete control over image extraction parameters.",
      color: "green"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure PNG Processing",
      description: "Enterprise-grade encryption protects your PDF documents during PNG conversion. All files are automatically deleted for complete privacy and security during PDF to PNG processing.",
      color: "purple"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning-Fast PNG Extraction",
      description: "Instant PDF to PNG conversion with optimized processing algorithms. Extract PDF pages as PNG images quickly without compromising quality or visual fidelity.",
      color: "orange"
    }
  ]

  // PDF to PNG capabilities
  const conversionCapabilities = [
    {
      icon: <Layers className="h-7 w-7" />,
      title: "Flexible Page Extraction",
      description: "Extract all pages or select specific ranges from PDF documents. Our PDF to PNG converter provides complete control over which pages to convert to PNG format."
    },
    {
      icon: <Palette className="h-7 w-7" />,
      title: "Color Space Control",
      description: "Choose RGB for digital use, CMYK for print, or grayscale for document archiving. Comprehensive color space options for professional PDF to PNG conversion."
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Professional PNG Quality",
      description: "Generate high-quality PNG images with lossless compression and transparency support, ensuring professional appearance for all PDF to PNG conversions."
    }
  ]

  // PDF to PNG use cases
  const useCases = [
    {
      icon: <ImageIcon className="h-5 w-5" />,
      title: "Image Extraction",
      description: "Extract graphics, diagrams, and visual content from PDF documents as PNG images for use in presentations, websites, and design projects.",
      color: "blue"
    },
    {
      icon: <Grid3x3 className="h-5 w-5" />,
      title: "Document Thumbnails",
      description: "Create PNG thumbnails from PDF pages for document preview systems, content management, and visual file organization workflows.",
      color: "green"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Print Preparation",
      description: "Convert PDF pages to high-DPI PNG images for professional printing, publication layouts, and high-quality reproduction requirements.",
      color: "purple"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Web Content",
      description: "Transform PDF content to PNG format for web publishing, social media sharing, and digital content distribution with optimized file sizes.",
      color: "orange"
    }
  ]

  const qualityLevels = [
    { 
      value: 'high', 
      label: 'High Quality (300 DPI)', 
      description: 'Best for printing and professional use',
      expectedSize: 'Large files, best quality'
    },
    { 
      value: 'medium', 
      label: 'Medium Quality (150 DPI)', 
      description: 'Good balance for most uses',
      expectedSize: 'Medium files, good quality'
    },
    { 
      value: 'web', 
      label: 'Web Quality (72 DPI)', 
      description: 'Optimized for web and email',
      expectedSize: 'Small files, web optimized'
    }
  ]

  const dpiOptions = [
    { value: '72', label: '72 DPI (Web)', description: 'Standard web resolution' },
    { value: '150', label: '150 DPI (Medium)', description: 'Good for most uses' },
    { value: '300', label: '300 DPI (Print)', description: 'High quality for printing' },
    { value: '600', label: '600 DPI (Professional)', description: 'Professional printing quality' }
  ]

  const colorSpaceOptions = [
    { value: 'rgb', label: 'RGB Color', description: 'Standard color for screens' },
    { value: 'grayscale', label: 'Grayscale', description: 'Black and white images' },
    { value: 'cmyk', label: 'CMYK', description: 'Print color space' }
  ]

  const handleFileSelect = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      const isValidType = file.type === 'application/pdf' || 
                         file.name.toLowerCase().endsWith('.pdf')
      const isValidSize = file.size <= 50 * 1024 * 1024 // 50MB limit per file
      
      if (!isValidType) {
        setError("Please select only PDF files")
        return false
      }
      if (!isValidSize) {
        setError("Each PDF file must be less than 50MB")
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      if (pdfFiles.length + validFiles.length > 10) {
        setError("You can convert up to 10 PDF files at once")
        return
      }

      const totalSize = [...pdfFiles, ...validFiles].reduce((sum, file) => sum + (file.size || 0), 0)
      if (totalSize > 200 * 1024 * 1024) {
        setError("Total file size must be less than 200MB")
        return
      }

      setError("")
      const newFiles = validFiles.map((file, index) => ({
        id: Date.now() + Math.random() + index,
        file,
        name: file.name,
        size: file.size,
        status: 'ready',
        pageCount: null,
        originalSize: file.size
      }))
      
      setPdfFiles(prev => [...prev, ...newFiles])
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

  const getEstimatedOutputSize = () => {
    const baseSizePerPage = conversionSettings.dpi === '600' ? 5 : 
                           conversionSettings.dpi === '300' ? 2 : 
                           conversionSettings.dpi === '150' ? 1 : 0.5
    
    const estimatedPages = pdfFiles.length * 5 // Assume average 5 pages per PDF
    const estimatedSizeMB = estimatedPages * baseSizePerPage
    
    return {
      pages: estimatedPages,
      size: `${estimatedSizeMB.toFixed(1)} MB`,
      description: `Estimated ${estimatedPages} PNG images at ${conversionSettings.dpi} DPI`
    }
  }

  const convertToPng = async () => {
    if (pdfFiles.length === 0) {
      setError("Please select at least 1 PDF file to convert")
      return
    }

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
    }, 500)

    try {
      const formData = new FormData()
      
      // Add PDF files
      pdfFiles.forEach((fileObj, index) => {
        formData.append('files', fileObj.file)
        formData.append('order', index.toString())
      })

      // Add conversion settings
      formData.append('outputFormat', conversionSettings.outputFormat)
      formData.append('quality', conversionSettings.quality)
      formData.append('dpi', conversionSettings.dpi)
      formData.append('pageRange', conversionSettings.pageRange)
      formData.append('startPage', conversionSettings.startPage)
      formData.append('endPage', conversionSettings.endPage)
      formData.append('colorSpace', conversionSettings.colorSpace)
      formData.append('transparency', conversionSettings.transparency.toString())

      console.log("Starting conversion for", pdfFiles.length, "PDF files to PNG")

      // Use the PDF to PNG API endpoint
      const response = await fetch('/api/pdf-to-png', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("Conversion successful:", result)

      clearInterval(progressInterval)
      setProgress(100)

      setTimeout(() => {
        setConvertedFiles(result.convertedFiles || [])
        setIsConverting(false)
        setConversionComplete(true)
        setProgress(0)
      }, 500)

    } catch (err) {
      console.error('Conversion failed:', err)
      clearInterval(progressInterval)
      
      let errorMessage = 'PDF to PNG conversion failed. Please try again.'
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = 'Cannot connect to the PDF to PNG server. Please make sure the backend server is running on port 5000.'
      } else if (err.message.includes('ECONNREFUSED')) {
        errorMessage = 'PDF to PNG server is not running. Please start the server on port 5000.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      setIsConverting(false)
      setProgress(0)
    }
  }

  const downloadFile = async (fileUrl, fileName) => {
    if (!fileUrl) {
      setError('No converted PNG file available for download')
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

  const downloadAllFiles = async () => {
    if (convertedFiles.length === 0) return
    
    if (convertedFiles.length === 1) {
      await downloadFile(convertedFiles[0].downloadUrl, convertedFiles[0].name)
    } else {
      // Download ZIP file if multiple files
      const zipFile = convertedFiles.find(file => file.isZip)
      if (zipFile) {
        await downloadFile(zipFile.downloadUrl, zipFile.name)
      }
    }
  }

  const removeFile = (fileId) => {
    setPdfFiles(pdfFiles.filter(file => file.id !== fileId))
    setError("")
  }

  const moveFile = (index, direction) => {
    const newFiles = [...pdfFiles]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]]
      setPdfFiles(newFiles)
    }
  }

  const startOver = () => {
    setPdfFiles([])
    setConversionComplete(false)
    setConvertedFiles([])
    setError("")
    setIsConverting(false)
    setProgress(0)
    setShowPreview(false)
    setPreviewFile(null)
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const getTotalSize = () => {
    return pdfFiles.reduce((sum, file) => sum + file.size, 0)
  }

  const previewPdf = (fileObj) => {
    setPreviewFile(fileObj)
    setShowPreview(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                          tool.title === "PDF to PNG" 
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
                    <Link to="/tools/pdf-to-png" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">PDF to PNG</Link>
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
                  to="/tools/pdf-to-png" 
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  PDF to PNG
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
            PDF to PNG Converter Online Free - Extract PDF Pages as PNG Images
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional PDF to PNG converter for extracting document pages as high-quality PNG images. Convert PDF to PNG with custom DPI settings, transparency support, and batch processing for professional image extraction.
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
                    : pdfFiles.length > 0 
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
                  multiple
                />
                
                {pdfFiles.length === 0 ? (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative">
                        <FileText className="h-10 lg:h-12 w-10 lg:w-12 text-gray-400" />
                        <ImageIcon className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                      {isDragOver ? 'Drop your PDF files here' : 'Select PDF files to convert to PNG'}
                    </h3>
                    <p className="text-gray-600 mb-3 lg:mb-4 text-sm">
                      Professional PDF to PNG converter • Extract pages • Custom DPI settings
                    </p>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      disabled={isConverting}
                    >
                      Choose PDF Files
                    </button>
                    <p className="text-xs text-gray-500 mt-2 lg:mt-3">
                      Supports: PDF format • Up to 10 files • Max 50MB per file • Free PDF to PNG conversion
                    </p>
                  </>
                ) : (
                  <>
                    <HardDrive className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {pdfFiles.length} PDF file{pdfFiles.length > 1 ? 's' : ''} ready to convert
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Total: {formatFileSize(getTotalSize())} • Ready for PNG extraction
                    </p>
                    {!isConverting && (
                      <button className="text-red-500 hover:text-red-600 font-medium text-xs">
                        Click to add more PDF files
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* PNG Output Preview - Compact */}
              {pdfFiles.length > 0 && !isConverting && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center text-sm">
                    <Layers className="h-3 w-3 mr-1" />
                    PNG Output Preview
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-base font-bold text-gray-900">{conversionSettings.dpi} DPI</div>
                      <div className="text-xs text-gray-500">Image Quality</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-purple-600">
                        {conversionSettings.pageRange === 'all' ? 'All Pages' : 'Custom Range'}
                      </div>
                      <div className="text-xs text-gray-500">Page Selection</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-blue-600">
                        {getEstimatedOutputSize().size}
                      </div>
                      <div className="text-xs text-gray-500">Estimated Size</div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-2 text-center">
                    {getEstimatedOutputSize().description}
                  </p>
                </div>
              )}

              {/* PNG Conversion Settings - Compact */}
              {pdfFiles.length > 0 && !isConverting && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">PNG Conversion Settings</h4>
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="flex items-center text-xs text-gray-600 hover:text-red-500"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      {showSettings ? 'Hide' : 'Show'} Settings
                    </button>
                  </div>
                  
                  {showSettings && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                      {/* Quality Setting - Compact */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          PNG Image Quality & DPI
                        </label>
                        <div className="space-y-1">
                          {qualityLevels.map(level => (
                            <label key={level.value} className="flex items-start cursor-pointer p-2 hover:bg-white rounded">
                              <input
                                type="radio"
                                name="quality"
                                value={level.value}
                                checked={conversionSettings.quality === level.value}
                                onChange={(e) => setConversionSettings({
                                  ...conversionSettings, 
                                  quality: e.target.value,
                                  dpi: e.target.value === 'high' ? '300' : e.target.value === 'medium' ? '150' : '72'
                                })}
                                className="mt-0.5 mr-2 text-red-500 focus:ring-red-500 text-xs"
                              />
                              <div>
                                <div className="font-medium text-gray-900 text-xs">{level.label}</div>
                                <div className="text-xs text-gray-600">{level.description}</div>
                                <div className="text-xs text-blue-600">{level.expectedSize}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Custom DPI - Compact */}
                      <div className="border-t pt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Custom DPI (Advanced)
                        </label>
                        <select
                          value={conversionSettings.dpi}
                          onChange={(e) => setConversionSettings({...conversionSettings, dpi: e.target.value})}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          {dpiOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label} - {option.description}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Page Range - Compact */}
                      <div className="border-t pt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Page Range
                        </label>
                        <div className="space-y-1">
                          <label className="flex items-center cursor-pointer p-1 hover:bg-white rounded">
                            <input
                              type="radio"
                              name="pageRange"
                              value="all"
                              checked={conversionSettings.pageRange === 'all'}
                              onChange={(e) => setConversionSettings({...conversionSettings, pageRange: e.target.value})}
                              className="mr-2 text-red-500 focus:ring-red-500 text-xs"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-xs">All Pages</div>
                              <div className="text-xs text-gray-600">Convert every page to PNG</div>
                            </div>
                          </label>
                          <label className="flex items-center cursor-pointer p-1 hover:bg-white rounded">
                            <input
                              type="radio"
                              name="pageRange"
                              value="custom"
                              checked={conversionSettings.pageRange === 'custom'}
                              onChange={(e) => setConversionSettings({...conversionSettings, pageRange: e.target.value})}
                              className="mr-2 text-red-500 focus:ring-red-500 text-xs"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-xs">Custom Range</div>
                              <div className="text-xs text-gray-600 mb-1">Specify page numbers or ranges</div>
                              {conversionSettings.pageRange === 'custom' && (
                                <div className="grid grid-cols-2 gap-1">
                                  <div>
                                    <label className="text-xs text-gray-500">Start Page</label>
                                    <input
                                      type="number"
                                      min="1"
                                      value={conversionSettings.startPage}
                                      onChange={(e) => setConversionSettings({...conversionSettings, startPage: e.target.value})}
                                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-red-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-gray-500">End Page</label>
                                    <input
                                      type="number"
                                      min="1"
                                      value={conversionSettings.endPage}
                                      onChange={(e) => setConversionSettings({...conversionSettings, endPage: e.target.value})}
                                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-red-500"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      {/* Color Space - Compact */}
                      <div className="border-t pt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Color Space
                        </label>
                        <select
                          value={conversionSettings.colorSpace}
                          onChange={(e) => setConversionSettings({...conversionSettings, colorSpace: e.target.value})}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          {colorSpaceOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label} - {option.description}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Advanced Options - Compact */}
                      <div className="border-t pt-3">
                        <h5 className="font-medium text-gray-700 mb-2 text-xs">Advanced Options</h5>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={conversionSettings.transparency}
                              onChange={(e) => setConversionSettings({
                                ...conversionSettings, 
                                transparency: e.target.checked
                              })}
                              className="mr-2 text-red-500 focus:ring-red-500 text-xs"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-xs">Preserve transparency</div>
                              <div className="text-xs text-gray-600">Maintain alpha channel from PDF</div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
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

              {/* File List - Ultra compact grid */}
              {pdfFiles.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-xs">PDF files to convert ({pdfFiles.length})</h4>
                    <p className="text-xs text-gray-500">Drag to reorder</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {pdfFiles.map((fileObj, index) => (
                      <div 
                        key={fileObj.id} 
                        className="bg-gray-50 border border-gray-200 rounded-lg p-2 transition-all duration-200 hover:shadow-md"
                      >
                        {/* Order Number */}
                        <div className="flex items-center justify-between mb-1">
                          <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <div className="flex items-center space-x-0.5">
                            {!isConverting && (
                              <>
                                <button
                                  onClick={() => moveFile(index, 'up')}
                                  disabled={index === 0}
                                  className="text-gray-400 hover:text-blue-500 p-0.5 disabled:opacity-30"
                                  title="Move up"
                                >
                                  <ArrowUp className="h-2.5 w-2.5" />
                                </button>
                                <button
                                  onClick={() => moveFile(index, 'down')}
                                  disabled={index === pdfFiles.length - 1}
                                  className="text-gray-400 hover:text-blue-500 p-0.5 disabled:opacity-30"
                                  title="Move down"
                                >
                                  <ArrowDown className="h-2.5 w-2.5" />
                                </button>
                                <button
                                  onClick={() => previewPdf(fileObj)}
                                  className="text-gray-400 hover:text-green-500 p-0.5"
                                  title="Preview"
                                >
                                  <Eye className="h-2.5 w-2.5" />
                                </button>
                                <button
                                  onClick={() => removeFile(fileObj.id)}
                                  className="text-gray-400 hover:text-red-500 p-0.5"
                                  title="Remove"
                                >
                                  <X className="h-2.5 w-2.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* PDF Icon - Very small */}
                        <div className="relative mb-1 bg-red-100 rounded border p-2 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-red-500" />
                          <div className="absolute top-0.5 right-0.5">
                            <GripVertical className="h-2 w-2 text-red-400 cursor-move" />
                          </div>
                        </div>
                        
                        {/* File Info - Very compact */}
                        <div>
                          <p className="font-medium text-gray-900 text-xs truncate" title={fileObj.name}>
                            {fileObj.name.length > 15 ? fileObj.name.substring(0, 15) + '...' : fileObj.name}
                          </p>
                          <p className="text-xs text-gray-500">{formatFileSize(fileObj.size)}</p>
                          <span className="inline-block px-1 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full mt-0.5">
                            Ready for PNG
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Convert Button */}
              {pdfFiles.length > 0 && !isConverting && (
                <div className="text-center">
                  <button
                    onClick={convertToPng}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
                  >
                    <ImageIcon className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Convert {pdfFiles.length} PDF file{pdfFiles.length > 1 ? 's' : ''} to PNG
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Extract pages as {conversionSettings.dpi} DPI PNG images
                  </p>
                </div>
              )}

              {/* Converting State */}
              {isConverting && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-red-100 rounded-full mb-4">
                    <Loader className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Converting PDF to PNG...</h3>
                  <p className="text-gray-600 text-sm mb-4">Extracting pages as high-quality PNG images</p>
                  
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
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">PNG Conversion Complete!</h2>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
                Your {pdfFiles.length} PDF file{pdfFiles.length > 1 ? 's have' : ' has'} been successfully converted to PNG images.
              </p>

              {/* Conversion Summary - Compact */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 lg:p-6 max-w-md mx-auto mb-4 lg:mb-6">
                <div className="flex items-center justify-center mb-3 lg:mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-base lg:text-lg font-bold text-gray-900">{pdfFiles.length}</div>
                      <div className="text-xs text-gray-500">PDF Files</div>
                    </div>
                    <div className="flex-shrink-0">
                      <ArrowRight className="h-4 lg:h-5 w-4 lg:w-5 text-green-500" />
                    </div>
                    <div className="text-center">
                      <div className="text-base lg:text-lg font-bold text-green-600">
                        {convertedFiles.filter(f => !f.isZip).reduce((sum, f) => sum + (f.imageCount || 0), 0)}
                      </div>
                      <div className="text-xs text-gray-500">PNG Images</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center px-2 lg:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs lg:text-sm font-medium">
                    <ImageIcon className="h-3 lg:h-4 w-3 lg:w-4 mr-1" />
                    {conversionSettings.dpi} DPI • {conversionSettings.colorSpace.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Download Cards - Compact */}
              {convertedFiles.length > 0 && (
                <div className="space-y-2 max-w-md mx-auto mb-4 lg:mb-6">
                  {convertedFiles.map((file, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 lg:p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="w-8 lg:w-10 h-8 lg:h-10 bg-red-500 text-white rounded-lg flex items-center justify-center mr-2 lg:mr-3">
                            {file.isZip ? <Download className="h-4 lg:h-5 w-4 lg:w-5" /> : <ImageIcon className="h-4 lg:h-5 w-4 lg:w-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                              {file.imageCount && (
                                <span className="ml-2 text-blue-600">
                                  {file.imageCount} image{file.imageCount > 1 ? 's' : ''}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadFile(file.downloadUrl, file.name)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors ml-2 lg:ml-3"
                        >
                          <Download className="h-3 lg:h-4 w-3 lg:w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={downloadAllFiles}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download {convertedFiles.length > 1 ? 'All PNG Images' : 'PNG Images'}
                </button>
                <button
                  onClick={startOver}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Convert More PDF Files
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PDF Preview Modal - Compact */}
      {showPreview && previewFile && (
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
                  <h1 className="text-base lg:text-lg font-bold text-gray-900 truncate">{previewFile.name}</h1>
                </div>
                
                <div className="space-y-3 text-gray-700">
                  <div className="bg-gray-100 p-3 rounded flex items-center justify-center">
                    <FileText className="h-8 lg:h-12 w-8 lg:w-12 text-gray-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center">
                      <span className="font-medium text-gray-600 text-xs">File Size</span>
                      <div className="text-base lg:text-lg font-bold text-gray-900">
                        {formatFileSize(previewFile.size)}
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-gray-600 text-xs">Output Format</span>
                      <div className="text-base lg:text-lg font-bold text-green-600">
                        PNG
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-2 lg:p-3 rounded">
                    <h3 className="font-semibold mb-1 text-green-900 text-sm">PDF to PNG Conversion</h3>
                    <p className="text-xs text-green-800">
                      Extract pages as {conversionSettings.dpi} DPI PNG images with quality preservation.
                    </p>
                  </div>
                </div>

                <div className="text-center text-gray-500 text-xs mt-3 lg:mt-4">
                  <p>✓ High-quality PNG ✓ Custom DPI ✓ Transparency support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Features Section for PDF to PNG */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Why Choose ilovepdf.cc's PDF to PNG Converter?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional PDF to PNG conversion capabilities with advanced image extraction and custom quality settings for all your PNG conversion needs
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

          {/* Additional PDF to PNG Capabilities */}
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

      {/* How to Use PDF to PNG Converter Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              How to Convert PDF to PNG Online with ilovepdf.cc
            </h2>
            <p className="text-lg text-gray-600">
              Professional PDF to PNG conversion in 3 simple steps using our advanced online converter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">1. Upload PDF Documents</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select PDF files for conversion or drag and drop them into our secure online PDF to PNG converter. Supports up to 10 files simultaneously.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">2. Configure PNG Settings</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Choose DPI quality, page ranges, color space, and transparency options. Our PDF to PNG converter provides complete control over image extraction.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">3. Download PNG Images</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Download your converted PNG images instantly. High-quality images organized and ready for use in any project or application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF to PNG Use Cases Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Professional PDF to PNG Conversion for Every Purpose
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF to PNG converter serves professionals, designers, and businesses with comprehensive image extraction capabilities
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
              Frequently Asked Questions About PDF to PNG Conversion
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about converting PDF documents to PNG images with ilovepdf.cc's online converter
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
              Complete Guide to Online PDF to PNG Conversion with ilovepdf.cc
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Why Use an Online PDF to PNG Converter?
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  ilovepdf.cc's online PDF to PNG converter revolutionizes image extraction by providing professional-grade conversion directly in your browser. Unlike traditional PDF software that requires expensive licenses and complex installations, our web-based PDF to PNG converter offers instant access to powerful image extraction tools. This cloud-based approach ensures you can convert PDF documents to PNG from any device, anywhere, without compromising on functionality or security.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  The online PDF to PNG converter extracts pages while preserving image quality and transparency, creating high-resolution PNG files. With advanced extraction algorithms and intelligent image processing, every converted PNG maintains professional appearance and functionality, making it perfect for professionals who need image extraction, designers working on graphics, or businesses requiring visual content.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Professional PDF to PNG Conversion Features
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Advanced image extraction algorithms for accurate PNG conversion
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Custom DPI settings from 72 to 600 DPI for all use cases
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Transparency preservation and alpha channel support
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Flexible page range selection and batch processing
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Multiple color space options for different applications
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Professional-quality PNG output for commercial use
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Advanced PDF to PNG Conversion Technology
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Our PDF to PNG converter utilizes cutting-edge image processing technology to intelligently analyze PDF documents and extract pages with maximum quality. This sophisticated approach processes PDF content to identify visual elements, maintain image integrity, and preserve transparency information. The converter automatically handles different content types including text, graphics, images, and vector elements, ensuring optimal PNG output for each document page.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              PDF to PNG Converter Security and Privacy
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Security is paramount when processing sensitive PDF documents online. ilovepdf.cc's PDF to PNG converter employs enterprise-grade SSL encryption to protect your documents during the conversion process. All uploaded PDF files are processed on secure servers and automatically deleted within one hour of completion. This ensures that your confidential documents, whether they're business presentations, design portfolios, technical drawings, or personal documents, remain completely private throughout the PNG conversion session.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              PDF to PNG Conversion Best Practices and Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="bg-blue-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center text-sm lg:text-base">
                  <ImageIcon className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Quality Optimization
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Choose appropriate DPI settings based on intended use. Use 72 DPI for web, 150-300 DPI for general use, and 600 DPI for professional printing applications.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center text-sm lg:text-base">
                  <Palette className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Color Management
                </h4>
                <p className="text-green-800 text-sm leading-relaxed">
                  Select RGB color space for digital use, CMYK for print applications, or grayscale for document archiving. Enable transparency preservation when needed.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Why Choose ilovepdf.cc for PDF to PNG Conversion?
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
              ilovepdf.cc stands as the premier choice for online PDF to PNG conversion, combining powerful functionality with user-friendly design. Our PDF to PNG converter offers professional-grade image extraction capabilities typically found only in expensive desktop software, but with the convenience and accessibility of a web-based platform. The intuitive interface makes PDF to PNG conversion simple for beginners while providing the advanced features that professionals require.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
              With support for files up to 50MB per document, custom DPI settings, transparency preservation, and batch processing of up to 10 files, our PDF to PNG converter handles everything from simple image extraction to complex graphic design workflows. The combination of powerful conversion tools, robust security measures, and seamless user experience makes ilovepdf.cc the trusted choice for millions of users worldwide who need to convert PDF documents to PNG format online.
            </p>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Convert PDF to PNG on Any Device
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF to PNG converter works seamlessly across all devices and platforms for ultimate flexibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-blue-500 text-white rounded-xl mb-4">
                <Monitor className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Desktop PDF to PNG</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Full-featured PDF to PNG conversion on Windows, Mac, and Linux computers. Professional workflow support with advanced image extraction and quality control.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-green-500 text-white rounded-xl mb-4">
                <Smartphone className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Mobile PDF to PNG</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Touch-optimized PDF to PNG conversion on smartphones and tablets. Convert PDF documents to PNG on iOS and Android devices with responsive interface.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-purple-500 text-white rounded-xl mb-4">
                <Globe className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Browser-Based Converter</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                No downloads required. Works in Chrome, Firefox, Safari, Edge, and all modern browsers. Access the PDF to PNG converter instantly from any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions for PDF to PNG Conversion Worldwide
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
            More than 10 million users worldwide rely on our PDF to PNG converter every month for image extraction
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">6M+</div>
              <div className="text-gray-600 text-sm lg:text-base">PNG images extracted</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">600</div>
              <div className="text-gray-600 text-sm lg:text-base">Max DPI quality</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">25s</div>
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
                <FileText className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">PNG to PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Convert PNG images back to PDF format with quality preservation and batch processing capabilities.</p>
              <Link to="/tools/png-to-pdf" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Convert to PDF →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-green-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Camera className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">PDF to JPG</h3>
              <p className="text-gray-600 text-sm mb-4">Extract PDF pages as JPG images with customizable quality settings for web and print use.</p>
              <Link to="/tools/pdf-to-jpg" className="text-green-600 hover:text-green-700 font-medium text-sm">
                Convert to JPG →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-purple-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Minimize2 className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Compress PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Reduce PDF file sizes before PNG conversion for faster processing and optimized workflows.</p>
              <Link to="/tools/compress" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Compress PDFs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
            Ready to Convert Your PDF Documents to PNG?
          </h2>
          <p className="text-lg lg:text-xl text-red-100 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Experience professional PDF to PNG conversion with ilovepdf.cc's advanced online converter. Extract high-quality PNG images with custom DPI settings and secure processing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/png-to-pdf"
              className="bg-white text-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <FileText className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              PNG to PDF Converter
            </Link>
            <Link
              to="/tools/pdf-to-jpg"
              className="border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <Camera className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              PDF to JPG Converter
            </Link>
          </div>
          <p className="text-red-100 mt-4 lg:mt-6 text-sm">
            Free PDF to PNG conversion tools • No registration required • Secure processing on ilovepdf.cc
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
                Professional PDF to PNG converter and image extraction tools. All tools are 100% FREE and designed for professional use.
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
                <li><Link to="/tools/pdf-to-png" className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium">PDF to PNG</Link></li>
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to PDF</Link></li>
                <li><Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Compress PDF</Link></li>
              </ul>
            </div>

            {/* Convert */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">CONVERT</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/pdf-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to PNG</Link></li>
                <li><Link to="/tools/pdf-to-jpg" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to JPG</Link></li>
                <li><Link to="/tools/pdf-to-word" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to Word</Link></li>
                <li><Link to="/tools/jpg-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">JPG to PDF</Link></li>
                <li><Link to="/tools/word-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Word to PDF</Link></li>
              </ul>
            </div>

            {/* Image Tools */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">IMAGE TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/png-to-webp" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to WebP</Link></li>
                <li><Link to="/tools/webp-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">WebP to PNG</Link></li>
                <li><Link to="/tools/image-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Image to PDF</Link></li>
                <li><Link to="/tools/pdf-to-image" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to Image</Link></li>
                <li><Link to="/tools/resize-image" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Resize Image</Link></li>
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
              © 2024 ilovepdf.cc. Professional PDF to PNG Converter. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PDF to PNG conversion professionals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PdfToPngConverter