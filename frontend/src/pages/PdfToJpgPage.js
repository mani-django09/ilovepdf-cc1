import React, { useState, useRef, useEffect } from "react"
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
  Image as ImageIcon,
  GripVertical,
  Settings,
  Palette,
  FileText,
  Heart,
  Minimize2,
  FileImage,
  Layers,
  Monitor,
  Smartphone,
  Camera,
  Clock,
  Award,
  Sparkles,
  RotateCcw,
  ArrowRight
} from "lucide-react"

function PdfToJpgPage() {
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
    outputFormat: 'jpg',
    quality: 85,
    dpi: '300',
    pageRange: 'all',
    startPage: '1',
    endPage: '1',
    colorSpace: 'rgb'
  })
  const [showSettings, setShowSettings] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
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

  // Enhanced FAQ with long-tail keywords
  const faqData = [
    {
      question: "How to convert PDF to JPG online free with ilovepdf.cc?",
      answer: "ilovepdf.cc offers the easiest way to convert PDF to JPG online for free. Simply upload your PDF files, choose your preferred JPG quality and DPI settings, select pages to convert, and download high-quality JPEG images. Our PDF to JPG converter supports batch conversion and maintains excellent image quality while optimizing file sizes for various use cases."
    },
    {
      question: "What's the best PDF to JPG converter quality settings for different purposes?",
      answer: "For professional printing, use High quality (95) at 300-600 DPI. For web use and social media, choose Medium quality (85) at 150-300 DPI. For email attachments and quick sharing, select Good quality (75) at 72-150 DPI. ilovepdf.cc's online PDF to JPG converter allows you to customize these settings for optimal results based on your specific needs."
    },
    {
      question: "Can I convert specific pages from PDF to JPG images online?",
      answer: "Yes! ilovepdf.cc's PDF to JPG converter lets you convert all pages or select custom page ranges. You can extract specific pages like pages 1-5, convert only odd/even pages, or choose individual pages. This feature is perfect when you only need certain pages as JPG images from large PDF documents, saving time and storage space."
    },
    {
      question: "Is online PDF to JPG conversion safe and secure on ilovepdf.cc?",
      answer: "Absolutely! ilovepdf.cc uses advanced SSL encryption to protect your files during the PDF to JPG conversion process. All uploaded PDF files are automatically deleted from our servers after 1 hour. We never store, access, or share your documents, ensuring complete privacy and security for your sensitive PDF content."
    },
    {
      question: "What's the maximum PDF file size for online JPG conversion?",
      answer: "ilovepdf.cc supports PDF files up to 50MB per file for JPG conversion. You can upload up to 10 PDF files simultaneously with a total combined size limit of 200MB. For larger PDF files, we recommend using our PDF compression tool first or splitting large PDFs into smaller sections before converting to JPG images."
    },
    {
      question: "How does PDF to JPG conversion preserve image quality?",
      answer: "Our advanced PDF to JPG converter uses professional-grade algorithms to maintain maximum image quality during conversion. You can adjust DPI settings (72-600 DPI) and quality levels (65-95) to balance between file size and image clarity. The converter preserves original colors, sharpness, and details while optimizing for your intended use case."
    },
    {
      question: "Can I convert password-protected PDF files to JPG images?",
      answer: "Currently, our online PDF to JPG converter requires unprotected PDF files. If your PDF is password-protected, please use our PDF unlock tool first to remove the password protection, then convert the unlocked PDF to JPG images. This ensures the conversion process works smoothly and maintains security protocols."
    },
    {
      question: "What devices support ilovepdf.cc's online PDF to JPG converter?",
      answer: "ilovepdf.cc's PDF to JPG converter works on all devices including Windows PCs, Mac computers, Android smartphones, iPhones, iPads, and tablets. Our responsive web-based converter requires no software installation and works directly in your browser (Chrome, Firefox, Safari, Edge). Perfect for converting PDF to JPG on-the-go from any device."
    }
  ]

  const qualityOptions = [
    { value: 95, label: 'High Quality (95)', description: 'Best for printing and professional use', icon: <Award className="h-4 w-4" /> },
    { value: 85, label: 'Medium Quality (85)', description: 'Perfect balance for most uses', icon: <Star className="h-4 w-4" /> },
    { value: 75, label: 'Good Quality (75)', description: 'Smaller files, good quality', icon: <Zap className="h-4 w-4" /> },
    { value: 65, label: 'Web Quality (65)', description: 'Optimized for web and email', icon: <Globe className="h-4 w-4" /> }
  ]

  const dpiOptions = [
    { value: '72', label: '72 DPI (Web)', description: 'Standard web resolution', icon: <Globe className="h-4 w-4" /> },
    { value: '150', label: '150 DPI (Medium)', description: 'Good for most uses', icon: <Monitor className="h-4 w-4" /> },
    { value: '300', label: '300 DPI (Print)', description: 'High quality for printing', icon: <FileImage className="h-4 w-4" /> },
    { value: '600', label: '600 DPI (Professional)', description: 'Professional printing quality', icon: <Camera className="h-4 w-4" /> }
  ]

  const colorSpaceOptions = [
    { value: 'rgb', label: 'RGB Color', description: 'Standard color for screens', icon: <Palette className="h-4 w-4" /> },
    { value: 'grayscale', label: 'Grayscale', description: 'Black and white images', icon: <Minimize2 className="h-4 w-4" /> }
  ]

  // Processing steps for enhanced spinner
  const processingSteps = [
    { text: "Uploading PDF files...", icon: <Upload className="h-4 w-4" /> },
    { text: "Analyzing PDF structure...", icon: <FileText className="h-4 w-4" /> },
    { text: "Extracting pages...", icon: <Layers className="h-4 w-4" /> },
    { text: "Converting to JPG...", icon: <ImageIcon className="h-4 w-4" /> },
    { text: "Optimizing quality...", icon: <Sparkles className="h-4 w-4" /> },
    { text: "Preparing download...", icon: <Download className="h-4 w-4" /> }
  ]

  // Enhanced loading animation
  useEffect(() => {
    if (isConverting) {
      const stepInterval = setInterval(() => {
        setProcessingStep(prev => (prev + 1) % 6) // Use constant instead of processingSteps.length
      }, 2000)

      return () => clearInterval(stepInterval)
    }
  }, [isConverting])

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
    const baseSizePerPage = conversionSettings.dpi === '600' ? 3 : 
                           conversionSettings.dpi === '300' ? 1.5 : 
                           conversionSettings.dpi === '150' ? 0.8 : 0.4
    
    const qualityMultiplier = conversionSettings.quality >= 90 ? 1.2 :
                             conversionSettings.quality >= 80 ? 1 :
                             conversionSettings.quality >= 70 ? 0.8 : 0.6
    
    const estimatedPages = pdfFiles.length * 5 // Assume average 5 pages per PDF
    const estimatedSizeMB = estimatedPages * baseSizePerPage * qualityMultiplier
    
    return {
      pages: estimatedPages,
      size: `${estimatedSizeMB.toFixed(1)} MB`,
      description: `Estimated ${estimatedPages} JPG images at ${conversionSettings.dpi} DPI`
    }
  }

  const convertToJpg = async () => {
    if (pdfFiles.length === 0) {
      setError("Please select at least 1 PDF file to convert")
      return
    }

    setIsConverting(true)
    setError("")
    setProgress(0)
    setProcessingStep(0)

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
      formData.append('quality', conversionSettings.quality.toString())
      formData.append('dpi', conversionSettings.dpi)
      formData.append('pageRange', conversionSettings.pageRange)
      formData.append('startPage', conversionSettings.startPage)
      formData.append('endPage', conversionSettings.endPage)
      formData.append('colorSpace', conversionSettings.colorSpace)

      console.log("Starting conversion for", pdfFiles.length, "PDF files to JPG")

      // Use the PDF to JPG API endpoint
      const API_BASE = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : window.location.origin

      const response = await fetch(`${API_BASE}/api/pdf-to-jpg`, {
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
        // Update download URLs to use the correct server
        const updatedFiles = result.convertedFiles.map(file => ({
          ...file,
          downloadUrl: `${API_BASE}${file.downloadUrl}`
        }))
        
        setConvertedFiles(updatedFiles)
        setIsConverting(false)
        setConversionComplete(true)
        setProgress(0)
      }, 500)

    } catch (err) {
      console.error('Conversion failed:', err)
      clearInterval(progressInterval)
      
      let errorMessage = 'Conversion failed. Please try again.'
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = 'Cannot connect to the PDF to JPG server. Please make sure it is running on port 5000.'
      } else if (err.message.includes('ECONNREFUSED')) {
        errorMessage = 'PDF to JPG server is not running. Please start the server on port 5000.'
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
      setError('No converted file available for download')
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
    setProcessingStep(0)
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
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags - Using document.head instead of Helmet */}
      {typeof document !== 'undefined' && (
        <>
          {document.title = "Free Online PDF to JPG Converter - Convert PDF to JPEG Images | ilovepdf.cc"}
          {(() => {
            // Set meta tags
            const metaTags = [
              { name: "description", content: "Convert PDF to JPG online free with ilovepdf.cc. Extract high-quality JPEG images from PDF pages. Fast, secure PDF to JPG converter with custom quality settings. No software required." },
              { name: "keywords", content: "pdf to jpg, online pdf to jpg, pdf to jpg converter, convert pdf to jpg, pdf to jpeg, pdf to image converter, extract images from pdf, ilovepdf.cc" },
              { name: "author", content: "ilovepdf.cc" },
              { name: "robots", content: "index, follow" },
              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
              { property: "og:title", content: "Free Online PDF to JPG Converter | ilovepdf.cc" },
              { property: "og:description", content: "Convert PDF pages to high-quality JPG images online. Free PDF to JPG converter with custom quality settings and batch processing." },
              { property: "og:url", content: "https://ilovepdf.cc/tools/pdf-to-jpg" },
              { property: "og:type", content: "website" },
              { property: "og:site_name", content: "ilovepdf.cc" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Free PDF to JPG Converter Online | ilovepdf.cc" },
              { name: "twitter:description", content: "Convert PDF to JPG images online free. Extract pages from PDF as high-quality JPEG files with ilovepdf.cc" }
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
            canonical.setAttribute('href', 'https://ilovepdf.cc/tools/pdf-to-jpg')
          })()}
        </>
      )}

      {/* Header */}
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
                        className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                          tool.title === "PDF to JPG" ? "text-red-500 font-medium" : "text-gray-700 hover:text-red-500"
                        }`}
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
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
                    <div className="grid grid-cols-1 gap-0">
                      <Link to="/tools/merge" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">Merge PDF</Link>
                      <Link to="/tools/split" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">Split PDF</Link>
                      <Link to="/tools/compress" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">Compress PDF</Link>
                      <Link to="/tools/pdf-to-png" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">PDF to PNG</Link>
                      <Link to="/tools/png-to-pdf" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">PNG to PDF</Link>
                      <Link to="/tools/jpg-to-pdf" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">JPG to PDF</Link>
                      <Link to="/tools/pdf-to-jpg" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">PDF to JPG</Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200"
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
                  to="/tools/pdf-to-jpg" 
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  PDF to JPG
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

      {/* Hero Section - Keep as requested */}
      <section className="bg-white py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            PDF to JPG Converter - Extract Pages as High-Quality JPEG Images
          </h1>
          <p className="text-lg text-gray-600">
            Convert PDF pages to JPG images with custom quality settings and resolution options. Perfect for extracting photos, creating thumbnails, or sharing document pages.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
          {!conversionComplete ? (
            <>
              {/* Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-xl p-4 lg:p-6 text-center transition-all duration-300 cursor-pointer mb-6 ${
                  isDragOver 
                    ? 'border-red-400 bg-red-50 scale-105' 
                    : pdfFiles.length > 0 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50 hover:scale-105'
                }`}
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
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <FileText className="h-12 w-12 text-gray-400" />
                        <ImageIcon className="h-6 w-6 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isDragOver ? 'Drop your PDF files here' : 'Select PDF files to convert to JPG'}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      or drop PDF files here
                    </p>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50"
                      disabled={isConverting}
                    >
                      Choose PDF Files
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                      Supports: PDF format • Up to 10 files • Max 50MB per file
                    </p>
                  </>
                ) : (
                  <>
                    <FileText className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {pdfFiles.length} PDF file{pdfFiles.length > 1 ? 's' : ''} ready to convert
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Total size: {formatFileSize(getTotalSize())}
                    </p>
                    {!isConverting && (
                      <button className="text-red-500 hover:text-red-600 font-medium text-sm transition-colors duration-200">
                        Click to add more PDF files
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Enhanced Output Preview */}
              {pdfFiles.length > 0 && !isConverting && (
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2" />
                    JPG Output Preview
                  </h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xl font-bold text-gray-900">{conversionSettings.dpi}</div>
                      <div className="text-xs text-gray-500">DPI Quality</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xl font-bold text-purple-600">
                        {conversionSettings.pageRange === 'all' ? 'All' : 'Custom'}
                      </div>
                      <div className="text-xs text-gray-500">Page Range</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xl font-bold text-green-600">{conversionSettings.quality}%</div>
                      <div className="text-xs text-gray-500">JPG Quality</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-600">
                        {getEstimatedOutputSize().size}
                      </div>
                      <div className="text-xs text-gray-500">Est. Size</div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-3 text-center">
                    {getEstimatedOutputSize().description}
                  </p>
                </div>
              )}

              {/* Enhanced Conversion Settings */}
              {pdfFiles.length > 0 && !isConverting && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-gray-600" />
                      JPG Conversion Settings
                    </h4>
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="flex items-center text-sm text-gray-600 hover:text-red-500 transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      {showSettings ? 'Hide' : 'Show'} Settings
                    </button>
                  </div>
                  
                  {showSettings && (
                    <div className="bg-gray-50 rounded-lg p-4 space-y-6">
                      {/* Quality Setting */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          JPG Quality Level
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {qualityOptions.map(option => (
                            <label key={option.value} className="flex items-start cursor-pointer p-3 bg-white rounded-lg border hover:border-red-300 transition-colors duration-200">
                              <input
                                type="radio"
                                name="quality"
                                value={option.value}
                                checked={conversionSettings.quality === option.value}
                                onChange={(e) => setConversionSettings({
                                  ...conversionSettings, 
                                  quality: parseInt(e.target.value)
                                })}
                                className="mt-1 mr-3 text-red-500 focus:ring-red-500"
                              />
                              <div className="flex-1">
                                <div className="flex items-center mb-1">
                                  {option.icon}
                                  <span className="font-medium text-gray-900 ml-2">{option.label}</span>
                                </div>
                                <div className="text-sm text-gray-600">{option.description}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* DPI Setting */}
                      <div className="border-t pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Image Resolution (DPI)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dpiOptions.map(option => (
                            <label key={option.value} className="flex items-center cursor-pointer p-3 bg-white rounded-lg border hover:border-red-300 transition-colors duration-200">
                              <input
                                type="radio"
                                name="dpi"
                                value={option.value}
                                checked={conversionSettings.dpi === option.value}
                                onChange={(e) => setConversionSettings({...conversionSettings, dpi: e.target.value})}
                                className="mr-3 text-red-500 focus:ring-red-500"
                              />
                              <div className="flex items-center flex-1">
                                {option.icon}
                                <div className="ml-2">
                                  <div className="font-medium text-gray-900">{option.label}</div>
                                  <div className="text-sm text-gray-600">{option.description}</div>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Page Range */}
                      <div className="border-t pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Page Selection
                        </label>
                        <div className="space-y-3">
                          <label className="flex items-center cursor-pointer p-3 bg-white rounded-lg border hover:border-red-300 transition-colors duration-200">
                            <input
                              type="radio"
                              name="pageRange"
                              value="all"
                              checked={conversionSettings.pageRange === 'all'}
                              onChange={(e) => setConversionSettings({...conversionSettings, pageRange: e.target.value})}
                              className="mr-3 text-red-500 focus:ring-red-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900 flex items-center">
                                <Layers className="h-4 w-4 mr-2" />
                                All Pages
                              </div>
                              <div className="text-sm text-gray-600">Convert every page in the PDF documents</div>
                            </div>
                          </label>
                          <label className="flex items-start cursor-pointer p-3 bg-white rounded-lg border hover:border-red-300 transition-colors duration-200">
                            <input
                              type="radio"
                              name="pageRange"
                              value="custom"
                              checked={conversionSettings.pageRange === 'custom'}
                              onChange={(e) => setConversionSettings({...conversionSettings, pageRange: e.target.value})}
                              className="mt-1 mr-3 text-red-500 focus:ring-red-500"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 flex items-center mb-2">
                                <FileText className="h-4 w-4 mr-2" />
                                Custom Range
                              </div>
                              <div className="text-sm text-gray-600 mb-3">Specify page numbers or ranges</div>
                              {conversionSettings.pageRange === 'custom' && (
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs text-gray-500 block mb-1">Start Page</label>
                                    <input
                                      type="number"
                                      min="1"
                                      value={conversionSettings.startPage}
                                      onChange={(e) => setConversionSettings({...conversionSettings, startPage: e.target.value})}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-gray-500 block mb-1">End Page</label>
                                    <input
                                      type="number"
                                      min="1"
                                      value={conversionSettings.endPage}
                                      onChange={(e) => setConversionSettings({...conversionSettings, endPage: e.target.value})}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      {/* Color Space */}
                      <div className="border-t pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Color Output
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {colorSpaceOptions.map(option => (
                            <label key={option.value} className="flex items-center cursor-pointer p-3 bg-white rounded-lg border hover:border-red-300 transition-colors duration-200">
                              <input
                                type="radio"
                                name="colorSpace"
                                value={option.value}
                                checked={conversionSettings.colorSpace === option.value}
                                onChange={(e) => setConversionSettings({...conversionSettings, colorSpace: e.target.value})}
                                className="mr-3 text-red-500 focus:ring-red-500"
                              />
                              <div className="flex items-center flex-1">
                                {option.icon}
                                <div className="ml-2">
                                  <div className="font-medium text-gray-900">{option.label}</div>
                                  <div className="text-sm text-gray-600">{option.description}</div>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-medium mb-1">Error</p>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Compact File List */}
              {pdfFiles.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">PDF files ({pdfFiles.length})</h4>
                    <p className="text-sm text-gray-500">Drag to reorder</p>
                  </div>
                  
                  <div className="space-y-2">
                    {pdfFiles.map((fileObj, index) => (
                      <div 
                        key={fileObj.id} 
                        className="bg-white border rounded-lg p-3 flex items-center justify-between hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center text-xs font-bold mr-3">
                            {index + 1}
                          </div>
                          <div className="bg-red-100 rounded p-2 mr-3">
                            <FileText className="h-6 w-6 text-red-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate" title={fileObj.name}>
                              {fileObj.name}
                            </p>
                            <p className="text-xs text-gray-500">{formatFileSize(fileObj.size)}</p>
                          </div>
                        </div>
                        
                        {!isConverting && (
                          <div className="flex items-center space-x-1 ml-2">
                            <button
                              onClick={() => moveFile(index, 'up')}
                              disabled={index === 0}
                              className="text-gray-400 hover:text-blue-500 p-1 disabled:opacity-30 transition-colors duration-200"
                              title="Move up"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => moveFile(index, 'down')}
                              disabled={index === pdfFiles.length - 1}
                              className="text-gray-400 hover:text-blue-500 p-1 disabled:opacity-30 transition-colors duration-200"
                              title="Move down"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => previewPdf(fileObj)}
                              className="text-gray-400 hover:text-green-500 p-1 transition-colors duration-200"
                              title="Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeFile(fileObj.id)}
                              className="text-gray-400 hover:text-red-500 p-1 transition-colors duration-200"
                              title="Remove"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Convert Button */}
              {pdfFiles.length > 0 && !isConverting && (
                <div className="text-center">
                  <button
                    onClick={convertToJpg}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center mx-auto transform hover:scale-105"
                  >
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Convert {pdfFiles.length} PDF file{pdfFiles.length > 1 ? 's' : ''} to JPG
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Extract pages as {conversionSettings.dpi} DPI JPG images
                  </p>
                </div>
              )}

              {/* Enhanced Converting State */}
              {isConverting && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 relative">
                    <Loader className="h-8 w-8 text-red-500 animate-spin" />
                    <div className="absolute inset-0 rounded-full border-4 border-red-200"></div>
                    <div 
                      className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent transition-all duration-300"
                      style={{transform: `rotate(${progress * 3.6}deg)`}}
                    ></div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Converting PDF to JPG Images</h3>
                  
                  {/* Processing Steps */}
                  <div className="max-w-sm mx-auto mb-4">
                    <div className="flex items-center justify-center mb-2">
                      {processingSteps[processingStep].icon}
                      <span className="ml-2 text-sm text-gray-600">{processingSteps[processingStep].text}</span>
                    </div>
                  </div>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="max-w-sm mx-auto mb-4">
                    <div className="bg-gray-200 rounded-full h-3 relative overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500 relative"
                        style={{width: `${progress}%`}}
                      >
                        <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>0%</span>
                      <span className="font-medium">{progress}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">Please wait while we extract your pages as high-quality JPG images...</p>
                </div>
              )}
            </>
          ) : (
            /* Enhanced Conversion Complete */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6 relative">
                <Check className="h-10 w-10" />
                <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-pulse"></div>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                JPG Conversion Complete! 🎉
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your {pdfFiles.length} PDF file{pdfFiles.length > 1 ? 's have' : ' has'} been successfully converted to high-quality JPG images using ilovepdf.cc's advanced converter.
              </p>

              {/* Enhanced Conversion Summary */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 max-w-lg mx-auto mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mb-2">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">{pdfFiles.length}</div>
                      <div className="text-xs text-gray-500">PDF Files</div>
                    </div>
                    <div className="flex-shrink-0">
                      <ArrowRight className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-2">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {convertedFiles.filter(f => !f.isZip).reduce((sum, f) => sum + (f.imageCount || 0), 0)}
                      </div>
                      <div className="text-xs text-gray-500">JPG Images</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600">{conversionSettings.dpi} DPI</div>
                    <div className="text-xs text-gray-500">Resolution</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-lg font-bold text-purple-600">{conversionSettings.quality}%</div>
                    <div className="text-xs text-gray-500">Quality</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Download Cards */}
              {convertedFiles.length > 0 && (
                <div className="space-y-3 max-w-lg mx-auto mb-6">
                  {convertedFiles.map((file, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center mr-4">
                            {file.isZip ? <Download className="h-6 w-6" /> : <ImageIcon className="h-6 w-6" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">{file.name}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                              {file.imageCount && (
                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                  {file.imageCount} image{file.imageCount > 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadFile(file.downloadUrl, file.name)}
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-all duration-200 ml-3 hover:scale-105"
                        >
                          <Download className="h-5 w-5" />
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
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center hover:scale-105"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download {convertedFiles.length > 1 ? 'All Images' : 'JPG Images'}
                </button>
                <button
                  onClick={startOver}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                >
                  <RotateCcw className="h-4 w-4 mr-2 inline" />
                  Convert More PDFs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced PDF Preview Modal */}
      {showPreview && previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold">PDF Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-8 mb-6">
                <FileText className="h-20 w-20 text-red-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">PDF Ready for Conversion</h4>
                <p className="text-gray-600">This PDF will be converted to high-quality JPG images</p>
              </div>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-900">{previewFile.name}</p>
                <p className="text-sm text-gray-600">
                  File size: {formatFileSize(previewFile.size)}
                </p>
                <div className="flex justify-center space-x-4 text-xs text-gray-500">
                  <span>📏 {conversionSettings.dpi} DPI</span>
                  <span>🎨 {conversionSettings.quality}% Quality</span>
                  <span>📄 {conversionSettings.pageRange === 'all' ? 'All Pages' : 'Custom Range'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Features Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ilovepdf.cc for PDF to JPG Conversion?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Extract high-quality JPEG images from PDF documents with our professional-grade online PDF to JPG converter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <ImageIcon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">High-Quality JPG Images</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Extract PDF pages as crisp, high-resolution JPG images with customizable DPI settings from 72 to 600 DPI for any use case.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Layers className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Batch Processing Power</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Convert up to 10 PDF files simultaneously. Extract all pages or select specific ranges with our advanced page selection tools.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                SSL encryption protects your files during upload. All files are automatically deleted after 1 hour for complete privacy.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Lightning Fast Speed</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advanced cloud processing converts your PDFs to JPG images in seconds. No waiting, no delays, just instant results.
              </p>
            </div>
          </div>

          {/* Additional Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Universal Compatibility</h3>
              <p className="text-gray-600 text-sm">
                Works on all devices and browsers. No software installation required - just open and convert.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Customizable Settings</h3>
              <p className="text-gray-600 text-sm">
                Control quality, DPI, color space, and page ranges for perfect JPG output every time.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600 text-sm">
                Maintain original image quality while optimizing file sizes for web, print, or professional use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Convert PDF to JPG Online with ilovepdf.cc
            </h2>
            <p className="text-lg text-gray-600">
              Extract PDF pages as high-quality JPEG images in 3 simple steps using our online PDF to JPG converter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Upload PDF Files</h3>
              <p className="text-gray-600 leading-relaxed">
                Select or drag and drop your PDF documents into our secure online converter. Support for up to 10 files at once, each up to 50MB.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Configure JPG Settings</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose JPG quality (65-95%), DPI resolution (72-600), page ranges, and color output options for optimal results.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Download JPG Images</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your extracted JPEG images instantly. Download individual files or get all images in a convenient ZIP archive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About PDF to JPG Conversion
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about converting PDF to JPG images with ilovepdf.cc
            </p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-start hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-gray-900 pr-4 leading-tight">{faq.question}</span>
                  <div className="flex-shrink-0 mt-1">
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-5 border-t border-gray-100">
                    <p className="text-gray-600 pt-4 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to PDF to JPG Conversion with ilovepdf.cc
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Why Convert PDF to JPEG Images Online?
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Converting PDF pages to JPG images with ilovepdf.cc offers unmatched versatility for digital workflows. JPEG format provides superior compression for photographic content, making it perfect for social media sharing, website integration, email attachments, and mobile viewing. Our online PDF to JPG converter maintains excellent image quality while optimizing file sizes for various applications.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  The JPG format's universal compatibility ensures your extracted images can be viewed on any device, platform, or application without compatibility issues. Whether you're creating thumbnails, extracting photos from documents, or preparing images for web publishing, our PDF to JPG converter delivers professional results.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Professional PDF to JPG Conversion Benefits
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Extract individual PDF pages as high-resolution JPG images
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Customizable quality settings from 65% to 95% for optimal compression
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Multiple DPI options (72-600) for web, print, and professional use
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Batch processing for multiple PDF files simultaneously
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Secure cloud processing with automatic file deletion
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    No software installation required - works in any browser
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Best Practices for Online PDF to JPG Conversion
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              For optimal results when converting PDF to JPG with ilovepdf.cc, select quality settings based on your intended use: Choose High quality (95%) at 300-600 DPI for professional printing and archival purposes. Select Medium quality (85%) at 150-300 DPI for general sharing, presentations, and most digital applications. Use Good quality (75%) at 72-150 DPI for web publishing, email attachments, and quick sharing where file size is important.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Common Use Cases for PDF to JPG Conversion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Web and Digital Marketing
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Convert PDF pages to JPG for social media posts, website content, blog images, email newsletters, and digital advertising campaigns. Perfect for creating engaging visual content from PDF documents.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Photo and Design Work
                </h4>
                <p className="text-green-800 text-sm leading-relaxed">
                  Extract images from PDF portfolios, convert document pages for photo editing, create thumbnails for galleries, and prepare images for graphic design projects using our PDF to JPG converter.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Document Management
                </h4>
                <p className="text-purple-800 text-sm leading-relaxed">
                  Convert PDF pages for document previews, create image-based backups, extract specific pages for reports, and prepare documents for content management systems.
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-6">
                <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Presentations and Education
                </h4>
                <p className="text-orange-800 text-sm leading-relaxed">
                  Convert educational materials to images, create presentation slides from PDF content, extract diagrams and charts, and prepare visual aids for teaching and training.
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Choose ilovepdf.cc for PDF to JPG Conversion?
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              ilovepdf.cc stands out as the premier online PDF to JPG converter, offering professional-grade conversion capabilities without the need for software installation. Our advanced algorithms preserve image quality while providing extensive customization options for DPI, quality, and color output. The platform's robust security measures, including SSL encryption and automatic file deletion, ensure your sensitive documents remain private and secure throughout the conversion process.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With support for batch processing, custom page ranges, and multiple output formats, ilovepdf.cc provides the flexibility and reliability that professionals, students, and businesses need for their PDF to JPG conversion requirements. Experience the difference that quality, speed, and security make in your document workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Works on Every Device - Convert PDF to JPG Anywhere
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF to JPG converter is fully responsive and optimized for all devices. Convert PDFs to images anywhere, anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-xl mb-4">
                <Monitor className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Desktop & Laptop</h3>
              <p className="text-gray-600 leading-relaxed">
                Full-featured PDF to JPG conversion on Windows, Mac, and Linux. Perfect for professional workflows and batch processing tasks.
              </p>
            </div>
            
            <div className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-xl mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile & Tablet</h3>
              <p className="text-gray-600 leading-relaxed">
                Touch-optimized interface for iOS and Android. Convert PDFs to JPG images on the go with the same powerful tools.
              </p>
            </div>
            
            <div className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-xl mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Any Browser</h3>
              <p className="text-gray-600 leading-relaxed">
                Works with Chrome, Firefox, Safari, Edge, and more. No plugins or extensions required for PDF to JPG conversion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Convert PDF to High-Quality JPG Images?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Extract PDF pages as professional-quality JPEG images with ilovepdf.cc's advanced online converter. All tools are free and work instantly in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/jpg-to-pdf"
              className="bg-white text-red-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg inline-flex items-center justify-center"
            >
              <ImageIcon className="h-5 w-5 mr-2" />
              JPG to PDF Converter
            </Link>
            <Link
              to="/tools/pdf-to-png"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200 text-lg inline-flex items-center justify-center"
            >
              <FileImage className="h-5 w-5 mr-2" />
              PDF to PNG Converter
            </Link>
          </div>
          <p className="text-red-100 mt-6 text-sm">
            Free to use • No registration required • Secure processing on ilovepdf.cc
          </p>
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
                Every tool you need to use PDFs and convert images, at your fingertips. All are 100% FREE and easy to use!
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">FEATURES</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Compress PDF</Link></li>
                <li><Link to="/tools/pdf-to-word" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to Word</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">CONVERT</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/pdf-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to PNG</Link></li>
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to PDF</Link></li>
                <li><Link to="/tools/jpg-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">JPG to PDF</Link></li>
                <li><Link to="/tools/pdf-to-jpg" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to JPG</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">IMAGE TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/png-to-webp" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to WebP</Link></li>
                <li><Link to="/tools/webp-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">WebP to PNG</Link></li>
                <li><Link to="/tools/edit-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Edit PDF</Link></li>
                <li><Link to="/tools/watermark" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Watermark PDF</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">COMPANY</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/about" className="text-gray-600 hover:text-red-500 transition-colors duration-200">About us</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Blog</a></li>
                <li><a href="/help" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Help</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2024 ilovepdf.cc. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PDF and image lovers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PdfToJpgPage