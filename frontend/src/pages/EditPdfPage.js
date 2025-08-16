// Enhanced EditPdfPage.js with SEO content similar to PdfToJpgPage
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import {
  Upload, Download, AlertCircle, Loader, X, Menu, ImageIcon, FileText, Heart,
  Type, PenTool, Square, Circle, Edit, Stamp, StickyNote, Save, Undo, Redo,
  MousePointer, Bold, Italic, ZoomIn, ZoomOut, ChevronLeft, ChevronRight,
  Edit3, Trash2, RefreshCw, Check, XCircle, Info, BookOpen, Star, Shield,
  Zap, Globe, ChevronDown, ChevronUp, Eye, Award, Sparkles, Monitor,
  Smartphone, Camera, Settings, Layers, ArrowRight, Plus
} from "lucide-react"

function EditPdfPage() {
  // All existing state management (keeping unchanged)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfDocument, setPdfDocument] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [sessionId, setSessionId] = useState(null)
  const [expandedFaq, setExpandedFaq] = useState(null)
  
  // Text editing states
  const [textItems, setTextItems] = useState([])
  const [editableTexts, setEditableTexts] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingTextId, setEditingTextId] = useState(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [downloadReady, setDownloadReady] = useState(false)
  
  // Refs
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)
  const textLayerRef = useRef(null)
  const containerRef = useRef(null)

  const API_BASE = process.env.NODE_ENV === "development" 
    ? "http://localhost:5000"
    : window.location.origin

  // Tool navigation arrays for dropdowns
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

  // Enhanced FAQ with PDF editing focus
  const faqData = [
    {
      question: "How to edit PDF text online free with ilovepdf8.com PDF editor?",
      answer: "ilovepdf8.com provides the most intuitive online PDF editor for editing text directly in your browser. Simply upload your PDF file, click 'Enable Text Editing' mode, then click on any existing text to edit it in-place. Our advanced PDF editor preserves original formatting while allowing you to modify content instantly. No software installation required - just open, edit, and save your PDF documents online."
    },
    
    {
      question: "Is the online PDF editor safe and secure for sensitive documents?",
      answer: "Absolutely! ilovepdf8.com's PDF editor uses enterprise-grade SSL encryption to protect your documents during editing. All PDF files are processed securely in the cloud and automatically deleted after 1 hour. We never store, access, or share your documents, ensuring complete privacy for your sensitive PDF content while you edit text and make modifications."
    },
    
    {
      question: "How do I save and download my edited PDF documents?",
      answer: "After editing your PDF text, click the 'Save Changes' button to process your modifications. The PDF editor will generate a new document with your edits applied while maintaining original quality. Once processing is complete, download your edited PDF instantly. The saved file includes all your text modifications in a clean, professional format."
    },
    {
      question: "What devices support ilovepdf8.com's online PDF editor?",
      answer: "Our PDF editor works on all devices including Windows computers, Mac laptops, Android phones, iPhones, iPads, and tablets. The responsive PDF editor interface adapts to any screen size, making it easy to edit PDF text on desktop computers or mobile devices. All you need is a modern web browser - Chrome, Firefox, Safari, or Edge."
    },
    
    {
      question: "Do I need to install software to use the PDF editor?",
      answer: "No software installation required! ilovepdf8.com's PDF editor runs entirely in your web browser, providing full text editing capabilities without downloading or installing any programs. This cloud-based PDF editor offers the same functionality as desktop software while being accessible anywhere with an internet connection."
    }
  ]

  // PDF editing benefits for features section
  const editingFeatures = [
    {
      icon: <Edit3 className="h-8 w-8" />,
      title: "Direct Text Editing",
      description: "Click on any text in your PDF to edit it directly. Our advanced PDF editor preserves fonts and formatting while allowing real-time modifications.",
      color: "blue"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Document Integrity",
      description: "Maintain original PDF structure and layout while editing. The editor preserves page formatting, fonts, and positioning for professional results.",
      color: "green"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Processing",
      description: "Enterprise-grade encryption protects your documents during editing. All files are automatically deleted after processing for complete privacy.",
      color: "purple"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Editing",
      description: "Fast cloud processing enables real-time text editing without delays. Make changes instantly and see results immediately in the PDF editor.",
      color: "orange"
    }
  ]

  // Enhanced editing capabilities
  const editingCapabilities = [
    {
      icon: <Type className="h-7 w-7" />,
      title: "Text Modification",
      description: "Edit existing text content, fix typos, update information, and modify document text while preserving formatting."
    },
    {
      icon: <Settings className="h-7 w-7" />,
      title: "Formatting Preservation",
      description: "Maintain original fonts, sizes, colors, and positioning when editing PDF text for professional consistency."
    },
    {
      icon: <Layers className="h-7 w-7" />,
      title: "Multi-Page Support",
      description: "Edit text across multiple pages with seamless navigation and consistent editing experience throughout your PDF."
    }
  ]

  // PDF editing use cases
  const useCases = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Business Documents",
      description: "Edit contracts, reports, proposals, and business documents with precision while maintaining professional formatting.",
      color: "blue"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Academic Papers",
      description: "Modify research papers, essays, theses, and educational materials using our intuitive PDF editor interface.",
      color: "green"
    },
    {
      icon: <Edit className="h-5 w-5" />,
      title: "Form Editing",
      description: "Update forms, applications, and administrative documents quickly without recreating the entire PDF file.",
      color: "purple"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Legal Documents",
      description: "Make precise edits to legal documents, agreements, and official papers while maintaining document integrity.",
      color: "orange"
    }
  ]

  // All existing functions remain unchanged - keeping the complete functionality
  useEffect(() => {
    const initializePdfJs = async () => {
      try {
        if (window.pdfjsLib) return

        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
        
        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })

        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
        console.log('✅ PDF.js initialized')
      } catch (error) {
        console.error('❌ Failed to initialize PDF.js:', error)
        setError('Failed to load PDF library')
      }
    }

    initializePdfJs()
  }, [])

  useEffect(() => {
    const testServerConnection = async () => {
      try {
        console.log(`🔍 Testing server connection to: ${API_BASE}/api/health`)
        const response = await fetch(`${API_BASE}/api/health`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const result = await response.json()
          console.log('✅ Server connection successful:', result)
        } else {
          console.warn('⚠️ Server health check failed:', response.status)
        }
      } catch (error) {
        console.warn('⚠️ Server connection test failed:', error.message)
      }
    }

    testServerConnection()
  }, [API_BASE])

  const renderPageWithTextExtraction = useCallback(async (pageNumber) => {
    if (!pdfDocument || !canvasRef.current) return

    try {
      setIsLoading(true)
      
      const page = await pdfDocument.getPage(pageNumber)
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      const viewport = page.getViewport({ scale: zoomLevel })
      
      canvas.width = viewport.width
      canvas.height = viewport.height
      canvas.style.width = viewport.width + "px"
      canvas.style.height = viewport.height + "px"

      setCanvasSize({ width: viewport.width, height: viewport.height })

      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvas.width, canvas.height)

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise

      const textContent = await page.getTextContent()
      const extractedItems = []

      textContent.items.forEach((item, index) => {
        if (item.str && item.str.trim()) {
          const transform = item.transform
          const x = transform[4]
          const y = viewport.height - transform[5] - Math.abs(transform[3])
          const fontSize = Math.abs(transform[3]) || 12
          const width = item.width || (item.str.length * fontSize * 0.6)
          const height = Math.abs(transform[3]) || fontSize

          const textItem = {
            id: `text_${pageNumber}_${index}`,
            content: item.str.trim(),
            x: x,
            y: y,
            width: width,
            height: height,
            fontSize: fontSize,
            fontName: item.fontName || 'Arial',
            pageNumber: pageNumber,
            isOriginal: true,
            originalTransform: transform
          }
          
          extractedItems.push(textItem)
        }
      })

      setTextItems(extractedItems)
      console.log(`✅ Extracted ${extractedItems.length} text items`)

    } catch (error) {
      console.error('❌ Error rendering page:', error)
      setError(`Failed to render page ${pageNumber}`)
    } finally {
      setIsLoading(false)
    }
  }, [pdfDocument, zoomLevel])

  const loadPdfDocument = async (file) => {
    if (!window.pdfjsLib) {
      throw new Error("PDF.js not loaded")
    }

    try {
      const arrayBuffer = await file.arrayBuffer()
      const loadingTask = window.pdfjsLib.getDocument({
        data: arrayBuffer,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true,
      })

      const pdf = await loadingTask.promise
      setPdfDocument(pdf)
      setTotalPages(pdf.numPages)
      setCurrentPage(1)
      
      console.log(`✅ PDF loaded: ${pdf.numPages} pages`)
      return pdf
    } catch (error) {
      console.error('❌ PDF loading error:', error)
      throw new Error('Failed to load PDF')
    }
  }

  useEffect(() => {
    if (pdfDocument && canvasRef.current) {
      renderPageWithTextExtraction(currentPage)
    }
  }, [pdfDocument, currentPage, renderPageWithTextExtraction])

  const handleFileSelect = (selectedFile) => {
    const file = selectedFile[0]
    if (!file) return

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file")
      return
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("PDF file must be less than 100MB")
      return
    }

    setError("")
    setPdfFile(file)
    loadPdfFile(file)
  }

  const loadPdfFile = async (file) => {
    setIsLoading(true)
    setError("")
    setSessionId(null)

    try {
      await loadPdfDocument(file)
      setIsEditing(true)

      try {
        const formData = new FormData()
        formData.append("file", file)
        
        console.log(`📤 Uploading PDF to server: ${API_BASE}/api/load-pdf`)
        
        const response = await fetch(`${API_BASE}/api/load-pdf`, {
          method: "POST",
          body: formData,
        })
        
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.sessionId) {
            setSessionId(result.sessionId)
            console.log('✅ PDF uploaded to server successfully, session:', result.sessionId)
          } else {
            throw new Error(result.error || 'Invalid server response')
          }
        } else {
          const errorData = await response.json()
          console.warn("❌ Server upload failed:", errorData)
          throw new Error(errorData.error || `Server error: ${response.status}`)
        }
      } catch (serverError) {
        console.warn("❌ Server upload failed, continuing in local mode:", serverError.message)
        setError(`Warning: Server connection failed. You can edit text but saving is disabled.`)
      }
    } catch (error) {
      console.error("❌ PDF loading failed:", error)
      setError(error.message)
      setIsEditing(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
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

  const toggleEditMode = () => {
    const newEditMode = !isEditMode
    setIsEditMode(newEditMode)
    setEditingTextId(null)
    console.log(`Edit mode ${newEditMode ? 'ENABLED' : 'DISABLED'}`)
  }

  const handleTextClick = (textItem, event) => {
    if (!isEditMode) return
    
    event.stopPropagation()
    console.log('🎯 Text clicked for direct editing:', textItem.content)
    
    if (editingTextId === textItem.id) return
    
    const existingEditable = editableTexts.find(et => et.originalId === textItem.id)
    if (!existingEditable) {
      const editableText = {
        id: `editable_${textItem.id}`,
        originalId: textItem.id,
        content: textItem.content,
        x: textItem.x,
        y: textItem.y,
        width: Math.max(textItem.width, textItem.content.length * (textItem.fontSize * 0.6)),
        height: Math.max(textItem.height, textItem.fontSize + 4),
        fontSize: textItem.fontSize,
        fontName: textItem.fontName,
        pageNumber: textItem.pageNumber,
        isEditing: true,
        originalTextItem: textItem
      }
      
      setEditableTexts(prev => [...prev, editableText])
      console.log('✅ Created direct editable text:', editableText)
    }
    
    setEditingTextId(textItem.id)
  }

  const handleCanvasClick = (event) => {
    if (!isEditMode) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const clickedText = textItems.find(textItem => {
      if (textItem.pageNumber !== currentPage) return false
      return (
        x >= textItem.x && x <= textItem.x + textItem.width &&
        y >= textItem.y && y <= textItem.y + textItem.height
      )
    })

    if (clickedText) {
      handleTextClick(clickedText, event)
    }
  }

  const saveCursorPosition = (element) => {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(element)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      return preCaretRange.toString().length
    }
    return 0
  }

  const restoreCursorPosition = (element, position) => {
    const selection = window.getSelection()
    const range = document.createRange()
    
    let charIndex = 0
    let nodeStack = [element]
    let node
    let foundStart = false
    
    while (!foundStart && (node = nodeStack.pop())) {
      if (node.nodeType === Node.TEXT_NODE) {
        const nextCharIndex = charIndex + node.textContent.length
        if (position >= charIndex && position <= nextCharIndex) {
          range.setStart(node, position - charIndex)
          range.collapse(true)
          foundStart = true
        } else {
          charIndex = nextCharIndex
        }
      } else {
        let i = node.childNodes.length
        while (i--) {
          nodeStack.push(node.childNodes[i])
        }
      }
    }
    
    if (foundStart) {
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  const handleContentEditableChange = (textId, element) => {
    const cursorPosition = saveCursorPosition(element)
    const newContent = element.textContent || element.innerText || ''
    
    setEditableTexts(prev => prev.map(et => {
      if (et.originalId === textId) {
        const minWidth = Math.max(150, newContent.length * (et.fontSize * 0.6))
        const maxWidth = canvasSize.width - et.x - 20
        const finalWidth = Math.min(minWidth, maxWidth)
        
        return { 
          ...et, 
          content: newContent,
          width: finalWidth
        }
      }
      return et
    }))
    
    setDownloadReady(false)
    
    setTimeout(() => {
      restoreCursorPosition(element, cursorPosition)
    }, 0)
  }

  const finishEditing = (textId) => {
    setEditableTexts(prev => prev.map(et => 
      et.originalId === textId 
        ? { ...et, isEditing: false }
        : et
    ))
    setEditingTextId(null)
    setDownloadReady(false)
    console.log('✅ Direct editing finished for:', textId)
  }

  const cancelTextEdit = (textId) => {
    setEditableTexts(prev => prev.filter(et => et.originalId !== textId))
    setEditingTextId(null)
    console.log('❌ Text edit cancelled for:', textId)
  }

  const handleSaveChanges = async () => {
    if (!sessionId) {
      setError("Server connection required for saving. Please try uploading the PDF again.")
      return
    }

    if (editableTexts.length === 0) {
      setError("No changes to save. Please edit some text first.")
      return
    }

    setIsLoading(true)
    setError("")
    
    try {
      const elements = editableTexts.map(et => ({
        id: `element_${Date.now()}_${Math.random()}`,
        type: "text-replacement",
        pageNumber: et.pageNumber,
        x: Math.round(et.x),
        y: Math.round(et.y),
        width: Math.round(et.width),
        height: Math.round(Math.max(et.height, et.fontSize + 6)),
        content: et.content,
        fontSize: et.fontSize,
        fontName: et.fontName || 'Arial',
        color: "#000000",
        hasBackground: true,
        backgroundColor: "#FFFFFF",
        isReplacement: true,
        padding: 2
      }))

      console.log('📤 Sending elements to backend:', elements)

      const response = await fetch(`${API_BASE}/api/save-pdf`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          sessionId, 
          elements 
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.success) {
        window.pdfDownloadUrl = `${API_BASE}${result.downloadUrl}`
        window.pdfFileName = result.fileName
        
        setDownloadReady(true)
        setError("")
        
        console.log('✅ PDF saved successfully:', result)
        
      } else {
        throw new Error(result.error || result.message || "Failed to save PDF")
      }
    } catch (error) {
      console.error('❌ Save error:', error)
      const errorMsg = `Failed to save PDF: ${error.message}`
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!downloadReady || !window.pdfDownloadUrl) {
      setError("Please save your changes first before downloading.")
      return
    }

    try {
      console.log('📥 Starting download:', window.pdfDownloadUrl)
      
      const response = await fetch(window.pdfDownloadUrl, {
        method: 'HEAD'
      })
      
      if (!response.ok) {
        throw new Error(`Download failed: File not found (${response.status} ${response.statusText})`)
      }

      const link = document.createElement("a")
      link.href = window.pdfDownloadUrl
      link.download = window.pdfFileName || "edited-document.pdf"
      link.target = "_blank"
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      console.log('✅ Download initiated successfully')
      
    } catch (error) {
      console.error('❌ Download error:', error)
      setError(`Download failed: ${error.message}. The file might have expired. Please save your changes again.`)
      setDownloadReady(false)
    }
  }

  const retryServerConnection = async () => {
    if (!pdfFile) {
      setError("Please select a PDF file first.")
      return
    }
    
    console.log('🔄 Retrying server connection...')
    await loadPdfFile(pdfFile)
  }

  const startOver = () => {
    setPdfFile(null)
    setPdfDocument(null)
    setIsEditing(false)
    setTextItems([])
    setEditableTexts([])
    setError("")
    setSessionId(null)
    setCurrentPage(1)
    setTotalPages(1)
    setZoomLevel(1.0)
    setIsEditMode(false)
    setEditingTextId(null)
    setDownloadReady(false)
    window.pdfDownloadUrl = null
    window.pdfFileName = null
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const currentPageTexts = textItems.filter(t => t.pageNumber === currentPage)
  const currentPageEditableTexts = editableTexts.filter(et => et.pageNumber === currentPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced SEO Meta Tags */}
       {typeof document !== 'undefined' && (
        <>
          {(() => {
            // Set document title properly
            document.title = "Edit PDF Online Free - PDF Text Editor | ilovepdf8.com"
            
            // Set meta tags
            const metaTags = [
              { name: "description", content: "Edit PDF documents online free with ilovepdf8.com PDF editor. Click to edit text directly in PDF files. Professional PDF editing tools with secure processing. No software required." },
              { name: "keywords", content: "pdf editor, edit pdf, online pdf editor, edit pdf text, pdf editing tool, modify pdf, pdf text editor, free pdf editor, ilovepdf8.com" },
              { name: "author", content: "ilovepdf8.com" },
              { name: "robots", content: "index, follow" },
              { name: "viewport", content: "width=device-width, initial-scale=1.0" },
              { property: "og:title", content: "Free Online PDF Editor - Edit PDF Text | ilovepdf8.com" },
              { property: "og:description", content: "Professional PDF editor for editing text in PDF documents online. Click to edit PDF text directly in your browser. Free, secure, and easy to use." },
              { property: "og:url", content: "https://ilovepdf8.com/tools/edit-pdf" },
              { property: "og:type", content: "website" },
              { property: "og:site_name", content: "ilovepdf8.com" },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Free Online PDF Editor | ilovepdf8.com" },
              { name: "twitter:description", content: "Edit PDF text online free. Professional PDF editor for modifying documents in your browser." }
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
            canonical.setAttribute('href', 'https://ilovepdf8.com/tools/edit-pdf')
          })()}
        </>
      )}

      {/* Enhanced Header with dropdowns */}
      <header className="bg-white shadow-sm border-b-2 border-gray-100// Enhanced EditPdfPage.js - Part 2 (Continuing from header)
      sticky top-0 z-40">
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
                className="text-red-500 hover:text-red-600 font-medium text-sm uppercase tracking-wider transition-colors duration-200"
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
                    <Link to="/tools/edit-pdf" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium transition-colors duration-200">Edit PDF</Link>
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
                  to="/tools/edit-pdf" 
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase transition-colors duration-200"
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
            Free Online PDF Editor - Edit PDF Text & Documents Instantly
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional PDF editor for editing text directly in your browser. Click on any text to edit PDF documents instantly. Secure, fast, and completely free online PDF editing tool.
          </p>
        </div>
      </section>

      {/* Main Content - Keep existing editor interface unchanged */}
      <div className="max-w-7xl mx-auto px-4 pb-8" ref={containerRef}>
        {!isEditing ? (
          /* Upload Section */
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 max-w-2xl mx-auto">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                isDragOver ? "border-red-400 bg-red-50 scale-105" : pdfFile ? "border-green-400 bg-green-50" : "border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => !isLoading && fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" onChange={handleFileInputChange} className="hidden" disabled={isLoading} />

              {isLoading ? (
                <div className="flex flex-col items-center">
                  <Loader className="h-12 w-12 text-red-500 animate-spin mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading PDF Editor...</h3>
                  <p className="text-gray-600">Extracting text and preparing PDF editor...</p>
                </div>
              ) : pdfFile ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Ready for Editing</h3>
                  <p className="text-gray-600 mb-2">{pdfFile.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(pdfFile.size)}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <FileText className="h-12 w-12 text-gray-400" />
                    <Edit3 className="h-4 w-4 text-red-500 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {isDragOver ? "Drop your PDF here" : "Select PDF for Text Editing"}
                  </h3>
                  <p className="text-gray-600 mb-4">Professional PDF editor • Edit text directly • Secure processing</p>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50" disabled={isLoading}>
                    Choose PDF File
                  </button>
                  <p className="text-xs text-gray-500 mt-3">Max 100MB • PDF format • Free online PDF editor</p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-700 font-medium mb-1">Notice</p>
                  <p className="text-red-600 text-sm">{error}</p>
                  {error.includes('Server connection failed') && pdfFile && (
                    <button 
                      onClick={retryServerConnection}
                      className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      🔄 Retry Server Connection
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* PDF Editor Interface - Keep existing layout */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Controls */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 truncate">{pdfFile?.name}</h3>
                  <button onClick={startOver} className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <p>{formatFileSize(pdfFile?.size || 0)}</p>
                  <p>{totalPages} page{totalPages !== 1 ? 's' : ''}</p>
                  <div className="flex items-center mt-2">
                    {sessionId ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-600 text-xs">Server connected</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-red-600 text-xs">Server not connected</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Edit Mode Toggle */}
                <button 
                  onClick={toggleEditMode}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all mb-4 ${
                    isEditMode 
                      ? "bg-green-500 text-white shadow-lg" 
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isEditMode ? (
                    <>
                      <Check className="h-4 w-4 mr-2 inline" />
                      PDF Edit Mode ON
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-2 inline" />
                      Enable PDF Editing
                    </>
                  )}
                </button>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button 
                    onClick={handleSaveChanges} 
                    disabled={isLoading || !sessionId || editableTexts.length === 0} 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Saving PDF...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save PDF Changes ({editableTexts.length})
                      </>
                    )}
                  </button>

                  <button 
                    onClick={handleDownload}
                    disabled={!downloadReady}
                    className={`w-full px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      downloadReady 
                        ? "bg-green-500 hover:bg-green-600 text-white" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Edited PDF
                  </button>
                </div>

                {/* Connection Status with Retry */}
                {!sessionId && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                      <span className="text-yellow-800 text-sm font-medium">Server Not Connected</span>
                    </div>
                    <p className="text-yellow-700 text-xs mb-3">PDF saving is disabled. Please retry connection.</p>
                    <button 
                      onClick={retryServerConnection}
                      disabled={isLoading}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="h-3 w-3 mr-1 animate-spin inline" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1 inline" />
                          Retry Connection
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Status */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Page:</span>
                    <span className="font-medium">{currentPage}/{totalPages}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Text Items:</span>
                    <span className="font-medium">{currentPageTexts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Modified:</span>
                    <span className="font-medium text-green-600">{editableTexts.length}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Instructions for PDF Editing */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center mb-3">
                  <BookOpen className="h-4 w-4 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-900">How to Edit PDF Text</h4>
                </div>
                <ol className="text-sm text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
                    <span>Click "Enable PDF Editing" button above</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
                    <span>Click directly on any text in the PDF to edit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
                    <span>Type your changes in the highlighted text area</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
                    <span>Click outside or press Escape to finish editing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">5</span>
                    <span>Save your PDF and download the edited document</span>
                  </li>
                </ol>
                <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-700">
                  <strong>PDF Editor Note:</strong> Only existing text can be edited. Original formatting is preserved during PDF editing.
                </div>
              </div>
            </div>

            {/* Main Editor Area - Keep existing interface unchanged */}
            <div className="lg:col-span-3">
              {/* Status Bar */}
              <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isEditMode 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {isEditMode ? "✅ PDF Edit Mode - Click any text to edit!" : "📄 PDF View Mode"}
                    </span>
                    {editableTexts.length > 0 && (
                      <span className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                        {editableTexts.length} text{editableTexts.length !== 1 ? 's' : ''} edited
                      </span>
                    )}
                    {sessionId ? (
                      <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        🟢 PDF Editor Connected
                      </span>
                    ) : (
                      <span className="text-sm text-red-600 bg-red-100 px-3 py-1 rounded-full">
                        🔴 PDF Editor Disconnected
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))} className="p-2 text-gray-600 hover:text-red-500 rounded-lg hover:bg-gray-50 transition-colors">
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-gray-600 font-mono px-2">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))} className="p-2 text-gray-600 hover:text-red-500 rounded-lg hover:bg-gray-50 transition-colors">
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* PDF Canvas Container - Keep existing editor functionality */}
              <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                <div className="flex justify-center">
                  <div
                    className="relative bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
                    style={{ maxWidth: "100%", display: "inline-block" }}
                  >
                    {/* PDF Canvas */}
                    <canvas
                      ref={canvasRef}
                      className={`block ${isEditMode ? 'cursor-text' : 'cursor-default'}`}
                      style={{ maxWidth: "100%", height: "auto" }}
                      onClick={handleCanvasClick}
                    />

                    {/* Show clickable text areas */}
                    {isEditMode && (
                      <div className="absolute top-0 left-0 pointer-events-none" style={{ zIndex: 5 }}>
                        {currentPageTexts.map((textItem) => {
                          const hasEditableVersion = editableTexts.some(et => et.originalId === textItem.id)
                          if (hasEditableVersion) return null
                          
                          return (
                            <div
                              key={textItem.id}
                              className="absolute border border-blue-300 bg-blue-50 bg-opacity-40 rounded hover:bg-opacity-60 transition-all"
                              style={{
                                left: textItem.x - 1,
                                top: textItem.y - 1,
                                width: textItem.width + 2,
                                height: textItem.height + 2,
                                pointerEvents: 'auto',
                                cursor: 'text'
                              }}
                              onClick={(e) => handleTextClick(textItem, e)}
                              title={`Click to edit: "${textItem.content}"`}
                            >
                              <div className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <span className="text-blue-600 text-xs font-bold">✏️</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* ContentEditable divs */}
                    <div className="absolute top-0 left-0" style={{ zIndex: 20 }}>
                      {currentPageEditableTexts.map((editableText) => (
                        <div
                          key={editableText.id}
                          className="absolute"
                          style={{
                            left: editableText.x,
                            top: editableText.y,
                            width: editableText.width,
                            height: editableText.height,
                          }}
                        >
                          {editableText.isEditing ? (
                            <div
                              contentEditable={true}
                              suppressContentEditableWarning={true}
                              className="w-full bg-yellow-200 border-2 border-yellow-500 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-600 rounded cursor-text shadow-lg"
                              style={{
                                fontSize: Math.min(editableText.fontSize, 16),
                                fontFamily: editableText.fontName,
                                minWidth: '80px',
                                minHeight: '20px',
                                maxWidth: `${canvasSize.width - editableText.x - 20}px`,
                                lineHeight: '1.2',
                                wordBreak: 'break-word',
                                overflow: 'hidden',
                                display: 'block'
                              }}
                              onInput={(e) => {
                                handleContentEditableChange(editableText.originalId, e.target)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                  e.preventDefault()
                                  finishEditing(editableText.originalId)
                                } else if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault()
                                  finishEditing(editableText.originalId)
                                }
                              }}
                              onBlur={() => {
                                setTimeout(() => {
                                  finishEditing(editableText.originalId)
                                }, 100)
                              }}
                              autoFocus
                              title="Type directly here - Press Escape or click outside to finish"
                              dangerouslySetInnerHTML={{ __html: editableText.content }}
                            />
                          ) : (
                            <div
                              className="bg-green-100 border-2 border-green-400 px-2 py-1 cursor-text shadow-md rounded relative"
                              style={{
                                fontSize: Math.min(editableText.fontSize, 16),
                                fontFamily: editableText.fontName,
                                minWidth: editableText.width,
                                minHeight: editableText.height,
                                maxWidth: `${canvasSize.width - editableText.x - 20}px`,
                                display: 'flex',
                                alignItems: 'center',
                                wordBreak: 'break-word',
                                overflow: 'hidden',
                                lineHeight: '1.2'
                              }}
                              onClick={(e) => {
                                e.stopPropagation()
                                setEditableTexts(prev => prev.map(et => 
                                  et.originalId === editableText.originalId 
                                    ? { ...et, isEditing: true }
                                    : et
                                ))
                                setEditingTextId(editableText.originalId)
                              }}
                              title="Click to edit this text again"
                            >
                              <span className="text-green-900 font-medium flex-1 truncate">
                                {editableText.content}
                              </span>
                              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                ✓
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Page Navigation */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    // Enhanced EditPdfPage.js - Part 3 (Final Section)
                    <span className="text-sm">Previous</span>
                  </button>
                  
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-600">Page</span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = Number.parseInt(e.target.value)
                        if (page >= 1 && page <= totalPages) {
                          setCurrentPage(page)
                        }
                      }}
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <span className="text-sm text-gray-600">of {totalPages}</span>
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <span className="text-sm">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug Info Panel - Only show in development */}
        {isEditing && process.env.NODE_ENV === "development" && (
          <div className="mt-4 bg-gray-100 rounded-lg p-4">
            <div className="text-sm text-gray-600">
              <strong>🐛 Debug Info - PDF Editor Status:</strong>
              <br />
              ✅ API Base URL: {API_BASE}
              <br />
              ✅ Session ID: {sessionId || 'Not connected'}
              <br />
              ✅ Text items found: {currentPageTexts.length}
              <br />
              ✅ PDF edit mode: {isEditMode ? 'ON (Click existing text only)' : 'OFF (Enable editing first)'}
              <br />
              ✅ Currently editing: {editingTextId || 'None'}
              <br />
              ✅ Editable texts: {editableTexts.length}
              <br />
              ✅ Canvas size: {canvasSize.width} x {canvasSize.height}
              <br />
              ✅ Zoom level: {Math.round(zoomLevel * 100)}%
              <br />
              ✅ Download ready: {downloadReady ? 'Yes' : 'No'}
            </div>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="fixed bottom-4 left-4 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-md z-50">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Notice</h4>
                <p className="text-sm">{error}</p>
                <button 
                  onClick={() => setError("")}
                  className="mt-2 text-xs underline hover:no-underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Download ready notification */}
        {downloadReady && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50">
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Edited PDF Ready for Download</span>
            </div>
          </div>
        )}

        {/* Help notification for PDF editing */}
        {isEditing && isEditMode && editableTexts.length === 0 && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-lg max-w-md z-50">
            <div className="flex items-center text-center">
              <Edit3 className="h-5 w-5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">PDF Edit Mode Active!</h4>
                <p className="text-sm">Click on any existing text (blue highlighted areas) to edit PDF content directly.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Features Section for PDF Editor */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ilovepdf8.com's Online PDF Editor?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional PDF editing capabilities with advanced text editing features for all your document modification needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {editingFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${feature.color}-500 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional PDF Editor Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {editingCapabilities.map((capability, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-red-500 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  {capability.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{capability.title}</h3>
                <p className="text-gray-600 text-sm">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use PDF Editor Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Edit PDF Documents Online with ilovepdf8.com
            </h2>
            <p className="text-lg text-gray-600">
              Professional PDF editing in 3 simple steps using our advanced online PDF editor
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Upload PDF Document</h3>
              <p className="text-gray-600 leading-relaxed">
                Select your PDF file for editing or drag and drop it into our secure online PDF editor. Supports files up to 100MB.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Edit3 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Edit PDF Text Directly</h3>
              <p className="text-gray-600 leading-relaxed">
                Enable edit mode and click on any text in your PDF to edit it directly. Our PDF editor preserves formatting while allowing modifications.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Save & Download</h3>
              <p className="text-gray-600 leading-relaxed">
                Save your PDF edits and download the modified document instantly. Your edited PDF maintains professional quality and formatting.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      {/* Enhanced FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About PDF Editing
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about editing PDF documents with ilovepdf8.com's online PDF editor
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

     

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Edit Your PDF Documents Online?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Experience professional PDF editing with ilovepdf8.com's advanced online editor. Edit text directly, maintain formatting, and download high-quality results instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/pdf-to-jpg"
              className="bg-white text-red-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg inline-flex items-center justify-center"
            >
              <ImageIcon className="h-5 w-5 mr-2" />
              Convert PDF to Images
            </Link>
            <Link
              to="/tools/merge"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200 text-lg inline-flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Merge PDF Files
            </Link>
          </div>
          <p className="text-red-100 mt-6 text-sm">
            Free PDF editing tools • No registration required • Secure processing on ilovepdf8.com
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
                Professional PDF editing tools and document converters. All tools are 100% FREE and designed for professional use.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">PDF TOOLS</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/edit-pdf" className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium">Edit PDF</Link></li>
                <li><Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Merge PDF</Link></li>
                <li><Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Split PDF</Link></li>
                <li><Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Compress PDF</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">CONVERT</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/pdf-to-jpg" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to JPG</Link></li>
                <li><Link to="/tools/pdf-to-png" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF to PNG</Link></li>
                <li><Link to="/tools/jpg-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">JPG to PDF</Link></li>
                <li><Link to="/tools/png-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PNG to PDF</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">EDITING</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/tools/edit-pdf" className="text-gray-600 hover:text-red-500 transition-colors duration-200">PDF Text Editor</Link></li>
                <li><Link to="/tools/watermark" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Watermark PDF</Link></li>
                <li><Link to="/tools/rotate" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Rotate PDF</Link></li>
                <li><Link to="/tools/unlock" className="text-gray-600 hover:text-red-500 transition-colors duration-200">Unlock PDF</Link></li>
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
              © 2024 ilovepdf8.com. Professional PDF Editor. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PDF editing professionals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default EditPdfPage