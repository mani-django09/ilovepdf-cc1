// Enhanced MergePdfPage.js with SEO content similar to EditPdfPage
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
  ArrowUp,
  ArrowDown,
  Plus,
  Merge,
  GripVertical,
  Monitor,
  Smartphone,
  Camera,
  Settings,
  Layers,
  ArrowRight,
  ImageIcon,
  Edit3,
  Sparkles,
  RefreshCw
} from "lucide-react"

function MergePdfPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [files, setFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionComplete, setConversionComplete] = useState(false)
  const [error, setError] = useState("")
  const [mergedFile, setMergedFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [draggedIndex, setDraggedIndex] = useState(null)
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

  // Enhanced FAQ with merge PDF focus
  const faqData = [
    {
      question: "How to merge PDF files online free with ilovepdf.cc?",
      answer: "ilovepdf.cc offers the best online PDF merger for combining multiple PDF documents into one file. Simply upload your PDF files, drag to reorder them, and click merge. Our advanced PDF combiner preserves document quality while securely processing your files online without software installation required."
    },
    {
      question: "Can I combine PDF files of different sizes and formats?",
      answer: "Yes! Our online PDF merger can combine PDF files of various sizes, orientations, and page counts. Whether you're merging business reports, academic papers, or mixed document types, the PDF combiner maintains each document's original formatting and quality in the final merged PDF."
    },
    {
      question: "Is it safe to merge PDF documents online using ilovepdf.cc?",
      answer: "Absolutely! ilovepdf.cc's PDF merger uses enterprise-grade SSL encryption to protect your documents during the merge process. All uploaded PDF files are automatically deleted after 1 hour, ensuring complete privacy. We never store, access, or share your combined PDF documents."
    },
    {
      question: "How many PDF files can I merge at once with the online merger?",
      answer: "You can merge up to 20 PDF files simultaneously with our online PDF combiner, supporting a maximum total size of 100MB. This makes it perfect for combining multiple chapters, reports, or document sections into one comprehensive PDF file."
    },
    {
      question: "Can I change the order of PDF pages when merging documents?",
      answer: "Yes! Our PDF merger includes an intuitive drag-and-drop interface for reordering PDF files before combining them. Simply drag files up or down in the list to arrange them in your desired sequence. The final merged PDF will follow the exact order you specify."
    },
    {
      question: "What happens to bookmarks and metadata when I combine PDF files?",
      answer: "The PDF merger preserves bookmarks from individual documents in the combined PDF. The merged document inherits metadata from the first PDF file while maintaining the structural integrity and navigation features of all included documents for professional results."
    },
    {
      question: "Does the online PDF merger work on mobile devices and tablets?",
      answer: "Yes! ilovepdf.cc's PDF merger is fully optimized for mobile devices, tablets, and desktop computers. You can combine PDF files on Android phones, iPhones, iPads, and any device with a web browser. The responsive interface adapts to all screen sizes for easy PDF merging anywhere."
    },
    {
      question: "Can I merge password-protected PDF files using the online combiner?",
      answer: "For security reasons, password-protected PDF files must be unlocked before merging. You can use our 'Unlock PDF' tool to remove passwords first, then use the PDF merger to combine your documents. This ensures secure handling of protected content."
    }
  ]

  // PDF merging features for benefits section
  const mergingFeatures = [
    {
      icon: <Merge className="h-8 w-8" />,
      title: "Advanced PDF Combining",
      description: "Merge multiple PDF documents with intelligent page ordering and automatic quality optimization. Our PDF combiner handles complex merging scenarios with ease.",
      color: "blue"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Smart Document Processing",
      description: "Preserve document structure, bookmarks, and metadata when combining PDFs. The merger maintains professional formatting across all merged documents.",
      color: "green"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure PDF Merging",
      description: "Enterprise-grade encryption protects your documents during the merge process. All files are automatically deleted for complete privacy and security.",
      color: "purple"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning-Fast Combining",
      description: "Instant PDF merging with optimized processing algorithms. Combine large documents quickly without compromising quality or performance.",
      color: "orange"
    }
  ]

  // PDF merging capabilities
  const mergingCapabilities = [
    {
      icon: <Layers className="h-7 w-7" />,
      title: "Multi-Document Merging",
      description: "Combine up to 20 PDF files simultaneously with drag-and-drop reordering for perfect document organization."
    },
    {
      icon: <BookOpen className="h-7 w-7" />,
      title: "Bookmark Preservation",
      description: "Maintain navigation structure and bookmarks from individual PDFs in the final merged document."
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Quality Optimization",
      description: "Advanced algorithms ensure merged PDFs maintain original quality while optimizing file size and performance."
    }
  ]

  // PDF merging use cases
  const useCases = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Business Reports",
      description: "Combine quarterly reports, financial documents, and presentations into comprehensive business packages using our PDF merger.",
      color: "blue"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Academic Documents",
      description: "Merge research papers, thesis chapters, and academic materials into complete scholarly works with proper organization.",
      color: "green"
    },
    {
      icon: <File className="h-5 w-5" />,
      title: "Legal Portfolios",
      description: "Combine contracts, agreements, and legal documentation into organized case files for professional presentation.",
      color: "purple"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Project Documentation",
      description: "Merge project plans, specifications, and deliverables into complete project portfolios for client delivery.",
      color: "orange"
    }
  ]

  const handleFileSelect = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      const isValidType = file.type === 'application/pdf' || 
                         file.name.toLowerCase().endsWith('.pdf')
      const isValidSize = file.size <= 25 * 1024 * 1024 // 25MB limit per file
      
      if (!isValidType) {
        setError("Please select only PDF documents")
        return false
      }
      if (!isValidSize) {
        setError("Each file must be less than 25MB")
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      const totalSize = [...files, ...validFiles].reduce((sum, file) => sum + (file.file?.size || file.size), 0)
      if (totalSize > 100 * 1024 * 1024) {
        setError("Total file size must be less than 100MB")
        return
      }

      if (files.length + validFiles.length > 20) {
        setError("You can merge up to 20 PDF files at once")
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
        order: files.length + index + 1
      }))
      
      setFiles(prev => [...prev, ...newFiles])
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

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files to merge")
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
      
      // Add files in order
      files.forEach((fileObj, index) => {
        formData.append('files', fileObj.file)
        formData.append('order', index.toString())
      })

      console.log("Starting merge for", files.length, "files")

      const response = await fetch('/api/merge-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("Merge successful:", result)

      clearInterval(progressInterval)
      setProgress(100)

      setTimeout(() => {
        const totalSize = files.reduce((sum, file) => sum + file.size, 0)
        setMergedFile({
          name: `merged-document.pdf`,
          downloadUrl: result.downloadUrl,
          size: result.mergedSize || Math.floor(totalSize * 0.95),
          fileCount: files.length,
          originalNames: files.map(f => f.name)
        })
        
        setIsConverting(false)
        setConversionComplete(true)
        setProgress(0)
      }, 500)

    } catch (err) {
      console.error('Merge failed:', err)
      clearInterval(progressInterval)
      
      let errorMessage = 'Merge failed. Please try again.'
      
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to the server. Please make sure the backend server is running.'
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
    if (!mergedFile || !mergedFile.downloadUrl) {
      setError('No merged file available for download')
      return
    }

    try {
      const response = await fetch(mergedFile.downloadUrl)
      
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
      link.download = mergedFile.name
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
    setFiles(files.filter(f => f.id !== fileId))
    setError("")
  }

  const moveFile = (index, direction) => {
    const newFiles = [...files]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]]
      setFiles(newFiles)
    }
  }

  const startOver = () => {
    setFiles([])
    setConversionComplete(false)
    setMergedFile(null)
    setError("")
    setIsConverting(false)
    setProgress(0)
    setShowPreview(false)
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const handleDragStart = (e, index) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleDragOverFile = (e, index) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      const newFiles = [...files]
      const draggedFile = newFiles[draggedIndex]
      newFiles.splice(draggedIndex, 1)
      newFiles.splice(index, 0, draggedFile)
      setFiles(newFiles)
      setDraggedIndex(index)
    }
  }

  const getTotalSize = () => {
    return files.reduce((sum, file) => sum + file.size, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced SEO Meta Tags */}
      {typeof document !== 'undefined' && (
        <>
          {(() => {
            // Set document title properly
            document.title = "Merge PDF Online Free - Combine PDF Files | ilovepdf.cc"
            
            // Set meta tags
            const metaTags = [
              { name: "description", content: "Merge PDF files online free with ilovepdf.cc PDF merger. Combine multiple PDF documents into one file instantly. Professional PDF combiner with secure processing. No software required." },
              { name: "keywords", content: "merge pdf, combine pdf, online merge pdf, pdf merger, pdf combiner, merge pdf files online, combine pdf documents, ilovepdf.cc" },
              { name: "author", content: "ilovepdf.cc" },
              { name: "robots", content: "index, follow" },
              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
              { property: "og:title", content: "Free Online PDF Merger - Combine PDF Files | ilovepdf.cc" },
              { property: "og:description", content: "Professional PDF merger for combining multiple PDF documents online. Merge PDF files instantly with secure processing. Free, fast, and easy to use." },
              { property: "og:url", content: "https://ilovepdf.cc/tools/merge" },
              { property: "og:type", content: "website" },
              { property: "og:site_name", content: "ilovepdf.cc" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Free Online PDF Merger | ilovepdf.cc" },
              { name: "twitter:description", content: "Merge PDF files online free. Professional PDF combiner for merging documents in your browser." }
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
            canonical.setAttribute('href', 'https://ilovepdf.cc/tools/merge')
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
                className="text-red-500 hover:text-red-600 font-medium text-sm uppercase tracking-wider transition-colors duration-200"
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
                    <Link to="/tools/merge" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">Merge PDF</Link>
                    <Link to="/tools/split" className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors duration-200">Split PDF</Link>
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
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Merge PDF
                </Link>
                <Link 
                  to="/tools/edit-pdf" 
                  className="block text-gray-700 hover:text-red-500 font-medium text-sm uppercase transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Edit PDF
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
            Free Online PDF Merger - Combine PDF Files Instantly
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional PDF merger for combining multiple PDF documents into one file. Merge PDF files online with secure processing, drag-and-drop reordering, and instant download.
          </p>
        </div>
      </section>

      {/* Main Content - More compact mobile design */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
          {!conversionComplete ? (
            <>
              {/* Upload Area - More compact */}
              <div 
                className={`border-2 border-dashed rounded-xl p-4 lg:p-6 text-center transition-all duration-300 cursor-pointer mb-4 lg:mb-6 ${
                  isDragOver 
                    ? 'border-red-400 bg-red-50 scale-105' 
                    : files.length > 0 
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
                
                {files.length === 0 ? (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative">
                        <Upload className="h-10 lg:h-12 w-10 lg:w-12 text-gray-400" />
                        <Plus className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                      {isDragOver ? 'Drop your PDF files here' : 'Select PDF files to merge'}
                    </h3>
                    <p className="text-gray-600 mb-3 lg:mb-4 text-sm">
                      Professional PDF merger • Drag to reorder • Secure processing
                    </p>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      disabled={isConverting}
                    >
                      Choose PDF Files
                    </button>
                    <p className="text-xs text-gray-500 mt-2 lg:mt-3">
                      Up to 20 files • Max 25MB per file • Total 100MB
                    </p>
                  </>
                ) : (
                  <>
                    <Merge className="h-10 lg:h-12 w-10 lg:w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {files.length} file{files.length > 1 ? 's' : ''} ready to merge
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Total size: {formatFileSize(getTotalSize())}
                    </p>
                    {!isConverting && (
                      <button className="text-red-500 hover:text-red-600 font-medium text-sm">
                        Click to add more PDF files
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

              {/* File List with Drag & Drop Reordering - More compact mobile design */}
              {files.length > 0 && (
                <div className="mb-4 lg:mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm lg:text-base">
                      Files to merge ({files.length})
                    </h4>
                    <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">Drag to reorder</p>
                  </div>
                  
                  <div className="space-y-2">
                    {files.map((fileObj, index) => (
                      <div 
                        key={fileObj.id} 
                        className={`bg-white border rounded-lg p-3 lg:p-4 flex items-center justify-between transition-all duration-200 ${
                          draggedIndex === index ? 'shadow-lg scale-105 bg-blue-50 border-blue-300' : 'border-gray-200 hover:shadow-md'
                        }`}
                        draggable={!isConverting}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOverFile(e, index)}
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          {/* Drag Handle - Hidden on mobile */}
                          <div className="mr-2 lg:mr-3 cursor-move text-gray-400 hover:text-gray-600 hidden sm:block">
                            <GripVertical className="h-4 lg:h-5 w-4 lg:w-5" />
                          </div>
                          
                          {/* Order Number */}
                          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs lg:text-sm font-bold mr-2 lg:mr-3 flex-shrink-0">
                            {index + 1}
                          </div>
                          
                          {/* PDF Thumbnail - Compact */}
                          <div className="w-8 h-10 lg:w-12 lg:h-16 bg-red-500 text-white rounded flex flex-col items-center justify-center mr-2 lg:mr-3 flex-shrink-0">
                            <File className="h-4 lg:h-6 w-4 lg:w-6 mb-0 lg:mb-1" />
                            <span className="text-xs font-bold hidden lg:block">PDF</span>
                          </div>
                          
                          {/* File Info - Responsive */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">{fileObj.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(fileObj.size)}</p>
                          </div>
                        </div>
                        
                        {/* Controls - Compact for mobile */}
                        <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
                          <span className="text-green-600 font-medium text-xs lg:text-sm hidden sm:inline">Ready</span>
                          
                          {/* Move buttons - Responsive */}
                          {!isConverting && (
                            <>
                              <button
                                onClick={() => moveFile(index, 'up')}
                                disabled={index === 0}
                                className="text-gray-400 hover:text-blue-500 p-1 disabled:opacity-30"
                                title="Move up"
                              >
                                <ArrowUp className="h-3 lg:h-4 w-3 lg:w-4" />
                              </button>
                              <button
                                onClick={() => moveFile(index, 'down')}
                                disabled={index === files.length - 1}
                                className="text-gray-400 hover:text-blue-500 p-1 disabled:opacity-30"
                                title="Move down"
                              >
                                <ArrowDown className="h-3 lg:h-4 w-3 lg:w-4" />
                              </button>
                              <button
                                onClick={() => removeFile(fileObj.id)}
                                className="text-gray-400 hover:text-red-500 p-1"
                                title="Remove"
                              >
                                <X className="h-3 lg:h-4 w-3 lg:w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile reorder tip */}
                  <p className="text-xs text-gray-500 mt-2 text-center sm:hidden">
                    Use arrow buttons to reorder files
                  </p>
                </div>
              )}

              {/* Merge Button */}
              {files.length >= 2 && !isConverting && (
                <div className="text-center">
                  <button
                    onClick={mergePdfs}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto"
                  >
                    <Merge className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Merge {files.length} PDF{files.length > 1 ? 's' : ''}
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Combine {files.length} document{files.length > 1 ? 's' : ''} into one PDF
                  </p>
                </div>
              )}

              {files.length === 1 && (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm lg:text-base">Add at least one more PDF file to merge</p>
                </div>
              )}

              {/* Merging State */}
              {isConverting && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-red-100 rounded-full mb-4">
                    <Loader className="h-5 lg:h-6 w-5 lg:w-6 text-red-500 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Merging your PDF files...</h3>
                  <p className="text-gray-600 text-sm mb-4">Combining {files.length} documents into one PDF</p>
                  
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
            /* Merge Complete - Compact mobile design */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 lg:w-16 h-12 lg:h-16 bg-green-100 text-green-600 rounded-full mb-4 lg:mb-6">
                <Check className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">PDF Merge Complete!</h2>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
                Your {mergedFile?.fileCount} PDF files have been successfully merged into one document.
              </p>

              {/* Download Card - Compact */}
              {mergedFile && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 lg:p-6 max-w-md mx-auto mb-4 lg:mb-6">
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <div className="flex items-center">
                      <div className="w-10 lg:w-12 h-10 lg:h-12 bg-red-500 text-white rounded-lg flex items-center justify-center mr-2 lg:mr-3">
                        <File className="h-5 lg:h-6 w-5 lg:w-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900 text-sm">{mergedFile.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(mergedFile.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={downloadFile}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Merged Files Info - Compact */}
                  <div className="border-t pt-3 lg:pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Merged files:</p>
                    <div className="space-y-1 max-h-24 lg:max-h-32 overflow-y-auto">
                      {mergedFile.originalNames?.map((name, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <span className="w-3 lg:w-4 h-3 lg:h-4 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                            {index + 1}
                          </span>
                          <span className="truncate">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons - Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={downloadFile}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Merged PDF
                </button>
                <button
                  onClick={startOver}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 lg:px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Merge More Files
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Features Section for PDF Merger */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Why Choose ilovepdf.cc's Online PDF Merger?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional PDF combining capabilities with advanced merging features for all your document needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {mergingFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-${feature.color}-500 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional PDF Merger Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 lg:mt-12">
            {mergingCapabilities.map((capability, index) => (
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

      {/* How to Use PDF Merger Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              How to Merge PDF Files Online with ilovepdf.cc
            </h2>
            <p className="text-lg text-gray-600">
              Professional PDF merging in 3 simple steps using our advanced online PDF combiner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">1. Upload PDF Documents</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Select multiple PDF files for merging or drag and drop them into our secure online PDF merger. Supports files up to 25MB each.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <GripVertical className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">2. Arrange PDF Order</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Drag and drop files to arrange them in your desired order. Our PDF combiner will merge documents in the exact sequence you specify.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-8 lg:h-10 w-8 lg:w-10" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">3. Download Combined PDF</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Click merge and download your combined PDF file instantly. The merged document maintains professional quality and formatting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Merging Use Cases Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Professional PDF Merging for Every Purpose
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF merger serves professionals, students, and businesses with comprehensive document combining capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className={`bg-${useCase.color}-50 rounded-lg p-4 lg:p-6`}>
                <h4 className={`font-semibold text-${useCase.color}-900 mb-3 flex items-center text-sm lg:text-base`}>
                  {useCase.icon}
                  <span className="ml-2">{useCase.title}</span>
                </h4>
                <p className={`text-${useCase.color}-800 text-sm leading-relaxed`}>
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
              Frequently Asked Questions About PDF Merging
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about combining PDF documents with ilovepdf.cc's online PDF merger
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
              Complete Guide to Online PDF Merging with ilovepdf.cc
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Why Use an Online PDF Merger?
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  ilovepdf.cc's online PDF merger revolutionizes document combining by providing professional-grade capabilities directly in your browser. Unlike traditional PDF software that requires expensive licenses and complex installations, our web-based PDF combiner offers instant access to powerful merging tools. This cloud-based approach ensures you can merge PDF documents from any device, anywhere, without compromising on functionality or security.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                  The online PDF merger maintains document integrity while combining multiple files, making it perfect for professionals who need to create comprehensive reports, students compiling research materials, or businesses organizing documentation. With advanced processing algorithms and quality preservation, every merged PDF maintains the original appearance and structure of all combined documents.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                  Professional PDF Merging Features
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm lg:text-base">
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Drag-and-drop file reordering for perfect document sequence
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Automatic bookmark and metadata preservation during merging
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Multi-file support for combining up to 20 PDFs simultaneously
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Real-time progress tracking with instant processing feedback
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Secure cloud processing with automatic file deletion
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 lg:h-5 w-4 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Professional-quality output maintaining original document standards
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Advanced PDF Combining Capabilities
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Our PDF merger utilizes cutting-edge document processing technology to intelligently combine multiple PDF files while preserving their individual characteristics. This sophisticated approach allows for seamless merging while maintaining document integrity, formatting, and structure. The merger automatically handles different page sizes, orientations, and content types, ensuring that your combined PDF maintains professional appearance regardless of the source documents' diversity.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              PDF Merger Security and Privacy
            </h3>
            <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Security is paramount when combining sensitive documents online. ilovepdf.cc's PDF merger employs enterprise-grade SSL encryption to protect your documents during the merging process. All uploaded files are processed on secure servers and automatically deleted within one hour of completion. This ensures that your confidential documents, whether they're financial reports, legal contracts, or personal papers, remain completely private throughout the merging session. The PDF merger never stores, accesses, or shares your documents beyond the necessary processing time.
            </p>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              PDF Merging Best Practices and Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div className="bg-blue-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center text-sm lg:text-base">
                  <Merge className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Effective File Organization
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Arrange files in logical order before merging. Use descriptive filenames for easy identification. Consider document flow and reader navigation when organizing pages. Preview the final order before processing.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 lg:p-6">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center text-sm lg:text-base">
                  <Shield className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                  Quality Optimization
                </h4>
                <p className="text-green-800 text-sm leading-relaxed">
                  The PDF merger automatically optimizes file size while maintaining quality. Ensure source files are high-quality for best results. Remove unnecessary pages before merging. Download immediately after processing completion.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
              Why Choose ilovepdf.cc for PDF Merging?
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
              ilovepdf.cc stands as the premier choice for online PDF merging, combining powerful functionality with user-friendly design. Our PDF merger offers professional-grade combining capabilities typically found only in expensive desktop software, but with the convenience and accessibility of a web-based platform. The intuitive interface makes PDF merging simple for beginners while providing the advanced features that professionals require.
            </p>
            <p className="text-gray-600 leading-text-gray-600 leading-relaxed text-sm lg:text-base">
              With support for up to 20 documents, drag-and-drop reordering, and real-time processing preview, our PDF merger handles everything from simple document combining to complex multi-file organization. The combination of powerful merging tools, robust security measures, and seamless user experience makes ilovepdf.cc the trusted choice for millions of users worldwide who need to combine PDF documents online.
            </p>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Merge PDF Documents on Any Device
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ilovepdf.cc's PDF merger works seamlessly across all devices and platforms for ultimate flexibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-blue-500 text-white rounded-xl mb-4">
                <Monitor className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Desktop PDF Merger</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Full-featured PDF merging on Windows, Mac, and Linux computers. Professional workflow support with advanced combining capabilities and multi-document handling.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-green-500 text-white rounded-xl mb-4">
                <Smartphone className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Mobile PDF Merger</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Touch-optimized PDF merging on smartphones and tablets. Combine PDF documents on iOS and Android devices with responsive interface and mobile-friendly controls.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 lg:w-16 h-14 lg:h-16 bg-purple-500 text-white rounded-xl mb-4">
                <Globe className="h-6 lg:h-8 w-6 lg:w-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Browser-Based Merger</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                No downloads required. Works in Chrome, Firefox, Safari, Edge, and all modern browsers. Access the PDF merger instantly from any device with internet connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions of PDF Users Worldwide
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
            More than 10 million users worldwide rely on our PDF merger every month for document combining
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">10M+</div>
              <div className="text-gray-600 text-sm lg:text-base">Monthly PDF merges</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">500M+</div>
              <div className="text-gray-600 text-sm lg:text-base">Documents combined</div>
            </div>
            <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
              <div className="text-2xl lg:text-4xl font-bold text-red-500 mb-2">99.9%</div>
              <div className="text-gray-600 text-sm lg:text-base">Merge success rate</div>
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
                <Edit3 className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Edit PDF Text</h3>
              <p className="text-gray-600 text-sm mb-4">Modify PDF content directly in your browser with professional editing tools.</p>
              <Link to="/tools/edit-pdf" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Edit PDFs →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-green-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Compress PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Reduce PDF file size while maintaining quality for easy sharing and storage.</p>
              <Link to="/tools/compress" className="text-green-600 hover:text-green-700 font-medium text-sm">
                Compress PDFs →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 lg:w-14 h-12 lg:h-14 bg-purple-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Layers className="h-6 lg:h-7 w-6 lg:w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Split PDF</h3>
              <p className="text-gray-600 text-sm mb-4">Extract specific pages or split PDF documents into separate files easily.</p>
              <Link to="/tools/split" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Split PDFs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
            Ready to Merge Your PDF Documents?
          </h2>
          <p className="text-lg lg:text-xl text-red-100 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Experience professional PDF merging with ilovepdf.cc's advanced online combiner. Merge multiple documents instantly with secure processing and perfect quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/pdf-to-jpg"
              className="bg-white text-red-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <ImageIcon className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              Convert PDF to Images
            </Link>
            <Link
              to="/tools/edit-pdf"
              className="border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200 text-sm lg:text-lg inline-flex items-center justify-center"
            >
              <Edit3 className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
              Edit PDF Documents
            </Link>
          </div>
          <p className="text-red-100 mt-4 lg:mt-6 text-sm">
            Free PDF merging tools • No registration required • Secure processing on ilovepdf.cc
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
                Professional PDF merging tools and document combiners. All tools are 100% FREE and designed for professional use.
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
                <li><Link to="/tools/merge" className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Compress PDF</Link></li>
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

            {/* Organize */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">ORGANIZE</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/rotate" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Rotate PDF</Link></li>
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
              © 2024 ilovepdf.cc. Professional PDF Merger. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PDF merging professionals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MergePdfPage