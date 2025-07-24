require('dotenv').config()
const nodemailer = require('nodemailer')

async function testEmail() {
  console.log('GMAIL_USER:', process.env.GMAIL_USER)
  console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'SET' : 'NOT SET')
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
  
  try {
    await transporter.verify()
    console.log('✅ Email configuration working!')
  } catch (error) {
    console.error('❌ Email test failed:', error.message)
  }
}

testEmail()