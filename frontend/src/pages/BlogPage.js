"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ChevronDown, Heart, Calendar, User, ArrowRight, Search, Tag, Clock } from "lucide-react"

function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)
  const [allToolsDropdownOpen, setAllToolsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

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

  const categories = [
    { id: "all", name: "All Posts", count: 24 },
    { id: "tutorials", name: "Tutorials", count: 8 },
    { id: "tips", name: "Tips & Tricks", count: 6 },
    { id: "updates", name: "Product Updates", count: 4 },
    { id: "business", name: "Business", count: 3 },
    { id: "security", name: "Security", count: 3 },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential PDF Tips Every Professional Should Know",
      excerpt: "Discover powerful PDF techniques that will save you time and improve your document workflow.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "tips",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      id: 2,
      title: "How to Convert PDF to Word Without Losing Formatting",
      excerpt: "Learn the best practices for maintaining document structure when converting PDFs to Word documents.",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "tutorials",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "New Feature: Batch PDF Processing Now Available",
      excerpt: "Process multiple PDF files simultaneously with our new batch processing feature.",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      readTime: "3 min read",
      category: "updates",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "PDF Security Best Practices for Businesses",
      excerpt: "Protect your sensitive documents with these essential PDF security measures.",
      author: "David Kim",
      date: "2024-01-08",
      readTime: "6 min read",
      category: "security",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "Streamlining Document Workflows in Remote Teams",
      excerpt: "How PDF tools can improve collaboration and productivity in distributed teams.",
      author: "Sarah Johnson",
      date: "2024-01-05",
      readTime: "8 min read",
      category: "business",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "The Complete Guide to PDF Compression",
      excerpt: "Everything you need to know about reducing PDF file sizes without compromising quality.",
      author: "Michael Chen",
      date: "2024-01-03",
      readTime: "10 min read",
      category: "tutorials",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

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
                  className="text-gray-700 hover:text-red-500 font-medium text-sm uppercase tracking-wider flex items-center"
                  onMouseEnter={() => setConvertDropdownOpen(true)}
                  onMouseLeave={() => setConvertDropdownOpen(false)}
                >
                  Convert PDF
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
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50"
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
                  All PDF tools
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button>

                {allToolsDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                    onMouseEnter={() => setAllToolsDropdownOpen(true)}
                    onMouseLeave={() => setAllToolsDropdownOpen(false)}
                  >
                    <div className="grid grid-cols-1 gap-0">
                      <Link
                        to="/tools/merge"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50"
                      >
                        Merge PDF
                      </Link>
                      <Link
                        to="/tools/split"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50"
                      >
                        Split PDF
                      </Link>
                      <Link
                        to="/tools/compress"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50"
                      >
                        Compress PDF
                      </Link>
                      <Link
                        to="/tools/pdf-to-word"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50"
                      >
                        PDF to Word
                      </Link>
                      <Link
                        to="/tools/pdf-to-jpg"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50"
                      >
                        PDF to JPG
                      </Link>
                      <Link
                        to="/tools/jpg-to-pdf"
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50"
                      >
                        JPG to PDF
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link to="/" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 font-medium">
                        View all tools →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-red-500 font-medium text-sm">Log in</button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium text-sm transition-colors">
                Sign up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                  to="/tools/split"
                  className="block text-gray-700 hover:text-red-500 font-medium text-sm uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Split PDF
                </Link>
                <Link
                  to="/blog"
                  className="block text-red-500 hover:text-red-600 font-medium text-sm uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
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

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">iLovePDF Blog</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Tips, tutorials, and insights to help you work more efficiently with PDF documents.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "all" && !searchQuery && (
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 text-white">
                  <div className="flex items-center mb-4">
                    <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-red-100 text-lg mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center text-red-100 text-sm mb-6">
                    <User className="h-4 w-4 mr-2" />
                    <span className="mr-4">{featuredPost.author}</span>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{new Date(featuredPost.date).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="relative">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.category === "tutorials"
                            ? "bg-blue-100 text-blue-800"
                            : post.category === "tips"
                              ? "bg-green-100 text-green-800"
                              : post.category === "updates"
                                ? "bg-purple-100 text-purple-800"
                                : post.category === "business"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <Tag className="inline h-3 w-3 mr-1" />
                        {categories.find((cat) => cat.id === post.category)?.name || post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <User className="h-4 w-4 mr-2" />
                      <span className="mr-4">{post.author}</span>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{post.readTime}</span>
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-red-500 hover:text-red-600 font-medium"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-red-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-red-100 mb-8">
            Get the latest PDF tips, tutorials, and product updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo & Description */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center mb-4">
                <span className="text-xl font-bold text-gray-900">iLove</span>
                <span className="text-xl font-bold text-red-500">PDF</span>
              </Link>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use!
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">FEATURES</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/tools/merge" className="text-gray-600 hover:text-red-500 transition-colors">
                    Merge PDF
                  </Link>
                </li>
                <li>
                  <Link to="/tools/split" className="text-gray-600 hover:text-red-500 transition-colors">
                    Split PDF
                  </Link>
                </li>
                <li>
                  <Link to="/tools/compress" className="text-gray-600 hover:text-red-500 transition-colors">
                    Compress PDF
                  </Link>
                </li>
              </ul>
            </div>

            {/* Convert */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">CONVERT</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/tools/word-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors">
                    Word to PDF
                  </Link>
                </li>
                <li>
                  <Link to="/tools/jpg-to-pdf" className="text-gray-600 hover:text-red-500 transition-colors">
                    JPG to PDF
                  </Link>
                </li>
                <li>
                  <Link to="/tools/pdf-to-jpg" className="text-gray-600 hover:text-red-500 transition-colors">
                    PDF to JPG
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">COMPANY</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-red-500 transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-600 hover:text-red-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-gray-600 hover:text-red-500 transition-colors">
                    Help
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-red-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">LEGAL</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-red-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-red-500 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2024 iLovePDF.com. Made with <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for PDF lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BlogPage
