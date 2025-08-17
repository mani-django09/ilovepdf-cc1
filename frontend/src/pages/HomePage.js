"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import Layout from "../components/Layout"
import {
  Globe,
  Shield,
  Zap,
  Star,
  Clock,
  Users,
  Award,
  CheckCircle,
  Plus,
  Minus,
  ArrowRight,
  FileText,
  ImageIcon,
  Smartphone,
  Monitor,
} from "lucide-react"

const pdfTools = [
  {
    id: "merge",
    title: "Merge PDF",
    description:
      "Combine multiple PDF files into one document quickly. Perfect for creating reports, presentations, and documents.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        <path d="M16,11V13H14V15H12V13H10V11H12V9H14V11H16Z" />
      </svg>
    ),
    color: "bg-cyan-600",
    href: "/merge-pdf",
    keywords: "merge pdf online, combine pdf files, join pdf documents",
  },
  {
    id: "split",
    title: "Split PDF",
    description:
      "Extract specific pages or split PDF into multiple files. Ideal for separating chapters, sections, or individual pages.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H13V20H6V4H13V9H18V10H20V8L14,2Z" />
        <path d="M15,18V16H19V14L22,17L19,20V18H15Z" />
        <path d="M13,14V12H9V10L6,13L9,16V14H13Z" />
      </svg>
    ),
    color: "bg-emerald-500",
    href: "/split-pdf",
    keywords: "split pdf pages, extract pdf pages, divide pdf document",
  },
  {
    id: "compress",
    title: "Compress PDF",
    description:
      "Reduce PDF file size by up to 90% while maintaining excellent quality. Perfect for email attachments and storage.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        <path d="M8,12L10,14H9V17H11V14H10L8,12Z" />
        <path d="M16,10L14,8H15V5H13V8H14L16,10Z" />
      </svg>
    ),
    color: "bg-teal-500",
    href: "/compress-pdf",
    keywords: "compress pdf online, reduce pdf size, optimize pdf files",
  },
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description:
      "Convert PDF to editable Word documents with preserved formatting. Maintain layouts, fonts, and images perfectly.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-current">
          W
        </text>
      </svg>
    ),
    color: "bg-blue-600",
    href: "/pdf-to-word",
    keywords: "pdf to word converter, pdf to doc, pdf to docx online",
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description:
      "Transform Word documents into professional PDF files. Preserve formatting and ensure universal compatibility.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-current">
          W
        </text>
      </svg>
    ),
    color: "bg-indigo-600",
    href: "/word-to-pdf",
    keywords: "word to pdf converter, doc to pdf, docx to pdf online",
  },
  {
    id: "edit-pdf",
    title: "Edit PDF",
    description: "Add text, images, shapes, and annotations to PDF documents. Complete PDF editing solution online.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        <path d="M9,14L11,12L13,14L11,16L9,14Z" />
      </svg>
    ),
    color: "bg-purple-600",
    href: "/edit-pdf",
    isNew: true,
    keywords: "edit pdf online, pdf editor, add text to pdf",
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to high-quality JPG images. Extract images from PDFs or convert entire documents.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        <rect x="8" y="11" width="8" height="6" rx="1" />
        <circle cx="10" cy="13" r="1" />
      </svg>
    ),
    color: "bg-amber-500",
    href: "/pdf-to-jpg",
    keywords: "pdf to jpg converter, pdf to image, extract images from pdf",
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description:
      "Convert JPG images to PDF format with custom page sizes and orientations. Batch convert multiple images.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <rect x="4" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="8" cy="8" r="1" />
        <path d="M14,14L12,12L10,14" />
        <path d="M20,16V20A2,2 0 0,1 18,22H14V20H18V16H20Z" />
      </svg>
    ),
    color: "bg-orange-500",
    href: "/jpg-to-pdf",
    keywords: "jpg to pdf converter, image to pdf, photo to pdf online",
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG",
    description:
      "Convert PDF pages to PNG images with transparency support. Perfect for high-quality image extraction.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        <rect x="8" y="11" width="8" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="13" r="0.8" />
        <text x="16" y="22" className="text-xs font-bold fill-current">
          PNG
        </text>
      </svg>
    ),
    color: "bg-slate-600",
    href: "/pdf-to-png",
    keywords: "pdf to png converter, pdf to transparent image, extract png from pdf",
  },
  {
    id: "png-to-pdf",
    title: "PNG to PDF",
    description:
      "Convert PNG images to PDF format while preserving transparency and quality. Batch convert multiple PNGs.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <rect x="3" y="3" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="8" r="1.5" />
        <path d="M3 17l4-4 3 3 6-6 5 5" />
        <path d="M20,16V20A2,2 0 0,1 18,22H14V20H18V16H20Z" />
      </svg>
    ),
    color: "bg-rose-500",
    href: "/png-to-pdf",
    keywords: "png to pdf converter, image to pdf, convert transparent images to pdf",
  },
  {
    id: "webp-to-png",
    title: "WebP to PNG",
    description: "Convert modern WebP images to PNG format with transparency support and lossless quality.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <rect x="3" y="3" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="8" r="1.5" />
        <path d="M3 17l4-4 3 3 6-6 5 5" />
        <text x="19" y="20" className="text-xs font-bold fill-current">
          PNG
        </text>
      </svg>
    ),
    color: "bg-green-600",
    href: "/webp-to-png",
    keywords: "webp to png converter, convert webp images, webp decoder",
  },
  {
    id: "png-to-webp",
    title: "PNG to WebP",
    description: "Convert PNG images to WebP format for better web performance and smaller file sizes.",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <rect x="3" y="3" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="8" r="1.5" />
        <path d="M3 17l4-4 3 3 6-6 5 5" />
        <text x="18" y="20" className="text-xs font-bold fill-current">
          WebP
        </text>
      </svg>
    ),
    color: "bg-lime-600",
    href: "/png-to-webp",
    keywords: "png to webp converter, optimize images for web, reduce image size",
  },
]

// Enhanced FAQ data with long-tail keywords
const faqData = [
  {
    question: "How to merge multiple PDF files online for free at ilovepdf8.com?",
    answer:
      "To merge PDF files online for free, simply visit ilovepdf8.com and select the 'Merge PDF' tool. Upload your PDF files by clicking 'Select PDF files' or drag and drop them. Arrange the files in your desired order, then click 'Merge PDF' to combine them into a single document. The merged PDF will be ready for download in seconds.",
  },
  {
    question: "Is it safe to use online PDF tools on ilovepdf8.com?",
    answer:
      "Yes, ilovepdf8.com uses advanced SSL encryption to protect your files during upload and processing. All uploaded files are automatically deleted from our servers after 1 hour to ensure your privacy and security. We never store, share, or access your personal documents.",
  },

  {
    question: "How much can I compress a PDF file size online?",
    answer:
      "Our PDF compression tool can reduce file sizes by up to 90% while maintaining excellent quality. The compression ratio depends on your original file content - documents with many images typically achieve higher compression rates than text-only files.",
  },
  {
    question: "Can I use this PDF tools on mobile devices?",
    answer:
      "Absolutely! ilovepdf8.com is fully responsive and works perfectly on smartphones, tablets, and desktop computers. All our PDF tools are optimized for mobile use, allowing you to edit, convert, and manage PDFs on any device with an internet connection.",
  },

  {
    question: "Are there any file size limits for PDF processing?",
    answer:
      "Free users can upload files up to 25MB per file. For larger files or batch processing, consider our premium plans which offer increased file size limits and faster processing speeds.",
  },
]

const enhancedFeatures = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast Processing",
    description: "Process PDF files in seconds with our optimized cloud infrastructure. No waiting, no delays.",
    color: "bg-cyan-600",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Bank-Level Security",
    description: "SSL encryption protects your files. Auto-deletion after 1 hour ensures complete privacy.",
    color: "bg-emerald-500",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Universal Compatibility",
    description: "Works on any device, any browser, any operating system. No software installation needed.",
    color: "bg-blue-600",
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Premium Quality",
    description: "Advanced algorithms maintain original quality while optimizing file size and performance.",
    color: "bg-purple-600",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "24/7 Availability",
    description: "Access our PDF tools anytime, anywhere. Our servers are always ready to process your files.",
    color: "bg-indigo-600",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "10M+ Happy Users",
    description: "Trusted by millions worldwide. Join the largest community of PDF tool users.",
    color: "bg-teal-500",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Award-Winning Tools",
    description: "Industry-recognized PDF processing technology used by professionals globally.",
    color: "bg-amber-500",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Optimized",
    description: "Perfect mobile experience with touch-friendly interface and responsive design.",
    color: "bg-rose-500",
  },
]

function HomePage() {
  const location = useLocation()
  const canonicalUrl = `https://ilovepdf8.com${location.pathname}`
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  // Convert PDF tools for dropdown - updated with PNG tools
  const convertTools = [
    { title: "PDF to Word", href: "/pdf-to-word" },
    { title: "PDF to JPG", href: "/pdf-to-jpg" },
    { title: "PDF to PNG", href: "/pdf-to-png" },
    { title: "Word to PDF", href: "/word-to-pdf" },
    { title: "JPG to PDF", href: "/jpg-to-pdf" },
    { title: "PNG to PDF", href: "/png-to-pdf" },
    { title: "WebP to PNG", href: "/webp-to-png" },
    { title: "PNG to WebP", href: "/png-to-webp" },
  ]

  return (
    <Layout>
      <Helmet>
        <title>Free PDF Tools Online - Merge, Split, Compress PDF | ilovepdf8.com</title>
        <meta
          name="description"
          content="Free online PDF tools to merge, split, compress, convert, and edit PDF files. Fast, secure, and easy to use. No software installation required. Try ilovepdf8.com now!"
        />
        <meta
          name="keywords"
          content="pdf tools, merge pdf, split pdf, compress pdf, pdf to word, word to pdf, pdf converter, online pdf editor, png to pdf, pdf to png, ilovepdf8.com"
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.3),transparent_50%)]"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight font-sans">
            Every tool you need to work with
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text block">
              PDFs in one place
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            Every tool you need to use PDFs, at your fingertips. All tools are easy to us and 100% FREE! Can use Merge,
            split, compress, convert and edit PDFs with just a few clicks.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-cyan-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pdfTools.map((tool) => (
              <Link key={tool.id} to={tool.href} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 text-center relative border border-gray-100 min-h-[200px] flex flex-col hover:transform hover:scale-105 hover:-translate-y-2">
                  {tool.isNew && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                      New
                    </div>
                  )}

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl ${tool.color} text-white flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl`}
                    >
                      {tool.iconSvg}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300 mb-3 font-sans">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why people love using ilovepdf8.com</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-6 w-6 text-red-500 mr-2" />
                  Built for real work
                </h3>
                <p className="text-gray-600 mb-4">
                  Whether you're a student combining research papers or a business owner preparing reports, our tools
                  handle your PDFs without breaking a sweat.
                </p>
                <p className="text-gray-600">
                  We've designed everything to be fast and reliable. Upload your files, pick what you need to do, and
                  you're done in seconds.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ImageIcon className="h-6 w-6 text-green-500 mr-2" />
                  Images made simple
                </h3>
                <p className="text-gray-600 mb-4">
                  Convert images between formats like JPG, PNG, and WebP without losing quality. Perfect for when you
                  need the right format for your project.
                </p>
                <p className="text-gray-600">
                  Great for web designers who need to optimize images or anyone who just wants to convert a bunch of
                  photos quickly.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">What makes us different</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Works in your browser</h4>
                    <p className="text-gray-600 text-sm">
                      No downloads, no installations. Just open your browser and start working with your PDFs right
                      away.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Actually free</h4>
                    <p className="text-gray-600 text-sm">
                      Use our tools as much as you want. No hidden fees, no "premium" features locked away.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Handle multiple files</h4>
                    <p className="text-gray-600 text-sm">
                      Got a folder full of PDFs? Process them all at once instead of doing them one by one.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Fast processing</h4>
                    <p className="text-gray-600 text-sm">
                      Our servers do the heavy lifting so your computer doesn't have to. Even large files process
                      quickly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-cyan-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-sans">
              Frequently Asked Questions About ilovepdf8.com
            </h2>
            <p className="text-xl text-gray-600">Find answers to common questions about our PDF tools and services</p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <button
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-cyan-50 transition-colors duration-300"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-4 font-sans">{faq.question}</h3>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center transition-all duration-300 ${expandedFaq === index ? "bg-cyan-600 text-white rotate-180" : "text-cyan-600"}`}
                  >
                    {expandedFaq === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-8 pb-6 border-t border-cyan-100">
                    <p className="text-gray-600 leading-relaxed text-lg pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-sans">Trusted by Millions Worldwide</h2>
          <p className="text-base text-gray-600 mb-6">
            ilovepdf8.com has become the go-to platform for PDF processing globally
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="group hover:transform hover:scale-105 transition-all duration-500 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 shadow-lg hover:shadow-2xl">
              <div className="text-3xl font-bold text-cyan-600 mb-1">10M+</div>
              <div className="text-gray-700 font-semibold text-sm">Monthly Active Users</div>
              <div className="text-xs text-gray-500 mt-1">Growing daily</div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-500 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 shadow-lg hover:shadow-2xl">
              <div className="text-3xl font-bold text-emerald-600 mb-1">500M+</div>
              <div className="text-gray-700 font-semibold text-sm">Files Processed</div>
              <div className="text-xs text-gray-500 mt-1">Since launch</div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-500 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-lg hover:shadow-2xl">
              <div className="text-3xl font-bold text-blue-600 mb-1">15+</div>
              <div className="text-gray-700 font-semibold text-sm">PDF Tools Available</div>
              <div className="text-xs text-gray-500 mt-1">And growing</div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-500 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 shadow-lg hover:shadow-2xl">
              <div className="text-3xl font-bold text-purple-600 mb-1">170+</div>
              <div className="text-gray-700 font-semibold text-sm">Countries Served</div>
              <div className="text-xs text-gray-500 mt-1">Worldwide reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="bg-gradient-to-br from-cyan-50 to-emerald-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-sans">Works on Every Device</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ilovepdf8.com is fully responsive and optimized for all devices. Process PDFs anywhere, anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-lg mb-4">
                <Monitor className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Desktop & Laptop</h3>
              <p className="text-gray-600">
                Full-featured experience on Windows, Mac, and Linux. Perfect for heavy-duty PDF processing tasks.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-lg mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile & Tablet</h3>
              <p className="text-gray-600">
                Touch-optimized interface for iOS and Android. Process PDFs on the go with the same powerful tools.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-lg mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Any Browser</h3>
              <p className="text-gray-600">
                Works with Chrome, Firefox, Safari, Edge, and more. No plugins or extensions required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-cyan-600 via-blue-600 to-emerald-600 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-sans">Start Processing Your PDFs Now</h2>
          <p className="text-lg text-cyan-100 mb-8 leading-relaxed">
            Join millions of users who trust ilovepdf8.com for their PDF processing needs. Get started today with our
            free, easy-to-use tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools"
              className="bg-white text-cyan-600 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse All Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/merge-pdf"
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start with Merge PDF
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ilovepdf8.com - Free PDF Tools Online",
          description:
            "Free online PDF tools to merge, split, compress, convert, and edit PDF files. Fast, secure, and easy to use PDF processing.",
          url: "https://ilovepdf8.com",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "150000",
          },
          creator: {
            "@type": "Organization",
            name: "ilovepdf8.com",
            url: "https://ilovepdf8.com",
          },
        })}
      </script>
    </Layout>
  )
}

export default HomePage
