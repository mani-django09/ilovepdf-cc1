import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
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
} from "lucide-react"

function WebpToPngPage() {
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

  

  // Enhanced FAQ with WebP to PNG focus
  const faqData = [
    {
      question: "How to convert WebP to PNG online free with ilovepdf8.com?",
      answer: "ilovepdf8.com offers the best online WebP to PNG converter for transforming modern WebP images into universally compatible PNG format. Simply upload your WebP files, choose quality settings, and convert instantly. Our WebP to PNG converter preserves image quality and transparency for perfect results."
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
      question: "Is the online WebP to PNG converter secure for sensitive images?",
      answer: "Yes! ilovepdf8.com's WebP to PNG converter uses enterprise-grade SSL encryption to protect your images during conversion. All uploaded WebP files are automatically deleted from our servers after processing for complete privacy and security."
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
    <Layout>
      {/* Enhanced SEO Meta Tags */}
      {typeof document !== 'undefined' && (
        <>
          {(() => {
            // Set document title properly
            document.title = "WebP to PNG Converter Online Free - Convert WebP Images to PNG | ilovepdf8.com"
            
            // Set meta tags
            const metaTags = [
              { name: "description", content: "Convert WebP images to PNG online free with ilovepdf8.com WebP to PNG converter. Preserve transparency and quality while ensuring universal compatibility. No software required." },
              { name: "keywords", content: "webp to png, webp to png converter, online webp to png, convert webp to png, webp png converter, webp to png online free" },
              { name: "author", content: "ilovepdf8.com" },
              { name: "robots", content: "index, follow" },
              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
              { property: "og:title", content: "Free WebP to PNG Converter - Universal Image Compatibility | ilovepdf8.com" },
              { property: "og:description", content: "Professional WebP to PNG converter for universal image compatibility. Preserve transparency and quality with instant batch conversion." },
              { property: "og:url", content: "https://ilovepdf8.com/webp-to-png" },
              { property: "og:type", content: "website" },
              { property: "og:site_name", content: "ilovepdf8.com" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Free WebP to PNG Converter Tool | ilovepdf8.com" },
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
            canonical.setAttribute('href', 'https://ilovepdf8.com/webp-to-png')
          })()}
        </>
      )}

    
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
              Why Choose ilovepdf8.com's WebP to PNG Converter?
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
              How to Convert WebP Images to PNG with ilovepdf8.com
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

      
      {/* Enhanced FAQ Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About WebP to PNG Conversion
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about converting WebP images to PNG with ilovepdf8.com's online converter
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
              <Link to="/png-to-webp" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Convert PNG to WebP →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-green-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileImage className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">PNG to PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Convert PNG images to PDF format with custom layouts and professional document creation capabilities.</p>
              <Link to="/png-to-pdf" className="text-green-600 hover:text-green-700 font-medium text-sm">
                Convert PNG to PDF →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-purple-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <ImageIcon className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">JPG to PNG</h3>
              <p className="text-gray-600 text-sm mb-4">Convert JPEG images to PNG format for transparency support and lossless quality preservation.</p>
              <Link to="/jpg-to-png" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
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
            Experience professional WebP to PNG conversion with ilovepdf8.com's advanced online converter. Preserve transparency and quality while ensuring universal compatibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/png-to-webp"
              className="bg-white text-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <RefreshCw className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              PNG to WebP Converter
            </Link>
            <Link
              to="/png-to-pdf"
              className="border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <FileImage className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              PNG to PDF Converter
            </Link>
          </div>
          <p className="text-red-100 mt-4 lg:mt-6 text-sm">
            Free WebP to PNG conversion tools • No registration required • Secure processing on ilovepdf8.com
          </p>
        </div>
      </section>

     </Layout>
  )
}

export default WebpToPngPage