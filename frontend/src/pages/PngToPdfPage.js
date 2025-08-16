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
  Image as ImageIcon,
  GripVertical,
  Settings,
  Palette,
  FileImage,
  Heart,
  Minimize2,
  FileText,
  Layout,
  Monitor,
  Smartphone,
  Camera,
  BarChart3,
  Package,
  Users,
  Award,
  BookOpen,
  Lock,
  RefreshCw,
  Merge,
  Edit3
} from "lucide-react"

function PngToPdfPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [pngFiles, setPngFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionComplete, setConversionComplete] = useState(false)
  const [error, setError] = useState("")
  const [convertedFiles, setConvertedFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [conversionSettings, setConversionSettings] = useState({
    pageSize: 'A4',
    orientation: 'portrait',
    margin: '20',
    quality: 'high',
    fitToPage: true,
    mergeIntoPdf: true
  })
  const [showSettings, setShowSettings] = useState(false)
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

  // Enhanced FAQ with PNG to PDF focus
  const faqData = [
    {
      question: "How to convert PNG to PDF online free with ilovepdf8.com?",
      answer: "ilovepdf8.com offers the best online PNG to PDF converter for creating professional PDF documents from PNG images. Simply upload your PNG files, customize page settings like size and orientation, then convert instantly. Our PNG to PDF converter maintains image quality and creates polished documents."
    },
    
    
    {
      question: "Will my PNG image quality be preserved in the PDF conversion?",
      answer: "Absolutely! Our PNG to PDF converter maintains high image quality throughout the conversion process. You can select from multiple quality settings to balance file size and clarity, ensuring your PNG images look perfect in the final PDF."
    },
    {
      question: "What's the file size limit for PNG to PDF conversion?",
      answer: "Our PNG to PDF converter supports up to 20 PNG images at once, with each image up to 25MB in size. The total upload limit is 200MB, making it perfect for converting large collections of PNG images to PDF format efficiently."
    },
    
    {
      question: "Is the online PNG to PDF converter secure for sensitive images?",
      answer: "Absolutely! ilovepdf8.com's PNG to PDF converter uses enterprise-grade SSL encryption to protect your images during conversion. All uploaded PNG files are automatically deleted from our servers after processing for complete privacy and security."
    },
    {
      question: "Does the PNG to PDF converter work on mobile devices?",
      answer: "Yes! Our PNG to PDF converter is fully optimized for mobile devices including smartphones and tablets. Convert PNG images to PDF on Android, iPhone, iPad, and any device with a web browser for convenient document creation anywhere."
    }
  ]

  // PNG to PDF features for benefits section
  const conversionFeatures = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Professional PNG to PDF Conversion",
      description: "Transform PNG images into polished PDF documents with customizable page layouts and professional formatting options.",
      color: "blue"
    },
    {
      icon: <Layout className="h-8 w-8" />,
      title: "Custom Page Layouts",
      description: "Choose from multiple page sizes, orientations, and margin settings to create perfectly formatted PDF documents from PNG images.",
      color: "green"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Preservation",
      description: "Maintain original PNG image quality while creating compact, professional PDF documents with optimized compression settings.",
      color: "purple"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant PNG to PDF Processing",
      description: "Lightning-fast conversion from PNG images to PDF format with batch processing capabilities for multiple files simultaneously.",
      color: "orange"
    }
  ]

  // PNG to PDF capabilities
  const conversionCapabilities = [
    {
      icon: <Merge className="h-7 w-7" />,
      title: "Batch PNG to PDF Conversion",
      description: "Convert multiple PNG images to PDF simultaneously, with options to merge into single document or create separate PDF files."
    },
    {
      icon: <Settings className="h-7 w-7" />,
      title: "Advanced PDF Customization",
      description: "Complete control over PDF output including page size, orientation, margins, image quality, and layout optimization settings."
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Professional PDF Quality",
      description: "Create publication-ready PDF documents from PNG images with maintained resolution and professional presentation standards."
    }
  ]

  // PNG to PDF use cases
  const useCases = [
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Photography Portfolios",
      description: "Convert PNG photographs and artwork into professional PDF portfolios for client presentations and online sharing using our PNG to PDF converter.",
      color: "blue"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Document Archiving",
      description: "Transform scanned documents and images stored as PNG files into organized, searchable PDF archives for long-term storage and accessibility.",
      color: "green"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Business Presentations",
      description: "Create professional presentation materials by converting PNG graphics, charts, and infographics into polished PDF documents for meetings.",
      color: "purple"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Web Content Creation",
      description: "Convert PNG images from web projects into shareable PDF formats for easy distribution, printing, and universal device compatibility.",
      color: "orange"
    }
  ]

  const pageSizes = [
    { value: 'A4', label: 'A4 (210 × 297 mm)', description: 'Standard document size' },
    { value: 'A3', label: 'A3 (297 × 420 mm)', description: 'Large format' },
    { value: 'A5', label: 'A5 (148 × 210 mm)', description: 'Compact size' },
    { value: 'Letter', label: 'Letter (8.5 × 11 in)', description: 'US standard' },
    { value: 'Legal', label: 'Legal (8.5 × 14 in)', description: 'US legal size' }
  ]

  const qualityLevels = [
    { value: 'high', label: 'High Quality', description: 'Best image quality, larger file size' },
    { value: 'medium', label: 'Medium Quality', description: 'Balanced quality and file size' },
    { value: 'low', label: 'Compressed', description: 'Smaller file size, reduced quality' }
  ]

  const handleFileSelect = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      const isValidType = file.type === 'image/png' || 
                         file.name.toLowerCase().endsWith('.png')
      const isValidSize = file.size <= 25 * 1024 * 1024 // 25MB limit per file
      
      if (!isValidType) {
        setError("Please select only PNG image files")
        return false
      }
      if (!isValidSize) {
        setError("Each PNG file must be less than 25MB")
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      if (pngFiles.length + validFiles.length > 20) {
        setError("You can convert up to 20 PNG files at once")
        return
      }

      const totalSize = [...pngFiles, ...validFiles].reduce((sum, file) => sum + (file.size || 0), 0)
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
        preview: generateImagePreview(file),
        originalSize: file.size
      }))
      
      setPngFiles(prev => [...prev, ...newFiles])
    }
  }

  const generateImagePreview = (file) => {
    const url = URL.createObjectURL(file)
    return {
      type: 'image',
      url: url,
      icon: ImageIcon,
      content: `${file.name}\n${formatFileSize(file.size)}`,
      dimensions: null
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

  const convertToPdf = async () => {
    if (pngFiles.length === 0) {
      setError("Please select at least 1 PNG file to convert")
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
        return prev + 15
      })
    }, 300)

    try {
      const formData = new FormData()
      
      // Add PNG files
      pngFiles.forEach((fileObj, index) => {
        formData.append('files', fileObj.file)
        formData.append('order', index.toString())
      })

      // Add conversion settings
      formData.append('pageSize', conversionSettings.pageSize)
      formData.append('orientation', conversionSettings.orientation)
      formData.append('margin', conversionSettings.margin)
      formData.append('quality', conversionSettings.quality)
      formData.append('fitToPage', conversionSettings.fitToPage.toString())
      formData.append('mergeIntoPdf', conversionSettings.mergeIntoPdf.toString())

      console.log("Starting PNG to PDF conversion for", pngFiles.length, "PNG files")

      const API_BASE = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : window.location.origin

      const response = await fetch(`${API_BASE}/api/png-to-pdf`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("PNG to PDF conversion successful:", result)

      clearInterval(progressInterval)
      setProgress(100)

      setTimeout(() => {
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
      console.error('PNG to PDF conversion failed:', err)
      clearInterval(progressInterval)
      
      let errorMessage = 'PNG to PDF conversion failed. Please try again.'
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = 'Cannot connect to the PNG to PDF server. Please make sure it is running on port 5003.'
      } else if (err.message.includes('ECONNREFUSED')) {
        errorMessage = 'PNG to PDF server is not running. Please start the server on port 5003.'
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
    const fileToRemove = pngFiles.find(file => file.id === fileId)
    if (fileToRemove && fileToRemove.preview.url) {
      URL.revokeObjectURL(fileToRemove.preview.url)
    }
    setPngFiles(pngFiles.filter(file => file.id !== fileId))
    setError("")
  }

  const moveFile = (index, direction) => {
    const newFiles = [...pngFiles]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]]
      setPngFiles(newFiles)
    }
  }

  const startOver = () => {
    // Clean up object URLs
    pngFiles.forEach(file => {
      if (file.preview.url) {
        URL.revokeObjectURL(file.preview.url)
      }
    })
    
    setPngFiles([])
    setConversionComplete(false)
    setConvertedFiles([])
    setError("")
    setIsConverting(false)
    setProgress(0)
    setShowPreview(false)
    setPreviewImage(null)
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const getTotalSize = () => {
    return pngFiles.reduce((sum, file) => sum + file.size, 0)
  }

  const previewFile = (fileObj) => {
    setPreviewImage(fileObj)
    setShowPreview(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced SEO Meta Tags */}
      {typeof document !== 'undefined' && (
        <>
          {(() => {
            // Set document title properly
            document.title = "PNG to PDF Converter Online Free - Convert PNG Images to PDF | ilovepdf8.com"
            
            // Set meta tags
            const metaTags = [
              { name: "description", content: "Convert PNG images to PDF online free with ilovepdf8.com PNG to PDF converter. Create professional PDF documents with custom layouts, page sizes, and quality settings. No software required." },
              { name: "keywords", content: "png to pdf, png to pdf converter, online png to pdf, convert png to pdf, png to pdf online free, images to pdf, png pdf converter" },
              { name: "author", content: "ilovepdf8.com" },
              { name: "robots", content: "index, follow" },
              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
              { property: "og:title", content: "Free PNG to PDF Converter - Create Professional PDFs from Images | ilovepdf8.com" },
              { property: "og:description", content: "Professional PNG to PDF converter for creating polished PDF documents from PNG images. Custom layouts, quality settings, and batch conversion." },
              { property: "og:url", content: "https://ilovepdf8.com/tools/png-to-pdf" },
              { property: "og:type", content: "website" },
              { property: "og:site_name", content: "ilovepdf8.com" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Free PNG to PDF Converter Tool | ilovepdf8.com" },
              { name: "twitter:description", content: "Convert PNG images to PDF online free. Professional PNG to PDF converter with custom page layouts and quality settings." }
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
            canonical.setAttribute('href', 'https://ilovepdf8.com/tools/png-to-pdf')
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
                        className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                          tool.title === "PNG to PDF" ? "text-red-500 font-medium" : "text-gray-700 hover:text-red-500"
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
                    <Link to="/tools/png-to-pdf" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">PNG to PDF</Link>
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
                  to="/tools/png-to-pdf" 
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  PNG to PDF
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
            PNG to PDF Converter Online Free - Create Professional PDF Documents
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional PNG to PDF converter for transforming PNG images into polished PDF documents. Customize page layouts, sizes, and quality settings for perfect results every time.
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
                    : pngFiles.length > 0 
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
                  accept=".png,image/png"
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={isConverting}
                  multiple
                />
                
                {pngFiles.length === 0 ? (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative">
                        <FileImage className="h-10 lg:h-12 w-10 lg:w-12 text-gray-400" />
                        <FileText className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                      {isDragOver ? 'Drop your PNG files here' : 'Select PNG images to convert to PDF'}
                    </h3>
                    <p className="text-gray-600 mb-3 lg:mb-4 text-sm">
                      Professional PNG to PDF converter • Custom layouts • Batch conversion
                    </p>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      disabled={isConverting}
                    >
                      Choose PNG Files
                    </button>
                    <p className="text-xs text-gray-500 mt-2 lg:mt-3">
                      Supports: PNG format • Up to 20 files • Max 25MB per file • Free conversion
                    </p>
                  </>
                ) : (
                  <>
                    <FileImage className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {pngFiles.length} PNG file{pngFiles.length > 1 ? 's' : ''} ready for PDF conversion
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Total size: {formatFileSize(getTotalSize())}
                    </p>
                    {!isConverting && (
                      <button className="text-red-500 hover:text-red-600 font-medium text-xs">
                        Click to add more PNG files
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* PDF Output Preview - Compact */}
              {pngFiles.length > 0 && !isConverting && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center text-sm">
                    <Layout className="h-3 w-3 mr-1" />
                    PDF Output Preview
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-base font-bold text-gray-900">{conversionSettings.pageSize}</div>
                      <div className="text-xs text-gray-500">Page Size</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-purple-600">
                        {conversionSettings.orientation}
                      </div>
                      <div className="text-xs text-gray-500">Orientation</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-blue-600">
                        {conversionSettings.mergeIntoPdf ? '1 PDF' : `${pngFiles.length} PDFs`}
                      </div>
                      <div className="text-xs text-gray-500">Output Files</div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-2 text-center">
                    {conversionSettings.mergeIntoPdf 
                      ? `All PNG images will be merged into a single PDF with ${conversionSettings.quality} quality`
                      : `Each PNG will be converted to a separate PDF file`
                    }
                  </p>
                </div>
              )}

              {/* PDF Conversion Settings - Compact */}
              {pngFiles.length > 0 && !isConverting && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">PNG to PDF Settings</h4>
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="flex items-center text-xs text-gray-600 hover:text-red-500"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      {showSettings ? 'Hide' : 'Show'} Options
                    </button>
                  </div>
                  
                  {showSettings && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                      {/* Page Size */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          PDF Page Size
                        </label>
                        <select
                          value={conversionSettings.pageSize}
                          onChange={(e) => setConversionSettings({...conversionSettings, pageSize: e.target.value})}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          {pageSizes.map(size => (
                            <option key={size.value} value={size.value}>
                              {size.label} - {size.description}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Orientation */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Page Orientation
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded">
                            <input
                              type="radio"
                              name="orientation"
                              value="portrait"
                              checked={conversionSettings.orientation === 'portrait'}
                              onChange={(e) => setConversionSettings({...conversionSettings, orientation: e.target.value})}
                              className="mr-2 text-red-500 focus:ring-red-500 text-xs"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-xs">Portrait</div>
                              <div className="text-xs text-gray-600">Vertical layout</div>
                            </div>
                          </label>
                          <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded">
                            <input
                              type="radio"
                              name="orientation"
                              value="landscape"
                              checked={conversionSettings.orientation === 'landscape'}
                              onChange={(e) => setConversionSettings({...conversionSettings, orientation: e.target.value})}
                              className="mr-2 text-red-500 focus:ring-red-500 text-xs"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-xs">Landscape</div>
                              <div className="text-xs text-gray-600">Horizontal layout</div>
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      {/* Quality Setting */}
                      <div className="border-t pt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Image Quality in PDF
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
                                  quality: e.target.value
                                })}
                                className="mt-0.5 mr-2 text-red-500 focus:ring-red-500 text-xs"
                              />
                              <div>
                                <div className="font-medium text-gray-900 text-xs">{level.label}</div>
                                <div className="text-xs text-gray-600">{level.description}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Advanced Options */}
                      <div className="border-t pt-3">
                        <h5 className="font-medium text-gray-700 mb-2 text-xs">Layout Options</h5>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={conversionSettings.fitToPage}
                              onChange={(e) => setConversionSettings({
                                ...conversionSettings, 
                                fitToPage: e.target.checked
                              })}
                              className="mr-2 text-red-500 focus:ring-red-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-xs">Fit images to page</div>
                              <div className="text-xs text-gray-600">Scale images to fit within page boundaries</div>
                            </div>
                          </label>
                          
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={conversionSettings.mergeIntoPdf}
                              onChange={(e) => setConversionSettings({
                                ...conversionSettings, 
                                mergeIntoPdf: e.target.checked
                              })}
                              className="mr-2 text-red-500 focus:ring-red-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-xs">Merge into single PDF</div>
                              <div className="text-xs text-gray-600">Combine all PNG images into one PDF file</div>
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

              {/* File List - Ultra compact */}
              {pngFiles.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 mb-2 text-xs">PNG files to convert ({pngFiles.length})</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {pngFiles.map((fileObj, index) => (
                      <div 
                        key={fileObj.id} 
                        className="bg-gray-50 border border-gray-200 rounded-lg p-2 transition-all duration-200 hover:shadow-md"
                      >
                        {/* Page Number & Controls */}
                        <div className="flex items-center justify-between mb-1">
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
                                  disabled={index === pngFiles.length - 1}
                                  className="text-gray-400 hover:text-blue-500 p-0.5 disabled:opacity-30"
                                  title="Move down"
                                >
                                  <ArrowDown className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => previewFile(fileObj)}
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
                        <div className="relative mb-1">
                          <img
                            src={fileObj.preview.url}
                            alt={fileObj.name}
                            className="w-full h-20 object-cover rounded border cursor-pointer"
                            onClick={() => previewFile(fileObj)}
                            onLoad={(e) => {
                              const img = e.target
                              fileObj.preview.dimensions = {
                                width: img.naturalWidth,
                                height: img.naturalHeight
                              }
                            }}
                          />
                          <div className="absolute top-1 right-1">
                            <GripVertical className="h-3 w-3 text-white drop-shadow cursor-move" />
                          </div>
                        </div>
                        
                        {/* File Info */}
                        <div>
                          <p className="font-medium text-gray-900 text-xs truncate" title={fileObj.name}>
                            {fileObj.name}
                          </p>
                          <p className="text-xs text-gray-500">{formatFileSize(fileObj.size)}</p>
                          <span className="inline-block px-1.5 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full mt-1">
                            Page {index + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Convert Button */}
              {pngFiles.length > 0 && !isConverting && (
                <div className="text-center">
                  <button
                    onClick={convertToPdf}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
                  >
                    <FileText className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Convert {pngFiles.length} PNG file{pngFiles.length > 1 ? 's' : ''} to PDF
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Create {conversionSettings.mergeIntoPdf ? '1 PDF document' : `${pngFiles.length} PDF files`} with {conversionSettings.pageSize} pages
                  </p>
                </div>
              )}

              {/* Converting State */}
              {isConverting && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-red-100 rounded-full mb-4">
                    <Loader className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Converting PNG files to PDF...</h3>
                  <p className="text-gray-600 text-sm mb-4">Creating professional PDF document{conversionSettings.mergeIntoPdf ? '' : 's'} from your PNG images</p>
                  
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
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">PNG to PDF Conversion Complete!</h2>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
                Your {pngFiles.length} PNG file{pngFiles.length > 1 ? 's have' : ' has'} been successfully converted to PDF format.
              </p>

              {/* PDF Summary - Compact */}
              {convertedFiles.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 lg:p-6 max-w-md mx-auto mb-4 lg:mb-6">
                  <div className="flex items-center justify-center mb-3 lg:mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-gray-900">{pngFiles.length}</div>
                        <div className="text-xs text-gray-500">PNG Images</div>
                      </div>
                      <div className="flex-shrink-0">
                        <ArrowDown className="h-4 lg:h-5 w-4 lg:w-5 text-green-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-red-600">
                          {conversionSettings.mergeIntoPdf ? '1' : convertedFiles.length}
                        </div>
                        <div className="text-xs text-gray-500">PDF File{conversionSettings.mergeIntoPdf ? '' : 's'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center px-2 lg:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs lg:text-sm font-medium">
                      <FileText className="h-3 lg:h-4 w-3 lg:w-4 mr-1" />
                      {conversionSettings.pageSize} • {conversionSettings.orientation} • {conversionSettings.quality} quality
                    </div>
                  </div>
                </div>
              )}

              {/* Download Cards - Compact */}
              {convertedFiles.length > 0 && (
                <div className="space-y-2 max-w-md mx-auto mb-4 lg:mb-6">
                  {convertedFiles.map((file, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="w-8 lg:w-10 h-8 lg:h-10 bg-red-500 text-white rounded-lg flex items-center justify-center mr-2 lg:mr-3">
                            {file.isZip ? <Download className="h-4 lg:h-5 w-4 lg:w-5" /> : <FileText className="h-4 lg:h-5 w-4 lg:w-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                              {file.pageCount && (
                                <span className="ml-2 text-purple-600">
                                  {file.pageCount} page{file.pageCount > 1 ? 's' : ''}
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
                  Download {convertedFiles.length > 1 ? 'All PDFs' : 'PDF'}
                </button>
                <button
                  onClick={startOver}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Convert More PNG Files
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal - Compact */}
      {showPreview && previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[70vh] overflow-hidden">
            <div className="flex justify-between items-center p-3 lg:p-4 border-b">
              <h3 className="text-lg font-semibold">PNG Image Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 lg:p-6 text-center">
              <img
                src={previewImage.preview.url}
                alt={previewImage.name}
                className="max-w-full max-h-80 mx-auto rounded-lg shadow-lg"
              />
              <div className="mt-3 lg:mt-4 space-y-2">
                <p className="font-medium text-gray-900 text-sm lg:text-base">{previewImage.name}</p>
                <p className="text-xs lg:text-sm text-gray-500">
                  Size: {formatFileSize(previewImage.size)}
                  {previewImage.preview.dimensions && (
                    <span> • Dimensions: {previewImage.preview.dimensions.width} × {previewImage.preview.dimensions.height} px</span>
                  )}
                </p>
                <div className="bg-red-50 p-2 lg:p-3 rounded">
                  <p className="text-xs text-red-800">
                    This PNG image will be converted to {conversionSettings.pageSize} PDF page in {conversionSettings.orientation} orientation with {conversionSettings.quality} quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Features Section for PNG to PDF */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Why Choose ilovepdf8.com's PNG to PDF Converter?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional PNG to PDF conversion capabilities with advanced customization options and high-quality output for all your document creation needs
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

          {/* Additional PNG to PDF Capabilities */}
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

      {/* How to Use PNG to PDF Converter Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              How to Convert PNG Images to PDF with ilovepdf8.com
            </h2>
            <p className="text-lg text-gray-600">
              Professional PNG to PDF conversion in 3 simple steps using our advanced online converter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">1. Upload PNG Images</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select your PNG images or drag and drop them into our secure online PNG to PDF converter. Supports up to 20 PNG files with 25MB per file limit.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">2. Customize PDF Settings</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Choose page size, orientation, margins, and quality settings for your PDF. Our PNG to PDF converter offers extensive customization options for professional results.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">3. Download PDF Document</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Get your professional PDF document instantly. Quality-preserved conversion with your PNG images perfectly formatted for immediate use and sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Enhanced FAQ Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About PNG to PDF Conversion
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about converting PNG images to PDF with ilovepdf8.com's online converter
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

    
      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions for PNG to PDF Conversion Worldwide
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
            More than 5 million users worldwide rely on our PNG to PDF converter every month for professional document creation
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">3M+</div>
              <div className="text-gray-600 text-sm lg:text-base">PNG files converted</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">15</div>
              <div className="text-gray-600 text-sm lg:text-base">Customization options</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">30s</div>
              <div className="text-gray-600 text-sm lg:text-base">Average conversion time</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">190+</div>
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
            <p className="text-lg text-gray-600">Explore additional PDF and image tools to enhance your document management workflow</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-blue-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <RefreshCw className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">PDF to PNG Converter</h3>
              <p className="text-gray-600 text-sm mb-4">Convert PDF documents back to PNG images with high quality and precision for editing and sharing.</p>
              <Link to="/tools/pdf-to-png" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Convert PDF to PNG →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-green-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <ImageIcon className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">JPG to PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Convert JPEG images to PDF format with similar professional customization options and quality settings.</p>
              <Link to="/tools/jpg-to-pdf" className="text-green-600 hover:text-green-700 font-medium text-sm">
                Convert JPG to PDF →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-purple-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Merge className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Merge PDF Files</h3>
              <p className="text-gray-600 text-sm mb-4">Combine multiple PDF documents including those created from PNG images into organized single files.</p>
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
            Ready to Convert Your PNG Images to PDF?
          </h2>
          <p className="text-lg lg:text-xl text-red-100 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Experience professional PNG to PDF conversion with ilovepdf8.com's advanced online converter. Create polished documents with custom layouts and instant download.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/pdf-to-png"
              className="bg-white text-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <RefreshCw className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              PDF to PNG Converter
            </Link>
            <Link
              to="/tools/jpg-to-pdf"
              className="border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <ImageIcon className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              JPG to PDF Converter
            </Link>
          </div>
          <p className="text-red-100 mt-4 lg:mt-6 text-sm">
            Free PNG to PDF conversion tools • No registration required • Secure processing on ilovepdf8.com
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
                Professional PNG to PDF converter and document tools. All tools are 100% FREE and designed for professional document creation.
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
                <li><Link to="/tools/png-to-pdf" className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium">PNG to PDF</Link></li>
                <li><Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Compress PDF</Link></li>
                <li><Link to="/tools/edit-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Edit PDF</Link></li>
              </ul>
            </div>

            {/* Convert */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">CONVERT</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to PDF</Link></li>
                <li><Link to="/tools/pdf-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to PNG</Link></li>
                <li><Link to="/tools/jpg-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">JPG to PDF</Link></li>
                <li><Link to="/tools/pdf-to-word" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to Word</Link></li>
                <li><Link to="/tools/word-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Word to PDF</Link></li>
              </ul>
            </div>

            {/* Image Tools */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">IMAGE TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to PDF</Link></li>
                <li><Link to="/tools/webp-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">WebP to PNG</Link></li>
                <li><Link to="/tools/png-to-webp" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to WebP</Link></li>
                <li><Link to="/tools/pdf-to-jpg"className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to JPG</Link></li>
                <li><Link to="/tools/image-resize" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Resize Images</Link></li>
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
              © 2024 ilovepdf8.com. Professional PNG to PDF Converter Tool. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PNG to PDF conversion professionals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PngToPdfPage