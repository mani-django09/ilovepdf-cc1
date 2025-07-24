// Fixed CompressPdfPage.js - All compilation errors resolved
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
  Minimize2,
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
  RefreshCw,
  Merge,
  Plus
} from "lucide-react"

function CompressPdfPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [files, setFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressionComplete, setCompressionComplete] = useState(false)
  const [error, setError] = useState("")
  const [compressedFiles, setCompressedFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [previewFile, setPreviewFile] = useState(null)
  const [compressionResults, setCompressionResults] = useState(null)
  const [compressionSettings, setCompressionSettings] = useState({
    level: 'medium',
    imageQuality: 'medium',
    removeMetadata: true,
    optimizeForWeb: false
  })
  const [showSettings, setShowSettings] = useState(false)
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

  // Enhanced FAQ with compression focus
  const faqData = [
    {
      question: "How to compress PDF files online free with ilovepdf.cc?",
      answer: "ilovepdf.cc offers the best online PDF compressor for reducing file sizes while maintaining quality. Simply upload your PDF files, choose compression level, and download the compressed PDFs instantly. Our advanced compression algorithms optimize images and remove unnecessary data without compromising document readability."
    },
    {
      question: "What compression levels are available in the online PDF compressor?",
      answer: "Our PDF compressor offers Low compression (10-30% reduction, highest quality), Medium compression (30-60% reduction, balanced quality), High compression (60-80% reduction, good quality), and Custom settings for fine-tuned compression control. Choose based on your file size and quality requirements."
    },
    {
      question: "Will PDF compression affect document quality and readability?",
      answer: "Our smart compression algorithms are designed to maintain visual quality while significantly reducing file size. The PDF compressor optimizes images, removes metadata, and applies efficient compression without affecting text readability or document structure. You can preview results before downloading."
    },
    {
      question: "Can I compress large PDF files using the online compressor?",
      answer: "Yes! You can compress PDF files up to 100MB each using our online PDF compressor. The tool handles large documents efficiently, reducing file sizes for easier sharing, faster uploads, and reduced storage requirements. For enterprise needs, contact us for larger file support."
    },
    {
      question: "How much can I reduce PDF file size with the compressor?",
      answer: "Compression results vary based on content type, but typical reductions range from 30-80% of original size. PDFs with many images achieve the best compression ratios. Our PDF compressor provides real-time estimates showing expected file size reduction before processing."
    },
    {
      question: "Is the online PDF compressor safe for sensitive documents?",
      answer: "Absolutely! ilovepdf.cc's PDF compressor uses enterprise-grade SSL encryption to protect your documents during compression. All files are processed securely and automatically deleted from our servers after compression. We never store, access, or share your compressed documents."
    },
    {
      question: "Can I compress multiple PDF files simultaneously?",
      answer: "Yes! Our online PDF compressor supports batch compression of up to 10 PDF files at once. You can apply the same compression settings to all files or customize settings for each document. Download compressed files individually or as a convenient ZIP package."
    },
    {
      question: "Does the PDF compressor work on mobile devices and tablets?",
      answer: "Yes! ilovepdf.cc's PDF compressor is fully optimized for mobile devices, tablets, and desktop computers. Compress PDF files on Android phones, iPhones, iPads, and any device with a web browser. The responsive interface adapts to all screen sizes for easy compression anywhere."
    }
  ]

  // PDF compression features for benefits section
  const compressionFeatures = [
    {
      icon: <Minimize2 className="h-8 w-8" />,
      title: "Advanced PDF Compression",
      description: "Reduce PDF file sizes by up to 80% using intelligent compression algorithms that optimize images and remove unnecessary data while preserving quality.",
      color: "blue"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Smart Quality Control",
      description: "Choose from multiple compression levels or customize settings for optimal balance between file size reduction and document quality preservation.",
      color: "green"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure PDF Processing",
      description: "Enterprise-grade encryption protects your documents during compression. All files are automatically deleted for complete privacy and security.",
      color: "purple"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning-Fast Compression",
      description: "Instant PDF compression with optimized processing algorithms. Reduce large file sizes quickly without compromising quality or performance.",
      color: "orange"
    }
  ]

  // PDF compression capabilities
  const compressionCapabilities = [
    {
      icon: <BarChart3 className="h-7 w-7" />,
      title: "Intelligent Optimization",
      description: "Smart algorithms analyze PDF content to apply optimal compression for images, text, and graphics while maintaining readability."
    },
    {
      icon: <Layers className="h-7 w-7" />,
      title: "Batch Processing",
      description: "Compress multiple PDF files simultaneously with consistent settings, saving time for large document workflows."
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Quality Preservation",
      description: "Advanced compression maintains document integrity, ensuring compressed PDFs retain professional appearance and functionality."
    }
  ]

  // PDF compression use cases
  const useCases = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Business Documents",
      description: "Compress reports, presentations, and business files for faster email delivery and reduced storage costs using our PDF compressor.",
      color: "blue"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Academic Materials",
      description: "Reduce research papers, thesis documents, and educational materials for easier sharing and submission with maintained quality.",
      color: "green"
    },
    {
      icon: <ImageIcon className="h-5 w-5" />,
      title: "Image-Heavy PDFs",
      description: "Optimize PDFs with photos, graphics, and illustrations to achieve maximum file size reduction while preserving visual quality.",
      color: "purple"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Web Publishing",
      description: "Prepare PDFs for web publishing with optimized file sizes for faster loading times and improved user experience.",
      color: "orange"
    }
  ]

  const compressionLevels = [
    { 
      value: 'low', 
      label: 'Low Compression', 
      desc: 'Minimal size reduction, highest quality',
      expectedReduction: '10-30%',
      icon: '🔍'
    },
    {
      value: 'medium', 
      label: 'Medium Compression', 
      desc: 'Balanced size and quality (Recommended)',
      expectedReduction: '30-60%',
      icon: '⚖️'
    },
    { 
      value: 'high', 
      label: 'High Compression', 
      desc: 'Maximum size reduction, good quality',
      expectedReduction: '60-80%',
      icon: '🗜️'
    },
    { 
      value: 'custom', 
      label: 'Custom Settings', 
      desc: 'Fine-tune compression parameters',
      expectedReduction: 'Variable',
      icon: '⚙️'
    }
  ]

  const imageQualityOptions = [
    { value: 'high', label: 'High Quality', desc: '95% - Best for documents with important images' },
    { value: 'medium', label: 'Medium Quality', desc: '75% - Balanced compression' },
    { value: 'low', label: 'Low Quality', desc: '50% - Maximum compression' }
  ]

  const handleFileSelect = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      const isValidType = file.type === 'application/pdf' || 
                         file.name.toLowerCase().endsWith('.pdf')
      const isValidSize = file.size <= 100 * 1024 * 1024 // 100MB limit per file
      
      if (!isValidType) {
        setError("Please select only PDF documents")
        return false
      }
      if (!isValidSize) {
        setError("Each PDF must be less than 100MB")
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      if (files.length + validFiles.length > 10) {
        setError("You can compress up to 10 PDF files at once")
        return
      }

      setError("")
      const newFiles = validFiles.map((file, index) => ({
        id: Date.now() + Math.random() + index,
        file,
        name: file.name,
        size: file.size,
        status: 'ready',
        preview: generateFilePreview(file),
        estimatedCompression: getEstimatedCompression(file.size)
      }))
      
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const generateFilePreview = (file) => {
    return {
      type: 'pdf',
      icon: File,
      content: `PDF Document\n${file.name}\n${formatFileSize(file.size)}`,
      pages: Math.ceil(file.size / 100000) // Rough estimate
    }
  }

  const getEstimatedCompression = (fileSize) => {
    const level = compressionSettings.level
    let reduction = 0.4 // Default 40% reduction
    
    switch(level) {
      case 'low': reduction = 0.2; break
      case 'medium': reduction = 0.45; break
      case 'high': reduction = 0.7; break
      default: reduction = 0.4
    }
    
    return {
      originalSize: fileSize,
      estimatedSize: Math.round(fileSize * (1 - reduction)),
      reduction: Math.round(reduction * 100)
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

  const compressPdfs = async () => {
    if (files.length === 0) {
      setError("Please select at least 1 PDF file to compress")
      return
    }

    setIsCompressing(true)
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
      
      // Add files
      files.forEach((fileObj, index) => {
        formData.append('files', fileObj.file)
      })

      // Add compression settings
      formData.append('level', compressionSettings.level)
      formData.append('imageQuality', compressionSettings.imageQuality)
      formData.append('removeMetadata', compressionSettings.removeMetadata)
      formData.append('optimizeForWeb', compressionSettings.optimizeForWeb)

      console.log("Starting compression for", files.length, "PDF files")

      const response = await fetch('http://localhost:5000/api/compress-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("Compression successful:", result)

      clearInterval(progressInterval)
      setProgress(100)

      setTimeout(() => {
        setCompressedFiles(result.compressedFiles || [])
        setCompressionResults(result)
        setIsCompressing(false)
        setCompressionComplete(true)
        setProgress(0)
      }, 500)

    } catch (err) {
      console.error('Compression failed:', err)
      clearInterval(progressInterval)
      
      let errorMessage = 'Compression failed. Please try again.'
      
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to the compression server. Please make sure it is running on port 5001.'
      } else if (err.message.includes('NetworkError')) {
        errorMessage = 'Network error. Please check your compression server is running.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      setIsCompressing(false)
      setProgress(0)
    }
  }

  const downloadFile = async (downloadUrl, filename) => {
    try {
      console.log('Downloading from:', downloadUrl)
      const response = await fetch(downloadUrl)
      
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
      link.download = filename
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
    if (compressedFiles.length === 0) return

    // If there's a ZIP file, download it
    const zipFile = compressedFiles.find(file => file.name && file.name.endsWith('.zip'))
    if (zipFile) {
      await downloadFile(zipFile.downloadUrl, zipFile.name)
    } else {
      // Download individual files
      for (const file of compressedFiles) {
        await downloadFile(file.downloadUrl, file.name)
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  }

  const removeFile = (fileId) => {
    setFiles(files.filter(f => f.id !== fileId))
    setError("")
  }

  const startOver = () => {
    setFiles([])
    setCompressionComplete(false)
    setCompressedFiles([])
    setCompressionResults(null)
    setError("")
    setIsCompressing(false)
    setProgress(0)
    setShowPreview(false)
    setPreviewFile(null)
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const previewPdf = (fileObj) => {
    setPreviewFile(fileObj)
    setShowPreview(true)
  }

  const getTotalSize = () => {
    return files.reduce((sum, file) => sum + file.size, 0)
  }

  const getEstimatedTotalSavings = () => {
    const totalOriginal = getTotalSize()
    const estimatedCompressed = files.reduce((sum, file) => sum + file.estimatedCompression.estimatedSize, 0)
    return {
      originalSize: totalOriginal,
      estimatedSize: estimatedCompressed,
      savings: totalOriginal - estimatedCompressed,
      percentage: totalOriginal > 0 ? Math.round(((totalOriginal - estimatedCompressed) / totalOriginal) * 100) : 0
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced SEO Meta Tags */}
      {typeof document !== 'undefined' && (
        <>
          {(() => {
            // Set document title properly
            document.title = "Compress PDF Online Free - PDF Compressor | ilovepdf.cc"
            
            // Set meta tags
            const metaTags = [
              { name: "description", content: "Compress PDF files online free with ilovepdf.cc PDF compressor. Reduce file size by up to 80% while maintaining quality. Professional PDF compression tool with secure processing. No software required." },
              { name: "keywords", content: "compress pdf, pdf compressor, online compress pdf, reduce pdf size, pdf compression, compress pdf online, image compressor, file compressor, ilovepdf.cc" },
              { name: "author", content: "ilovepdf.cc" },
              { name: "robots", content: "index, follow" },
              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
              { property: "og:title", content: "Free Online PDF Compressor - Reduce PDF File Size | ilovepdf.cc" },
              { property: "og:description", content: "Professional PDF compressor for reducing file sizes online. Compress PDF documents by up to 80% while maintaining quality. Free, fast, and secure." },
              { property: "og:url", content: "https://ilovepdf.cc/tools/compress" },
              { property: "og:type", content: "website" },
              { property: "og:site_name", content: "ilovepdf.cc" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Free Online PDF Compressor | ilovepdf.cc" },
              { name: "twitter:description", content: "Compress PDF files online free. Professional PDF compressor for reducing document sizes in your browser." }
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
            canonical.setAttribute('href', 'https://ilovepdf.cc/tools/compress')
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
                className="text-red-500 hover:text-red-600 font-medium text-sm uppercase tracking-wider transition-colors duration-200"
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
                    <Link to="/tools/split" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">Split PDF</Link>
                    <Link to="/tools/compress" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">Compress PDF</Link>
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
                  to="/tools/compress" 
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compress PDF
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
            Free Online PDF Compressor - Reduce PDF File Size Instantly
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional PDF compressor for reducing file sizes by up to 80% while maintaining quality. Compress PDF documents online with secure processing, batch compression, and instant download.
          </p>
        </div>
      </section>

      {/* Main Content - More compact mobile design */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
          {!compressionComplete ? (
            <>
              {/* Upload Area - Much more compact */}
              <div 
                className={`border-2 border-dashed rounded-xl p-4 lg:p-6 text-center transition-all duration-300 cursor-pointer mb-4 lg:mb-6 ${
                  isDragOver 
                    ? 'border-red-400 bg-red-50 scale-105' 
                    : files.length > 0 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50 hover:scale-105' }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !isCompressing && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                  disabled={isCompressing}
                  multiple
                />
                
                {files.length === 0 ? (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative">
                        <File className="h-10 lg:h-12 w-10 lg:w-12 text-gray-400" />
                        <Minimize2 className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                      {isDragOver ? 'Drop your PDF files here' : 'Select PDF files to compress'}
                    </h3>
                    <p className="text-gray-600 mb-3 lg:mb-4 text-sm">
                      Professional PDF compressor • Reduce file sizes • Secure processing
                    </p>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      disabled={isCompressing}
                    >
                      Choose PDF Files
                    </button>
                    <p className="text-xs text-gray-500 mt-2 lg:mt-3">
                      Up to 10 files • Max 100MB per file • Free PDF compression
                    </p>
                  </>
                ) : (
                  <>
                    <HardDrive className="h-8 lg:h-10 w-8 lg:w-10 text-green-500 mx-auto mb-2 lg:mb-3" />
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                      {files.length} PDF{files.length > 1 ? 's' : ''} ready to compress
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 lg:mb-3">
                      Total: {formatFileSize(getTotalSize())} • Expected reduction: {getEstimatedTotalSavings().percentage}%
                    </p>
                    {!isCompressing && (
                      <button className="text-red-500 hover:text-red-600 font-medium text-sm">
                        Click to add more PDFs
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Compression Settings - More compact */}
              {files.length > 0 && !isCompressing && (
                <div className="mb-4 lg:mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm lg:text-base">Compression Settings</h4>
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="flex items-center text-sm text-gray-600 hover:text-red-500"
                    >
                      <Settings className="h-3 lg:h-4 w-3 lg:w-4 mr-1" />
                      {showSettings ? 'Hide' : 'Show'} Settings
                    </button>
                  </div>
                  
                  {/* Compression Level Cards - More compact */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4">
                    {compressionLevels.map(level => (
                      <div 
                        key={level.value}
                        className={`border-2 rounded-lg p-3 lg:p-4 cursor-pointer transition-all ${
                          compressionSettings.level === level.value 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                        onClick={() => setCompressionSettings({...compressionSettings, level: level.value})}
                      >
                        <div className="text-center">
                          <div className="text-lg lg:text-2xl mb-1 lg:mb-2">{level.icon}</div>
                          <h5 className="font-semibold text-xs lg:text-sm text-gray-900 mb-1">{level.label}</h5>
                          <p className="text-xs text-gray-600 mb-1 lg:mb-2 leading-tight">{level.desc}</p>
                          <div className="text-xs text-red-500 font-medium">
                            {level.expectedReduction}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {showSettings && (
                    <div className="bg-gray-50 rounded-lg p-3 lg:p-4 space-y-4">
                      {/* Image Quality */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image Quality</label>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                          {imageQualityOptions.map(quality => (
                            <label key={quality.value} className="flex items-center p-2 lg:p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                              <input
                                type="radio"
                                name="imageQuality"
                                value={quality.value}
                                checked={compressionSettings.imageQuality === quality.value}
                                onChange={(e) => setCompressionSettings({...compressionSettings, imageQuality: e.target.value})}
                                className="text-red-500 focus:ring-red-500"
                              />
                              <div className="ml-2 lg:ml-3">
                                <div className="text-sm font-medium">{quality.label}</div>
                                <div className="text-xs text-gray-500">{quality.desc}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Additional Options - More compact */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-900 text-sm">Additional Optimization</h5>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={compressionSettings.removeMetadata}
                            onChange={(e) => setCompressionSettings({...compressionSettings, removeMetadata: e.target.checked})}
                            className="text-red-500 focus:ring-red-500 rounded"
                          />
                          <div className="ml-2 lg:ml-3">
                            <div className="text-sm font-medium">Remove metadata</div>
                            <div className="text-xs text-gray-500">Remove document properties and hidden data</div>
                          </div>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={compressionSettings.optimizeForWeb}
                            onChange={(e) => setCompressionSettings({...compressionSettings, optimizeForWeb: e.target.checked})}
                            className="text-red-500 focus:ring-red-500 rounded"
                          />
                          <div className="ml-2 lg:ml-3">
                            <div className="text-sm font-medium">Optimize for web</div>
                            <div className="text-xs text-gray-500">Linearize PDF for faster web viewing</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Estimated Savings Preview - More compact */}
              {files.length > 0 && !isCompressing && (
                <div className="mb-4 lg:mb-6 bg-blue-50 rounded-lg p-3 lg:p-4">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center text-sm lg:text-base">
                    <BarChart3 className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Estimated Compression Results
                  </h4>
                  <div className="grid grid-cols-3 gap-3 lg:gap-4">
                    <div className="text-center">
                      <div className="text-lg lg:text-2xl font-bold text-gray-900">{formatFileSize(getEstimatedTotalSavings().originalSize)}</div>
                      <div className="text-xs lg:text-sm text-gray-600">Original Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg lg:text-2xl font-bold text-green-600">{formatFileSize(getEstimatedTotalSavings().estimatedSize)}</div>
                      <div className="text-xs lg:text-sm text-gray-600">Estimated Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg lg:text-2xl font-bold text-red-500">{getEstimatedTotalSavings().percentage}%</div>
                      <div className="text-xs lg:text-sm text-gray-600">Size Reduction</div>
                    </div>
                  </div>
                  <div className="mt-2 lg:mt-3 text-center text-xs text-gray-500">
                    * Actual results may vary based on PDF content and structure
                  </div>
                </div>
              )}

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

              {/* File List - Much more compact */}
              {files.length > 0 && (
                <div className="mb-4 lg:mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base">PDF files to compress ({files.length})</h4>
                  
                  <div className="space-y-2">
                    {files.map((fileObj) => (
                      <div key={fileObj.id} className="bg-gray-50 border border-gray-200 rounded-lg p-2 lg:p-3 flex items-center justify-between">
                        <div className="flex items-center min-w-0 flex-1">
                          {/* PDF Icon - Much smaller */}
                          <div className="w-6 h-8 lg:w-8 lg:h-10 bg-red-500 text-white rounded flex flex-col items-center justify-center mr-2 lg:mr-3 flex-shrink-0">
                            <File className="h-3 lg:h-4 w-3 lg:w-4 mb-0" />
                            <span className="text-xs font-bold hidden lg:block">PDF</span>
                          </div>
                          
                          {/* File Info - More compact */}
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{fileObj.name}</p>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 text-xs text-gray-500">
                              <span>{formatFileSize(fileObj.size)}</span>
                              <span className="text-green-600">
                                Expected: {formatFileSize(fileObj.estimatedCompression.estimatedSize)} ({fileObj.estimatedCompression.reduction}%)
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Controls - Compact */}
                        <div className="flex items-center space-x-1 lg:space-x-2 ml-2 lg:ml-3">
                          <button
                            onClick={() => previewPdf(fileObj)}
                            className="text-blue-500 hover:text-blue-600 p-1"
                            title="Preview"
                          >
                            <Eye className="h-3 lg:h-4 w-3 lg:w-4" />
                          </button>
                          
                          {!isCompressing && (
                            <button
                              onClick={() => removeFile(fileObj.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                              title="Remove"
                            >
                              <X className="h-3 lg:h-4 w-3 lg:w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compress Button */}
              {files.length > 0 && !isCompressing && (
                <div className="text-center">
                  <button
                    onClick={compressPdfs}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
                  >
                    <Minimize2 className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Compress PDF{files.length > 1 ? 's' : ''}
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Reduce file size with {compressionSettings.level} compression
                  </p>
                </div>
              )}

              {/* Compressing State */}
              {isCompressing && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-red-100 rounded-full mb-4">
                    <Loader className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Compressing PDF{files.length > 1 ? 's' : ''}...</h3>
                  <p className="text-gray-600 text-sm mb-4">Optimizing {files.length} PDF file{files.length > 1 ? 's' : ''}</p>
                  
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
            /* Compression Complete - Compact design */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 lg:w-16 h-12 lg:h-16 bg-green-100 text-green-600 rounded-full mb-4 lg:mb-6">
                <Check className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">PDF Compression Complete!</h2>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
                Your PDF{files.length > 1 ? 's have' : ' has'} been successfully compressed.
              </p>

              {/* Compression Results */}
              {compressionResults && (
                <div className="mb-4 lg:mb-6">
                  <div className="bg-green-50 rounded-lg p-3 lg:p-4 mb-4">
                    <h4 className="font-semibold text-green-900 mb-3 text-sm lg:text-base">Compression Results</h4>
                    <div className="grid grid-cols-3 gap-3 lg:gap-4">
                      <div className="text-center">
                        <div className="text-lg lg:text-2xl font-bold text-gray-900">
                          {formatFileSize(compressionResults.totalOriginalSize)}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600">Original Size</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg lg:text-2xl font-bold text-green-600">
                          {formatFileSize(compressionResults.totalCompressedSize)}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600">Compressed Size</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg lg:text-2xl font-bold text-red-500">
                          {compressionResults.overallCompressionRatio}%
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600">Size Reduction</div>
                      </div>
                    </div>
                  </div>

                  {/* Download All Button */}
                  <div className="mb-4">
                    <button
                      onClick={downloadAllFiles}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
                    >
                      <Package className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                      Download Compressed PDF{compressedFiles.length > 1 ? 's' : ''}
                      {compressedFiles.find(f => f.name && f.name.endsWith('.zip')) && ' (ZIP)'}
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      {compressedFiles.length} compressed file{compressedFiles.length > 1 ? 's' : ''} ready
                    </p>
                  </div>

                  {/* Individual Files - Very compact */}
                  <div className="bg-gray-50 rounded-lg p-3 lg:p-4">
                    <h4 className="font-medium text-gray-900 mb-3 text-sm lg:text-base">Compressed Files:</h4>
                    <div className="space-y-2">
                      {compressedFiles.filter(file => !file.name || !file.name.endsWith('.zip')).map((file, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-2 lg:p-3 flex items-center justify-between">
                          <div className="flex items-center min-w-0 flex-1">
                            <div className="w-5 lg:w-6 h-5 lg:h-6 bg-red-500 text-white rounded flex items-center justify-center mr-2 lg:mr-3 flex-shrink-0">
                              <File className="h-2 lg:h-3 w-2 lg:w-3" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs lg:text-sm font-medium text-gray-900 truncate" title={file.name || `compressed-${index + 1}.pdf`}>
                                {file.name || `compressed-${index + 1}.pdf`}
                              </p>
                              <div className="flex items-center space-x-2 lg:space-x-3 text-xs text-gray-500">
                                <span>{formatFileSize(file.size || 0)}</span>
                                {file.compressionRatio > 0 && (
                                  <span className="text-green-600">{file.compressionRatio}% reduced</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadFile(file.downloadUrl, file.name || `compressed-${index + 1}.pdf`)}
                            className="text-blue-500 hover:text-blue-600 p-1 flex-shrink-0 ml-2"
                            title="Download"
                          >
                            <Download className="h-3 lg:h-4 w-3 lg:w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={downloadAllFiles}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Files
                </button>
                <button
                  onClick={startOver}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Compress More PDFs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PDF Preview Modal - More compact */}
      {showPreview && previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[70vh] overflow-hidden">
            <div className="flex justify-between items-center p-3 lg:p-4 border-b">
              <h3 className="text-lg font-semibold">PDF Preview</h3>
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
                  <h1 className="text-base lg:text-lg font-bold text-gray-900 truncate">{previewFile.name}</h1>
                </div>
                
                <div className="space-y-3 text-gray-700">
                  <div className="bg-gray-100 p-3 rounded flex items-center justify-center">
                    <File className="h-8 lg:h-12 w-8 lg:w-12 text-gray-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center">
                      <span className="font-medium text-gray-600 text-xs">Current Size</span>
                      <div className="text-base lg:text-lg font-bold text-gray-900">
                        {formatFileSize(previewFile.size)}
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-gray-600 text-xs">After Compression</span>
                      <div className="text-base lg:text-lg font-bold text-green-600">
                        ~{formatFileSize(previewFile.estimatedCompression.estimatedSize)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-2 lg:p-3 rounded">
                    <h3 className="font-semibold mb-1 text-green-900 text-sm">Compression Preview</h3>
                    <p className="text-xs text-green-800">
                      Expected {previewFile.estimatedCompression.reduction}% reduction using {compressionSettings.level} compression.
                    </p>
                  </div>
                </div>

                <div className="text-center text-gray-500 text-xs mt-3 lg:mt-4">
                  <p>✓ Quality preserved ✓ Fast compression ✓ Secure processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
       {/* Enhanced Features Section for PDF Compressor */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Why Choose ilovepdf.cc's Online PDF Compressor?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional PDF compression capabilities with advanced file size reduction for all your document needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {compressionFeatures.map((feature, index) => (
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

          {/* Additional PDF Compressor Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 lg:mt-12">
            {compressionCapabilities.map((capability, index) => (
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

      {/* How to Use PDF Compressor Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              How to Compress PDF Files Online with ilovepdf.cc
            </h2>
            <p className="text-lg text-gray-600">
              Professional PDF compression in 3 simple steps using our advanced online compressor
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">1. Upload PDF Documents</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select PDF files for compression or drag and drop them into our secure online PDF compressor. Supports files up to 100MB each.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">2. Choose Compression Level</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select compression level and optimization settings. Our PDF compressor offers balanced quality and size reduction options.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">3. Download Compressed PDFs</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Download your compressed PDF files instantly. Reduced file sizes maintain quality while being perfect for sharing and storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Compression Use Cases Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Professional PDF Compression for Every Purpose
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF compressor serves professionals, students, and businesses with comprehensive file size reduction capabilities
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
              Frequently Asked Questions About PDF Compression
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about compressing PDF documents with ilovepdf.cc's online compressor
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
              Complete Guide to Online PDF Compression with ilovepdf.cc
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Why Use an Online PDF Compressor?
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  ilovepdf.cc's online PDF compressor revolutionizes file size management by providing professional-grade compression directly in your browser. Unlike traditional PDF software that requires expensive licenses and complex installations, our web-based PDF compressor offers instant access to powerful compression tools. This cloud-based approach ensures you can compress PDF documents from any device, anywhere, without compromising on functionality or security.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  The online PDF compressor reduces file sizes by up to 80% while maintaining document integrity, making it perfect for professionals who need to share large documents, students submitting assignments, or businesses optimizing storage costs. With advanced compression algorithms and quality preservation, every compressed PDF maintains readability and professional appearance.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Professional PDF Compression Features
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Advanced compression algorithms for optimal file size reduction
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Multiple compression levels from low to high intensity
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Batch compression for processing multiple files simultaneously
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Real-time compression estimates and progress tracking
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Secure cloud processing with automatic file deletion
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Professional-quality output maintaining document standards
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Advanced PDF Compression Technology
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Our PDF compressor utilizes cutting-edge compression technology to intelligently reduce file sizes while preserving document quality. This sophisticated approach analyzes PDF content to optimize images, remove unnecessary metadata, and apply efficient compression algorithms. The compressor automatically handles different content types including text, graphics, and photographs, ensuring optimal compression ratios for each element type.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              PDF Compressor Security and Privacy
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Security is paramount when compressing sensitive documents online. ilovepdf.cc's PDF compressor employs enterprise-grade SSL encryption to protect your documents during the compression process. All uploaded files are processed on secure servers and automatically deleted within one hour of completion. This ensures that your confidential documents, whether they're financial reports, legal contracts, or personal papers, remain completely private throughout the compression session.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              PDF Compression Best Practices and Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="bg-blue-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center text-sm lg:text-base">
                  <Minimize2 className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Effective Compression Settings
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Choose compression levels based on your needs. Use high compression for web sharing, medium for general use, and low for documents requiring highest quality. Preview results before final compression.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center text-sm lg:text-base">
                  <Shield className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Quality Optimization
                </h4>
                <p className="text-green-800 text-sm leading-relaxed">
                  The PDF compressor automatically optimizes image quality and removes metadata while maintaining readability. Enable web optimization for faster loading times. Download immediately after processing.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Why Choose ilovepdf.cc for PDF Compression?
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
              ilovepdf.cc stands as the premier choice for online PDF compression, combining powerful functionality with user-friendly design. Our PDF compressor offers professional-grade compression capabilities typically found only in expensive desktop software, but with the convenience and accessibility of a web-based platform. The intuitive interface makes PDF compression simple for beginners while providing the advanced features that professionals require.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
              With support for files up to 100MB, batch processing capabilities, and real-time compression preview, our PDF compressor handles everything from simple file size reduction to complex document optimization workflows. The combination of powerful compression tools, robust security measures, and seamless user experience makes ilovepdf.cc the trusted choice for millions of users worldwide who need to compress PDF documents online.
            </p>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Compress PDF Documents on Any Device
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF compressor works seamlessly across all devices and platforms for ultimate flexibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-blue-500 text-white rounded-xl mb-4">
                <Monitor className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Desktop PDF Compressor</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Full-featured PDF compression on Windows, Mac, and Linux computers. Professional workflow support with advanced compression capabilities and batch processing.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-green-500 text-white rounded-xl mb-4">
                <Smartphone className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Mobile PDF Compressor</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Touch-optimized PDF compression on smartphones and tablets. Compress PDF files on iOS and Android devices with responsive interface and mobile-friendly controls.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-purple-500 text-white rounded-xl mb-4">
                <Globe className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Browser-Based Compressor</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                No downloads required. Works in Chrome, Firefox, Safari, Edge, and all modern browsers. Access the PDF compressor instantly from any device with internet connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions for PDF Compression Worldwide
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
            More than 10 million users worldwide rely on our PDF compressor every month for file size reduction
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">15M+</div>
              <div className="text-gray-600 text-sm lg:text-base">PDFs compressed monthly</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">80%</div>
              <div className="text-gray-600 text-sm lg:text-base">Average size reduction</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">99.9%</div>
              <div className="text-gray-600 text-sm lg:text-base">Compression success rate</div>
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
              <p className="text-gray-600 text-sm mb-4">Combine multiple PDF documents into one file with professional results.</p>
              <Link to="/tools/merge" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Merge PDFs →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-green-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Edit3 className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Edit PDF Text</h3>
              <p className="text-gray-600 text-sm mb-4">Modify PDF content directly in your browser with professional editing tools.</p>
              <Link to="/tools/edit-pdf" className="text-green-600 hover:text-green-700 font-medium text-sm">
                Edit PDFs →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-purple-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <ImageIcon className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Convert PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Convert PDF documents to various formats including JPG, PNG, Word, and Excel.</p>
              <Link to="/tools/pdf-to-jpg" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Convert PDFs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
            Ready to Compress Your PDF Documents?
          </h2>
          <p className="text-lg lg:text-xl text-red-100 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Experience professional PDF compression with ilovepdf.cc's advanced online compressor. Reduce file sizes by up to 80% with secure processing and instant download.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/merge"
              className="bg-white text-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <Merge className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              Merge PDF Documents
            </Link>
            <Link
              to="/tools/edit-pdf"
              className="border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <Edit3 className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              Edit PDF Files
            </Link>
          </div>
          <p className="text-red-100 mt-4 lg:mt-6 text-sm">
            Free PDF compression tools • No registration required • Secure processing on ilovepdf.cc
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
                Professional PDF compression tools and document optimizers. All tools are 100% FREE and designed for professional use.
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
                <li><Link to="/tools/compress" className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium">Compress PDF</Link></li>
                <li><Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Split PDF</Link></li>
                <li><Link to="/tools/edit-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Edit PDF</Link></li>
              </ul>
            </div>

            {/* Convert */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">CONVERT</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/pdf-to-jpg" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to JPG</Link></li>
                <li><Link to="/tools/pdf-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to PNG</Link></li>
                <li><Link to="/tools/jpg-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">JPG to PDF</Link></li>
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to PDF</Link></li>
              </ul>
            </div>

            {/* Optimize */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">OPTIMIZE</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Reduce PDF Size</Link></li>
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
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-8 lg:mt-12 pt-6 lg:pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2024 ilovepdf.cc. Professional PDF Compressor. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PDF compression professionals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CompressPdfPage
