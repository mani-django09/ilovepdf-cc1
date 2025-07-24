const path = require('path')
const fs = require('fs')

console.log('🔍 Environment Debug Information:')
console.log('Current working directory:', process.cwd())
console.log('__dirname:', __dirname)

// Check if .env file exists
const envPath = path.join(__dirname, '.env')
console.log('Looking for .env at:', envPath)
console.log('.env file exists:', fs.existsSync(envPath))

if (fs.existsSync(envPath)) {
  console.log('.env file contents:')
  console.log(fs.readFileSync(envPath, 'utf8'))
}

console.log('\n🔧 Loading dotenv...')

// Try different ways to load dotenv
try {
  const dotenv = require('dotenv')
  console.log('✅ dotenv package loaded successfully')
  
  // Method 1: Default load
  const result1 = dotenv.config()
  console.log('dotenv.config() result:', result1)
  
  // Method 2: Explicit path
  const result2 = dotenv.config({ path: '.env' })
  console.log('dotenv.config({ path: ".env" }) result:', result2)
  
  // Method 3: Full path
  const result3 = dotenv.config({ path: path.join(__dirname, '.env') })
  console.log('dotenv.config with full path result:', result3)
  
} catch (error) {
  console.error('❌ Error loading dotenv:', error)
}

console.log('\n📋 Environment Variables After Loading:')
console.log('GMAIL_USER:', process.env.GMAIL_USER)
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'SET' : 'NOT SET')
console.log('NODE_ENV:', process.env.NODE_ENV)

console.log('\n🔍 All environment variables starting with GMAIL:')
Object.keys(process.env).forEach(key => {
  if (key.startsWith('GMAIL')) {
    console.log(`${key}:`, process.env[key])
  }
})

// STEP 4: Alternative - Manual environment loading
console.log('\n🛠️ Manual .env parsing:')
try {
  const envContent = fs.readFileSync('.env', 'utf8')
  const lines = envContent.split('\n')
  
  lines.forEach(line => {
    line = line.trim()
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [key, ...valueParts] = line.split('=')
      const value = valueParts.join('=')
      console.log(`Manual parse - ${key.trim()}: ${value.trim()}`)
    }
  })
} catch (error) {
  console.error('Error manually parsing .env:', error)
}

// STEP 5: Test nodemailer with hardcoded values
console.log('\n🧪 Testing with hardcoded values:')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'manikant007y@gmail.com',
    pass: 'vzyq fxce shgu fsto',
  },
})

transporter.verify()
  .then(() => {
    console.log('✅ Hardcoded credentials work - issue is with dotenv loading')
  })
  .catch((error) => {
    console.log('❌ Hardcoded credentials failed:', error.message)
  })