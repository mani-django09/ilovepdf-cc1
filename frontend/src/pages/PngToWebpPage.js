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
  HardDrive,
  Minimize2,
  TrendingDown
} from "lucide-react"

function PngToWebpPage() {
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
    quality: 80,
    method: 'lossy',
    optimization: 'balanced',
    preserveTransparency: true
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

  // Enhanced FAQ with PNG to WebP focus
  const faqData = [
    {
      question: "How to convert PNG to WebP online free with ilovepdf8.com?",
      answer: "ilovepdf8.com offers the best online PNG to WebP converter for optimizing PNG images into modern WebP format. Simply upload your PNG files, choose compression settings, and convert instantly. Our PNG to WebP converter reduces file sizes by up to 80% while maintaining excellent image quality."
    },
    {
      question: "What is WebP format and why convert PNG to WebP?",
      answer: "WebP is Google's modern image format that provides superior compression compared to PNG. Converting PNG to WebP reduces file sizes significantly while maintaining quality, making it perfect for web optimization, faster loading times, and improved SEO performance."
    },
    
    {
      question: "Can I batch convert multiple PNG images to WebP simultaneously?",
      answer: "Yes! Our PNG to WebP converter supports batch processing of up to 20 PNG images at once. Each file can be up to 25MB, making it perfect for converting entire image collections or website galleries to WebP format efficiently."
    },
    
    
    {
      question: "Is the online PNG to WebP converter secure for sensitive images?",
      answer: "Yes! ilovepdf8.com's PNG to WebP converter uses enterprise-grade SSL encryption to protect your images during conversion. All uploaded PNG files are automatically deleted from our servers after processing for complete privacy and security."
    },
    {
      question: "Does the PNG to WebP converter work on mobile devices?",
      answer: "Absolutely! Our PNG to WebP converter is fully optimized for mobile devices including smartphones and tablets. Convert PNG images to WebP on Android, iPhone, iPad, and any device with a web browser for convenient optimization anywhere."
    }
  ]

  // PNG to WebP features for benefits section
  const conversionFeatures = [
    {
      icon: <TrendingDown className="h-8 w-8" />,
      title: "Advanced PNG to WebP Optimization",
      description: "Transform PNG images into highly optimized WebP format with up to 80% file size reduction while maintaining superior visual quality.",
      color: "blue"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Web Performance Enhancement",
      description: "Boost website loading speeds and improve SEO rankings by converting PNG images to WebP format with our advanced optimization engine.",
      color: "green"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Preservation Technology",
      description: "Maintain excellent image quality while achieving dramatic file size reductions using WebP's advanced compression algorithms and transparency support.",
      color: "purple"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Modern Web Optimization",
      description: "Convert PNG to WebP for next-generation image formats that provide better compression and performance for modern web applications.",
      color: "orange"
    }
  ]

  // PNG to WebP capabilities
  const conversionCapabilities = [
    {
      icon: <Layers className="h-7 w-7" />,
      title: "Batch PNG to WebP Processing",
      description: "Convert multiple PNG images simultaneously with intelligent optimization and organized output for streamlined web optimization workflows."
    },
    {
      icon: <Minimize2 className="h-7 w-7" />,
      title: "Intelligent File Size Reduction",
      description: "Achieve up to 80% file size reduction while maintaining visual quality using WebP's superior compression technology and optimization algorithms."
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Web-Ready Output Quality",
      description: "Produce publication-ready WebP images optimized for web performance with maintained transparency and professional presentation standards."
    }
  ]

  // PNG to WebP use cases
  const useCases = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Website Optimization",
      description: "Convert PNG images to WebP for faster website loading times, improved SEO rankings, and better user experience with our PNG to WebP converter.",
      color: "blue"
    },
    {
      icon: <TrendingDown className="h-5 w-5" />,
      title: "E-commerce Performance",
      description: "Optimize product images by converting PNG to WebP format for faster page loads, reduced bandwidth usage, and improved conversion rates in online stores.",
      color: "green"
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      title: "Web Development",
      description: "Implement modern image formats by converting PNG assets to WebP for responsive websites, progressive web apps, and performance-critical applications.",
      color: "purple"
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Mobile App Optimization",
      description: "Reduce app bundle sizes and improve mobile performance by converting PNG graphics to WebP format for faster downloads and smoother user experience.",
      color: "orange"
    }
  ]

  const qualityPresets = [
    { value: 95, label: 'Highest Quality', description: 'Near-lossless compression, minimal file size reduction' },
    { value: 80, label: 'High Quality', description: 'Excellent quality with good compression' },
    { value: 65, label: 'Balanced', description: 'Good quality with significant file size reduction' },
    { value: 50, label: 'Web Optimized', description: 'Optimized for web with maximum compression' }
  ]

  const compressionMethods = [
    { value: 'lossless', label: 'Lossless', description: 'Perfect quality preservation, moderate compression' },
    { value: 'lossy', label: 'Lossy', description: 'High compression with excellent visual quality' }
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

  const convertToWebp = async () => {
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
      formData.append('quality', conversionSettings.quality.toString())
      formData.append('method', conversionSettings.method)
      formData.append('optimization', conversionSettings.optimization)
      formData.append('preserveTransparency', conversionSettings.preserveTransparency.toString())

      console.log("Starting PNG to WebP conversion for", pngFiles.length, "PNG files")

      const API_BASE = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : window.location.origin

      const response = await fetch(`${API_BASE}/api/png-to-webp`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("PNG to WebP conversion successful:", result)

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
      console.error('PNG to WebP conversion failed:', err)
      clearInterval(progressInterval)
      
      let errorMessage = 'PNG to WebP conversion failed. Please try again.'
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = 'Cannot connect to the PNG to WebP server. Please make sure it is running on port 5000.'
      } else if (err.message.includes('ECONNREFUSED')) {
        errorMessage = 'PNG to WebP server is not running. Please start the server on port 5000.'
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

  const getEstimatedSavings = () => {
    const totalSize = getTotalSize()
    if (totalSize === 0) return { savings: 0, newSize: 0, percentage: 0 }
    
    // Estimate WebP compression based on quality settings
    let compressionRatio = 0.3 // Default 70% reduction
    if (conversionSettings.method === 'lossless') {
      compressionRatio = 0.6 // 40% reduction for lossless
    } else if (conversionSettings.quality > 90) {
      compressionRatio = 0.5 // 50% reduction for high quality
    } else if (conversionSettings.quality > 70) {
      compressionRatio = 0.3 // 70% reduction for medium quality
    } else {
      compressionRatio = 0.2 // 80% reduction for low quality
    }
    
    const newSize = totalSize * compressionRatio
    const savings = totalSize - newSize
    const percentage = ((savings / totalSize) * 100).toFixed(0)
    
    return { savings, newSize, percentage }
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
            document.title = "PNG to WebP Converter Online Free - Optimize Images for Web | ilovepdf8.com"
            
            // Set meta tags
            const metaTags = [
              { name: "description", content: "Convert PNG images to WebP online free with ilovepdf8.com PNG to WebP converter. Reduce file sizes by up to 80% while maintaining quality. Perfect for web optimization and faster loading." },
              { name: "keywords", content: "png to webp, png to webp converter, online png to webp, convert png to webp, png webp converter, optimize images, web optimization" },
              { name: "author", content: "ilovepdf8.com" },
              { name: "robots", content: "index, follow" },
              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
              { property: "og:title", content: "Free PNG to WebP Converter - Optimize Images for Web Performance | ilovepdf8.com" },
              { property: "og:description", content: "Professional PNG to WebP converter for web optimization. Reduce file sizes by up to 80% with superior compression and quality preservation." },
              { property: "og:url", content: "https://ilovepdf8.com/tools/png-to-webp" },
              { property: "og:type", content: "website" },
              { property: "og:site_name", content: "ilovepdf8.com" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Free PNG to WebP Converter Tool | ilovepdf8.com" },
              { name: "twitter:description", content: "Convert PNG images to WebP online free. Professional PNG to WebP converter with compression optimization and quality settings." }
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
            canonical.setAttribute('href', 'https://ilovepdf8.com/tools/png-to-webp')
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
                          tool.title === "PNG to WebP" ? "text-red-500 font-medium" : "text-gray-700 hover:text-red-500"
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
                    <Link to="/tools/png-to-webp" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">PNG to WebP</Link>
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
                  to="/tools/png-to-webp" 
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  PNG to WebP
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
            PNG to WebP Converter Online Free - Optimize Images for Web Performance
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional PNG to WebP converter for optimizing images and improving web performance. Reduce file sizes by up to 80% while maintaining excellent quality with modern WebP compression technology.
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
                        <TrendingDown className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                      {isDragOver ? 'Drop your PNG files here' : 'Select PNG images to optimize for web'}
                    </h3>
                    <p className="text-gray-600 mb-3 lg:mb-4 text-sm">
                      Professional PNG to WebP converter • Reduce file sizes • Web optimization
                    </p>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      disabled={isConverting}
                    >
                      Choose PNG Files
                    </button>
                    <p className="text-xs text-gray-500 mt-2 lg:mt-3">
                      Supports: PNG format • Up to 20 files • Max 25MB per file • Free optimization
                    </p>
                  </>
                ) : (
                  <>
                    <HardDrive className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {pngFiles.length} PNG file{pngFiles.length > 1 ? 's' : ''} ready for WebP optimization
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

              {/* Optimization Preview - Compact */}
              {pngFiles.length > 0 && !isConverting && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center text-sm">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    Optimization Preview
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-base font-bold text-gray-900">{formatFileSize(getTotalSize())}</div>
                      <div className="text-xs text-gray-500">Original Size</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-green-600">
                        -{getEstimatedSavings().percentage}%
                      </div>
                      <div className="text-xs text-gray-500">Size Reduction</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-blue-600">
                        {formatFileSize(getEstimatedSavings().newSize)}
                      </div>
                      <div className="text-xs text-gray-500">Optimized Size</div>
                    </div>
                  </div>
                  <p className="text-xs text-green-700 mt-2 text-center">
                    Estimated savings: {formatFileSize(getEstimatedSavings().savings)} with {conversionSettings.method} compression at {conversionSettings.quality}% quality
                  </p>
                </div>
              )}

              {/* Conversion Settings - Compact */}
              {pngFiles.length > 0 && !isConverting && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">PNG to WebP Settings</h4>
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
                      {/* Compression Method */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Compression Method</label>
                        <div className="grid grid-cols-2 gap-2">
                          {compressionMethods.map(method => (
                            <label key={method.value} className="flex items-center cursor-pointer p-2 hover:bg-white rounded">
                              <input
                                type="radio"
                                name="method"
                                value={method.value}
                                checked={conversionSettings.method === method.value}
                                onChange={(e) => setConversionSettings({...conversionSettings, method: e.target.value})}
                                className="mr-2 text-red-500 focus:ring-red-500 text-xs"
                              />
                              <div>
                                <div className="font-medium text-gray-900 text-xs">{method.label}</div>
                                <div className="text-xs text-gray-600">{method.description}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Quality Setting */}
                      {conversionSettings.method === 'lossy' && (
                        <div className="border-t pt-3">
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            Quality Level: {conversionSettings.quality}%
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="95"
                            value={conversionSettings.quality}
                            onChange={(e) => setConversionSettings({...conversionSettings, quality: parseInt(e.target.value)})}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Smaller files</span>
                            <span>Better quality</span>
                          </div>
                          
                          {/* Quality Presets */}
                          <div className="mt-2 grid grid-cols-2 gap-1">
                            {qualityPresets.map(preset => (
                              <button
                                key={preset.value}
                                onClick={() => setConversionSettings({...conversionSettings, quality: preset.value})}
                                className={`text-xs px-2 py-1 rounded ${
                                  conversionSettings.quality === preset.value 
                                    ? 'bg-red-500 text-white' 
                                    : 'bg-white border text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Advanced Options */}
                      <div className="border-t pt-3">
                        <h5 className="font-medium text-gray-700 mb-2 text-xs">Advanced Options</h5>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={conversionSettings.preserveTransparency}
                              onChange={(e) => setConversionSettings({
                                ...conversionSettings, 
                                preserveTransparency: e.target.checked
                              })}
                              className="mr-2 text-red-500 focus:ring-red-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-xs">Preserve transparency</div>
                              <div className="text-xs text-gray-600">Maintain alpha channel and transparent areas</div>
                            </div>
                          </label>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Optimization Level</label>
                            <select
                              value={conversionSettings.optimization}
                              onChange={(e) => setConversionSettings({...conversionSettings, optimization: e.target.value})}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            >
                              <option value="fast">Fast (Quick processing)</option>
                              <option value="balanced">Balanced (Good quality/speed)</option>
                              <option value="best">Best (Maximum compression)</option>
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
              {pngFiles.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 mb-2 text-xs">PNG files to optimize ({pngFiles.length})</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {pngFiles.map((fileObj, index) => (
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
                          <span className="inline-block px-1.5 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full mt-1">
                            PNG → WebP
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
                    onClick={convertToWebp}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
                  >
                    <TrendingDown className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Optimize {pngFiles.length} PNG file{pngFiles.length > 1 ? 's' : ''} to WebP
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Estimated {getEstimatedSavings().percentage}% file size reduction with WebP optimization
                  </p>
                </div>
              )}

              {/* Converting State */}
              {isConverting && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-red-100 rounded-full mb-4">
                    <Loader className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimizing PNG files to WebP...</h3>
                  <p className="text-gray-600 text-sm mb-4">Processing {pngFiles.length} file{pngFiles.length > 1 ? 's' : ''} for web optimization</p>
                  
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
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">PNG to WebP Optimization Complete!</h2>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
                Your {pngFiles.length} PNG file{pngFiles.length > 1 ? 's have' : ' has'} been successfully optimized to WebP format.
              </p>

              {/* Optimization Summary - Compact */}
              {convertedFiles.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 lg:p-6 max-w-md mx-auto mb-4 lg:mb-6">
                  <div className="flex items-center justify-center mb-3 lg:mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-gray-900">{pngFiles.length}</div>
                        <div className="text-xs text-gray-500">PNG Files</div>
                      </div>
                      <div className="flex-shrink-0">
                        <TrendingDown className="h-4 lg:h-5 w-4 lg:w-5 text-green-500" />
                      </div>
                      <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-green-600">{convertedFiles.length}</div>
                        <div className="text-xs text-gray-500">WebP Files</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center px-2 lg:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs lg:text-sm font-medium">
                      <TrendingDown className="h-3 lg:h-4 w-3 lg:w-4 mr-1" />
                      {conversionSettings.method} compression • {conversionSettings.quality}% quality
                    </div>
                  </div>
                  
                  {/* Actual Savings */}
                  {convertedFiles.length > 0 && (
                    <div className="mt-3 lg:mt-4 text-center">
                      <div className="text-lg font-bold text-green-600">
                        {(() => {
                          const originalSize = getTotalSize()
                          const newSize = convertedFiles.reduce((sum, file) => sum + (file.size || 0), 0)
                          const savings = ((originalSize - newSize) / originalSize * 100).toFixed(0)
                          return `-${savings}%`
                        })()}
                      </div>
                      <div className="text-xs text-gray-500">File size reduction achieved</div>
                    </div>
                  )}
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
                              {file.originalSize && (
                                <span className="ml-2 text-green-600">
                                  -{((file.originalSize - file.size) / file.originalSize * 100).toFixed(0)}% smaller
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
                  Download {convertedFiles.length > 1 ? 'All WebP Files' : 'WebP File'}
                </button>
                <button
                  onClick={startOver}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Optimize More PNG Files
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
                <div className="bg-orange-50 p-2 lg:p-3 rounded">
                  <p className="text-xs text-orange-800">
                    This PNG image will be optimized to WebP format with {conversionSettings.method} compression at {conversionSettings.quality}% quality.
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Estimated file size reduction: {getEstimatedSavings().percentage}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* How to Use PNG to WebP Converter Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              How to Convert PNG Images to WebP with ilovepdf8.com
            </h2>
            <p className="text-lg text-gray-600">
              Professional PNG to WebP optimization in 3 simple steps using our advanced online converter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">1. Upload PNG Images</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select your PNG images or drag and drop them into our secure online PNG to WebP converter. Supports up to 20 PNG files with 25MB per file limit.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingDown className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">2. Optimize Settings</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Choose compression method, quality level, and optimization settings. Our PNG to WebP converter offers extensive customization for maximum file size reduction.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">3. Download WebP Files</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Get your optimized WebP files instantly. Dramatically reduced file sizes with maintained quality for improved web performance and faster loading.
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
              Frequently Asked Questions About PNG to WebP Conversion
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about converting PNG images to WebP with ilovepdf8.com's online converter
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

     
      {/* Device Compatibility Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Convert PNG to WebP on Any Device
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf8.com's PNG to WebP converter works seamlessly across all devices and platforms for ultimate optimization flexibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-blue-500 text-white rounded-xl mb-4">
                <Monitor className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Desktop PNG to WebP</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Full-featured PNG to WebP optimization on Windows, Mac, and Linux computers. Professional workflow support with advanced compression settings and batch processing capabilities.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-green-500 text-white rounded-xl mb-4">
                <Smartphone className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Mobile PNG to WebP</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Touch-optimized PNG to WebP conversion on smartphones and tablets. Optimize images on iOS and Android devices with responsive interface and mobile-friendly controls.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-purple-500 text-white rounded-xl mb-4">
                <Globe className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Browser-Based Converter</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                No downloads required. Works in Chrome, Firefox, Safari, Edge, and all modern browsers. Access the PNG to WebP converter instantly from any device with internet connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions for PNG to WebP Optimization Worldwide
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
            More than 3 million users worldwide rely on our PNG to WebP converter every month for web optimization
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">2M+</div>
              <div className="text-gray-600 text-sm lg:text-base">PNG files optimized</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">75%</div>
              <div className="text-gray-600 text-sm lg:text-base">Average size reduction</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">12s</div>
              <div className="text-gray-600 text-sm lg:text-base">Average optimization time</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">180+</div>
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
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">WebP to PNG Converter</h3>
              <p className="text-gray-600 text-sm mb-4">Convert WebP images back to PNG format for universal compatibility and broader software support.</p>
              <Link to="/tools/webp-to-png" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Convert WebP to PNG →
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
                <Minimize2 className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Compress PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Reduce PDF file sizes while maintaining quality for faster sharing and improved web performance.</p>
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
            Ready to Optimize Your PNG Images for Web?
          </h2>
          <p className="text-lg lg:text-xl text-red-100 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Experience professional PNG to WebP optimization with ilovepdf8.com's advanced online converter. Reduce file sizes by up to 80% while maintaining excellent quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/webp-to-png"
              className="bg-white text-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <RefreshCw className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              WebP to PNG Converter
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
            Free PNG to WebP optimization tools • No registration required • Secure processing on ilovepdf8.com
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
                Professional PNG to WebP converter and optimization tools. All tools are 100% FREE and designed for web performance enhancement.
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
                <li><Link to="/tools/png-to-webp" className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium">PNG to WebP</Link></li>
                <li><Link to="/tools/webp-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">WebP to PNG</Link></li>
                <li><Link to="/tools/jpg-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">JPG to PNG</Link></li>
                <li><Link to="/tools/pdf-to-word" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to Word</Link></li>
                <li><Link to="/tools/word-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Word to PDF</Link></li>
              </ul>
            </div>

            {/* Image Tools */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">IMAGE TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/png-to-webp" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to WebP</Link></li>
                <li><Link to="/tools/webp-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">WebP to PNG</Link></li>
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to PDF</Link></li>
                <li><Link to="/tools/pdf-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to PNG</Link></li>
                <li><Link to="/tools/image-compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Compress Images</Link></li>
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
              © 2024 ilovepdf8.com. Professional PNG to WebP Converter Tool. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PNG to WebP optimization professionals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PngToWebpPage