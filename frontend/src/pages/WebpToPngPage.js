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
  Edit3,
  Layers,
  Copy,
  HardDrive
} from "lucide-react"

function WebpToPngPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [webpFiles, setWebpFiles] = useState([])
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
    quality: 'lossless',
    transparency: 'preserve',
    colorProfile: 'sRGB'
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

  // Enhanced FAQ with WebP to PNG focus
  const faqData = [
    {
      question: "How to convert WebP to PNG online free with ilovepdf.cc?",
      answer: "ilovepdf.cc offers the best online WebP to PNG converter for transforming modern WebP images into universally compatible PNG format. Simply upload your WebP files, choose quality settings, and convert instantly. Our WebP to PNG converter preserves image quality and transparency for perfect results."
    },
    {
      question: "What is WebP format and why convert to PNG?",
      answer: "WebP is Google's modern image format with superior compression, but PNG offers better universal compatibility across all platforms and software. Our WebP to PNG converter ensures your images work everywhere while maintaining transparency and quality."
    },
    {
      question: "Will I lose image quality when converting WebP to PNG?",
      answer: "No! Our WebP to PNG converter preserves original image quality using lossless conversion. Since we're converting from compressed to uncompressed format, you maintain all visual quality while gaining universal compatibility and transparency support."
    },
    {
      question: "Can I convert multiple WebP images to PNG simultaneously?",
      answer: "Yes! Our WebP to PNG converter supports batch processing of up to 20 WebP images at once. Each file can be up to 25MB, making it perfect for converting entire collections of WebP images to PNG format efficiently."
    },
    {
      question: "Are transparency and alpha channels preserved in PNG conversion?",
      answer: "Absolutely! PNG format natively supports transparency, so all alpha channels and transparent areas in your WebP images are perfectly preserved during conversion. Our WebP to PNG converter maintains all transparency information."
    },
    {
      question: "Does the WebP to PNG converter handle animated WebP files?",
      answer: "Our WebP to PNG converter processes animated WebP files by extracting the first frame as a static PNG image. For animated content, consider keeping WebP format or converting to GIF for animation support."
    },
    {
      question: "Is the online WebP to PNG converter secure for sensitive images?",
      answer: "Yes! ilovepdf.cc's WebP to PNG converter uses enterprise-grade SSL encryption to protect your images during conversion. All uploaded WebP files are automatically deleted from our servers after processing for complete privacy and security."
    },
    {
      question: "Does the WebP to PNG converter work on mobile devices?",
      answer: "Absolutely! Our WebP to PNG converter is fully optimized for mobile devices including smartphones and tablets. Convert WebP images to PNG on Android, iPhone, iPad, and any device with a web browser for convenient image conversion anywhere."
    }
  ]

  // WebP to PNG features for benefits section
  const conversionFeatures = [
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: "Advanced WebP to PNG Conversion",
      description: "Transform WebP images into universally compatible PNG format with lossless quality preservation and transparency support.",
      color: "blue"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Preservation Technology",
      description: "Maintain original image quality, transparency, and color accuracy during WebP to PNG conversion with advanced processing algorithms.",
      color: "green"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Universal Compatibility",
      description: "Convert WebP to PNG for perfect compatibility across all devices, browsers, and software applications without quality loss.",
      color: "purple"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning-Fast Processing",
      description: "Instant WebP to PNG conversion with batch processing capabilities for multiple files simultaneously with optimized speed.",
      color: "orange"
    }
  ]

  // WebP to PNG capabilities
  const conversionCapabilities = [
    {
      icon: <Layers className="h-7 w-7" />,
      title: "Batch WebP to PNG Conversion",
      description: "Process multiple WebP images simultaneously with efficient batch conversion and organized output for streamlined workflow management."
    },
    {
      icon: <Copy className="h-7 w-7" />,
      title: "Transparency Preservation",
      description: "Maintain alpha channels and transparent areas perfectly during WebP to PNG conversion with PNG's native transparency support."
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Professional Image Quality",
      description: "Deliver publication-ready PNG images from WebP sources with maintained resolution and professional presentation standards."
    }
  ]

  // WebP to PNG use cases
  const useCases = [
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Photography & Design",
      description: "Convert WebP images to PNG for professional photography workflows, design projects, and portfolio creation with universal compatibility using our WebP to PNG converter.",
      color: "blue"
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      title: "Web Development",
      description: "Transform WebP images to PNG format for broader browser support and legacy system compatibility in web development and content management projects.",
      color: "green"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Business Graphics",
      description: "Convert WebP logos, graphics, and marketing materials to PNG format for presentations, print materials, and software that requires PNG support.",
      color: "purple"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Document Creation",
      description: "Transform WebP images into PNG format for inclusion in documents, reports, and publications that need universal image compatibility.",
      color: "orange"
    }
  ]

  const qualityOptions = [
    { value: 'lossless', label: 'Lossless (Best Quality)', description: 'Perfect quality preservation' },
    { value: 'high', label: 'High Quality', description: 'Minimal compression, excellent quality' },
    { value: 'balanced', label: 'Balanced', description: 'Good quality with smaller file size' }
  ]

  const handleFileSelect = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      const isValidType = file.type === 'image/webp' || 
                         file.name.toLowerCase().endsWith('.webp')
      const isValidSize = file.size <= 25 * 1024 * 1024 // 25MB limit per file
      
      if (!isValidType) {
        setError("Please select only WebP image files")
        return false
      }
      if (!isValidSize) {
        setError("Each WebP file must be less than 25MB")
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      if (webpFiles.length + validFiles.length > 20) {
        setError("You can convert up to 20 WebP files at once")
        return
      }

      const totalSize = [...webpFiles, ...validFiles].reduce((sum, file) => sum + (file.size || 0), 0)
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
      
      setWebpFiles(prev => [...prev, ...newFiles])
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

  const convertToPng = async () => {
    if (webpFiles.length === 0) {
      setError("Please select at least 1 WebP file to convert")
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
      
      // Add WebP files
      webpFiles.forEach((fileObj, index) => {
        formData.append('files', fileObj.file)
        formData.append('order', index.toString())
      })

      // Add conversion settings
      formData.append('quality', conversionSettings.quality)
      formData.append('transparency', conversionSettings.transparency)
      formData.append('colorProfile', conversionSettings.colorProfile)

      console.log("Starting WebP to PNG conversion for", webpFiles.length, "WebP files")

      const API_BASE = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : window.location.origin

      const response = await fetch(`${API_BASE}/api/webp-to-png`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("WebP to PNG conversion successful:", result)

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
      console.error('WebP to PNG conversion failed:', err)
      clearInterval(progressInterval)
      
      let errorMessage = 'WebP to PNG conversion failed. Please try again.'
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = 'Cannot connect to the WebP to PNG server. Please make sure it is running on port 5000.'
      } else if (err.message.includes('ECONNREFUSED')) {
        errorMessage = 'WebP to PNG server is not running. Please start the server on port 5000.'
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
    const fileToRemove = webpFiles.find(file => file.id === fileId)
    if (fileToRemove && fileToRemove.preview.url) {
      URL.revokeObjectURL(fileToRemove.preview.url)
    }
    setWebpFiles(webpFiles.filter(file => file.id !== fileId))
    setError("")
  }

  const moveFile = (index, direction) => {
    const newFiles = [...webpFiles]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]]
      setWebpFiles(newFiles)
    }
  }

  const startOver = () => {
    // Clean up object URLs
    webpFiles.forEach(file => {
      if (file.preview.url) {
        URL.revokeObjectURL(file.preview.url)
      }
    })
    
    setWebpFiles([])
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
    return webpFiles.reduce((sum, file) => sum + file.size, 0)
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
            document.title = "WebP to PNG Converter Online Free - Convert WebP Images to PNG | ilovepdf.cc"
            
            // Set meta tags
            const metaTags = [
              { name: "description", content: "Convert WebP images to PNG online free with ilovepdf.cc WebP to PNG converter. Preserve transparency and quality while ensuring universal compatibility. No software required." },
              { name: "keywords", content: "webp to png, webp to png converter, online webp to png, convert webp to png, webp png converter, webp to png online free" },
              { name: "author", content: "ilovepdf.cc" },
              { name: "robots", content: "index, follow" },
              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
              { property: "og:title", content: "Free WebP to PNG Converter - Universal Image Compatibility | ilovepdf.cc" },
              { property: "og:description", content: "Professional WebP to PNG converter for universal image compatibility. Preserve transparency and quality with instant batch conversion." },
              { property: "og:url", content: "https://ilovepdf.cc/tools/webp-to-png" },
              { property: "og:type", content: "website" },
              { property: "og:site_name", content: "ilovepdf.cc" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Free WebP to PNG Converter Tool | ilovepdf.cc" },
              { name: "twitter:description", content: "Convert WebP images to PNG online free. Professional WebP to PNG converter with transparency preservation and quality settings." }
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
            canonical.setAttribute('href', 'https://ilovepdf.cc/tools/webp-to-png')
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
                          tool.title === "WebP to PNG" ? "text-red-500 font-medium" : "text-gray-700 hover:text-red-500"
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
                    <Link to="/tools/webp-to-png" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">WebP to PNG</Link>
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
                  to="/tools/webp-to-png" 
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  WebP to PNG
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
            WebP to PNG Converter Online Free - Universal Image Compatibility
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional WebP to PNG converter for transforming modern WebP images into universally compatible PNG format. Preserve transparency and quality while ensuring compatibility across all platforms and devices.
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
                    : webpFiles.length > 0 
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
                  accept=".webp,image/webp"
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={isConverting}
                  multiple/>
                
                {webpFiles.length === 0 ? (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative">
                        <FileImage className="h-10 lg:h-12 w-10 lg:w-12 text-gray-400" />
                        <RefreshCw className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                      {isDragOver ? 'Drop your WebP files here' : 'Select WebP images to convert to PNG'}
                    </h3>
                    <p className="text-gray-600 mb-3 lg:mb-4 text-sm">
                      Professional WebP to PNG converter • Preserve transparency • Universal compatibility
                    </p>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      disabled={isConverting}
                    >
                      Choose WebP Files
                    </button>
                    <p className="text-xs text-gray-500 mt-2 lg:mt-3">
                      Supports: WebP format • Up to 20 files • Max 25MB per file • Free conversion
                    </p>
                  </>
                ) : (
                  <>
                    <HardDrive className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {webpFiles.length} WebP file{webpFiles.length > 1 ? 's' : ''} ready for PNG conversion
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Total size: {formatFileSize(getTotalSize())}
                    </p>
                    {!isConverting && (
                      <button className="text-red-500 hover:text-red-600 font-medium text-xs">
                        Click to add more WebP files
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Conversion Output Preview - Compact */}
              {webpFiles.length > 0 && !isConverting && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center text-sm">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Conversion Output Preview
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-base font-bold text-gray-900">{webpFiles.length}</div>
                      <div className="text-xs text-gray-500">WebP Files</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-purple-600">PNG</div>
                      <div className="text-xs text-gray-500">Output Format</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-blue-600">
                        {conversionSettings.quality}
                      </div>
                      <div className="text-xs text-gray-500">Quality</div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-2 text-center">
                    WebP images will be converted to PNG with {conversionSettings.transparency} transparency and {conversionSettings.quality} quality
                  </p>
                </div>
              )}

              {/* Conversion Settings - Compact */}
              {webpFiles.length > 0 && !isConverting && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">WebP to PNG Settings</h4>
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
                      {/* Quality Level */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Output Quality</label>
                        <div className="space-y-1">
                          {qualityOptions.map(option => (
                            <label key={option.value} className="flex items-start cursor-pointer p-2 hover:bg-white rounded">
                              <input
                                type="radio"
                                name="quality"
                                value={option.value}
                                checked={conversionSettings.quality === option.value}
                                onChange={(e) => setConversionSettings({...conversionSettings, quality: e.target.value})}
                                className="mt-0.5 mr-2 text-red-500 focus:ring-red-500 text-xs"
                              />
                              <div>
                                <div className="font-medium text-gray-900 text-xs">{option.label}</div>
                                <div className="text-xs text-gray-600">{option.description}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Advanced Options */}
                      <div className="border-t pt-3">
                        <h5 className="font-medium text-gray-700 mb-2 text-xs">Advanced Options</h5>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={conversionSettings.transparency === 'preserve'}
                              onChange={(e) => setConversionSettings({
                                ...conversionSettings, 
                                transparency: e.target.checked ? 'preserve' : 'flatten'
                              })}
                              className="mr-2 text-red-500 focus:ring-red-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-xs">Preserve transparency</div>
                              <div className="text-xs text-gray-600">Keep alpha channel and transparent areas</div>
                            </div>
                          </label>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Color Profile</label>
                            <select
                              value={conversionSettings.colorProfile}
                              onChange={(e) => setConversionSettings({...conversionSettings, colorProfile: e.target.value})}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            >
                              <option value="sRGB">sRGB (Standard)</option>
                              <option value="adobeRGB">Adobe RGB</option>
                              <option value="displayP3">Display P3</option>
                            </select>
                          </div>
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
              {webpFiles.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 mb-2 text-xs">WebP files to convert ({webpFiles.length})</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {webpFiles.map((fileObj, index) => (
                      <div 
                        key={fileObj.id} 
                        className="bg-gray-50 border border-gray-200 rounded-lg p-2 transition-all duration-200 hover:shadow-md"
                      >
                        {/* Order Number & Controls */}
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
                                  disabled={index === webpFiles.length - 1}
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
                          <span className="inline-block px-1.5 py-0.5 bg-green-100 text-green-600 text-xs rounded-full mt-1">
                            WebP → PNG
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Convert Button */}
              {webpFiles.length > 0 && !isConverting && (
                <div className="text-center">
                  <button
                    onClick={convertToPng}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
                  >
                    <RefreshCw className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Convert {webpFiles.length} WebP file{webpFiles.length > 1 ? 's' : ''} to PNG
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Convert to universally compatible PNG format with {conversionSettings.quality} quality
                  </p>
                </div>
              )}

              {/* Converting State */}
              {isConverting && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-red-100 rounded-full mb-4">
                    <Loader className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Converting WebP files to PNG...</h3>
                  <p className="text-gray-600 text-sm mb-4">Processing {webpFiles.length} file{webpFiles.length > 1 ? 's' : ''} for universal compatibility</p>
                  
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
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">WebP to PNG Conversion Complete!</h2>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
                Your {webpFiles.length} WebP file{webpFiles.length > 1 ? 's have' : ' has'} been successfully converted to PNG format.
              </p>

              {/* Conversion Summary - Compact */}
              {convertedFiles.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 lg:p-6 max-w-md mx-auto mb-4 lg:mb-6">
                  <div className="flex items-center justify-center mb-3 lg:mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-gray-900">{webpFiles.length}</div>
                        <div className="text-xs text-gray-500">WebP Files</div>
                      </div>
                      <div className="flex-shrink-0">
                        <RefreshCw className="h-4 lg:h-5 w-4 lg:w-5 text-green-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-green-600">{convertedFiles.length}</div>
                        <div className="text-xs text-gray-500">PNG Files</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center px-2 lg:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs lg:text-sm font-medium">
                      <FileImage className="h-3 lg:h-4 w-3 lg:w-4 mr-1" />
                      {conversionSettings.quality} quality • {conversionSettings.transparency} transparency
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
                            {file.isZip ? <Download className="h-4 lg:h-5 w-4 lg:w-5" /> : <FileImage className="h-4 lg:h-5 w-4 lg:w-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                              <span className="ml-2 text-blue-600">PNG format</span>
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
                  Download {convertedFiles.length > 1 ? 'All PNG Files' : 'PNG File'}
                </button>
                <button
                  onClick={startOver}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Convert More WebP Files
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
              <h3 className="text-lg font-semibold">WebP Image Preview</h3>
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
                <div className="bg-blue-50 p-2 lg:p-3 rounded">
                  <p className="text-xs text-blue-800">
                    This WebP image will be converted to PNG format with {conversionSettings.quality} quality and {conversionSettings.transparency} transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Features Section for WebP to PNG */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Why Choose ilovepdf.cc's WebP to PNG Converter?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional WebP to PNG conversion capabilities with advanced quality preservation and universal compatibility for all your image conversion needs
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

          {/* Additional WebP to PNG Capabilities */}
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

      {/* How to Use WebP to PNG Converter Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              How to Convert WebP Images to PNG with ilovepdf.cc
            </h2>
            <p className="text-lg text-gray-600">
              Professional WebP to PNG conversion in 3 simple steps using our advanced online converter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">1. Upload WebP Images</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select your WebP images or drag and drop them into our secure online WebP to PNG converter. Supports up to 20 WebP files with 25MB per file limit.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">2. Choose Quality Settings</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select quality level, transparency preservation, and color profile options. Our WebP to PNG converter offers extensive customization for optimal results.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">3. Download PNG Files</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Get your universally compatible PNG files instantly. Quality-preserved conversion with transparency support for immediate use across all platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WebP to PNG Use Cases Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Professional WebP to PNG Conversion for Every Purpose
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's WebP to PNG converter serves photographers, developers, and businesses with comprehensive image compatibility and quality preservation
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
              Frequently Asked Questions About WebP to PNG Conversion
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about converting WebP images to PNG with ilovepdf.cc's online converter
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
              Complete Guide to Online WebP to PNG Conversion with ilovepdf.cc
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Why Use an Online WebP to PNG Converter?
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  ilovepdf.cc's online WebP to PNG converter revolutionizes image compatibility by providing professional-grade conversion directly in your browser. Unlike traditional software that requires expensive licenses and complex installations, our web-based WebP to PNG converter offers instant access to powerful image conversion tools. This cloud-based approach ensures you can convert WebP images to PNG from any device, anywhere, without compromising on functionality or quality.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  The online WebP to PNG converter transforms modern WebP images while preserving quality and transparency. With advanced conversion algorithms and intelligent processing, every PNG maintains crisp image quality and universal compatibility, making it perfect for photographers needing universal support, web developers ensuring broad compatibility, or businesses requiring versatile image formats.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Professional WebP to PNG Features
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Batch WebP to PNG conversion with up to 20 files simultaneously
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Perfect transparency preservation with alpha channel support
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Quality preservation with lossless conversion options
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Universal compatibility across all platforms and devices
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Secure cloud processing with automatic file deletion
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Advanced color profile management and optimization
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Advanced WebP to PNG Conversion Technology
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Our WebP to PNG converter utilizes cutting-edge image processing technology to intelligently analyze WebP files and create optimized PNG images. This sophisticated approach processes image content to maintain color accuracy, preserve transparency effects, and ensure optimal compatibility. The converter automatically handles different compression levels and maintains visual fidelity while ensuring the resulting PNG files work perfectly across all platforms and applications.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              WebP to PNG Converter Security and Privacy
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Security is paramount when processing sensitive WebP images online. ilovepdf.cc's WebP to PNG converter employs enterprise-grade SSL encryption to protect your images during the conversion process. All uploaded WebP files are processed on secure servers and automatically deleted within one hour of completion. This ensures that your confidential images, whether they're business graphics, personal photographs, artwork, or proprietary designs, remain completely private throughout the conversion session.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              WebP to PNG Conversion Best Practices and Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="bg-blue-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center text-sm lg:text-base">
                  <RefreshCw className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Conversion Optimization
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  For best results, use lossless quality settings when converting WebP to PNG to maintain highest image quality. Enable transparency preservation if your WebP images contain alpha channels or transparent areas.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center text-sm lg:text-base">
                  <Globe className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Compatibility Benefits
                </h4>
                <p className="text-green-800 text-sm leading-relaxed">
                  PNG format ensures universal compatibility across all devices, browsers, and software applications. Perfect for legacy systems, printing, and professional workflows requiring broad support.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Why Choose ilovepdf.cc for WebP to PNG Conversion?
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
              ilovepdf.cc stands as the premier choice for online WebP to PNG conversion, combining powerful functionality with user-friendly design. Our WebP to PNG converter offers professional-grade image processing capabilities typically found only in expensive desktop software, but with the convenience and accessibility of a web-based platform. The intuitive interface makes WebP to PNG conversion simple for beginners while providing the advanced customization options that professionals require.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
              With support for batch conversion, transparency preservation, quality control, and instant processing, our WebP to PNG converter handles everything from simple format conversion to complex image workflow requirements. The combination of powerful conversion tools, robust security measures, and seamless user experience makes ilovepdf.cc the trusted choice for millions of users worldwide who need to convert WebP images to PNG format online.
            </p>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Convert WebP to PNG on Any Device
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's WebP to PNG converter works seamlessly across all devices and platforms for ultimate flexibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-blue-500 text-white rounded-xl mb-4">
                <Monitor className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Desktop WebP to PNG</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Full-featured WebP to PNG conversion on Windows, Mac, and Linux computers. Professional workflow support with advanced quality settings and batch processing capabilities.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-green-500 text-white rounded-xl mb-4">
                <Smartphone className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Mobile WebP to PNG</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Touch-optimized WebP to PNG conversion on smartphones and tablets. Convert images on iOS and Android devices with responsive interface and mobile-friendly controls.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-purple-500 text-white rounded-xl mb-4">
                <Globe className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Browser-Based Converter</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                No downloads required. Works in Chrome, Firefox, Safari, Edge, and all modern browsers. Access the WebP to PNG converter instantly from any device with internet connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions for WebP to PNG Conversion Worldwide
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
            More than 2 million users worldwide rely on our WebP to PNG converter every month for image compatibility
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">1.5M+</div>
              <div className="text-gray-600 text-sm lg:text-base">WebP files converted</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">98%</div>
              <div className="text-gray-600 text-sm lg:text-base">Quality preservation</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">15s</div>
              <div className="text-gray-600 text-sm lg:text-base">Average conversion time</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">150+</div>
              <div className="text-gray-600 text-sm lg:text-base">Countries served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">More Image and PDF Tools for Complete Workflow</h2>
            <p className="text-lg text-gray-600">Explore additional image and PDF tools to enhance your document and image management workflow</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-blue-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <RefreshCw className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">PNG to WebP Converter</h3>
              <p className="text-gray-600 text-sm mb-4">Convert PNG images back to WebP format for modern web optimization and smaller file sizes with quality preservation.</p>
              <Link to="/tools/png-to-webp" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Convert PNG to WebP →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-green-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileImage className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">PNG to PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Convert PNG images to PDF format with custom layouts and professional document creation capabilities.</p>
              <Link to="/tools/png-to-pdf" className="text-green-600 hover:text-green-700 font-medium text-sm">
                Convert PNG to PDF →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-purple-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <ImageIcon className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">JPG to PNG</h3>
              <p className="text-gray-600 text-sm mb-4">Convert JPEG images to PNG format for transparency support and lossless quality preservation.</p>
              <Link to="/tools/jpg-to-png" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Convert JPG to PNG →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
            Ready to Convert Your WebP Images to PNG?
          </h2>
          <p className="text-lg lg:text-xl text-red-100 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Experience professional WebP to PNG conversion with ilovepdf.cc's advanced online converter. Preserve transparency and quality while ensuring universal compatibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/png-to-webp"
              className="bg-white text-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <RefreshCw className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              PNG to WebP Converter
            </Link>
            <Link
              to="/tools/png-to-pdf"
              className="border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <FileImage className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              PNG to PDF Converter
            </Link>
          </div>
          <p className="text-red-100 mt-4 lg:mt-6 text-sm">
            Free WebP to PNG conversion tools • No registration required • Secure processing on ilovepdf.cc
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
                Professional WebP to PNG converter and image tools. All tools are 100% FREE and designed for universal image compatibility.
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
                <li><Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Compress PDF</Link></li>
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to PDF</Link></li>
                <li><Link to="/tools/edit-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Edit PDF</Link></li>
              </ul>
            </div>

            {/* Convert */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">CONVERT</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/webp-to-png" className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium">WebP to PNG</Link></li>
                <li><Link to="/tools/png-to-webp" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to WebP</Link></li>
                <li><Link to="/tools/jpg-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">JPG to PNG</Link></li>
                <li><Link to="/tools/pdf-to-word" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to Word</Link></li>
                <li><Link to="/tools/word-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Word to PDF</Link></li>
              </ul>
            </div>

            {/* Image Tools */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">IMAGE TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/webp-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">WebP to PNG</Link></li>
                <li><Link to="/tools/png-to-webp" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to WebP</Link></li>
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to PDF</Link></li>
                <li><Link to="/tools/pdf-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to PNG</Link></li>
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
              © 2024 ilovepdf.cc. Professional WebP to PNG Converter Tool. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for WebP to PNG conversion professionals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WebpToPngPage