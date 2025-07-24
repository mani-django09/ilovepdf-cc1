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
  Copy,
  RotateCcw,
  Clock,
  Users,
  Smartphone,
  Monitor,
  Award,
  Lock,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Target,
  Gauge
} from "lucide-react"

function JpgToPdfPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [imageFiles, setImageFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionComplete, setConversionComplete] = useState(false)
  const [error, setError] = useState("")
  const [conversionResult, setConversionResult] = useState(null)
  const [progress, setProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [conversionSettings, setConversionSettings] = useState({
    pageSize: 'A4',
    orientation: 'portrait',
    quality: 'high',
    compression: 'medium',
    fitMode: 'fit',
    colorSpace: 'rgb',
    mergeMode: 'single'
  })
  const [showSettings, setShowSettings] = useState(false)
  const fileInputRef = useRef(null)

  // SEO Meta Tags Setup
  useEffect(() => {
    // Update document title and meta tags
    document.title = "JPG to PDF Converter - Convert Images to PDF Online Free | iLovePDF.cc"
    
    // Create or update meta description
    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const updateProperty = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // SEO Meta Tags
    updateMeta('description', 'Convert JPG to PDF online for free with iLovePDF.cc. Transform JPEG, PNG, and other images into professional PDF documents. Fast, secure, and no registration required.')
    updateMeta('keywords', 'jpg to pdf, jpeg to pdf converter, convert jpg to pdf online, image to pdf, png to pdf, free pdf converter, online jpg to pdf, ilovepdf.cc')
    updateMeta('author', 'iLovePDF.cc')
    updateMeta('robots', 'index, follow')
    updateMeta('viewport', 'width=device-width, initial-scale=1.0')

    // Open Graph Tags
    updateProperty('og:title', 'JPG to PDF Converter - Convert Images to PDF Online Free')
    updateProperty('og:description', 'Convert JPG to PDF online for free with iLovePDF.cc. Transform images into professional PDF documents instantly.')
    updateProperty('og:type', 'website')
    updateProperty('og:url', 'https://ilovepdf.cc/tools/jpg-to-pdf')
    updateProperty('og:site_name', 'iLovePDF.cc')
    updateProperty('og:image', 'https://ilovepdf.cc/images/jpg-to-pdf-og.jpg')

    // Twitter Card Tags
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', 'JPG to PDF Converter - Convert Images to PDF Online Free')
    updateMeta('twitter:description', 'Convert JPG to PDF online for free with iLovePDF.cc. Transform images into professional PDF documents instantly.')
    updateMeta('twitter:image', 'https://ilovepdf.cc/images/jpg-to-pdf-og.jpg')

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = 'https://ilovepdf.cc/tools/jpg-to-pdf'

    // Structured Data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JPG to PDF Converter",
      "description": "Convert JPG to PDF online for free with iLovePDF.cc. Transform images into professional PDF documents instantly.",
      "url": "https://ilovepdf.cc/tools/jpg-to-pdf",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "provider": {
        "@type": "Organization",
        "name": "iLovePDF.cc",
        "url": "https://ilovepdf.cc"
      }
    }

    let scriptTag = document.querySelector('script[type="application/ld+json"]')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(structuredData)

    return () => {
      // Cleanup function if needed
    }
  }, [])

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

  const faqData = [
    {
      question: "How do I convert JPG to PDF online with iLovePDF.cc?",
      answer: "Converting JPG to PDF with iLovePDF.cc is simple: 1) Upload your JPG/JPEG images using our drag-and-drop interface, 2) Choose your PDF settings like page size, quality, and orientation, 3) Click 'Convert to PDF' and download your professional PDF document. Our online JPG to PDF converter handles multiple image formats and preserves image quality."
    },
    {
      question: "Can I convert multiple JPG images to one PDF file?",
      answer: "Yes! Our online JPG to PDF converter allows you to upload multiple images and create either a single PDF with all images as separate pages, or individual PDF files for each image. This feature is perfect for creating photo albums, document compilations, or professional presentations from your JPG files."
    },
    {
      question: "What image formats does the JPG to PDF converter support?",
      answer: "Our online converter supports JPG, JPEG, PNG, GIF, BMP, TIFF, and WebP image formats. All formats are converted to high-quality PDF documents with customizable settings. Whether you need to convert JPG to PDF, PNG to PDF, or any other image format, iLovePDF.cc handles them all seamlessly."
    },
    {
      question: "How can I control the image quality in my PDF conversion?",
      answer: "iLovePDF.cc offers three quality settings: High Quality (95%) for printing and archival purposes, Medium Quality (85%) for general use with balanced file size, and Web Quality (75%) optimized for online sharing. You can also adjust compression levels and color space options for professional results."
    },
    {
      question: "What's the maximum file size for JPG to PDF conversion?",
      answer: "You can upload JPG images up to 20MB each, with a maximum of 20 images per conversion. For larger batches, simply process them in separate groups. Our online JPG to PDF converter is optimized for both small personal photos and large professional image collections."
    },
    {
      question: "Can I customize page size and orientation for my PDF?",
      answer: "Absolutely! Choose from standard page sizes including A4 (international standard), Letter (US standard), Legal, A3, or Auto (which matches your original image dimensions). You can set orientation to Portrait or Landscape and control how images fit on the page - whether to fit within boundaries, fill the entire page, or maintain original size."
    },
    {
      question: "Is the online JPG to PDF converter free to use?",
      answer: "Yes, iLovePDF.cc provides free JPG to PDF conversion with no registration required. Convert unlimited JPG files to PDF online without watermarks or restrictions. Our service is completely free for personal and professional use."
    },
    {
      question: "How secure is the JPG to PDF conversion process?",
      answer: "Your privacy and security are our top priorities. All uploaded JPG files are automatically deleted from our servers after conversion. We use SSL encryption for all data transfers, and our online JPG to PDF converter processes files locally without storing any personal information."
    }
  ]

  const pageSizeOptions = [
    { value: 'A4', label: 'A4 (210 × 297 mm)', description: 'Standard international size' },
    { value: 'Letter', label: 'Letter (8.5 × 11 in)', description: 'Standard US size' },
    { value: 'Legal', label: 'Legal (8.5 × 14 in)', description: 'US legal document size' },
    { value: 'A3', label: 'A3 (297 × 420 mm)', description: 'Large format' },
    { value: 'auto', label: 'Auto (Image size)', description: 'Match original image dimensions' }
  ]

  const qualityOptions = [
    { value: 'high', label: 'High Quality (95%)', description: 'Best for printing and archival' },
    { value: 'medium', label: 'Medium Quality (85%)', description: 'Good balance for most uses' },
    { value: 'web', label: 'Web Quality (75%)', description: 'Optimized for sharing and web' }
  ]

  const compressionOptions = [
    { value: 'none', label: 'No Compression', description: 'Largest file size, best quality' },
    { value: 'medium', label: 'Medium Compression', description: 'Balanced size and quality' },
    { value: 'high', label: 'High Compression', description: 'Smallest file size' }
  ]

  const fitModeOptions = [
    { value: 'fit', label: 'Fit to Page', description: 'Scale image to fit within page boundaries' },
    { value: 'fill', label: 'Fill Page', description: 'Scale image to fill entire page (may crop)' },
    { value: 'original', label: 'Original Size', description: 'Keep original image dimensions' }
  ]

  const colorSpaceOptions = [
    { value: 'rgb', label: 'RGB Color', description: 'Standard color for screens and digital use' },
    { value: 'grayscale', label: 'Grayscale', description: 'Black and white for documents' },
    { value: 'cmyk', label: 'CMYK', description: 'Print color space for professional printing' }
  ]

  const handleFileSelect = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      const isValidType = /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i.test(file.name) || 
                         /^image\//.test(file.type)
      const isValidSize = file.size <= 20 * 1024 * 1024 // 20MB limit per file
      
      if (!isValidType) {
        setError("Please select only image files (JPG, PNG, GIF, BMP, TIFF, WebP)")
        return false
      }
      if (!isValidSize) {
        setError("Each image file must be less than 20MB")
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      if (imageFiles.length + validFiles.length > 20) {
        setError("You can convert up to 20 images at once")
        return
      }

      const totalSize = [...imageFiles, ...validFiles].reduce((sum, file) => sum + (file.size || 0), 0)
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
        originalSize: file.size,
        preview: URL.createObjectURL(file)
      }))
      
      setImageFiles(prev => [...prev, ...newFiles])
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
    if (imageFiles.length === 0) return { size: '0 MB', description: '' }
    
    const avgImageSize = imageFiles.reduce((sum, file) => sum + file.size, 0) / imageFiles.length
    let estimatedSize = avgImageSize * imageFiles.length
    
    // Adjust based on settings
    if (conversionSettings.quality === 'high') {
      estimatedSize *= 1.2
    } else if (conversionSettings.quality === 'web') {
      estimatedSize *= 0.7
    }
    
    if (conversionSettings.compression === 'high') {
      estimatedSize *= 0.6
    } else if (conversionSettings.compression === 'none') {
      estimatedSize *= 1.5
    }
    
    return {
      size: formatFileSize(estimatedSize),
      description: conversionSettings.mergeMode === 'single' ? 
        `Single PDF with ${imageFiles.length} page${imageFiles.length > 1 ? 's' : ''}` :
        `${imageFiles.length} individual PDF file${imageFiles.length > 1 ? 's' : ''}`
    }
  }

  const convertToPdf = async () => {
    if (imageFiles.length === 0) {
      setError("Please select at least 1 image file to convert")
      return
    }

    setIsConverting(true)
    setError("")
    setProgress(0)

    const progressSteps = [
      { step: 10, message: "Initializing conversion..." },
      { step: 25, message: "Processing images..." },
      { step: 50, message: "Optimizing quality..." },
      { step: 75, message: "Generating PDF..." },
      { step: 90, message: "Finalizing document..." }
    ]

    let currentStep = 0
    const progressInterval = setInterval(() => {
      if (currentStep < progressSteps.length) {
        setProgress(progressSteps[currentStep].step)
        currentStep++
      } else {
        clearInterval(progressInterval)
      }
    }, 800)

    try {
      const formData = new FormData()
      
      // Add image files
      imageFiles.forEach((fileObj) => {
        formData.append('files', fileObj.file)
      })

      // Add conversion settings
      formData.append('pageSize', conversionSettings.pageSize)
      formData.append('orientation', conversionSettings.orientation)
      formData.append('quality', conversionSettings.quality)
      formData.append('compression', conversionSettings.compression)
      formData.append('fitMode', conversionSettings.fitMode)
      formData.append('colorSpace', conversionSettings.colorSpace)
      formData.append('mergeMode', conversionSettings.mergeMode)

      console.log("Starting conversion for", imageFiles.length, "images to PDF")

      // Use the JPG to PDF API endpoint
      const API_BASE = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : window.location.origin

      const response = await fetch(`${API_BASE}/api/jpg-to-pdf`, {
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
        // Update download URL to use the correct server
        const updatedResult = {
          ...result,
          output: {
            ...result.output,
            downloadUrl: `${API_BASE}${result.output.downloadUrl}`
          }
        }
        
        setConversionResult(updatedResult)
        setIsConverting(false)
        setConversionComplete(true)
        setProgress(0)
      }, 1000)

    } catch (err) {
      console.error('Conversion failed:', err)
      clearInterval(progressInterval)
      
      let errorMessage = 'Conversion failed. Please try again.'
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = 'Cannot connect to the JPG to PDF server. Please make sure it is running on port 5006.'
      } else if (err.message.includes('ECONNREFUSED')) {
        errorMessage = 'JPG to PDF server is not running. Please start the server on port 5006.'
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

  const removeFile = (fileId) => {
    const fileToRemove = imageFiles.find(file => file.id === fileId)
    if (fileToRemove && fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview)
    }
    setImageFiles(imageFiles.filter(file => file.id !== fileId))
    setError("")
  }

  const moveFile = (index, direction) => {
    const newFiles = [...imageFiles]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]]
      setImageFiles(newFiles)
    }
  }

  const startOver = () => {
    // Clean up preview URLs
    imageFiles.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    
    setImageFiles([])
    setConversionComplete(false)
    setConversionResult(null)
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
    return imageFiles.reduce((sum, file) => sum + file.size, 0)
  }

  const previewImage = (fileObj) => {
    setPreviewFile(fileObj)
    setShowPreview(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">iLove</span>
              <span className="text-2xl font-bold text-red-500">PDF</span>
              <span className="text-sm text-gray-500 ml-1">.cc</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/tools/merge" 
                className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider"
              >
                Merge PDF
              </Link>
              <Link 
                to="/tools/split" 
                className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider"
              >
                Split PDF
              </Link>
              <Link 
                to="/tools/compress" 
                className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider"
              >
                Compress PDF
              </Link>
              
              <div className="relative">
                <button 
                  className="text-red-500 hover:text-red-600 font-medium text-sm uppercase tracking-wider flex items-center"
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
                        className={`block px-4 py-2 text-sm hover:bg-gray-50 ${
                          tool.title === "JPG to PDF" ? "text-red-500 font-medium" : "text-gray-700 hover:text-red-500"
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
                  className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider flex items-center"
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
                      <Link to="/tools/merge" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50">Merge PDF</Link>
                      <Link to="/tools/split" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50">Split PDF</Link>
                      <Link to="/tools/compress" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50">Compress PDF</Link>
                      <Link to="/tools/pdf-to-png" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50">PDF to PNG</Link>
                      <Link to="/tools/png-to-pdf" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50">PNG to PDF</Link>
                      <Link to="/tools/jpg-to-pdf" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium">JPG to PDF</Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium"
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
              <button className="text-gray-700 hover:text-red-500 font-medium text-sm">
                Log in
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium text-sm transition-colors">
                Sign up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
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
                  className="block text-gray-700 hover:text-red-500 font-medium text-sm uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Merge PDF
                </Link>
                <Link 
                  to="/tools/jpg-to-pdf" 
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  JPG to PDF
                </Link>
                <div className="pt-4 border-t space-y-3">
                  <button className="block w-full text-left text-gray-700 hover:text-red-500 font-medium text-sm">
                    Log in
                  </button>
                  <button className="block w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium text-sm">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - SEO Optimized */}
      <section className="bg-white py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            JPG to PDF Converter - Transform Images into Professional Documents
          </h1>
          <p className="text-lg text-gray-600">
            Convert JPG, JPEG, PNG, and other image formats to high-quality PDF documents. Combine multiple images into one PDF or create individual PDF files.
          </p>
        </div>
      </section>

{/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          {!conversionComplete ? (
            <>
              {/* Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-all duration-300 cursor-pointer mb-4 sm:mb-6 ${
                  isDragOver 
                    ? 'border-red-400 bg-red-50 scale-105' 
                    : imageFiles.length > 0 
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
                  accept="image/*,.jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp"
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={isConverting}
                  multiple
                />
                
                {imageFiles.length === 0 ? (
                  <>
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <ImageIcon className="h-10 sm:h-12 w-10 sm:w-12 text-gray-400" />
                        <FileText className="h-5 sm:h-6 w-5 sm:w-6 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isDragOver ? 'Drop your image files here' : 'Select images to convert to PDF'}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      or drop image files here
                    </p>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
                      disabled={isConverting}
                    >
                      Choose Image Files
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                      Supports: JPG, PNG, GIF, BMP, TIFF, WebP • Up to 20 files • Max 20MB per file
                    </p>
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-10 sm:h-12 w-10 sm:w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {imageFiles.length} image{imageFiles.length > 1 ? 's' : ''} ready to convert
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Total size: {formatFileSize(getTotalSize())}
                    </p>
                    {!isConverting && (
                      <button className="text-red-500 hover:text-red-600 font-medium text-sm">
                        Click to add more images
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Output Preview - More Compact */}
              {imageFiles.length > 0 && !isConverting && (
                <div className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center text-sm sm:text-base">
                    <FileText className="h-4 w-4 mr-2" />
                    PDF Output Preview
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div className="bg-white rounded-lg p-2 sm:p-3">
                      <div className="text-sm sm:text-lg font-bold text-gray-900">{conversionSettings.pageSize}</div>
                      <div className="text-xs text-gray-500">Page Size</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 sm:p-3">
                      <div className="text-sm sm:text-lg font-bold text-purple-600">
                        {conversionSettings.mergeMode === 'single' ? 'Single' : 'Multiple'}
                      </div>
                      <div className="text-xs text-gray-500">Output Mode</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 sm:p-3 col-span-2 sm:col-span-1">
                      <div className="text-sm sm:text-lg font-bold text-blue-600">
                        {getEstimatedOutputSize().size}
                      </div>
                      <div className="text-xs text-gray-500">Est. Size</div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-2 text-center">
                    {getEstimatedOutputSize().description}
                  </p>
                </div>
              )}

              {/* Conversion Settings - Compact Design */}
              {imageFiles.length > 0 && !isConverting && (
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">PDF Settings</h4>
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="flex items-center text-xs sm:text-sm text-gray-600 hover:text-red-500 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {showSettings ? 'Hide' : 'Advanced'}
                    </button>
                  </div>
                  
                  {/* Quick Settings */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    <select
                      value={conversionSettings.pageSize}
                      onChange={(e) => setConversionSettings({...conversionSettings, pageSize: e.target.value})}
                      className="text-xs sm:text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                      <option value="A4">A4</option>
                      <option value="Letter">Letter</option>
                      <option value="auto">Auto</option>
                    </select>
                    
                    <select
                      value={conversionSettings.quality}
                      onChange={(e) => setConversionSettings({...conversionSettings, quality: e.target.value})}
                      className="text-xs sm:text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                      <option value="high">High Quality</option>
                      <option value="medium">Medium</option>
                      <option value="web">Web</option>
                    </select>
                    
                    <select
                      value={conversionSettings.orientation}
                      onChange={(e) => setConversionSettings({...conversionSettings, orientation: e.target.value})}
                      className="text-xs sm:text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                    
                    <select
                      value={conversionSettings.mergeMode}
                      onChange={(e) => setConversionSettings({...conversionSettings, mergeMode: e.target.value})}
                      className="text-xs sm:text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                      <option value="single">Single PDF</option>
                      <option value="individual">Individual</option>
                    </select>
                  </div>
                  
                  {showSettings && (
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-3">
                      {/* Compression */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          PDF Compression
                        </label>
                        <select
                          value={conversionSettings.compression}
                          onChange={(e) => setConversionSettings({...conversionSettings, compression: e.target.value})}
                          className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          {compressionOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Fit Mode */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Image Fit Mode
                        </label>
                        <select
                          value={conversionSettings.fitMode}
                          onChange={(e) => setConversionSettings({...conversionSettings, fitMode: e.target.value})}
                          className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          {fitModeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Color Space */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Color Space
                        </label>
                        <select
                          value={conversionSettings.colorSpace}
                          onChange={(e) => setConversionSettings({...conversionSettings, colorSpace: e.target.value})}
                          className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          {colorSpaceOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-medium mb-1 text-sm sm:text-base">Error</p>
                    <p className="text-red-600 text-xs sm:text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* File List - Compact Grid */}
              {imageFiles.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      Images ({imageFiles.length})
                    </h4>
                    <p className="text-xs text-gray-500">Drag to reorder</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                    {imageFiles.map((fileObj, index) => (
                      <div 
                        key={fileObj.id} 
                        className="bg-white border rounded-lg p-2 transition-all duration-200 border-gray-200 hover:shadow-md"
                      >
                        {/* Order Number and Controls */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <div className="flex items-center space-x-1">
                            {!isConverting && (
                              <>
                                <button
                                  onClick={() => moveFile(index, 'up')}
                                  disabled={index === 0}
                                  className="text-gray-400 hover:text-blue-500 p-0.5 disabled:opacity-30"
                                  title="Move up"
                                >
                                  <ArrowUp className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => moveFile(index, 'down')}
                                  disabled={index === imageFiles.length - 1}
                                  className="text-gray-400 hover:text-blue-500 p-0.5 disabled:opacity-30"
                                  title="Move down"
                                >
                                  <ArrowDown className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => previewImage(fileObj)}
                                  className="text-gray-400 hover:text-green-500 p-0.5"
                                  title="Preview"
                                >
                                  <Eye className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => removeFile(fileObj.id)}
                                  className="text-gray-400 hover:text-red-500 p-0.5"
                                  title="Remove"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Image Preview */}
                        <div className="relative mb-2 bg-gray-100 rounded border overflow-hidden">
                          <img 
                            src={fileObj.preview} 
                            alt={fileObj.name}
                            className="w-full h-16 sm:h-20 object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                          <div className="hidden w-full h-16 sm:h-20 bg-gray-200 flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="absolute top-1 right-1">
                            <GripVertical className="h-3 w-3 text-white cursor-move drop-shadow-sm" />
                          </div>
                        </div>
                        
                        {/* File Info */}
                        <div>
                          <p className="font-medium text-gray-900 text-xs truncate" title={fileObj.name}>
                            {fileObj.name}
                          </p>
                          <p className="text-xs text-gray-500">{formatFileSize(fileObj.size)}</p>
                          <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full mt-1">
                            Ready
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Convert Button */}
              {imageFiles.length > 0 && !isConverting && (
                <div className="text-center">
                  <button
                    onClick={convertToPdf}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Convert {imageFiles.length} image{imageFiles.length > 1 ? 's' : ''} to PDF
                  </button>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    {getEstimatedOutputSize().description}
                  </p>
                </div>
              )}

              {/* Enhanced Converting State */}
              {isConverting && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-full mb-4 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-20 animate-pulse"></div>
                    <div className="relative">
                      <Loader className="h-8 w-8 text-red-500 animate-spin" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Converting your images...</h3>
                  <p className="text-gray-600 text-sm mb-4">Creating high-quality PDF document</p>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="max-w-xs mx-auto mb-3">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all duration-500 relative"
                        style={{width: `${progress}%`}}
                      >
                        <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{progress}% complete</p>
                  
                  {/* Processing Steps */}
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${progress >= 25 ? 'bg-red-500' : 'bg-gray-300'} transition-colors`}></div>
                    <div className={`w-2 h-2 rounded-full ${progress >= 50 ? 'bg-red-500' : 'bg-gray-300'} transition-colors`}></div>
                    <div className={`w-2 h-2 rounded-full ${progress >= 75 ? 'bg-red-500' : 'bg-gray-300'} transition-colors`}></div>
                    <div className={`w-2 h-2 rounded-full ${progress >= 100 ? 'bg-red-500' : 'bg-gray-300'} transition-colors`}></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Conversion Complete */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">PDF Conversion Complete!</h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Your {imageFiles.length} image{imageFiles.length > 1 ? 's have' : ' has'} been successfully converted to PDF.
              </p>

              {/* Conversion Summary */}
              {conversionResult && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 max-w-md mx-auto mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{imageFiles.length}</div>
                        <div className="text-xs text-gray-500">Images</div>
                      </div>
                      <div className="flex-shrink-0">
                        <ArrowDown className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {conversionResult.output.type === 'single' ? '1' : conversionResult.output.fileCount}
                        </div>
                        <div className="text-xs text-gray-500">PDF File{conversionResult.output.type !== 'single' ? 's' : ''}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      <FileText className="h-4 w-4 mr-1" />
                      {conversionSettings.pageSize} • {conversionSettings.quality} quality
                    </div>
                  </div>
                </div>
              )}

              {/* Download Section */}
              {conversionResult?.output && (
                <div className="max-w-md mx-auto mb-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center mr-3">
                          {conversionResult.output.type === 'zip' ? <Download className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">{conversionResult.output.name}</p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(conversionResult.output.size)}
                            {conversionResult.output.pageCount && (
                              <span className="ml-2 text-blue-600">
                                {conversionResult.output.pageCount} page{conversionResult.output.pageCount > 1 ? 's' : ''}
                              </span>
                            )}
                            {conversionResult.output.fileCount && (
                              <span className="ml-2 text-purple-600">
                                {conversionResult.output.fileCount} file{conversionResult.output.fileCount > 1 ? 's' : ''}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => downloadFile(conversionResult.output.downloadUrl, conversionResult.output.name)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors ml-3"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => conversionResult?.output && downloadFile(conversionResult.output.downloadUrl, conversionResult.output.name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
                <button
                  onClick={startOver}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Convert More Images
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {showPreview && previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Image Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 text-center max-h-[80vh] overflow-auto">
              <div className="mb-4">
                <img 
                  src={previewFile.preview} 
                  alt={previewFile.name}
                  className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{previewFile.name}</p>
                <p className="text-sm text-gray-500">
                  Size: {formatFileSize(previewFile.size)}
                </p>
                <p className="text-xs text-gray-400">
                  Will be converted to {conversionSettings.pageSize} PDF page
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Features Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose iLovePDF.cc for JPG to PDF Conversion?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your images into professional PDF documents with our advanced online JPG to PDF converter. 
              Trusted by millions worldwide for fast, secure, and high-quality conversions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl mb-4 transform group-hover:scale-110 transition-transform">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Professional Quality</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Convert JPG to PDF with pristine quality preservation. Our advanced algorithms ensure your images 
                look perfect in PDF format with customizable compression and resolution settings.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl mb-4 transform group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Experience the fastest JPG to PDF conversion online. Process multiple images in seconds with our 
                optimized servers and advanced processing technology.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl mb-4 transform group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">100% Secure</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your privacy matters. All uploaded images are processed securely and automatically deleted after 
                conversion. SSL encryption protects your data throughout the process.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl mb-4 transform group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Universal Access</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Work from any device, anywhere. Our online JPG to PDF converter works seamlessly on desktop, 
                tablet, and mobile devices without any software installation required.
              </p>
            </div>
          </div>

          {/* Additional Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Layers className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Batch Processing</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Convert up to 20 JPG images to PDF simultaneously. Perfect for creating photo albums, 
                presentations, or document compilations from multiple image files.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Custom Settings</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Fine-tune your PDF output with advanced options including page size, orientation, 
                compression levels, and color space settings for professional results.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Premium Quality</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Industry-leading image processing ensures your JPG to PDF conversions maintain 
                exceptional quality with optimized file sizes for any use case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Enhanced */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Convert JPG to PDF Online with iLovePDF.cc
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your JPEG images into professional PDF documents in just three simple steps. 
              Our online JPG to PDF converter makes the process fast and effortless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines for Desktop */}
            <div className="hidden md:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-red-300 to-blue-300"></div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Upload className="h-10 w-10" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Upload Your Images</h3>
              <p className="text-gray-600 leading-relaxed">
                Select your JPG, JPEG, PNG, or other image files using our intuitive drag-and-drop interface. 
                Support for multiple formats and batch uploads up to 20 files at once.
              </p>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Settings className="h-10 w-10" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Customize PDF Settings</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose your preferred page size, orientation, quality level, and compression settings. 
                Decide whether to create one combined PDF or individual files for each image.
              </p>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Download className="h-10 w-10" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">Download Your PDF</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your professional PDF document ready for sharing, printing, or archiving. 
                Files are processed instantly and available for immediate download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">5M+</div>
              <div className="text-red-100 text-sm">Images Converted</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">99.9%</div>
              <div className="text-red-100 text-sm">Uptime</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">150+</div>
              <div className="text-red-100 text-sm">Countries</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">24/7</div>
              <div className="text-red-100 text-sm">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About JPG to PDF Conversion
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about converting JPG to PDF online with iLovePDF.cc. 
              Learn about features, security, and best practices.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section - Enhanced */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to JPG to PDF Conversion with iLovePDF.cc
            </h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Why Convert JPG to PDF Online?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Converting JPG to PDF with iLovePDF.cc provides numerous advantages for document management, 
                sharing, and professional presentation. Our online JPG to PDF converter ensures universal 
                compatibility, maintains image quality, and creates professional-looking documents suitable 
                for business, academic, and personal use across all platforms and devices.
              </p>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Advanced Features of Our Online JPG to PDF Converter
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Multiple Format Support
                </h4>
                <p className="text-gray-600 text-sm">
                  Convert not just JPG to PDF, but also JPEG, PNG, GIF, BMP, TIFF, and WebP formats 
                  with the same high-quality results and professional output.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Batch Processing
                </h4>
                <p className="text-gray-600 text-sm">
                  Upload and convert up to 20 images simultaneously, perfect for creating comprehensive 
                  photo albums, presentations, or document compilations.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Quality Control
                </h4>
                <p className="text-gray-600 text-sm">
                  Choose from High (95%), Medium (85%), or Web (75%) quality settings to balance 
                  file size and image clarity for your specific needs.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Custom Page Layouts
                </h4>
                <p className="text-gray-600 text-sm">
                  Select from A4, Letter, Legal, A3, or Auto sizing with Portrait or Landscape 
                  orientation for professional document formatting.
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Best Practices for JPG to PDF Conversion
            </h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Target className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Image Quality:</strong> Use high-resolution JPG images (300 DPI or higher) for best PDF output quality, especially for printing purposes.</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>File Organization:</strong> Arrange images in desired order before uploading, as the PDF pages will follow your upload sequence.</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Page Settings:</strong> Choose A4 for international documents, Letter for US business documents, or Auto to preserve original dimensions.</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Compression:</strong> Use medium compression for balanced file size and quality, or no compression for archival purposes.</span>
                </li>
              </ul>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Common Use Cases for JPG to PDF Conversion
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our online JPG to PDF converter at iLovePDF.cc serves diverse professional and personal needs. 
              Create stunning photo albums by converting multiple JPG images into a single PDF document. 
              Business professionals use our tool for compiling visual reports, creating presentation materials, 
              and preparing marketing collateral. Students and researchers convert scanned documents, charts, 
              and graphs from JPG to PDF format for academic submissions and research documentation.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-green-900 mb-3">
                Why Choose iLovePDF.cc for Online JPG to PDF Conversion?
              </h4>
              <p className="text-gray-700 leading-relaxed">
                iLovePDF.cc stands out as the premier destination for JPG to PDF conversion with its combination 
                of advanced features, security, and ease of use. Our platform processes millions of conversions 
                monthly, trusted by users worldwide for reliable, high-quality results. With no registration 
                required, unlimited free conversions, and support for multiple image formats, we provide the 
                most comprehensive online JPG to PDF conversion experience available.
              </p>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Security and Privacy in JPG to PDF Conversion
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At iLovePDF.cc, we prioritize your privacy and data security. All JPG files uploaded for PDF 
              conversion are processed using SSL encryption and automatically deleted from our servers after 
              processing. We never store, share, or access your personal images, ensuring complete confidentiality 
              throughout the conversion process. Our secure infrastructure meets industry standards for data 
              protection and privacy compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Convert Your Images to Professional PDFs?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join millions of users who trust iLovePDF.cc for fast, secure, and high-quality JPG to PDF conversion. 
            Transform your images into professional documents in seconds – completely free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/tools/pdf-to-jpg"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center">
                <Download className="h-5 w-5 mr-2" />
                PDF to JPG
              </div>
            </Link>
            <Link
              to="/tools/png-to-pdf"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-center">
                <Upload className="h-5 w-5 mr-2" />
                PNG to PDF
              </div>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-red-100">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm">100% Secure</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span className="text-sm">Instant Processing</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm">5M+ Users</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              <span className="text-sm">Premium Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center mb-6">
                <span className="text-2xl font-bold text-white">iLove</span>
                <span className="text-2xl font-bold text-red-500">PDF</span>
                <span className="text-lg text-gray-400 ml-1">.cc</span>
              </Link>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                The ultimate destination for PDF tools and image conversion. Transform, merge, split, 
                and convert your documents with professional quality and complete security.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors cursor-pointer">
                  <Heart className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors cursor-pointer">
                  <Star className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">POPULAR TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/merge" className="text-gray-400 hover:text-red-400 transition-colors">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-400 hover:text-red-400 transition-colors">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-400 hover:text-red-400 transition-colors">Compress PDF</Link></li>
                <li><Link to="/tools/pdf-to-word" className="text-gray-400 hover:text-red-400 transition-colors">PDF to Word</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">CONVERT FILES</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/pdf-to-png" className="text-gray-400 hover:text-red-400 transition-colors">PDF to PNG</Link></li>
                <li><Link to="/tools/png-to-pdf" className="text-gray-400 hover:text-red-400 transition-colors">PNG to PDF</Link></li>
                <li><Link to="/tools/jpg-to-pdf" className="text-gray-400 hover:text-red-400 transition-colors font-medium">JPG to PDF</Link></li>
                <li><Link to="/tools/pdf-to-jpg" className="text-gray-400 hover:text-red-400 transition-colors">PDF to JPG</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">IMAGE TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/png-to-webp" className="text-gray-400 hover:text-red-400 transition-colors">PNG to WebP</Link></li>
                <li><Link to="/tools/webp-to-png" className="text-gray-400 hover:text-red-400 transition-colors">WebP to PNG</Link></li>
                <li><Link to="/tools/edit-pdf" className="text-gray-400 hover:text-red-400 transition-colors">Edit PDF</Link></li>
                <li><Link to="/tools/watermark" className="text-gray-400 hover:text-red-400 transition-colors">Watermark PDF</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">COMPANY</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">About iLovePDF.cc</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Blog & Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 sm:mb-0">
                © 2024 iLovePDF.cc. Made with{" "}
                <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
                for PDF and image lovers worldwide.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default JpgToPdfPage