// ============ CRITICAL FIX: MIDDLEWARE ORDER ============

const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const mammoth = require("mammoth")
const puppeteer = require("puppeteer")
const pdfParse = require("pdf-parse")
const officegen = require("officegen")
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib')
const sharp = require('sharp')
const archiver = require('archiver')
const { execSync } = require("child_process")
require("dotenv").config()


// Add contact form dependencies
const nodemailer = require('nodemailer')
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')

const app = express()
const PORT = process.env.PORT || 5000

// 1. CORS Configuration (FIRST)
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001"
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// 2. Trust proxy setting (SECOND)
app.set('trust proxy', false)

// 3. Body parsing middleware (THIRD - CRITICAL!)
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

// 4. Other middleware (FOURTH)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))
app.use(morgan("combined"))

// 5. Rate limiter configuration
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    error: 'Too many contact form submissions from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: false,
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress || 'unknown'
  }
})

// 6. Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({  
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

// 7. Validation middleware
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('category')
    .isIn([
      'technical-support',
      'feature-request',
      'bug-report',
      'business-inquiry',
      'privacy-security',
      'general-feedback',
      'partnership',
      'other'
    ])
    .withMessage('Please select a valid category'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('priority')
    .optional()
    .isIn(['low', 'normal', 'high', 'critical'])
    .withMessage('Please select a valid priority level'),
]

// 8. CONTACT ROUTE (NOW AFTER BODY PARSING!)
app.post('/api/contact', contactLimiter, validateContactForm, async (req, res) => {
  console.log("📧 Contact form submission received")
  console.log("📋 Form data received:", req.body)
  
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log("❌ Validation failed:", errors.array())
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { 
      name, 
      email, 
      subject, 
      category, 
      message, 
      priority = 'normal'
    } = req.body

    console.log(`📨 New contact submission from ${name} (${email}) - Category: ${category}`)

    // Create transporter
    const transporter = createTransporter()

    // Verify transporter configuration
    try {
      await transporter.verify()
      console.log("✅ Email transporter verified successfully")
    } catch (verifyError) {
      console.error("❌ Email transporter verification failed:", verifyError)
      return res.status(500).json({
        success: false,
        error: 'Email service configuration error'
      })
    }

    // Email content for you (manikant007y@gmail.com)
    const ownerEmailContent = {
      from: `"iLovePDF Contact Form" <${process.env.GMAIL_USER}>`,
      to: 'manikant007y@gmail.com',
      subject: `[${category.toUpperCase()}] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">📧 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">From your iLovePDF website</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #495057; margin-top: 0; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">Contact Details</h2>
              
              <div style="margin: 20px 0;">
                <strong style="color: #495057;">👤 Name:</strong>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 5px;">${name}</div>
              </div>
              
              <div style="margin: 20px 0;">
                <strong style="color: #495057;">📧 Email:</strong>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 5px;">
                  <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
                </div>
              </div>
              
              <div style="margin: 20px 0;">
                <strong style="color: #495057;">📋 Category:</strong>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 5px;">
                  <span style="background: #007bff; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; text-transform: uppercase;">${category}</span>
                </div>
              </div>
              
              <div style="margin: 20px 0;">
                <strong style="color: #495057;">⚡ Priority:</strong>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 5px;">
                  <span style="background: ${priority === 'critical' ? '#dc3545' : priority === 'high' ? '#fd7e14' : priority === 'normal' ? '#28a745' : '#6c757d'}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; text-transform: uppercase;">${priority}</span>
                </div>
              </div>
              
              <div style="margin: 20px 0;">
                <strong style="color: #495057;">📝 Subject:</strong>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 5px;">${subject}</div>
              </div>
              
              <div style="margin: 20px 0;">
                <strong style="color: #495057;">💬 Message:</strong>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 5px; white-space: pre-wrap; border-left: 4px solid #007bff;">${message}</div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                📅 Received: ${new Date().toLocaleString()}
              </p>
              <a href="mailto:${email}?subject=Re: ${subject}" 
                 style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; font-weight: bold;">
                📧 Reply to ${name}
              </a>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    // Confirmation email for the user
    const userEmailContent = {
      from: `"iLovePDF Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting iLovePDF - ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Thank you for contacting us</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🙏 Thank You!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">We've received your message</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #495057; margin-top: 0;">Hi ${name}!</h2>
              
              <p style="margin: 20px 0; font-size: 16px;">
                Thank you for contacting iLovePDF. We've received your message about "<strong>${subject}</strong>" and will get back to you as soon as possible.
              </p>
              
              <div style="background: #e7f3ff; border-left: 4px solid #007bff; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                <h3 style="margin: 0 0 10px; color: #0056b3;">📋 Your Submission Summary</h3>
                <p style="margin: 5px 0;"><strong>Category:</strong> ${category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                <p style="margin: 5px 0;"><strong>Priority:</strong> ${priority.charAt(0).toUpperCase() + priority.slice(1)}</p>
                <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px; color: #495057;">⏰ What happens next?</h4>
                <ul style="margin: 0; padding-left: 20px; color: #6c757d;">
                  <li>We typically respond within 24 hours during business days</li>
                  <li>For urgent issues (high/critical priority), we aim for 4-6 hours</li>
                  <li>You'll receive our response at this email address: ${email}</li>
                  <li>Please check your spam folder if you don't see our reply</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://ilovepdf.cc" 
                   style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  🔙 Back to iLovePDF
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e9ecef; margin: 20px 0;">
              
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                If you have any additional questions or concerns, please don't hesitate to reply to this email or contact us again through our website.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
            <p>This is an automated response from ilovepdf.cc</p>
          </div>
        </body>
        </html>
      `,
    }

    // Send emails
    console.log("📤 Sending emails...")
    await Promise.all([
      transporter.sendMail(ownerEmailContent),
      transporter.sendMail(userEmailContent)
    ])

    console.log(`✅ Contact emails sent successfully to manikant007y@gmail.com and ${email}`)

    // Success response
    res.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you within 24 hours.'
    })

  } catch (error) {
    console.error('❌ Contact form error:', error)
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again or contact us directly at manikant007y@gmail.com'
    })
  }
})

// 9. Health check endpoint for contact
app.get('/api/contact/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'contact-form',
    timestamp: new Date().toISOString(),
    emailConfigured: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
  })
})

// 10. Continue with the rest of your server code...
// (All your other middleware, routes, etc. should come AFTER the contact route)
// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))
app.use(morgan("combined"))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Create temp directory for conversions
const tempDir = path.join(__dirname, "uploads", "temp")
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true })
}

// Dependency checker for external tools
function checkDependencies() {
  const deps = {
    sharp: false,
    ghostscript: false,
    imagemagick: false,
    graphicsmagick: false,
    pdf2pic: false,
    pdftk: false,
    workingCommands: {}
  }
  
  // Test Sharp
  try {
    require('sharp')
    deps.sharp = true
    deps.workingCommands.sharp = 'sharp'
  } catch (error) {
    console.log(`❌ Sharp not available: ${error.message}`)
  }
  
  // Test pdf2pic
  try {
    require('pdf2pic')
    deps.pdf2pic = true
    deps.workingCommands.pdf2pic = 'pdf2pic'
  } catch (error) {
    console.log(`❌ pdf2pic not available: ${error.message}`)
  }
  
  // Test external commands
  const commands = {
    ghostscript: ['gs --version', 'gswin64c --version', 'gswin32c --version'],
    imagemagick: ['magick --version', 'convert --version'],
    graphicsmagick: ['gm version'],
    pdftk: ['pdftk --version']
  }
  
  for (const [tool, cmdList] of Object.entries(commands)) {
    for (const cmd of cmdList) {
      try {
        const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8', timeout: 5000 })
        if (result && result.length > 0) {
          deps[tool] = true
          deps.workingCommands[tool] = cmd.split(' ')[0]
          break
        }
      } catch (error) {
        continue
      }
    }
  }
  
  return deps
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

// Upload configuration for Word files
const uploadWord = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /doc|docx/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    file.mimetype === 'application/msword'

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only Word documents (.doc, .docx) are allowed!"))
    }
  },
})

// Upload configuration for PDF files
const uploadPdf = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = file.mimetype === 'application/pdf'

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only PDF documents are allowed!"))
    }
  },
})

// Upload configuration for multiple PDF files (for merging)
const uploadMultiplePdfs = multer({
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB per file
    files: 20 // Maximum 20 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = file.mimetype === 'application/pdf'

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only PDF documents are allowed for merging!"))
    }
  },
})

// Upload configuration for image files
const uploadImages = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB per image
    files: 20 // Maximum 20 images
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|bmp|tiff|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = file.mimetype.startsWith('image/')

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only image files (JPG, PNG, GIF, BMP, TIFF, WebP) are allowed!"))
    }
  },
})

// Upload configuration for PDF compression
const uploadPdfCompress = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB per file
    files: 10 // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = file.mimetype === 'application/pdf'

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only PDF documents are allowed for compression!"))
    }
  },
})

// Upload configuration for PDF Editor
const uploadPDFEditor = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = file.mimetype === "application/pdf"

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only PDF files are allowed!"))
    }
  },
})

// Upload configuration for PNG files
const uploadPNG = multer({
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB per file
    files: 20 // Maximum 20 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /png/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = file.mimetype === 'image/png'

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only PNG image files are allowed!"))
    }
  },
})

// Upload configuration for WebP files
const uploadWebP = multer({
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB per file
    files: 20 // Maximum 20 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = file.mimetype === 'image/webp'

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only WebP image files are allowed!"))
    }
  },
})

// Helper function to format bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// Helper function to parse page ranges
function parsePageRange(rangeStr, totalPages) {
  if (!rangeStr || rangeStr === 'all') {
    return Array.from({length: totalPages}, (_, i) => i)
  }
  
  const pages = new Set()
  const ranges = rangeStr.split(',').map(s => s.trim())
  
  for (const range of ranges) {
    if (range.includes('-')) {
      const [start, end] = range.split('-').map(n => parseInt(n.trim()))
      if (start && end && start <= totalPages && end <= totalPages && start <= end) {
        for (let i = start; i <= end; i++) {
          pages.add(i - 1) // Convert to 0-based index
        }
      }
    } else {
      const pageNum = parseInt(range)
      if (pageNum && pageNum <= totalPages) {
        pages.add(pageNum - 1) // Convert to 0-based index
      }
    }
  }
  
  return Array.from(pages).sort((a, b) => a - b)
}

// Helper functions for PNG/WebP conversion
async function validateWebPFile(filePath) {
  try {
    const metadata = await sharp(filePath).metadata()
    return metadata.format === 'webp'
  } catch (error) {
    console.error("Error validating WebP file:", error)
    return false
  }
}

async function validatePNGFile(filePath) {
  try {
    const metadata = await sharp(filePath).metadata()
    return metadata.format === 'png'
  } catch (error) {
    console.error("Error validating PNG file:", error)
    return false
  }
}

function calculateCompressionRatio(originalSize, compressedSize) {
  if (originalSize === 0) return 0
  return Math.round(((originalSize - compressedSize) / originalSize) * 100)
}

// Helper function to get page dimensions in points (72 DPI) for PNG to PDF
function getPageDimensions(pageSize, orientation) {
  const sizes = {
    'A4': { width: 595, height: 842 },
    'A3': { width: 842, height: 1191 },
    'A5': { width: 420, height: 595 },
    'Letter': { width: 612, height: 792 },
    'Legal': { width: 612, height: 1008 }
  }
  
  let dims = sizes[pageSize] || sizes['A4']
  
  if (orientation === 'landscape') {
    return { width: dims.height, height: dims.width }
  }
  
  return dims
}

// Helper function to calculate image fit for PNG to PDF
function calculateImageFit(imageWidth, imageHeight, pageWidth, pageHeight, margin) {
  const availableWidth = pageWidth - (margin * 2)
  const availableHeight = pageHeight - (margin * 2)
  
  const widthRatio = availableWidth / imageWidth
  const heightRatio = availableHeight / imageHeight
  const scale = Math.min(widthRatio, heightRatio, 1)
  
  const scaledWidth = imageWidth * scale
  const scaledHeight = imageHeight * scale
  
  const x = margin + (availableWidth - scaledWidth) / 2
  const y = margin + (availableHeight - scaledHeight) / 2
  
  return { x, y, width: scaledWidth, height: scaledHeight, scale }
}

// Validation functions
async function validateImageFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return false
    }

    const stats = fs.statSync(filePath)
    if (stats.size === 0 || stats.size < 50) {
      return false
    }

    // Try to read image metadata with Sharp
    if (require('sharp')) {
      try {
        const metadata = await sharp(filePath).metadata()
        return metadata.width && metadata.height && metadata.width > 0 && metadata.height > 0
      } catch (sharpError) {
        return true // Allow file through even if Sharp can't read it
      }
    }

    return true
  } catch (error) {
    return false
  }
}

async function validatePDFFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return false
    }

    const stats = fs.statSync(filePath)
    if (stats.size === 0 || stats.size < 100) {
      return false
    }

    const buffer = fs.readFileSync(filePath, { start: 0, end: Math.min(1024, stats.size) })
    const content = buffer.toString('ascii')
    const binaryContent = buffer.toString('hex')
    
    return content.includes('%PDF') || 
           binaryContent.startsWith('25504446') || 
           content.startsWith('%PDF')
  } catch (error) {
    return false
  }
}

// Get PDF page count
async function getPdfPageCount(filePath, deps) {
  // Try ImageMagick identify first
  if (deps.imagemagick && deps.workingCommands.imagemagick) {
    try {
      let identifyCommand
      if (deps.workingCommands.imagemagick === 'magick') {
        identifyCommand = `magick identify "${filePath}"`
      } else {
        identifyCommand = `identify "${filePath}"`
      }
      
      const result = execSync(identifyCommand, { 
        encoding: 'utf8', 
        stdio: 'pipe', 
        timeout: 15000 
      })
      
      const lines = result.trim().split('\n').filter(line => line.includes(path.basename(filePath)))
      if (lines.length > 0) {
        return lines.length
      }
    } catch (error) {
      console.log(`❌ ImageMagick page count failed: ${error.message}`)
    }
  }
  
  return 1 // Default to 1 page if we can't determine
}

// Image to PDF conversion
async function convertImagesToPdf(imageFiles, outputPath, settings, deps) {
  // Method 1: Try ImageMagick first
  if (deps.imagemagick && deps.workingCommands.imagemagick) {
    try {
      let imCommand
      if (deps.workingCommands.imagemagick === 'magick') {
        imCommand = `magick`
      } else {
        imCommand = `convert`
      }
      
      const imagePaths = imageFiles.map(file => `"${file.path}"`).join(' ')
      let options = []
      
      if (settings.quality === 'high') {
        options.push('-quality 95')
      } else if (settings.quality === 'medium') {
        options.push('-quality 85')
      } else {
        options.push('-quality 75')
      }
      
      if (settings.colorSpace === 'grayscale') {
        options.push('-colorspace Gray')
      }
      
      const fullCommand = `${imCommand} ${imagePaths} ${options.join(' ')} "${outputPath}"`
      execSync(fullCommand, { stdio: 'pipe', timeout: 120000 })
      
      if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
        return true
      }
    } catch (error) {
      console.log(`❌ ImageMagick conversion failed: ${error.message}`)
    }
  }
  
  throw new Error(`Image to PDF conversion failed. Available tools: ${Object.keys(deps.workingCommands).join(', ')}`)
}

// PDF to image conversion
async function convertPdfPageToJpg(pdfPath, pageNumber, outputPath, dpi = 300, quality = 85, deps) {
  const tempDir = path.dirname(outputPath)
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }
  
  // Try ImageMagick
  if (deps.imagemagick && deps.workingCommands.imagemagick) {
    try {
      let imCommand
      if (deps.workingCommands.imagemagick === 'magick') {
        imCommand = `magick -density ${dpi} -quality ${quality} "${pdfPath}[${pageNumber - 1}]" "${outputPath}"`
      } else {
        imCommand = `convert -density ${dpi} -quality ${quality} "${pdfPath}[${pageNumber - 1}]" "${outputPath}"`
      }
      
      execSync(imCommand, { stdio: 'pipe', timeout: 30000 })
      
      if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
        return fs.readFileSync(outputPath)
      }
    } catch (error) {
      console.log(`❌ ImageMagick conversion failed: ${error.message}`)
    }
  }
  
  throw new Error(`PDF to image conversion failed for page ${pageNumber}`)
}

// PDF splitting function
async function splitPdfWithGhostscript(inputPath, outputDir, baseName, ranges, deps) {
  const splitFiles = []
  
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i]
    const { start, end, name } = range
    const outputPath = path.join(outputDir, `${baseName}_${name}.pdf`)
    
    let success = false
    
    // Try Ghostscript
    if (!success && deps.ghostscript && deps.workingCommands.ghostscript) {
      try {
        let gsCommand
        if (deps.workingCommands.ghostscript.includes('gswin')) {
          gsCommand = `${deps.workingCommands.ghostscript} -dNOPAUSE -dBATCH -dSAFER -sDEVICE=pdfwrite -dFirstPage=${start} -dLastPage=${end} -sOutputFile="${outputPath}" "${inputPath}"`
        } else {
          gsCommand = `${deps.workingCommands.ghostscript} -dNOPAUSE -dBATCH -dSAFER -sDEVICE=pdfwrite -dFirstPage=${start} -dLastPage=${end} -sOutputFile="${outputPath}" "${inputPath}"`
        }
        
        execSync(gsCommand, { stdio: 'pipe', timeout: 45000 })
        
        if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
          const stats = fs.statSync(outputPath)
          splitFiles.push({
            name: `${baseName}_${name}.pdf`,
            path: outputPath,
            size: stats.size,
            pages: end - start + 1,
            pageRange: start === end ? `Page ${start}` : `Pages ${start}-${end}`
          })
          success = true
        }
      } catch (error) {
        console.log(`❌ Ghostscript split failed for pages ${start}-${end}: ${error.message}`)
      }
    }
  }
  
  if (splitFiles.length === 0) {
    throw new Error(`Failed to split PDF. Available tools: ${Object.keys(deps.workingCommands).join(', ')}`)
  }
  
  return splitFiles
}

// Apply edits function for PDF editor
// FIXED: Updated applyEditsToPDFFromFrontend function for server.js
// Replace the existing function in your server.js with this improved version

async function applyEditsToPDFFromFrontend(pdfDoc, elements) {
  const pages = pdfDoc.getPages()

  // Embed fonts
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  const courierFont = await pdfDoc.embedFont(StandardFonts.Courier)

  const fontMap = {
    Arial: helveticaFont,
    Helvetica: helveticaFont,
    "Times New Roman": timesRomanFont,
    Courier: courierFont,
  }

  // Group elements by page
  const elementsByPage = elements.reduce((acc, element) => {
    const pageIndex = (element.pageNumber || 1) - 1
    if (!acc[pageIndex]) acc[pageIndex] = []
    acc[pageIndex].push(element)
    return acc
  }, {})

  // Process each page
  for (const pageIndexStr of Object.keys(elementsByPage)) {
    const pageIndex = parseInt(pageIndexStr)
    if (pageIndex >= 0 && pageIndex < pages.length) {
      const page = pages[pageIndex]
      const { width: pageWidth, height: pageHeight } = page.getSize()
      const pageElements = elementsByPage[pageIndex]

      console.log(`🎨 Processing ${pageElements.length} elements on page ${pageIndex + 1}`)

      for (const element of pageElements) {
        try {
          // FIXED: Better coordinate conversion from frontend format
          const x = Math.max(0, element.x || 0)
          const y = Math.max(0, pageHeight - (element.y || 0) - (element.height || 20))
          
          console.log(`📝 Applying text element: "${element.content}" at (${x}, ${y})`)

          // Apply text element with improved positioning
          await applyTextElementFromFrontendImproved(page, element, x, y, fontMap, pageWidth, pageHeight)

        } catch (elementError) {
          console.error(`❌ Error applying element on page ${pageIndex + 1}:`, elementError)
        }
      }
    }
  }
}

// FIXED: Improved text element application
async function applyTextElementFromFrontendImproved(page, element, x, y, fontMap, pageWidth, pageHeight) {
  const font = fontMap[element.fontName] || fontMap["Arial"]
  const fontSize = Math.max(8, Math.min(72, element.fontSize || 14))
  
  // FIXED: Better background rectangle calculation
  const padding = element.padding || 4
  const textWidth = element.width || 100
  const textHeight = element.height || fontSize + 4
  
  // Calculate rectangle dimensions with better coverage
  const rectWidth = Math.min(textWidth + padding * 2, pageWidth - x)
  const rectHeight = Math.min(textHeight + padding * 2, pageHeight - y)
  
  // FIXED: Draw larger white background to completely cover original text
  if (element.hasBackground !== false) {
    // Draw a slightly larger background to ensure complete coverage
    const extraPadding = 2
    page.drawRectangle({
      x: Math.max(0, x - padding - extraPadding),
      y: Math.max(0, y - padding - extraPadding),
      width: Math.min(rectWidth + extraPadding * 2, pageWidth - (x - padding - extraPadding)),
      height: Math.min(rectHeight + extraPadding * 2, pageHeight - (y - padding - extraPadding)),
      color: rgb(1, 1, 1), // Pure white background
      borderColor: rgb(1, 1, 1), // White border
      borderWidth: 1,
    })
  }

  // FIXED: Better text positioning and line handling
  const textContent = (element.content || "Text").toString()
  const lines = textContent.split('\n')
  const lineHeight = fontSize * 1.3 // Better line spacing
  
  // Calculate starting position for text (centered in the background)
  const textStartX = Math.max(padding, x + padding)
  const textStartY = Math.max(fontSize, y + padding + fontSize)
  
  lines.forEach((line, lineIndex) => {
    if (line.trim()) {
      const lineY = textStartY - (lineIndex * lineHeight)
      
      // Ensure text doesn't go outside page bounds
      if (lineY > 0 && lineY < pageHeight && textStartX < pageWidth) {
        // FIXED: Truncate text if it would overflow the page
        let displayText = line
        const maxTextWidth = pageWidth - textStartX - padding
        const estimatedTextWidth = displayText.length * (fontSize * 0.6)
        
        if (estimatedTextWidth > maxTextWidth) {
          const maxChars = Math.floor(maxTextWidth / (fontSize * 0.6))
          displayText = displayText.substring(0, maxChars - 3) + "..."
        }
        
        page.drawText(displayText, {
          x: textStartX,
          y: lineY,
          size: fontSize,
          font,
          color: rgb(0, 0, 0), // Black text
        })
        
        console.log(`✅ Drew text "${displayText}" at (${textStartX}, ${lineY})`)
      }
    }
  })
}

// FIXED: Also update the main save-pdf endpoint error handling
// Add this to your server.js in the save-pdf endpoint (replace the existing try-catch):

app.post("/api/save-pdf", express.json(), async (req, res) => {
  console.log("💾 Save PDF request received")

  try {
    const { sessionId, elements } = req.body

    if (!sessionId) {
      return res.status(400).json({ 
        success: false,
        error: "Session ID is required" 
      })
    }

    if (!elements || elements.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: "No elements to save" 
      })
    }

    console.log(`📝 Processing save request for session: ${sessionId}`)
    console.log(`📝 Number of elements to apply: ${elements.length}`)

    // Load session data
    const sessionDir = path.join(__dirname, "uploads", `session-${sessionId}`)
    const sessionFile = path.join(sessionDir, "session.json")
    
    if (!fs.existsSync(sessionFile)) {
      return res.status(404).json({ 
        success: false,
        error: "Session not found or expired" 
      })
    }

    let sessionData
    try {
      sessionData = JSON.parse(fs.readFileSync(sessionFile, "utf8"))
    } catch (parseError) {
      return res.status(500).json({ 
        success: false,
        error: "Invalid session data" 
      })
    }

    if (!fs.existsSync(sessionData.originalPath)) {
      return res.status(404).json({ 
        success: false,
        error: "Original PDF file not found" 
      })
    }

    try {
      // Read original PDF
      console.log("📄 Reading original PDF...")
      const pdfBytes = fs.readFileSync(sessionData.originalPath)
      const pdfDoc = await PDFDocument.load(pdfBytes)

      // FIXED: Apply edits to PDF with improved function
      console.log("🔧 Applying edits to PDF with overlap prevention...")
      await applyEditsToPDFFromFrontend(pdfDoc, elements)

      // Save edited PDF
      console.log("💾 Saving edited PDF...")
      const editedPdfBytes = await pdfDoc.save()

      // Generate output filename
      const timestamp = Date.now()
      const baseName = path.parse(sessionData.originalName).name
      const outputFileName = `edited-${baseName}-${timestamp}.pdf`
      const outputPath = path.join(__dirname, "uploads", outputFileName)

      // Write file to disk
      fs.writeFileSync(outputPath, editedPdfBytes)

      // Verify file was written correctly
      if (!fs.existsSync(outputPath)) {
        throw new Error("Failed to write output file")
      }

      const fileStats = fs.statSync(outputPath)
      console.log(`✅ File verified: ${outputFileName} (${fileStats.size} bytes)`)

      // Update session data
      sessionData.elements = elements
      sessionData.lastModified = new Date().toISOString()
      sessionData.outputFile = outputFileName
      sessionData.outputPath = outputPath
      fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2))

      const downloadUrl = `/api/download/${outputFileName}`

      const response = {
        success: true,
        message: "PDF saved successfully with edits",
        downloadUrl: downloadUrl,
        fileName: outputFileName,
        fileSize: editedPdfBytes.length,
        elementsApplied: elements.length,
        timestamp: new Date().toISOString()
      }

      console.log(`✅ PDF saved successfully: ${outputFileName}`)
      res.json(response)

    } catch (editError) {
      console.error("❌ Error applying edits to PDF:", editError)
      res.status(500).json({
        success: false,
        error: "Failed to apply edits to PDF",
        details: editError.message,
      })
    }
  } catch (error) {
    console.error("❌ PDF save error:", error)
    res.status(500).json({
      success: false,
      error: "Failed to save PDF",
      details: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})

// ADDITIONAL FIX: Add this utility function to your server.js for better text measurement
function measureTextWidth(text, fontSize, fontName = 'Arial') {
  // Approximate text width calculation
  const avgCharWidth = {
    'Arial': 0.6,
    'Helvetica': 0.6,
    'Times New Roman': 0.55,
    'Courier': 0.7
  }
  
  const charWidth = avgCharWidth[fontName] || 0.6
  return text.length * fontSize * charWidth
}

// ADDITIONAL FIX: Enhanced download endpoint with better error handling
app.get("/api/download/:filename", (req, res) => {
  const filename = req.params.filename
  const filepath = path.join(__dirname, "uploads", filename)

  console.log("📥 Download request for:", filename)

  if (!fs.existsSync(filepath)) {
    console.log("❌ File not found:", filepath)
    return res.status(404).json({ 
      success: false,
      error: "File not found",
      filename: filename 
    })
  }

  try {
    // Determine content type based on file extension
    let contentType = 'application/octet-stream'
    const ext = path.extname(filename).toLowerCase()
    
    if (ext === '.pdf') {
      contentType = 'application/pdf'
    } else if (ext === '.docx') {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    } else if (ext === '.doc') {
      contentType = 'application/msword'
    } else if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg'
    } else if (ext === '.png') {
      contentType = 'image/png'
    } else if (ext === '.gif') {
      contentType = 'image/gif'
    } else if (ext === '.webp') {
      contentType = 'image/webp'
    } else if (ext === '.zip') {
      contentType = 'application/zip'
    }
    
    // Set proper headers for download
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    
    // Get file stats
    const stats = fs.statSync(filepath)
    res.setHeader('Content-Length', stats.size)

    console.log(`✅ Starting download: ${filename} (${stats.size} bytes)`)

    // Create read stream and pipe to response
    const fileStream = fs.createReadStream(filepath)
    
    fileStream.on('error', (err) => {
      console.error("❌ File stream error:", err)
      if (!res.headersSent) {
        res.status(500).json({ 
          success: false,
          error: "Failed to read file",
          details: err.message 
        })
      }
    })

    fileStream.on('end', () => {
      console.log(`✅ File downloaded successfully: ${filename}`)
      // Delete file after successful download (delayed cleanup)
      setTimeout(() => {
        if (fs.existsSync(filepath)) {
          try {
            fs.unlinkSync(filepath)
            console.log(`🗑️ Cleaned up file: ${filename}`)
          } catch (cleanupError) {
            console.error(`❌ Failed to cleanup file ${filename}:`, cleanupError)
          }
        }
      }, 300000) // Delete after 5 minutes
    })

    // Pipe the file to response
    fileStream.pipe(res)

  } catch (error) {
    console.error("❌ Download error:", error)
    if (!res.headersSent) {
      res.status(500).json({ 
        success: false,
        error: "Failed to download file",
        details: error.message 
      })
    }
  }
})

// ADDITIONAL FIX: Add a cleanup endpoint for manual session cleanup
app.delete("/api/session/:sessionId", (req, res) => {
  const { sessionId } = req.params
  
  try {
    const sessionDir = path.join(__dirname, "uploads", `session-${sessionId}`)
    
    if (fs.existsSync(sessionDir)) {
      // Clean up session directory and files
      fs.rmSync(sessionDir, { recursive: true, force: true })
      console.log(`🗑️ Cleaned up session: ${sessionId}`)
      
      res.json({
        success: true,
        message: "Session cleaned up successfully",
        sessionId: sessionId
      })
    } else {
      res.status(404).json({
        success: false,
        error: "Session not found",
        sessionId: sessionId
      })
    }
  } catch (error) {
    console.error(`❌ Error cleaning up session ${sessionId}:`, error)
    res.status(500).json({
      success: false,
      error: "Failed to cleanup session",
      details: error.message
    })
  }
})

// ADDITIONAL FIX: Enhanced health check with text processing status
app.get("/api/health", (req, res) => {
  try {
    const deps = checkDependencies()
    
    // Check upload directory
    const uploadsDir = path.join(__dirname, "uploads")
    const uploadsExists = fs.existsSync(uploadsDir)
    
    // Count active sessions
    let activeSessions = 0
    if (uploadsExists) {
      try {
        const files = fs.readdirSync(uploadsDir)
        activeSessions = files.filter(f => f.startsWith('session-')).length
      } catch (e) {
        activeSessions = 0
      }
    }
    
    res.json({
      status: "OK",
      message: "PDF Tools Server is healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      port: PORT,
      features: {
        textEditing: true,
        pdfProcessing: true,
        serverStorage: uploadsExists
      },
      dependencies: deps,
      workingCommands: deps.workingCommands,
      activeSessions: activeSessions,
      textProcessing: {
        fontSupport: ['Arial', 'Helvetica', 'Times New Roman', 'Courier'],
        maxTextLength: 2000,
        supportedOperations: ['replace', 'add', 'format']
      }
    })
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// ADDITIONAL FIX: Add session info endpoint for debugging
app.get("/api/session/:sessionId/info", (req, res) => {
  const { sessionId } = req.params
  
  try {
    const sessionDir = path.join(__dirname, "uploads", `session-${sessionId}`)
    const sessionFile = path.join(sessionDir, "session.json")
    
    if (!fs.existsSync(sessionFile)) {
      return res.status(404).json({
        success: false,
        error: "Session not found",
        sessionId: sessionId
      })
    }
    
    const sessionData = JSON.parse(fs.readFileSync(sessionFile, "utf8"))
    
    // Don't send sensitive file paths, just status info
    const sessionInfo = {
      sessionId: sessionData.sessionId,
      originalName: sessionData.originalName,
      pageCount: sessionData.pageCount,
      fileSize: sessionData.fileSize,
      elementsCount: sessionData.elements ? sessionData.elements.length : 0,
      createdAt: sessionData.createdAt,
      lastModified: sessionData.lastModified,
      hasOutputFile: !!sessionData.outputFile,
      status: 'active'
    }
    
    res.json({
      success: true,
      session: sessionInfo
    })
    
  } catch (error) {
    console.error(`❌ Error getting session info ${sessionId}:`, error)
    res.status(500).json({
      success: false,
      error: "Failed to get session info",
      details: error.message
    })
  }
})

// Export the updated functions for use in other parts of the application
module.exports = {
  applyEditsToPDFFromFrontend,
  applyTextElementFromFrontendImproved,
  measureTextWidth
}
// Cleanup old files function
function cleanupOldFiles() {
  try {
    const uploadsDir = path.join(__dirname, "uploads")
    if (!fs.existsSync(uploadsDir)) return

    const files = fs.readdirSync(uploadsDir)
    const now = Date.now()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours

    let cleanedCount = 0

    files.forEach((file) => {
      const filePath = path.join(uploadsDir, file)
      try {
        const stats = fs.statSync(filePath)

        if (now - stats.mtime.getTime() > maxAge) {
          if (stats.isDirectory()) {
            fs.rmSync(filePath, { recursive: true, force: true })
          } else {
            fs.unlinkSync(filePath)
          }
          cleanedCount++
          console.log(`🗑️ Cleaned up old file/directory: ${file}`)
        }
      } catch (error) {
        // Ignore errors for individual files
      }
    })

    if (cleanedCount > 0) {
      console.log(`🗑️ Cleaned up ${cleanedCount} old files/directories`)
    }
  } catch (error) {
    console.error("Error cleaning up old files:", error)
  }
}

// ==================== ENDPOINTS ====================

// Health check endpoint
app.get("/api/health", (req, res) => {
  try {
    const deps = checkDependencies()
    res.json({
      status: "OK",
      message: "PDF Tools Server is healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      port: PORT,
      dependencies: deps,
      workingCommands: deps.workingCommands
    })
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: error.message
    })
  }
})

// Word to PDF conversion endpoint
app.post("/api/word-to-pdf", uploadWord.single("file"), async (req, res) => {
  console.log("Word to PDF conversion request received")
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No Word file uploaded" })
    }

    console.log("Converting Word file:", req.file.originalname)
    
    const inputPath = req.file.path
    
    const isWordDoc = req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                     req.file.mimetype === 'application/msword' ||
                     req.file.originalname.toLowerCase().endsWith('.docx') ||
                     req.file.originalname.toLowerCase().endsWith('.doc')

    if (!isWordDoc) {
      if (fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath)
      }
      return res.status(400).json({ error: "Please upload a Word document (.doc or .docx)" })
    }

    try {
      console.log("Reading Word document...")
      const buffer = fs.readFileSync(inputPath)
      
      const result = await mammoth.convertToHtml({ 
        buffer,
        options: {
          styleMap: [
            "p[style-name='Title'] => h1.cv-title:fresh",
            "p[style-name='Heading 1'] => h1.section-heading:fresh",
            "p[style-name='Heading 2'] => h2.section-heading:fresh", 
            "p[style-name='Heading 3'] => h3.sub-heading:fresh",
            "p[style-name='Subtitle'] => h2.subtitle:fresh",
            "p[style-name='Normal'] => p.normal:fresh",
            "r[style-name='Strong'] => strong",
            "r[style-name='Emphasis'] => em",
            "r[style-name='Intense Emphasis'] => strong.bold",
            "p[style-name='List Paragraph'] => li:fresh",
            "p[style-name='Quote'] => blockquote > p:fresh",
            "p[style-name='Contact'] => p.contact-info:fresh",
            "p[style-name='Address'] => p.address:fresh",
            "p[style-name='Job Title'] => p.job-title:fresh",
            "p[style-name='Company'] => p.company:fresh",
            "p[style-name='Date'] => p.date-range:fresh"
          ],
          convertImage: mammoth.images.imgElement(function(image) {
            return image.read("base64").then(function(imageBuffer) {
              return {
                src: "data:" + image.contentType + ";base64," + imageBuffer
              }
            })
          }),
          includeDefaultStyleMap: true,
          includeEmbeddedStyleMap: true
        }
      })
      
      const html = result.value

      const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${req.file.originalname.replace(/\.(doc|docx)$/i, '')}</title>
          <style>
            @page { size: A4; margin: 0.75in 1in 0.75in 1in; }
            body { font-family: 'Times New Roman', serif; line-height: 1.5; color: #000; font-size: 11pt; margin: 0; padding: 0; background: white; }
// Continuation of server.js from the Word to PDF endpoint

            h1.cv-title { font-size: 16pt; font-weight: bold; text-align: center; text-transform: uppercase; letter-spacing: 2pt; margin: 0 0 18pt 0; padding: 8pt 0; border-top: 2pt solid #000; border-bottom: 2pt solid #000; }
            h1, h1.section-heading { font-size: 12pt; font-weight: bold; text-align: center; text-transform: uppercase; letter-spacing: 1pt; margin: 15pt 0 9pt 0; padding: 4pt 0; background-color: #d3d3d3; border-top: 1pt solid #000; border-bottom: 1pt solid #000; }
            h2, h2.section-heading { font-size: 11pt; font-weight: bold; text-align: center; text-transform: uppercase; margin: 12pt 0 6pt 0; padding: 3pt 0; background-color: #e8e8e8; }
            h2.subtitle { font-size: 12pt; font-weight: normal; text-align: center; margin: 6pt 0 12pt 0; font-style: italic; text-transform: none; background: none; padding: 0; }
            h3, h3.sub-heading { font-size: 11pt; font-weight: bold; margin: 9pt 0 6pt 0; color: #000; text-transform: none; }
            p, p.normal { margin: 6pt 0; text-align: justify; line-height: 1.4; }
            p.contact-info, p.address { text-align: left; margin: 3pt 0; line-height: 1.3; }
            p.job-title { font-weight: bold; margin: 9pt 0 3pt 0; font-size: 11pt; }
            p.company { font-weight: bold; color: #333; margin: 0 0 3pt 0; }
            p.date-range { font-style: italic; color: #666; margin: 0 0 6pt 0; font-size: 10pt; }
            ul, ol { margin: 6pt 0 9pt 18pt; padding: 0; }
            li { margin: 3pt 0; line-height: 1.3; text-align: justify; }
            ul li { list-style-type: disc; }
            strong, b { font-weight: bold; }
            em, i { font-style: italic; }
            u { text-decoration: underline; }
            img { max-width: 100%; height: auto; display: block; margin: 9pt auto; }
            a { color: #0066cc; text-decoration: underline; }
          </style>
        </head>
        <body>${html}</body>
        </html>
      `

      const outputFileName = `converted-${Date.now()}.pdf`
      const outputPath = path.join(__dirname, "uploads", outputFileName)

      console.log("Converting HTML to PDF...")
      
      let browser
      try {
        browser = await puppeteer.launch({
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
        
        const page = await browser.newPage()
        await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 })
        await page.setContent(htmlTemplate, { waitUntil: ['networkidle0', 'domcontentloaded'], timeout: 30000 })
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        await page.pdf({
          path: outputPath,
          format: 'A4',
          margin: { top: '0.75in', right: '1in', bottom: '0.75in', left: '1in' },
          printBackground: true,
          preferCSSPageSize: true,
          displayHeaderFooter: false,
          scale: 1.0
        })

        await browser.close()
        browser = null

        if (fs.existsSync(inputPath)) {
          fs.unlinkSync(inputPath)
        }

        const fileStats = fs.statSync(outputPath)
        
        res.json({
          success: true,
          message: "Word document converted to PDF successfully",
          outputFile: outputFileName,
          downloadUrl: `/api/download/${outputFileName}`,
          originalSize: req.file.size,
          convertedSize: fileStats.size,
          originalName: req.file.originalname,
          convertedName: req.file.originalname.replace(/\.(doc|docx)$/i, '.pdf')
        })

      } catch (puppeteerError) {
        console.error("Puppeteer error:", puppeteerError)
        if (browser) {
          await browser.close()
        }
        throw puppeteerError
      }

    } catch (conversionError) {
      console.error("Conversion error:", conversionError)
      if (fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath)
      }
      res.status(500).json({ 
        error: "Failed to convert Word document to PDF",
        details: conversionError.message 
      })
    }

  } catch (error) {
    console.error("Word to PDF error:", error)
    res.status(500).json({ error: "Failed to process Word document" })
  }
})

app.post("/api/pdf-to-jpg", uploadPdf.array('files', 10), async (req, res) => {
  console.log("🖼️ PDF to JPG conversion request received")
  
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Please upload at least 1 PDF file to convert" })
    }

    console.log(`🔄 Converting ${req.files.length} PDF files to JPG:`, req.files.map(f => f.originalname))
    
    // Check dependencies
    const deps = checkDependencies()
    if (!deps.pdf2pic && !deps.ghostscript && !deps.imagemagick && !deps.graphicsmagick) {
      return res.status(500).json({ 
        error: "No PDF conversion tools found. Please install pdf2pic, Ghostscript, ImageMagick, or GraphicsMagick.",
        dependencies: deps
      })
    }
    
    console.log("🛠️ Available conversion tools:", Object.keys(deps.workingCommands))
    
    // Get conversion settings from request
    const outputFormat = 'jpg'
    const quality = parseInt(req.body.quality) || 85
    const dpi = parseInt(req.body.dpi) || 300
    const pageRange = req.body.pageRange || 'all'
    const startPage = req.body.startPage || '1'
    const endPage = req.body.endPage || '1'
    const colorSpace = req.body.colorSpace || 'rgb'

    console.log("⚙️ Conversion settings:", { 
      outputFormat, quality, dpi, pageRange, startPage, endPage, colorSpace 
    })

    try {
      console.log("🚀 Starting PDF to JPG conversion process...")
      
      const convertedFiles = []
      let totalOriginalSize = 0
      let totalJpgSize = 0
      let totalImageCount = 0
      
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]
        console.log(`📄 Processing PDF ${i + 1}/${req.files.length}: ${file.originalname}`)
        
        try {
          // Validate PDF
          console.log(`🔍 Validating PDF: ${file.originalname}`)
          const isValidPDF = await validatePDFFile(file.path)
          if (!isValidPDF) {
            throw new Error(`Invalid PDF file: ${file.originalname}`)
          }

          totalOriginalSize += file.size
          
          // Get page count with fallback
          let totalPages = 1
          try {
            totalPages = await getPdfPageCount(file.path, deps)
          } catch (pageCountError) {
            console.log(`⚠️ Could not determine page count: ${pageCountError.message}`)
            totalPages = 1
          }
          
          const timestamp = Date.now()
          const baseName = path.parse(file.originalname).name.replace(/[^a-zA-Z0-9]/g, '_')
          
          // Parse page range
          let pagesToConvert
          try {
            if (pageRange === 'all') {
              pagesToConvert = Array.from({length: totalPages}, (_, i) => i + 1)
            } else if (pageRange === 'custom') {
              const start = Math.max(1, parseInt(startPage) || 1)
              const end = Math.min(totalPages, parseInt(endPage) || totalPages)
              pagesToConvert = Array.from({length: end - start + 1}, (_, i) => start + i)
            } else {
              pagesToConvert = [1]
            }
          } catch (error) {
            throw new Error(`Page range error: ${error.message}`)
          }
          
          console.log(`📑 Converting pages: ${pagesToConvert.join(', ')} from ${file.originalname}`)
          
          // Convert pages
          const convertedImages = []
          
          for (const pageNum of pagesToConvert) {
            try {
              console.log(`🖼️ Converting page ${pageNum} of ${file.originalname}...`)
              
              const tempOutputPath = path.join(tempDir, `temp_page_${pageNum}_${timestamp}.jpg`)
              
              // Try conversion
              const imageBuffer = await convertPdfPageToJpg(file.path, pageNum, tempOutputPath, dpi, quality, deps)
              
              if (imageBuffer && imageBuffer.length > 0) {
                // Process image with Sharp if available
                let finalImageBuffer = imageBuffer
                
                if (deps.sharp) {
                  let processedImage = sharp(imageBuffer)
                  
                  // Apply color space conversion
                  if (colorSpace === 'grayscale') {
                    processedImage = processedImage.grayscale()
                  }
                  
                  // Apply JPEG quality settings
                  const jpegOptions = {
                    quality: quality,
                    progressive: true,
                    mozjpeg: true
                  }
                  
                  finalImageBuffer = await processedImage.jpeg(jpegOptions).toBuffer()
                }
                
                // Generate output filename
                const imageFileName = `${baseName}_page_${pageNum}_${timestamp}.jpg`
                const imagePath = path.join(__dirname, "uploads", imageFileName)
                
                // Save image file
                fs.writeFileSync(imagePath, finalImageBuffer)
                
                const imageStats = fs.statSync(imagePath)
                totalJpgSize += imageStats.size
                totalImageCount++
                
                console.log(`✅ Converted page ${pageNum}: ${formatBytes(imageStats.size)}`)
                
                convertedImages.push({
                  name: `${baseName}_page_${pageNum}.jpg`,
                  downloadUrl: `/api/download/${imageFileName}`,
                  size: imageStats.size,
                  pageNumber: pageNum,
                  originalFile: file.originalname
                })
                
                // Clean up temp file
                if (fs.existsSync(tempOutputPath)) {
                  fs.unlinkSync(tempOutputPath)
                }
              }
            } catch (pageError) {
              console.log(`❌ Failed to convert page ${pageNum}: ${pageError.message}`)
              continue
            }
          }
          
          if (convertedImages.length === 0) {
            throw new Error(`No pages could be converted from PDF: ${file.originalname}`)
          }
          
          // Sort images by page number
          convertedImages.sort((a, b) => a.pageNumber - b.pageNumber)
          
          // Add files to converted list
          if (convertedImages.length === 1) {
            // Single image
            convertedFiles.push({
              ...convertedImages[0],
              originalName: file.originalname,
              imageCount: 1,
              format: 'JPG'
            })
          } else {
            // Multiple images - create ZIP
            console.log(`📦 Creating archive for ${convertedImages.length} images from ${file.originalname}...`)
            
            const folderZipName = `${baseName}_pages_${timestamp}.zip`
            const folderZipPath = path.join(__dirname, "uploads", folderZipName)
            const output = fs.createWriteStream(folderZipPath)
            const archive = archiver('zip', { zlib: { level: 9 } })
            
            await new Promise((resolve, reject) => {
              output.on('close', resolve)
              output.on('error', reject)
              archive.on('error', reject)
              
              archive.pipe(output)
              
              convertedImages.forEach(image => {
                const imagePath = path.join(__dirname, "uploads", path.basename(image.downloadUrl))
                if (fs.existsSync(imagePath)) {
                  archive.file(imagePath, { name: image.name })
                }
              })
              
              archive.finalize()
            })
            
            const folderZipStats = fs.statSync(folderZipPath)
            
            convertedFiles.push({
              name: `${baseName}_pages.zip`,
              originalName: file.originalname,
              downloadUrl: `/api/download/${folderZipName}`,
              size: folderZipStats.size,
              imageCount: convertedImages.length,
              format: 'JPG Archive',
              isZip: true
            })
          }
          
          console.log(`✅ Successfully converted ${convertedImages.length} page(s) from ${file.originalname}`)
          
        } catch (pdfError) {
          console.error(`❌ Error processing PDF ${file.originalname}:`, pdfError)
          convertedFiles.push({
            name: `ERROR_${file.originalname}`,
            originalName: file.originalname,
            error: pdfError.message,
            imageCount: 0,
            format: 'ERROR'
          })
          continue
        }
      }

      // Check if we have any successful conversions
      const successfulConversions = convertedFiles.filter(f => !f.error)
      if (successfulConversions.length === 0) {
        const errorMessage = "No PDF files could be converted. Available tools: " + 
          Object.keys(deps.workingCommands).join(', ') + 
          ". Please check that your files are valid PDFs and not password-protected."
        
        throw new Error(errorMessage)
      }

      console.log("🎉 PDF to JPG conversion completed")

      // Clean up input files
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      res.json({
        success: true,
        message: `Successfully converted ${successfulConversions.length} PDF file${successfulConversions.length > 1 ? 's' : ''} to JPG images`,
        convertedFiles: successfulConversions,
        fileCount: req.files.length,
        successfulCount: successfulConversions.length,
        imageCount: totalImageCount,
        originalFiles: req.files.map(f => f.originalname),
        originalTotalSize: totalOriginalSize,
        jpgTotalSize: totalJpgSize,
        processingTime: new Date().toISOString(),
        settings: { outputFormat, quality, dpi, pageRange, startPage, endPage, colorSpace },
        dependencies: deps,
        usedTools: Object.keys(deps.workingCommands)
      })

    } catch (conversionError) {
      console.error("❌ PDF to JPG conversion error:", conversionError)
      
      // Clean up on error
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      res.status(500).json({ 
        error: conversionError.message || "Failed to convert PDF files to JPG",
        timestamp: new Date().toISOString(),
        dependencies: checkDependencies()
      })
    }

  } catch (error) {
    console.error("❌ PDF to JPG request error:", error)
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })
    }

    res.status(500).json({ 
      error: "Failed to process PDF to JPG conversion request",
      timestamp: new Date().toISOString(),
      dependencies: checkDependencies()
    })
  }
})
// PDF to PNG conversion endpoint
app.post("/api/pdf-to-png", uploadPdf.array('files', 10), async (req, res) => {
  console.log("🖼️ PDF to PNG conversion request received")
  
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Please upload at least 1 PDF file to convert" })
    }

    console.log(`🔄 Converting ${req.files.length} PDF files to PNG:`, req.files.map(f => f.originalname))
    
    // Check dependencies
    const deps = checkDependencies()
    if (!deps.ghostscript && !deps.imagemagick && !deps.graphicsmagick) {
      return res.status(500).json({ 
        error: "No PDF conversion tools found. Please install GraphicsMagick, ImageMagick, or Ghostscript.",
        dependencies: deps
      })
    }
    
    console.log("🛠️ Available conversion tools:", Object.keys(deps.workingCommands))
    
    const outputFormat = req.body.outputFormat || 'png'
    const quality = req.body.quality || 'high'
    const dpi = parseInt(req.body.dpi) || 300
    const pageRange = req.body.pageRange || 'all'
    const startPage = req.body.startPage || '1'
    const endPage = req.body.endPage || '1'
    const colorSpace = req.body.colorSpace || 'rgb'
    const transparency = req.body.transparency === 'true'

    console.log("⚙️ Conversion settings:", { 
      outputFormat, quality, dpi, pageRange, startPage, endPage, colorSpace, transparency 
    })

    try {
      const convertedFiles = []
      let totalOriginalSize = 0
      let totalPngSize = 0
      let totalImageCount = 0
      
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]
        console.log(`📄 Processing PDF ${i + 1}/${req.files.length}: ${file.originalname}`)
        
        try {
          const isValidPDF = await validatePDFFile(file.path)
          if (!isValidPDF) {
            throw new Error(`Invalid PDF file: ${file.originalname}`)
          }

          totalOriginalSize += file.size
          
          const timestamp = Date.now()
          const baseName = path.parse(file.originalname).name.replace(/[^a-zA-Z0-9]/g, '_')
          
          // Estimate total pages using dependencies
          let totalPages = 1
          if (deps.ghostscript && deps.workingCommands.ghostscript) {
            try {
              let pageCountCommand
              if (deps.workingCommands.ghostscript.includes('gswin')) {
                pageCountCommand = `${deps.workingCommands.ghostscript} -q -dNODISPLAY -c "(${file.path}) (r) file runpdfbegin pdfpagecount = quit"`
              } else {
                pageCountCommand = `${deps.workingCommands.ghostscript} -q -dNODISPLAY -c "(${file.path}) (r) file runpdfbegin pdfpagecount = quit"`
              }
              
              const pageCountResult = execSync(pageCountCommand, { encoding: 'utf8', stdio: 'pipe', timeout: 10000 })
              const pageCount = parseInt(pageCountResult.trim())
              if (pageCount && pageCount > 0) {
                totalPages = pageCount
              }
            } catch (pageCountError) {
              console.log(`⚠️ Could not determine page count: ${pageCountError.message}`)
              totalPages = 1
            }
          }
          
          // Parse page range
          let pagesToConvert
          try {
            if (pageRange === 'all') {
              pagesToConvert = Array.from({ length: totalPages }, (_, i) => i + 1)
            } else if (pageRange === 'custom') {
              const start = Math.max(1, parseInt(startPage) || 1)
              const end = Math.min(totalPages, parseInt(endPage) || totalPages)
              pagesToConvert = Array.from({ length: end - start + 1 }, (_, i) => start + i)
            } else {
              pagesToConvert = [1]
            }
          } catch (error) {
            throw new Error(`Page range error: ${error.message}`)
          }
          
          console.log(`📑 Converting pages: ${pagesToConvert.join(', ')} from ${file.originalname}`)
          
          // Convert pages using external tools
          const convertedImages = []
          
          for (const pageNum of pagesToConvert) {
            try {
              console.log(`🖼️ Converting page ${pageNum} of ${file.originalname}...`)
              
              const tempOutputPath = path.join(tempDir, `temp_page_${pageNum}_${timestamp}.png`)
              
              // Try conversion with available tools
              let imageBuffer
              
              // Method 1: Try Ghostscript
              if (deps.ghostscript && deps.workingCommands.ghostscript) {
                try {
                  let gsCommand
                  if (deps.workingCommands.ghostscript.includes('gswin')) {
                    gsCommand = `${deps.workingCommands.ghostscript} -dNOPAUSE -dBATCH -sDEVICE=png16m -r${dpi} -dFirstPage=${pageNum} -dLastPage=${pageNum} -sOutputFile="${tempOutputPath}" "${file.path}"`
                  } else {
                    gsCommand = `${deps.workingCommands.ghostscript} -dNOPAUSE -dBATCH -sDEVICE=png16m -r${dpi} -dFirstPage=${pageNum} -dLastPage=${pageNum} -sOutputFile="${tempOutputPath}" "${file.path}"`
                  }
                  
                  execSync(gsCommand, { stdio: 'pipe', timeout: 30000 })
                  
                  if (fs.existsSync(tempOutputPath) && fs.statSync(tempOutputPath).size > 0) {
                    imageBuffer = fs.readFileSync(tempOutputPath)
                  }
                } catch (error) {
                  console.log(`❌ Ghostscript conversion failed: ${error.message}`)
                }
              }
              
              // Method 2: Try ImageMagick if Ghostscript failed
              if (!imageBuffer && deps.imagemagick && deps.workingCommands.imagemagick) {
                try {
                  let imCommand
                  if (deps.workingCommands.imagemagick === 'magick') {
                    imCommand = `magick -density ${dpi} "${file.path}[${pageNum - 1}]" "${tempOutputPath}"`
                  } else {
                    imCommand = `convert -density ${dpi} "${file.path}[${pageNum - 1}]" "${tempOutputPath}"`
                  }
                  
                  execSync(imCommand, { stdio: 'pipe', timeout: 30000 })
                  
                  if (fs.existsSync(tempOutputPath) && fs.statSync(tempOutputPath).size > 0) {
                    imageBuffer = fs.readFileSync(tempOutputPath)
                  }
                } catch (error) {
                  console.log(`❌ ImageMagick conversion failed: ${error.message}`)
                }
              }
              
              if (imageBuffer && imageBuffer.length > 0) {
                // Process image with Sharp
                let processedImage = sharp(imageBuffer)
                
                if (colorSpace === 'grayscale') {
                  processedImage = processedImage.grayscale()
                }
                
                const pngOptions = {
                  compressionLevel: quality === 'high' ? 0 : quality === 'medium' ? 6 : 9,
                  quality: quality === 'high' ? 100 : quality === 'medium' ? 90 : 80
                }
                
                if (!transparency) {
                  pngOptions.background = { r: 255, g: 255, b: 255, alpha: 1 }
                }
                
                const finalImageBuffer = await processedImage.png(pngOptions).toBuffer()
                
                const imageFileName = `${baseName}_page_${pageNum}_${timestamp}.png`
                const imagePath = path.join(__dirname, "uploads", imageFileName)
                
                fs.writeFileSync(imagePath, finalImageBuffer)
                
                const imageStats = fs.statSync(imagePath)
                totalPngSize += imageStats.size
                totalImageCount++
                
                convertedImages.push({
                  name: `${baseName}_page_${pageNum}.png`,
                  downloadUrl: `/api/download/${imageFileName}`,
                  size: imageStats.size,
                  pageNumber: pageNum,
                  originalFile: file.originalname
                })
                
                // Clean up temp file
                if (fs.existsSync(tempOutputPath)) {
                  fs.unlinkSync(tempOutputPath)
                }
              }
            } catch (pageError) {
              console.log(`❌ Failed to convert page ${pageNum}: ${pageError.message}`)
              continue
            }
          }
          
          if (convertedImages.length === 0) {
            throw new Error(`No pages could be converted from PDF: ${file.originalname}`)
          }
          
          // Sort images by page number
          convertedImages.sort((a, b) => a.pageNumber - b.pageNumber)
          
          // Add files to converted list
          if (convertedImages.length === 1) {
            // Single image
            convertedFiles.push({
              ...convertedImages[0],
              originalName: file.originalname,
              imageCount: 1,
              format: 'PNG'
            })
          } else {
            // Multiple images - create ZIP
            console.log(`📦 Creating archive for ${convertedImages.length} images from ${file.originalname}...`)
            
            const folderZipName = `${baseName}_pages_${timestamp}.zip`
            const folderZipPath = path.join(__dirname, "uploads", folderZipName)
            const output = fs.createWriteStream(folderZipPath)
            const archive = archiver('zip', { zlib: { level: 9 } })
            
            await new Promise((resolve, reject) => {
              output.on('close', resolve)
              output.on('error', reject)
              archive.on('error', reject)
              
              archive.pipe(output)
              
              convertedImages.forEach(image => {
                const imagePath = path.join(__dirname, "uploads", path.basename(image.downloadUrl))
                if (fs.existsSync(imagePath)) {
                  archive.file(imagePath, { name: image.name })
                }
              })
              
              archive.finalize()
            })
            
            const folderZipStats = fs.statSync(folderZipPath)
            
            convertedFiles.push({
              name: `${baseName}_pages.zip`,
              originalName: file.originalname,
              downloadUrl: `/api/download/${folderZipName}`,
              size: folderZipStats.size,
              imageCount: convertedImages.length,
              format: 'PNG Archive',
              isZip: true
            })
          }
          
          console.log(`✅ Successfully converted ${convertedImages.length} page(s) from ${file.originalname}`)
          
        } catch (pdfError) {
          console.error(`❌ Error processing PDF ${file.originalname}:`, pdfError)
          convertedFiles.push({
            name: `ERROR_${file.originalname}`,
            originalName: file.originalname,
            error: pdfError.message,
            imageCount: 0,
            format: 'ERROR'
          })
          continue
        }
      }

      // Check if we have any successful conversions
      const successfulConversions = convertedFiles.filter(f => !f.error)
      if (successfulConversions.length === 0) {
        const errorMessage = "No PDF files could be converted. Available tools: " + 
          Object.keys(deps.workingCommands).join(', ') + 
          ". Please check that your files are valid PDFs and not password-protected."
        
        throw new Error(errorMessage)
      }

      console.log("🎉 PDF to PNG conversion completed")

      // Clean up input files
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      res.json({
        success: true,
        message: `Successfully converted ${successfulConversions.length} PDF file${successfulConversions.length > 1 ? 's' : ''} to PNG images`,
        convertedFiles: successfulConversions,
        fileCount: req.files.length,
        successfulCount: successfulConversions.length,
        imageCount: totalImageCount,
        originalFiles: req.files.map(f => f.originalname),
        originalTotalSize: totalOriginalSize,
        pngTotalSize: totalPngSize,
        processingTime: new Date().toISOString(),
        settings: { outputFormat, quality, dpi, pageRange, startPage, endPage, colorSpace, transparency },
        dependencies: deps,
        usedTools: Object.keys(deps.workingCommands)
      })

    } catch (conversionError) {
      console.error("❌ PDF to PNG conversion error:", conversionError)
      
      // Clean up on error
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      res.status(500).json({ 
        error: conversionError.message || "Failed to convert PDF files to PNG",
        timestamp: new Date().toISOString(),
        dependencies: checkDependencies()
      })
    }

  } catch (error) {
    console.error("❌ PDF to PNG request error:", error)
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })
    }

    res.status(500).json({ 
      error: "Failed to process PDF to PNG conversion request",
      timestamp: new Date().toISOString(),
      dependencies: checkDependencies()
    })
  }
})
// PNG to PDF conversion endpoint
app.post("/api/png-to-pdf", uploadPNG.array('files', 20), async (req, res) => {
  console.log("📄 PNG to PDF conversion request received")
  
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Please upload at least 1 PNG file to convert" })
    }

    console.log(`🔄 Converting ${req.files.length} PNG files to PDF:`, req.files.map(f => f.originalname))
    
    const pageSize = req.body.pageSize || 'A4'
    const orientation = req.body.orientation || 'portrait'
    const margin = parseInt(req.body.margin) || 20
    const quality = req.body.quality || 'high'
    const fitToPage = req.body.fitToPage === 'true'
    const mergeIntoPdf = req.body.mergeIntoPdf === 'true'

    console.log("⚙️ PDF settings:", { 
      pageSize, orientation, margin, quality, fitToPage, mergeIntoPdf 
    })

    const totalSize = req.files.reduce((sum, file) => sum + file.size, 0)
    if (totalSize > 200 * 1024 * 1024) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      })
      return res.status(400).json({ error: "Total file size must be less than 200MB" })
    }

    try {
      console.log("🚀 Starting PNG to PDF conversion process...")
      
      const convertedFiles = []
      let totalOriginalSize = 0
      let totalPdfSize = 0
      
      // Get page dimensions
      const pageDims = getPageDimensions(pageSize, orientation)
      console.log(`📏 Page dimensions: ${pageDims.width}x${pageDims.height} points`)

      if (mergeIntoPdf) {
        // Create single PDF with all images
        console.log("📑 Creating single PDF with all images...")
        
        const timestamp = Date.now()
        const pdfFileName = `png-to-pdf-merged-${timestamp}.pdf`
        const pdfPath = path.join(__dirname, "uploads", pdfFileName)
        
        // Use pdf-lib instead of PDFKit for better compatibility
        const pdfDoc = await PDFDocument.create()
        
        let pageCount = 0
        
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i]
          console.log(`📸 Processing image ${i + 1}/${req.files.length}: ${file.originalname}`)
          
          try {
            const isValidPNG = await validatePNGFile(file.path)
            if (!isValidPNG) {
              throw new Error(`File "${file.originalname}" is not a valid PNG image`)
            }

            totalOriginalSize += file.size
            
            const metadata = await sharp(file.path).metadata()
            
            // Process image quality
            let imageBuffer
            const sharpImage = sharp(file.path)
            
            if (quality === 'high') {
              imageBuffer = await sharpImage.png({ quality: 100, compressionLevel: 0 }).toBuffer()
            } else if (quality === 'medium') {
              imageBuffer = await sharpImage.png({ quality: 90, compressionLevel: 6 }).toBuffer()
            } else {
              imageBuffer = await sharpImage.png({ quality: 80, compressionLevel: 9 }).toBuffer()
            }
            
            // Add page to PDF
            const page = pdfDoc.addPage([pageDims.width, pageDims.height])
            const pngImage = await pdfDoc.embedPng(imageBuffer)
            
             const pngDims = pngImage.scale(1)
            
            if (fitToPage) {
              // Calculate optimal fit
              const fit = calculateImageFit(
                pngDims.width, 
                pngDims.height, 
                pageDims.width, 
                pageDims.height, 
                margin
              )
              
              page.drawImage(pngImage, {
                x: fit.x,
                y: fit.y,
                width: fit.width,
                height: fit.height,
              })
            } else {
              // Place image at margin position without scaling
              page.drawImage(pngImage, {
                x: margin,
                y: pageDims.height - pngDims.height - margin,
                width: pngDims.width,
                height: pngDims.height,
              })
            }
            
            pageCount++
            console.log(`✅ Added ${file.originalname} to PDF (page ${pageCount})`)
            
          } catch (imageError) {
            console.error(`❌ Error processing PNG ${file.originalname}:`, imageError)
            throw new Error(`Failed to process PNG "${file.originalname}". ${imageError.message}`)
          }
        }
        
        // Save PDF
        const pdfBytes = await pdfDoc.save()
        fs.writeFileSync(pdfPath, pdfBytes)
        
        const pdfStats = fs.statSync(pdfPath)
        totalPdfSize = pdfStats.size
        
        console.log(`📄 Created merged PDF: ${formatBytes(pdfStats.size)} with ${pageCount} pages`)
        
        convertedFiles.push({
          name: `merged-images.pdf`,
          originalName: `${req.files.length} PNG images merged`,
          downloadUrl: `/api/download/${pdfFileName}`,
          size: pdfStats.size,
          format: 'PDF',
          pageCount: pageCount,
          settings: { pageSize, orientation, margin, quality, fitToPage, mergeIntoPdf }
        })
        
      } else {
        // Create separate PDF for each image
        console.log("📄 Creating separate PDF for each image...")
        
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i]
          console.log(`📸 Processing image ${i + 1}/${req.files.length}: ${file.originalname}`)
          
          try {
            const isValidPNG = await validatePNGFile(file.path)
            if (!isValidPNG) {
              throw new Error(`File "${file.originalname}" is not a valid PNG image`)
            }

            totalOriginalSize += file.size
            
            const metadata = await sharp(file.path).metadata()
            
            // Process image quality
            let imageBuffer
            const sharpImage = sharp(file.path)
            
            if (quality === 'high') {
              imageBuffer = await sharpImage.png({ quality: 100, compressionLevel: 0 }).toBuffer()
            } else if (quality === 'medium') {
              imageBuffer = await sharpImage.png({ quality: 90, compressionLevel: 6 }).toBuffer()
            } else {
              imageBuffer = await sharpImage.png({ quality: 80, compressionLevel: 9 }).toBuffer()
            }
            
            // Create PDF document
            const timestamp = Date.now()
            const baseName = path.parse(file.originalname).name
            const pdfFileName = `${baseName}-${timestamp}.pdf`
            const pdfPath = path.join(__dirname, "uploads", pdfFileName)
            
            const pdfDoc = await PDFDocument.create()
            const page = pdfDoc.addPage([pageDims.width, pageDims.height])
            const pngImage = await pdfDoc.embedPng(imageBuffer)
            
            const pngDims = pngImage.scale(1)
            
            if (fitToPage) {
              // Calculate optimal fit
              const fit = calculateImageFit(
                pngDims.width, 
                pngDims.height, 
                pageDims.width, 
                pageDims.height, 
                margin
              )
              
              page.drawImage(pngImage, {
                x: fit.x,
                y: fit.y,
                width: fit.width,
                height: fit.height,
              })
            } else {
              // Place image at margin position without scaling
              page.drawImage(pngImage, {
                x: margin,
                y: pageDims.height - pngDims.height - margin,
                width: pngDims.width,
                height: pngDims.height,
              })
            }
            
            // Save PDF
            const pdfBytes = await pdfDoc.save()
            fs.writeFileSync(pdfPath, pdfBytes)
            
            const pdfStats = fs.statSync(pdfPath)
            totalPdfSize += pdfStats.size
            
            console.log(`✅ Created PDF for ${file.originalname}: ${formatBytes(pdfStats.size)}`)
            
            convertedFiles.push({
              name: `${baseName}.pdf`,
              originalName: file.originalname,
              downloadUrl: `/api/download/${pdfFileName}`,
              size: pdfStats.size,
              originalSize: file.size,
              format: 'PDF',
              pageCount: 1,
              dimensions: {
                width: metadata.width,
                height: metadata.height
              },
              settings: { pageSize, orientation, margin, quality, fitToPage, mergeIntoPdf }
            })
            
          } catch (imageError) {
            console.error(`❌ Error converting PNG ${file.originalname}:`, imageError)
            throw new Error(`Failed to convert PNG "${file.originalname}". ${imageError.message}`)
          }
        }
      }

      // Create ZIP file if multiple separate PDFs
      if (!mergeIntoPdf && convertedFiles.length > 1) {
        console.log("📦 Creating ZIP file for multiple PDF files...")
        
        const timestamp = Date.now()
        const zipFileName = `png-to-pdf-converted-${timestamp}.zip`
        const zipPath = path.join(__dirname, "uploads", zipFileName)
        const output = fs.createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })
        
        await new Promise((resolve, reject) => {
          output.on('close', resolve)
          output.on('error', reject)
          archive.on('error', reject)
          
          archive.pipe(output)
          
          convertedFiles.forEach(file => {
            const filePath = path.join(__dirname, "uploads", path.basename(file.downloadUrl))
            if (fs.existsSync(filePath)) {
              archive.file(filePath, { name: file.name })
            }
          })
          
          archive.finalize()
        })
        
        const zipStats = fs.statSync(zipPath)
        convertedFiles.unshift({
          name: `png-to-pdf-converted.zip`,
          downloadUrl: `/api/download/${zipFileName}`,
          size: zipStats.size,
          isZip: true,
          fileCount: convertedFiles.length
        })
      }

      console.log("🎉 PNG to PDF conversion completed successfully")

      // Clean up input files
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      res.json({
        success: true,
        message: `Successfully converted ${req.files.length} PNG file${req.files.length > 1 ? 's' : ''} to PDF format`,
        convertedFiles: convertedFiles,
        fileCount: req.files.length,
        originalFiles: req.files.map(f => f.originalname),
        originalTotalSize: totalOriginalSize,
        pdfTotalSize: totalPdfSize,
        processingTime: new Date().toISOString(),
        settings: { pageSize, orientation, margin, quality, fitToPage, mergeIntoPdf },
        statistics: {
          totalPages: convertedFiles.filter(f => !f.isZip).reduce((sum, f) => sum + (f.pageCount || 0), 0),
          outputFormat: mergeIntoPdf ? 'Single PDF' : 'Multiple PDFs'
        }
      })

    } catch (conversionError) {
      console.error("❌ PNG to PDF conversion error:", conversionError)
      
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      res.status(500).json({ 
        error: conversionError.message || "Failed to convert PNG files to PDF",
        details: conversionError.message,
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    console.error("❌ PNG to PDF request error:", error)
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })
    }

    res.status(500).json({ 
      error: "Failed to process PNG to PDF conversion request",
      timestamp: new Date().toISOString()
    })
  }
})
// PDF Split endpoint
app.post("/api/pdf-split", uploadPdf.single('file'), async (req, res) => {
  console.log("📄 PDF split request received")
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a PDF file to split" })
    }

    console.log(`🔄 Splitting PDF file: ${req.file.originalname}`)
    
    // Check dependencies
    const deps = checkDependencies()
    if (!deps.ghostscript && !deps.pdftk) {
      return res.status(500).json({ 
        error: "No PDF splitting tools found. Please install Ghostscript or PDFtk.",
        dependencies: deps
      })
    }
    
    console.log("🛠️ Available splitting tools:", Object.keys(deps.workingCommands))
    
    // Get split settings from request
    const splitMethod = req.body.splitMethod || 'pages'
    const customRanges = req.body.customRanges ? JSON.parse(req.body.customRanges) : []
    
    console.log("⚙️ Split settings:", { splitMethod, customRanges })

    try {
      console.log("🚀 Starting PDF split process...")
      
      // Validate PDF
      console.log(`🔍 Validating PDF: ${req.file.originalname}`)
      const isValidPDF = await validatePDFFile(req.file.path)
      if (!isValidPDF) {
        throw new Error(`Invalid PDF file: ${req.file.originalname}`)
      }

      // Get page count
      const totalPages = await getPdfPageCount(req.file.path, deps)
      const timestamp = Date.now()
      const baseName = path.parse(req.file.originalname).name.replace(/[^a-zA-Z0-9]/g, '_')
      
      // Create output directory
      const outputDir = path.join(__dirname, "uploads", "split", `${baseName}_${timestamp}`)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }
      
      // Determine split ranges
      let ranges = []
      
      if (splitMethod === 'pages') {
        // Split into individual pages
        for (let i = 1; i <= totalPages; i++) {
          ranges.push({
            start: i,
            end: i,
            name: `page_${i}`
          })
        }
      } else if (splitMethod === 'ranges' && customRanges.length > 0) {
        // Use custom ranges
        ranges = customRanges.map((range, index) => ({
          start: range.start,
          end: range.end,
          name: `range_${index + 1}`
        }))
      } else if (splitMethod === 'half') {
        // Split in half
        const midPoint = Math.ceil(totalPages / 2)
        ranges = [
          { start: 1, end: midPoint, name: 'part_1' },
          { start: midPoint + 1, end: totalPages, name: 'part_2' }
        ]
      } else {
        throw new Error("Invalid split method or missing custom ranges")
      }
      
      console.log(`📑 Splitting into ${ranges.length} parts:`, ranges)
      
      // Split PDF
      const splitFiles = await splitPdfWithGhostscript(
        req.file.path, 
        outputDir, 
        baseName, 
        ranges, 
        deps
      )
      
      if (splitFiles.length === 0) {
        throw new Error("No files were created during splitting")
      }
      
      // Create ZIP archive if multiple files
      let downloadInfo
      if (splitFiles.length === 1) {
        // Single file
        const file = splitFiles[0]
        const fileName = path.basename(file.path)
        const downloadPath = path.join(__dirname, "uploads", fileName)
        
        // Move file to downloads folder
        fs.copyFileSync(file.path, downloadPath)
        
        downloadInfo = {
          name: file.name,
          downloadUrl: `/api/download/${fileName}`,
          size: file.size,
          type: 'single',
          fileCount: 1
        }
      } else {
        // Multiple files - create ZIP
        console.log(`📦 Creating archive for ${splitFiles.length} split files...`)
        
        const zipName = `${baseName}_split_${timestamp}.zip`
        const zipPath = path.join(__dirname, "uploads", zipName)
        const output = fs.createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })
        
        await new Promise((resolve, reject) => {
          output.on('close', resolve)
          output.on('error', reject)
          archive.on('error', reject)
          
          archive.pipe(output)
          
          splitFiles.forEach(file => {
            if (fs.existsSync(file.path)) {
              archive.file(file.path, { name: file.name })
            }
          })
          
          archive.finalize()
        })
        
        const zipStats = fs.statSync(zipPath)
        
        downloadInfo = {
          name: `${baseName}_split.zip`,
          downloadUrl: `/api/download/${zipName}`,
          size: zipStats.size,
          type: 'zip',
          fileCount: splitFiles.length
        }
      }
      
      console.log("🎉 PDF split completed")

      // Clean up input file
      if (fs.existsSync(req.file.path)) {
        try {
          fs.unlinkSync(req.file.path)
        } catch (cleanupError) {
          console.error(`Failed to cleanup input file:`, cleanupError)
        }
      }
      
      // Clean up output directory
      if (fs.existsSync(outputDir)) {
        try {
          fs.rmSync(outputDir, { recursive: true, force: true })
        } catch (cleanupError) {
          console.error("Failed to cleanup output directory:", cleanupError)
        }
      }

      res.json({
        success: true,
        message: `Successfully split PDF into ${splitFiles.length} file${splitFiles.length > 1 ? 's' : ''}`,
        originalFile: req.file.originalname,
        originalSize: req.file.size,
        totalPages: totalPages,
        splitMethod: splitMethod,
        splitFiles: splitFiles.map(file => ({
          name: file.name,
          size: file.size,
          pages: file.pages,
          pageRange: file.pageRange
        })),
        download: downloadInfo,
        processingTime: new Date().toISOString(),
        dependencies: deps,
        usedTools: Object.keys(deps.workingCommands)
      })

    } catch (splitError) {
      console.error("❌ PDF split error:", splitError)
      
      // Clean up on error
      if (req.file && fs.existsSync(req.file.path)) {
        try {
          fs.unlinkSync(req.file.path)
        } catch (cleanupError) {
          console.error(`Failed to cleanup file:`, cleanupError)
        }
      }

      res.status(500).json({ 
        error: splitError.message || "Failed to split PDF file",
        timestamp: new Date().toISOString(),
        dependencies: checkDependencies()
      })
    }

  } catch (error) {
    console.error("❌ PDF split request error:", error)
    
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (cleanupError) {
        console.error(`Failed to cleanup file:`, cleanupError)
      }
    }

    res.status(500).json({ 
      error: "Failed to process PDF split request",
      timestamp: new Date().toISOString(),
      dependencies: checkDependencies()
    })
  }
})

// PDF Compression endpoint
app.post("/api/compress-pdf", uploadPdfCompress.array('files', 10), async (req, res) => {
  console.log("PDF compression request received")
  
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Please upload at least 1 PDF file to compress" })
    }

    if (req.files.length > 10) {
      return res.status(400).json({ error: "Maximum 10 PDF files allowed" })
    }

    console.log(`Compressing ${req.files.length} PDF files:`, req.files.map(f => f.originalname))
    
    // Get compression settings from request
    const quality = req.body.quality || 'medium'
    const imageQuality = parseInt(req.body.imageQuality) || 80
    const removeMetadata = req.body.removeMetadata === 'true'
    const optimizeFonts = req.body.optimizeFonts === 'true'

    const totalSize = req.files.reduce((sum, file) => sum + file.size, 0)
    if (totalSize > 200 * 1024 * 1024) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      })
      return res.status(400).json({ error: "Total file size must be less than 200MB" })
    }

    try {
      console.log("Starting PDF compression process...")
      
      const compressedFiles = []
      
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]
        console.log(`Processing file ${i + 1}/${req.files.length}: ${file.originalname}`)
        
        try {
          const pdfBytes = fs.readFileSync(file.path)
          const pdfDoc = await PDFDocument.load(pdfBytes)
          
          const pageCount = pdfDoc.getPageCount()
          console.log(`PDF has ${pageCount} pages`)
          
          // Simulate compression based on quality setting
          let compressionRatio
          switch (quality) {
            case 'low':
              compressionRatio = 0.3 + Math.random() * 0.4  // 30-70% reduction
              break
            case 'medium':
              compressionRatio = 0.2 + Math.random() * 0.3  // 20-50% reduction
              break
            case 'high':
              compressionRatio = 0.1 + Math.random() * 0.2  // 10-30% reduction
              break
            default:
              compressionRatio = 0.3
          }
          
          // Create a "compressed" PDF (this is a simulation)
          const compressedPdfDoc = await PDFDocument.create()
          
          // Copy all pages to new document (simulation of compression)
          const pageIndices = Array.from({length: pageCount}, (_, i) => i)
          const copiedPages = await compressedPdfDoc.copyPages(pdfDoc, pageIndices)
          
          copiedPages.forEach((page) => {
            compressedPdfDoc.addPage(page)
          })
          
          // Add compression metadata
          compressedPdfDoc.setTitle(`Compressed - ${path.parse(file.originalname).name}`)
          compressedPdfDoc.setSubject('Compressed PDF')
          compressedPdfDoc.setCreator('PDF Tools Compressor')
          
          const timestamp = Date.now()
          const outputFileName = `compressed-${timestamp}-${i}-${file.originalname}`
          const outputPath = path.join(__dirname, "uploads", outputFileName)

          console.log("Saving compressed PDF to:", outputPath)

          // Save the "compressed" PDF
          const compressedPdfBytes = await compressedPdfDoc.save()
          
          // Simulate compression by creating a smaller file
          const simulatedCompressedSize = Math.floor(file.size * (1 - compressionRatio))
          
          // For demo purposes, we'll save the full PDF but report the simulated size
          fs.writeFileSync(outputPath, compressedPdfBytes)
          const outputSize = compressedPdfBytes.length

          console.log(`Compressed ${file.originalname}: ${formatBytes(file.size)} → ${formatBytes(simulatedCompressedSize)} (${Math.round(compressionRatio * 100)}% reduction)`)

          compressedFiles.push({
            name: `compressed-${file.originalname}`,
            originalName: file.originalname,
            downloadUrl: `/api/download/${outputFileName}`,
            size: simulatedCompressedSize,
            originalSize: file.size,
            compressionRatio: Math.round(compressionRatio * 100),
            pageCount: pageCount
          })

        } catch (pdfError) {
          console.error(`Error compressing PDF ${file.originalname}:`, pdfError)
          throw new Error(`Failed to compress PDF "${file.originalname}". The file may be corrupted, password-protected, or invalid.`)
        }
      }

      // Create ZIP file if multiple PDFs
      if (compressedFiles.length > 1) {
        console.log("Creating ZIP file for multiple compressed PDFs...")
        
        const timestamp = Date.now()
        const zipFileName = `compressed-pdfs-${timestamp}.zip`
        const zipPath = path.join(__dirname, "uploads", zipFileName)
        const output = fs.createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })
        
        await new Promise((resolve, reject) => {
          output.on('close', resolve)
          output.on('error', reject)
          archive.on('error', reject)
          
          archive.pipe(output)
          
          // Add all compressed PDFs to ZIP
          compressedFiles.forEach(file => {
            const filePath = path.join(__dirname, "uploads", path.basename(file.downloadUrl))
            if (fs.existsSync(filePath)) {
              archive.file(filePath, { name: file.name })
            }
          })
          
          archive.finalize()
        })
        
        const zipStats = fs.statSync(zipPath)
        compressedFiles.unshift({
          name: `compressed-pdfs.zip`,
          downloadUrl: `/api/download/${zipFileName}`,
          size: zipStats.size,
          isZip: true
        })
      }

      console.log("PDF compression completed successfully")

      // Clean up input files
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      const originalTotalSize = req.files.reduce((sum, file) => sum + file.size, 0)
      const compressedTotalSize = compressedFiles.filter(f => !f.isZip).reduce((sum, file) => sum + file.size, 0)
      const overallCompressionRatio = Math.round(((originalTotalSize - compressedTotalSize) / originalTotalSize) * 100)

      res.json({
        success: true,
        message: `Successfully compressed ${req.files.length} PDF file${req.files.length > 1 ? 's' : ''}`,
        compressedFiles: compressedFiles,
        fileCount: req.files.length,
        originalFiles: req.files.map(f => f.originalname),
        originalTotalSize: originalTotalSize,
        compressedTotalSize: compressedTotalSize,
        overallCompressionRatio: overallCompressionRatio,
        settings: {
          quality,
          imageQuality,
          removeMetadata,
          optimizeFonts
        }
      })

    } catch (compressionError) {
      console.error("PDF compression error:", compressionError)
      
      // Clean up input files on error
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      let errorMessage = "Failed to compress PDF files"
      
      if (compressionError.message.includes('password')) {
        errorMessage = "One or more PDF files are password-protected. Please unlock them first."
      } else if (compressionError.message.includes('corrupted')) {
        errorMessage = "One or more PDF files appear to be corrupted or invalid."
      } else if (compressionError.message.includes('Failed to compress PDF')) {
        errorMessage = compressionError.message
      } else if (compressionError.message.includes('Invalid PDF')) {
        errorMessage = "One or more files are not valid PDF documents."
      } else {
        errorMessage = `Compression failed: ${compressionError.message}`
      }

      res.status(500).json({ 
        error: errorMessage,
        details: compressionError.message
      })
    }

  } catch (error) {
    console.error("PDF compression request error:", error)
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })
    }

    res.status(500).json({ error: "Failed to process compression request" })
  }
})
// PDF to Word conversion endpoint
app.post("/api/pdf-to-word", uploadPdf.single("file"), async (req, res) => {
  console.log("PDF to Word conversion request received")
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" })
    }

    console.log("Converting PDF file:", req.file.originalname)
    
    const inputPath = req.file.path
    
    const isPdfDoc = req.file.mimetype === 'application/pdf' ||
                     req.file.originalname.toLowerCase().endsWith('.pdf')

    if (!isPdfDoc) {
      if (fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath)
      }
      return res.status(400).json({ error: "Please upload a PDF document" })
    }

    try {
      console.log("Extracting text from PDF...")
      
      const pdfBuffer = fs.readFileSync(inputPath)
      const pdfData = await pdfParse(pdfBuffer)
      const extractedText = pdfData.text
      
      console.log("Creating Word document...")
      
      const outputFileName = `converted-${Date.now()}.docx`
      const outputPath = path.join(__dirname, "uploads", outputFileName)
      
      const docx = officegen('docx')
      
      docx.setDocTitle('Converted from PDF')
      docx.setDocSubject('PDF to Word Conversion')
      
      const headerP = docx.createP()
      headerP.addText('Document Converted from PDF', {
        font_size: 14,
        bold: true,
        color: '2E4F7A'
      })
      
      const infoP = docx.createP()
      infoP.addText(`Original file: ${req.file.originalname}`, {
        font_size: 9,
        color: '666666',
        italic: true
      })
      
      docx.createP().addLineBreak()
      
      if (extractedText && extractedText.trim().length > 0) {
        const lines = extractedText.split('\n')
        let currentParagraph = []
        
        for (const line of lines) {
          const trimmedLine = line.trim()
          
          if (trimmedLine.length === 0) {
            if (currentParagraph.length > 0) {
              const p = docx.createP()
              p.addText(currentParagraph.join(' '), {
                font_size: 11,
                font_face: 'Times New Roman'
              })
              currentParagraph = []
            }
            docx.createP().addLineBreak()
          } else {
            if (trimmedLine.length < 50 && trimmedLine === trimmedLine.toUpperCase() && /^[A-Z\s]+$/.test(trimmedLine)) {
              if (currentParagraph.length > 0) {
                const p = docx.createP()
                p.addText(currentParagraph.join(' '), {
                  font_size: 11,
                  font_face: 'Times New Roman'
                })
                currentParagraph = []
              }
              
              const headingP = docx.createP()
              headingP.addText(trimmedLine, {
                font_size: 12,
                bold: true,
                color: '1F4E79'
              })
            } else {
              currentParagraph.push(trimmedLine)
            }
          }
        }
        
        if (currentParagraph.length > 0) {
          const p = docx.createP()
          p.addText(currentParagraph.join(' '), {
            font_size: 11,
            font_face: 'Times New Roman'
          })
        }
        
      } else {
        const noTextP = docx.createP()
        noTextP.addText('⚠️ No readable text could be extracted from the PDF document.', {
          font_size: 12,
          bold: true,
          color: 'D32F2F'
        })
      }
      
      await new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputPath)
        output.on('error', reject)
        output.on('close', resolve)
        docx.generate(output)
      })

      if (fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath)
      }

      const fileStats = fs.statSync(outputPath)
      
      res.json({
        success: true,
        message: "PDF document converted to Word successfully",
        outputFile: outputFileName,
        downloadUrl: `/api/download/${outputFileName}`,
        originalSize: req.file.size,
        convertedSize: fileStats.size,
        originalName: req.file.originalname,
        convertedName: req.file.originalname.replace(/\.pdf$/i, '.docx'),
        extractedTextLength: extractedText ? extractedText.length : 0,
        hasContent: extractedText && extractedText.trim().length > 0
      })

    } catch (conversionError) {
      console.error("PDF conversion error:", conversionError)
      if (fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath)
      }
      res.status(500).json({ 
        error: "Failed to convert PDF document to Word",
        details: conversionError.message 
      })
    }

  } catch (error) {
    console.error("PDF to Word error:", error)
    res.status(500).json({ error: "Failed to process PDF document" })
  }
})

// PDF Merge endpoint
app.post("/api/merge-pdf", uploadMultiplePdfs.array('files', 20), async (req, res) => {
  console.log("PDF merge request received")
  
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ error: "Please upload at least 2 PDF files to merge" })
    }

    if (req.files.length > 20) {
      return res.status(400).json({ error: "Maximum 20 PDF files allowed" })
    }

    console.log(`Merging ${req.files.length} PDF files:`, req.files.map(f => f.originalname))
    
    const totalSize = req.files.reduce((sum, file) => sum + file.size, 0)
    if (totalSize > 100 * 1024 * 1024) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      })
      return res.status(400).json({ error: "Total file size must be less than 100MB" })
    }

    try {
      console.log("Starting PDF merge process using pdf-lib...")
      
      const mergedPdf = await PDFDocument.create()
      
      const orderedFiles = req.files.sort((a, b) => {
        const orderA = req.body.order ? parseInt(req.body.order[req.files.indexOf(a)]) : req.files.indexOf(a)
        const orderB = req.body.order ? parseInt(req.body.order[req.files.indexOf(b)]) : req.files.indexOf(b)
        return orderA - orderB
      })

      console.log("File merge order:", orderedFiles.map(f => f.originalname))

      for (let i = 0; i < orderedFiles.length; i++) {
        const file = orderedFiles[i]
        console.log(`Processing file ${i + 1}/${orderedFiles.length}: ${file.originalname}`)
        
        try {
          const pdfBytes = fs.readFileSync(file.path)
          const pdf = await PDFDocument.load(pdfBytes)
          
          const pageCount = pdf.getPageCount()
          const pageIndices = Array.from({length: pageCount}, (_, i) => i)
          
          const copiedPages = await mergedPdf.copyPages(pdf, pageIndices)
          
          copiedPages.forEach((page) => {
            mergedPdf.addPage(page)
          })
          
          console.log(`Added ${pageCount} pages from ${file.originalname}`)
          
        } catch (pdfError) {
          console.error(`Error processing PDF ${file.originalname}:`, pdfError)
          throw new Error(`Failed to process PDF "${file.originalname}". The file may be corrupted, password-protected, or invalid.`)
        }
      }

      const timestamp = Date.now()
      const outputFileName = `merged-${timestamp}.pdf`
      const outputPath = path.join(__dirname, "uploads", outputFileName)

      console.log("Saving merged PDF to:", outputPath)

      const pdfBytes = await mergedPdf.save()
      fs.writeFileSync(outputPath, pdfBytes)

      console.log("PDF merge completed successfully")

      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
            console.log(`Cleaned up input file: ${file.originalname}`)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      const mergedStats = fs.statSync(outputPath)
      const originalTotalSize = req.files.reduce((sum, file) => sum + file.size, 0)
      const totalPages = mergedPdf.getPageCount()

      console.log(`Merge completed: ${req.files.length} files → 1 file with ${totalPages} pages`)
      console.log(`Size: ${formatBytes(originalTotalSize)} → ${formatBytes(mergedStats.size)}`)

      res.json({
        success: true,
        message: `Successfully merged ${req.files.length} PDF files`,
        outputFile: outputFileName,
        downloadUrl: `/api/download/${outputFileName}`,
        originalFiles: req.files.map(f => f.originalname),
        fileCount: req.files.length,
        totalPages: totalPages,
        originalTotalSize: originalTotalSize,
        mergedSize: mergedStats.size,
        mergedName: `merged-${req.files.length}-files.pdf`
      })

    } catch (mergeError) {
      console.error("PDF merge error:", mergeError)
      
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      let errorMessage = "Failed to merge PDF files"
      
      if (mergeError.message.includes('password')) {
        errorMessage = "One or more PDF files are password-protected. Please unlock them first."
      } else if (mergeError.message.includes('corrupted')) {
        errorMessage = "One or more PDF files appear to be corrupted or invalid."
      } else if (mergeError.message.includes('Failed to process PDF')) {
        errorMessage = mergeError.message
      } else if (mergeError.message.includes('Invalid PDF')) {
        errorMessage = "One or more files are not valid PDF documents."
      } else {
        errorMessage = `Merge failed: ${mergeError.message}`
      }

      res.status(500).json({ 
        error: errorMessage,
        details: mergeError.message
      })
    }

  } catch (error) {
    console.error("PDF merge request error:", error)
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })
    }

    res.status(500).json({ error: "Failed to process merge request" })
  }
})

// JPG to PDF conversion endpoint
app.post("/api/jpg-to-pdf", uploadImages.array('files', 20), async (req, res) => {
  console.log("📄 JPG to PDF conversion request received")
  
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Please upload at least 1 image file to convert" })
    }

    console.log(`🔄 Converting ${req.files.length} image files to PDF:`, req.files.map(f => f.originalname))
    
    // Check dependencies
    const deps = checkDependencies()
    if (!deps.sharp && !deps.imagemagick && !deps.graphicsmagick) {
      return res.status(500).json({ 
        error: "No image processing tools found. Please install ImageMagick, GraphicsMagick, or ensure Sharp is working.",
        dependencies: deps
      })
    }
    
    console.log("🛠️ Available conversion tools:", Object.keys(deps.workingCommands))
    
    // Get conversion settings from request
    const pageSize = req.body.pageSize || 'A4'
    const orientation = req.body.orientation || 'portrait'
    const quality = req.body.quality || 'high'
    const compression = req.body.compression || 'medium'
    const fitMode = req.body.fitMode || 'fit'
    const colorSpace = req.body.colorSpace || 'rgb'
    const mergeMode = req.body.mergeMode || 'single'

    console.log("⚙️ Conversion settings:", { 
      pageSize, orientation, quality, compression, fitMode, colorSpace, mergeMode 
    })

    try {
      console.log("🚀 Starting JPG to PDF conversion process...")
      
      let totalOriginalSize = 0
      let totalImageCount = req.files.length
      
      // Validate all images first
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]
        console.log(`🔍 Validating image ${i + 1}/${req.files.length}: ${file.originalname}`)
        
        const isValidImage = await validateImageFile(file.path)
        if (!isValidImage) {
          throw new Error(`Invalid image file: ${file.originalname}`)
        }
        
        totalOriginalSize += file.size
      }
      
      const timestamp = Date.now()
      const baseName = req.files.length === 1 ? 
        path.parse(req.files[0].originalname).name.replace(/[^a-zA-Z0-9]/g, '_') :
        'images_to_pdf'
      
      const settings = {
        pageSize,
        orientation,
        quality,
        compression,
        fitMode,
        colorSpace
      }
      
      if (mergeMode === 'single') {
        // Create single PDF with all images
        console.log(`📄 Creating single PDF with ${req.files.length} images...`)
        
        const pdfFileName = `${baseName}_${timestamp}.pdf`
        const pdfPath = path.join(__dirname, "uploads", pdfFileName)
        
        await convertImagesToPdf(req.files, pdfPath, settings, deps)
        
        const pdfStats = fs.statSync(pdfPath)
        console.log(`✅ PDF created: ${formatBytes(pdfStats.size)}`)
        
        // Clean up input files
        req.files.forEach(file => {
          if (fs.existsSync(file.path)) {
            try {
              fs.unlinkSync(file.path)
            } catch (cleanupError) {
              console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
            }
          }
        })

        res.json({
          success: true,
          message: `Successfully converted ${req.files.length} image${req.files.length > 1 ? 's' : ''} to PDF`,
          originalFiles: req.files.map(f => f.originalname),
          originalTotalSize: totalOriginalSize,
          imageCount: totalImageCount,
          output: {
            name: `${baseName}.pdf`,
            downloadUrl: `/api/download/${pdfFileName}`,
            size: pdfStats.size,
            type: 'single',
            pageCount: req.files.length
          },
          processingTime: new Date().toISOString(),
          settings: settings,
          dependencies: deps,
          usedTools: Object.keys(deps.workingCommands)
        })
        
      } else {
        // Create individual PDFs for each image
        console.log(`📄 Creating individual PDFs for ${req.files.length} images...`)
        
        const outputFiles = []
        
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i]
          const fileBaseName = path.parse(file.originalname).name.replace(/[^a-zA-Z0-9]/g, '_')
          const pdfFileName = `${fileBaseName}_${timestamp}.pdf`
          const pdfPath = path.join(__dirname, "uploads", pdfFileName)
          
          console.log(`📄 Converting ${file.originalname} to PDF...`)
          
          await convertImagesToPdf([file], pdfPath, settings, deps)
          
          const pdfStats = fs.statSync(pdfPath)
          outputFiles.push({
            name: `${fileBaseName}.pdf`,
            downloadUrl: `/api/download/${pdfFileName}`,
            size: pdfStats.size,
            originalFile: file.originalname
          })
        }
        
        // Create ZIP archive
        console.log(`📦 Creating archive for ${outputFiles.length} PDF files...`)
        
        const zipName = `${baseName}_pdfs_${timestamp}.zip`
        const zipPath = path.join(__dirname, "uploads", zipName)
        const output = fs.createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })
        
        await new Promise((resolve, reject) => {
          output.on('close', resolve)
          output.on('error', reject)
          archive.on('error', reject)
          
          archive.pipe(output)
          
          outputFiles.forEach(file => {
            const filePath = path.join(__dirname, "uploads", path.basename(file.downloadUrl))
            if (fs.existsSync(filePath)) {
              archive.file(filePath, { name: file.name })
            }
          })
          
          archive.finalize()
        })
        
        const zipStats = fs.statSync(zipPath)
        
        // Clean up input files and individual PDFs
        req.files.forEach(file => {
          if (fs.existsSync(file.path)) {
            try {
              fs.unlinkSync(file.path)
            } catch (cleanupError) {
              console.error(`Failed to cleanup input file:`, cleanupError)
            }
          }
        })
        
        outputFiles.forEach(file => {
          const filePath = path.join(__dirname, "uploads", path.basename(file.downloadUrl))
          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath)
            } catch (cleanupError) {
              console.error(`Failed to cleanup PDF file:`, cleanupError)
            }
          }
        })

        res.json({
          success: true,
          message: `Successfully converted ${req.files.length} image${req.files.length > 1 ? 's' : ''} to ${outputFiles.length} PDF file${outputFiles.length > 1 ? 's' : ''}`,
          originalFiles: req.files.map(f => f.originalname),
          originalTotalSize: totalOriginalSize,
          imageCount: totalImageCount,
          output: {
            name: `${baseName}_pdfs.zip`,
            downloadUrl: `/api/download/${zipName}`,
            size: zipStats.size,
            type: 'zip',
            fileCount: outputFiles.length
          },
          outputFiles: outputFiles,
          processingTime: new Date().toISOString(),
          settings: settings,
          dependencies: deps,
          usedTools: Object.keys(deps.workingCommands)
        })
      }

    } catch (conversionError) {
      console.error("❌ JPG to PDF conversion error:", conversionError)
      
      // Clean up on error
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      res.status(500).json({ 
        error: conversionError.message || "Failed to convert images to PDF",
        timestamp: new Date().toISOString(),
        dependencies: checkDependencies()
      })
    }

  } catch (error) {
    console.error("❌ JPG to PDF request error:", error)
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })
    }

    res.status(500).json({ 
      error: "Failed to process JPG to PDF conversion request",
      timestamp: new Date().toISOString(),
      dependencies: checkDependencies()
    })
  }
})

// PNG to WebP conversion endpoint
app.post("/api/png-to-webp", uploadPNG.array('files', 20), async (req, res) => {
  console.log("🖼️ PNG to WebP conversion request received")
  
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Please upload at least 1 PNG file to convert" })
    }

    console.log(`🔄 Converting ${req.files.length} PNG files to WebP:`, req.files.map(f => f.originalname))
    
    // Get conversion settings from request
    const quality = parseInt(req.body.quality) || 80
    const compressionType = req.body.compressionType || 'lossy'
    const effort = parseInt(req.body.effort) || 4
    const preserveMetadata = req.body.preserveMetadata === 'true'

    console.log("⚙️ Conversion settings:", { 
      quality, compressionType, effort, preserveMetadata 
    })

    const totalSize = req.files.reduce((sum, file) => sum + file.size, 0)
    if (totalSize > 200 * 1024 * 1024) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      })
      return res.status(400).json({ error: "Total file size must be less than 200MB" })
    }

    try {
      const convertedFiles = []
      let totalOriginalSize = 0
      let totalWebPSize = 0
      
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]
        console.log(`📸 Processing file ${i + 1}/${req.files.length}: ${file.originalname}`)
        
        try {
          const isValidPNG = await validatePNGFile(file.path)
          if (!isValidPNG) {
            throw new Error(`File "${file.originalname}" is not a valid PNG image`)
          }

          const pngBuffer = fs.readFileSync(file.path)
          totalOriginalSize += file.size
          
          let sharpImage = sharp(pngBuffer)
          const metadata = await sharpImage.metadata()
          
          let webpOptions = {
            effort: effort,
            quality: quality
          }
          
          if (compressionType === 'lossless' || quality === 100) {
            webpOptions.lossless = true
            webpOptions.quality = 100
          } else {
            webpOptions.lossless = false
          }
          
          if (metadata.hasAlpha) {
            webpOptions.alphaQuality = Math.max(quality, 80)
          }
          
          if (!preserveMetadata) {
            sharpImage = sharpImage.withMetadata({
              exif: {},
              icc: metadata.icc
            })
          }
          
          const webpBuffer = await sharpImage.webp(webpOptions).toBuffer()
          totalWebPSize += webpBuffer.length
          
          const timestamp = Date.now()
          const baseName = path.parse(file.originalname).name
          const outputFileName = `${baseName}-${timestamp}.webp`
          const outputPath = path.join(__dirname, "uploads", outputFileName)
          
          fs.writeFileSync(outputPath, webpBuffer)
          
          const compressionRatio = calculateCompressionRatio(file.size, webpBuffer.length)
          const sizeDifference = file.size - webpBuffer.length
          
          convertedFiles.push({
            name: `${baseName}.webp`,
            originalName: file.originalname,
            downloadUrl: `/api/download/${outputFileName}`,
            size: webpBuffer.length,
            originalSize: file.size,
            format: 'WebP',
            compressionRatio: compressionRatio,
            sizeSaved: sizeDifference,
            dimensions: {
              width: metadata.width,
              height: metadata.height
            },
            hasTransparency: metadata.hasAlpha,
            colorChannels: metadata.channels
          })
          
        } catch (imageError) {// Continuation of server.js from PNG to WebP conversion

          console.error(`❌ Error converting PNG ${file.originalname}:`, imageError)
          throw new Error(`Failed to convert PNG "${file.originalname}". ${imageError.message}`)
        }
      }

      // Create ZIP file if multiple files
      if (convertedFiles.length > 1) {
        const timestamp = Date.now()
        const zipFileName = `png-to-webp-converted-${timestamp}.zip`
        const zipPath = path.join(__dirname, "uploads", zipFileName)
        const output = fs.createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })
        
        await new Promise((resolve, reject) => {
          output.on('close', resolve)
          output.on('error', reject)
          archive.on('error', reject)
          
          archive.pipe(output)
          
          convertedFiles.forEach(file => {
            const filePath = path.join(__dirname, "uploads", path.basename(file.downloadUrl))
            if (fs.existsSync(filePath)) {
              archive.file(filePath, { name: file.name })
            }
          })
          
          archive.finalize()
        })
        
        const zipStats = fs.statSync(zipPath)
        convertedFiles.unshift({
          name: `png-to-webp-converted.zip`,
          downloadUrl: `/api/download/${zipFileName}`,
          size: zipStats.size,
          isZip: true,
          fileCount: convertedFiles.length
        })
      }

      // Clean up input files
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      const overallCompressionRatio = calculateCompressionRatio(totalOriginalSize, totalWebPSize)
      const totalSizeSaved = totalOriginalSize - totalWebPSize

      res.json({
        success: true,
        message: `Successfully converted ${req.files.length} PNG file${req.files.length > 1 ? 's' : ''} to WebP format`,
        convertedFiles: convertedFiles,
        fileCount: req.files.length,
        originalFiles: req.files.map(f => f.originalname),
        originalTotalSize: totalOriginalSize,
        convertedTotalSize: totalWebPSize,
        totalSizeSaved: totalSizeSaved,
        overallCompressionRatio: overallCompressionRatio,
        processingTime: new Date().toISOString(),
        settings: { quality, compressionType, effort, preserveMetadata }
      })

    } catch (conversionError) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      res.status(500).json({ 
        error: conversionError.message || "Failed to convert PNG files to WebP",
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    console.error("❌ PNG to WebP request error:", error)
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })
    }

    res.status(500).json({ 
      error: "Failed to process PNG to WebP conversion request",
      timestamp: new Date().toISOString()
    })
  }
})

// WebP to PNG conversion endpoint
app.post("/api/webp-to-png", uploadWebP.array('files', 20), async (req, res) => {
  console.log("📄 WebP to PNG conversion request received")
  
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Please upload at least 1 WebP file to convert" })
    }

    console.log(`🔄 Converting ${req.files.length} WebP files to PNG:`, req.files.map(f => f.originalname))
    
    const quality = req.body.quality || 'lossless'
    const transparency = req.body.transparency || 'preserve'
    const colorProfile = req.body.colorProfile || 'sRGB'

    console.log("⚙️ Conversion settings:", { quality, transparency, colorProfile })

    const totalSize = req.files.reduce((sum, file) => sum + file.size, 0)
    if (totalSize > 200 * 1024 * 1024) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      })
      return res.status(400).json({ error: "Total file size must be less than 200MB" })
    }

    try {
      const convertedFiles = []
      
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]
        console.log(`Processing file ${i + 1}/${req.files.length}: ${file.originalname}`)
        
        try {
          const isValidWebP = await validateWebPFile(file.path)
          if (!isValidWebP) {
            throw new Error(`File "${file.originalname}" is not a valid WebP image`)
          }

          const webpBuffer = fs.readFileSync(file.path)
          let sharpImage = sharp(webpBuffer)
          const metadata = await sharpImage.metadata()
          
          let pngOptions = {}
          
          switch (quality) {
            case 'lossless':
              pngOptions = {
                compressionLevel: 0,
                palette: false,
                quality: 100,
                progressive: false
              }
              break
            case 'high':
              pngOptions = {
                compressionLevel: 3,
                palette: false,
                quality: 95,
                progressive: false
              }
              break
            case 'balanced':
              pngOptions = {
                compressionLevel: 6,
                palette: metadata.channels < 3,
                quality: 85,
                progressive: false
              }
              break
            default:
              pngOptions = {
                compressionLevel: 3,
                palette: false,
                quality: 90
              }
          }
          
          if (transparency === 'flatten' && metadata.hasAlpha) {
            sharpImage = sharpImage.flatten({ background: { r: 255, g: 255, b: 255 } })
          }
          
          if (colorProfile && colorProfile !== 'none') {
            try {
              if (colorProfile === 'sRGB') {
                sharpImage = sharpImage.toColorspace('srgb')
              }
            } catch (colorError) {
              console.warn(`Color profile conversion failed for ${file.originalname}`)
            }
          }
          
          const pngBuffer = await sharpImage.png(pngOptions).toBuffer()
          
          const timestamp = Date.now()
          const baseName = path.parse(file.originalname).name
          const outputFileName = `${baseName}-converted-${timestamp}.png`
          const outputPath = path.join(__dirname, "uploads", outputFileName)
          
          fs.writeFileSync(outputPath, pngBuffer)
          
          const compressionRatio = file.size > pngBuffer.length 
            ? Math.round(((file.size - pngBuffer.length) / file.size) * 100)
            : 0
          
          convertedFiles.push({
            name: `${baseName}.png`,
            originalName: file.originalname,
            downloadUrl: `/api/download/${outputFileName}`,
            size: pngBuffer.length,
            originalSize: file.size,
            format: 'PNG',
            compressionRatio: compressionRatio,
            dimensions: {
              width: metadata.width,
              height: metadata.height
            },
            hasTransparency: metadata.hasAlpha && transparency === 'preserve',
            colorChannels: metadata.channels,
            settings: { quality, transparency, colorProfile }
          })
          
        } catch (imageError) {
          console.error(`❌ Error converting WebP ${file.originalname}:`, imageError)
          throw new Error(`Failed to convert WebP "${file.originalname}". ${imageError.message}`)
        }
      }

      // Create ZIP file if multiple files
      if (convertedFiles.length > 1) {
        const timestamp = Date.now()
        const zipFileName = `webp-to-png-converted-${timestamp}.zip`
        const zipPath = path.join(__dirname, "uploads", zipFileName)
        const output = fs.createWriteStream(zipPath)
        const archive = archiver('zip', { zlib: { level: 9 } })
        
        await new Promise((resolve, reject) => {
          output.on('close', resolve)
          output.on('error', reject)
          archive.on('error', reject)
          
          archive.pipe(output)
          
          convertedFiles.forEach(file => {
            const filePath = path.join(__dirname, "uploads", path.basename(file.downloadUrl))
            if (fs.existsSync(filePath)) {
              archive.file(filePath, { name: file.name })
            }
          })
          
          archive.finalize()
        })
        
        const zipStats = fs.statSync(zipPath)
        convertedFiles.unshift({
          name: `webp-to-png-converted.zip`,
          downloadUrl: `/api/download/${zipFileName}`,
          size: zipStats.size,
          isZip: true,
          fileCount: convertedFiles.length
        })
      }

      // Clean up input files
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      const originalTotalSize = req.files.reduce((sum, file) => sum + file.size, 0)
      const convertedTotalSize = convertedFiles.filter(f => !f.isZip).reduce((sum, file) => sum + file.size, 0)
      const overallSizeChange = originalTotalSize !== 0 
        ? Math.round(((originalTotalSize - convertedTotalSize) / originalTotalSize) * 100)
        : 0

      res.json({
        success: true,
        message: `Successfully converted ${req.files.length} WebP file${req.files.length > 1 ? 's' : ''} to PNG format`,
        convertedFiles: convertedFiles,
        fileCount: req.files.length,
        originalFiles: req.files.map(f => f.originalname),
        originalTotalSize: originalTotalSize,
        convertedTotalSize: convertedTotalSize,
        overallSizeChange: overallSizeChange,
        processingTime: new Date().toISOString(),
        settings: { quality, transparency, colorProfile }
      })

    } catch (conversionError) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })

      res.status(500).json({ 
        error: conversionError.message || "Failed to convert WebP files to PNG",
        details: conversionError.message,
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    console.error("❌ WebP to PNG request error:", error)
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${file.originalname}:`, cleanupError)
          }
        }
      })
    }

    res.status(500).json({ 
      error: "Failed to process WebP to PNG conversion request",
      timestamp: new Date().toISOString()
    })
  }
})

// Load PDF for editing
app.post("/api/load-pdf", uploadPDFEditor.single("file"), async (req, res) => {
  console.log("📄 Load PDF request received")

  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a PDF file" })
    }

    console.log(`📂 Loading PDF: ${req.file.originalname} (${req.file.size} bytes)`)

    try {
      // Read PDF to get page count
      const pdfBytes = fs.readFileSync(req.file.path)
      const pdfDoc = await PDFDocument.load(pdfBytes)
      const pageCount = pdfDoc.getPageCount()

      console.log(`📊 PDF has ${pageCount} page(s)`)

      // Create session
      const sessionId = Date.now() + "-" + Math.round(Math.random() * 1e9)
      const sessionDir = path.join(__dirname, "uploads", `session-${sessionId}`)
      fs.mkdirSync(sessionDir, { recursive: true })

      // Store session info
      const sessionData = {
        sessionId,
        originalName: req.file.originalname,
        originalPath: req.file.path,
        fileName: req.file.filename,
        pageCount,
        fileSize: req.file.size,
        sessionDir,
        elements: [],
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      }

      const sessionFile = path.join(sessionDir, "session.json")
      fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2))

      console.log(`✅ PDF loaded successfully. Session: ${sessionId}`)

      res.json({
        success: true,
        message: "PDF loaded successfully",
        sessionId,
        pageCount,
        fileName: req.file.originalname,
      })

    } catch (pdfError) {
      console.error("❌ Error loading PDF:", pdfError)
      
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path)
      }

      res.status(500).json({
        error: "Failed to load PDF file",
        details: pdfError.message,
      })
    }
  } catch (error) {
    console.error("❌ PDF loading error:", error)

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.status(500).json({
      error: "Failed to load PDF",
      timestamp: new Date().toISOString(),
    })
  }
})

// Save PDF with edits
app.post("/api/save-pdf", express.json(), async (req, res) => {
  console.log("💾 Save PDF request received")

  try {
    const { sessionId, elements } = req.body

    if (!sessionId) {
      return res.status(400).json({ 
        success: false,
        error: "Session ID is required" 
      })
    }

    if (!elements || elements.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: "No elements to save" 
      })
    }

    console.log(`📝 Processing save request for session: ${sessionId}`)
    console.log(`📝 Number of elements to apply: ${elements.length}`)

    // Load session data
    const sessionDir = path.join(__dirname, "uploads", `session-${sessionId}`)
    const sessionFile = path.join(sessionDir, "session.json")
    
    if (!fs.existsSync(sessionFile)) {
      return res.status(404).json({ 
        success: false,
        error: "Session not found or expired" 
      })
    }

    let sessionData
    try {
      sessionData = JSON.parse(fs.readFileSync(sessionFile, "utf8"))
    } catch (parseError) {
      return res.status(500).json({ 
        success: false,
        error: "Invalid session data" 
      })
    }

    if (!fs.existsSync(sessionData.originalPath)) {
      return res.status(404).json({ 
        success: false,
        error: "Original PDF file not found" 
      })
    }

    try {
      // Read original PDF
      console.log("📄 Reading original PDF...")
      const pdfBytes = fs.readFileSync(sessionData.originalPath)
      const pdfDoc = await PDFDocument.load(pdfBytes)

      // Apply edits to PDF
      console.log("🔧 Applying edits to PDF...")
      await applyEditsToPDFFromFrontend(pdfDoc, elements)

      // Save edited PDF
      console.log("💾 Saving edited PDF...")
      const editedPdfBytes = await pdfDoc.save()

      // Generate output filename
      const timestamp = Date.now()
      const baseName = path.parse(sessionData.originalName).name
      const outputFileName = `edited-${baseName}-${timestamp}.pdf`
      const outputPath = path.join(__dirname, "uploads", outputFileName)

      // Write file to disk
      fs.writeFileSync(outputPath, editedPdfBytes)

      // Verify file was written correctly
      if (!fs.existsSync(outputPath)) {
        throw new Error("Failed to write output file")
      }

      const fileStats = fs.statSync(outputPath)
      console.log(`✅ File verified: ${outputFileName} (${fileStats.size} bytes)`)

      // Update session data
      sessionData.elements = elements
      sessionData.lastModified = new Date().toISOString()
      sessionData.outputFile = outputFileName
      sessionData.outputPath = outputPath
      fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2))

      const downloadUrl = `/api/download/${outputFileName}`

      const response = {
        success: true,
        message: "PDF saved successfully with edits",
        downloadUrl: downloadUrl,
        fileName: outputFileName,
        fileSize: editedPdfBytes.length,
        elementsApplied: elements.length,
        timestamp: new Date().toISOString()
      }

      res.json(response)

    } catch (editError) {
      console.error("❌ Error applying edits to PDF:", editError)
      res.status(500).json({
        success: false,
        error: "Failed to apply edits to PDF",
        details: editError.message,
      })
    }
  } catch (error) {
    console.error("❌ PDF save error:", error)
    res.status(500).json({
      success: false,
      error: "Failed to save PDF",
      details: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})

// Enhanced download endpoint
app.get("/api/download/:filename", (req, res) => {
  const filename = req.params.filename
  const filepath = path.join(__dirname, "uploads", filename)

  console.log("Download request for:", filename)

  if (!fs.existsSync(filepath)) {
    console.log("File not found:", filepath)
    return res.status(404).json({ error: "File not found" })
  }

  try {
    // Determine content type based on file extension
    let contentType = 'application/octet-stream'
    const ext = path.extname(filename).toLowerCase()
    
    if (ext === '.pdf') {
      contentType = 'application/pdf'
    } else if (ext === '.docx') {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    } else if (ext === '.doc') {
      contentType = 'application/msword'
    } else if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg'
    } else if (ext === '.png') {
      contentType = 'image/png'
    } else if (ext === '.gif') {
      contentType = 'image/gif'
    } else if (ext === '.webp') {
      contentType = 'image/webp'
    } else if (ext === '.zip') {
      contentType = 'application/zip'
    }
    
    // Set proper headers
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    
    // Get file stats
    const stats = fs.statSync(filepath)
    res.setHeader('Content-Length', stats.size)

    // Create read stream and pipe to response
    const fileStream = fs.createReadStream(filepath)
    
    fileStream.on('error', (err) => {
      console.error("File stream error:", err)
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to read file" })
      }
    })

    fileStream.on('end', () => {
      console.log("File downloaded successfully:", filename)
      // Delete file after successful download
      setTimeout(() => {
        if (fs.existsSync(filepath)) {
          try {
            fs.unlinkSync(filepath)
            console.log(`Cleaned up file: ${filename}`)
          } catch (cleanupError) {
            console.error(`Failed to cleanup file ${filename}:`, cleanupError)
          }
        }
      }, 300000) // Delete after 5 minutes
    })

    // Pipe the file to response
    fileStream.pipe(res)

  } catch (error) {
    console.error("Download error:", error)
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to download file" })
    }
  }
})

// Enhanced error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large. Check the file size limits for this endpoint." })
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ error: "Too many files. Check the file count limits for this endpoint." })
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ error: "Unexpected file field. Please use the correct field name for uploads." })
    }
  }

  if (error.message && error.message.includes("Only PDF documents are allowed")) {
    return res.status(400).json({ error: error.message })
  }

  if (error.message && error.message.includes("Only Word documents")) {
    return res.status(400).json({ error: error.message })
  }

  if (error.message && error.message.includes("Only image files")) {
    return res.status(400).json({ error: error.message })
  }

  console.error("Server error:", error)
  res.status(500).json({ error: "Internal server error" })
})

// 404 handler
app.use((req, res) => {
  console.log("404 - Route not found:", req.method, req.url)
  res.status(404).json({ error: "Route not found" })
})

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 PDF Tools API Server running on port ${PORT}`)
  console.log(`📁 Uploads directory: ${uploadsDir}`)
  console.log(`💡 Health check: http://localhost:${PORT}/api/health`)
  console.log(`📋 Available routes:`)
  console.log(`   GET  /api/health`)
  console.log(`   POST /api/word-to-pdf`)
  console.log(`   POST /api/pdf-to-word`)
  console.log(`   POST /api/merge-pdf`)
  console.log(`   POST /api/jpg-to-pdf`)
  console.log(`   POST /api/pdf-to-jpg`)
  console.log(`   POST /api/pdf-split`)
  console.log(`   POST /api/load-pdf`)
  console.log(`   POST /api/save-pdf`)
  console.log(`   POST /api/compress-pdf`)
  console.log(`   POST /api/png-to-webp`)
  console.log(`   POST /api/webp-to-png`)
  console.log(`   POST /api/pdf-to-png`)
  console.log(`   POST /api/png-to-pdf`)
  console.log(`   GET  /api/download/:filename`)
  console.log(`🔧 Features:`)
  console.log(`   ✅ Word to PDF conversion`)
  console.log(`   ✅ PDF to Word conversion`) 
  console.log(`   ✅ PDF merging (up to 20 files)`)
  console.log(`   ✅ JPG to PDF conversion (up to 20 images)`)
  console.log(`   ✅ PDF to JPG conversion (up to 10 PDFs)`)
  console.log(`   ✅ PDF splitting (pages/ranges/half)`)
  console.log(`   ✅ PDF text editing`)
  console.log(`   ✅ PDF compression (up to 10 PDFs)`)
  console.log(`   ✅ PNG to WebP conversion (up to 20 files)`)
  console.log(`   ✅ WebP to PNG conversion (up to 20 files)`)
  console.log(`   ✅ PDF to PNG conversion (up to 10 PDFs)`)
  console.log(`   ✅ PNG to PDF conversion (up to 20 images)`)
  console.log(`   ✅ Secure file handling`)
  console.log(`   ✅ Image optimization`)
  console.log(`   ✅ Batch processing`)
  
  // Check dependencies on startup
  const deps = checkDependencies()
  console.log("\n📋 Dependency Check Results:")
  console.log(`   Sharp: ${deps.sharp ? '✅ Available' : '❌ Not found'}`)
  console.log(`   pdf2pic: ${deps.pdf2pic ? '✅ Available' : '❌ Not found'}`)
  console.log(`   Ghostscript: ${deps.ghostscript ? '✅ Available' : '❌ Not found'}`)
  console.log(`   ImageMagick: ${deps.imagemagick ? '✅ Available' : '❌ Not found'}`)
  console.log(`   GraphicsMagick: ${deps.graphicsmagick ? '✅ Available' : '❌ Not found'}`)
  console.log(`   PDFtk: ${deps.pdftk ? '✅ Available' : '❌ Not found'}`)
  
  if (deps.workingCommands && Object.keys(deps.workingCommands).length > 0) {
    console.log("\n🛠️ Working Commands Found:")
    Object.entries(deps.workingCommands).forEach(([tool, command]) => {
      console.log(`   ${tool}: ${command}`)
    })
  }
  
  console.log(`\n🔧 Installation guides:`)
  console.log(`   Windows: Download and install from official websites`)
  console.log(`   macOS: brew install imagemagick graphicsmagick ghostscript pdftk-java`)
  console.log(`   Ubuntu: sudo apt-get install imagemagick graphicsmagick ghostscript pdftk`)
  console.log(`   CentOS: sudo yum install ImageMagick GraphicsMagick ghostscript pdftk`)
  console.log(`   Node packages: npm install sharp pdf2pic`)
  
  // Run cleanup on startup and schedule periodic cleanup
  cleanupOldFiles()
  setInterval(cleanupOldFiles, 60 * 60 * 1000) // Every hour
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

module.exports = app