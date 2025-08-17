import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async'
import HomePage from "./pages/HomePage"
import WordToPdfPage from "./pages/WordToPdfPage"
import PdfToWordConverter from './pages/PdfToWordConverter';
import MergePdfPage from './pages/MergePdfPage';
import JpgToPdfPage from './pages/JpgToPdfPage';
import PdfToJpgPage from './pages/PdfToJpgPage';
import CompressPdfPage from './pages/CompressPdfPage';
import WebpToPngPage from './pages/WebpToPngPage';
import PngToWebpPage from './pages/PngToWebpPage';
import PngToPdfPage from './pages/PngToPdfPage';
import PdfToPngPage from './pages/PdfToPngPage';
import AboutPage from './pages/AboutPage'
import BlogPage from "./pages/BlogPage"
import PrivacyPage from "./pages/PrivacyPage"
import TermsPage from "./pages/TermsPage"
import ContactPage from "./pages/ContactPage"
import EditPdfPage from './pages/EditPdfPage';
import PdfSplitPage from './pages/PdfSplitPage'
import SitemapPage from './pages/SitemapPage'
import "./index.css"

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/word-to-pdf" element={<WordToPdfPage />} />
            <Route path="/pdf-to-word" element={<PdfToWordConverter />} />
            <Route path="/merge-pdf" element={<MergePdfPage />} />
            <Route path="/jpg-to-pdf" element={<JpgToPdfPage />} />
            <Route path="/pdf-to-jpg" element={<PdfToJpgPage />} />
            <Route path="/compress-pdf" element={<CompressPdfPage />} />
            <Route path="/webp-to-png" element={<WebpToPngPage />} />
            <Route path="/png-to-webp" element={<PngToWebpPage />} />
            <Route path="/png-to-pdf" element={<PngToPdfPage />} />
            <Route path="/pdf-to-png" element={<PdfToPngPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/edit-pdf" element={<EditPdfPage />} />
            <Route path="/split-pdf/" element={<PdfSplitPage />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App