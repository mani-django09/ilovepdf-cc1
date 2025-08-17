"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ChevronDown, FileText, Heart } from "lucide-react"

function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false)

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ilovepdf8</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
                Home
              </Link>

              {/* Convert Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setConvertDropdownOpen(!convertDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-cyan-600 font-medium transition-colors"
                >
                  Convert
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {convertDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {convertTools.map((tool) => (
                      <Link
                        key={tool.href}
                        to={tool.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                        onClick={() => setConvertDropdownOpen(false)}
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/merge-pdf" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
                Merge PDF
              </Link>
              <Link to="/split-pdf" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
                Split PDF
              </Link>
              <Link to="/compress-pdf" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
                Compress PDF
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/merge-pdf"
                  className="block px-4 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Merge PDF
                </Link>
                <Link
                  to="/split-pdf"
                  className="block px-4 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Split PDF
                </Link>
                <Link
                  to="/compress-pdf"
                  className="block px-4 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compress PDF
                </Link>

                {/* Mobile Convert Tools */}
                <div className="px-4 py-2">
                  <div className="text-sm font-semibold text-gray-900 mb-2">Convert Tools</div>
                  <div className="space-y-1 pl-4">
                    {convertTools.map((tool) => (
                      <Link
                        key={tool.href}
                        to={tool.href}
                        className="block py-1 text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ilovepdf8</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The most complete online PDF solution with all the tools you need to work with PDFs. 100% free, secure,
                and easy to use.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <span>Made with</span>
                <Heart className="h-4 w-4 mx-1 text-red-500" />
                <span>for PDF lovers worldwide</span>
              </div>
            </div>

            {/* PDF Tools */}
            <div>
              <h3 className="font-semibold mb-4">PDF Tools</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/merge-pdf" className="hover:text-white transition-colors">
                    Merge PDF
                  </Link>
                </li>
                <li>
                  <Link to="/split-pdf" className="hover:text-white transition-colors">
                    Split PDF
                  </Link>
                </li>
                <li>
                  <Link to="/compress-pdf" className="hover:text-white transition-colors">
                    Compress PDF
                  </Link>
                </li>
                <li>
                  <Link to="/edit-pdf" className="hover:text-white transition-colors">
                    Edit PDF
                  </Link>
                </li>
              </ul>
            </div>

            {/* Convert Tools */}
            <div>
              <h3 className="font-semibold mb-4">Convert</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/pdf-to-word" className="hover:text-white transition-colors">
                    PDF to Word
                  </Link>
                </li>
                <li>
                  <Link to="/pdf-to-jpg" className="hover:text-white transition-colors">
                    PDF to JPG
                  </Link>
                </li>
                <li>
                  <Link to="/word-to-pdf" className="hover:text-white transition-colors">
                    Word to PDF
                  </Link>
                </li>
                <li>
                  <Link to="/jpg-to-pdf" className="hover:text-white transition-colors">
                    JPG to PDF
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2025 ilovepdf8.com. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Click outside handler for dropdown */}
      {convertDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setConvertDropdownOpen(false)} />}
    </div>
  )
}

export default Layout
