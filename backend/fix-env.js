const fs = require('fs')

const cleanContent = `GMAIL_USER=manikant007y@gmail.com
GMAIL_APP_PASSWORD=vzyq fxce shgu fsto`

fs.writeFileSync('.env', cleanContent, 'utf8')
console.log('✅ Clean .env file created!')