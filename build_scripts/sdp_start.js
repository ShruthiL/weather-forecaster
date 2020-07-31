const { execSync } = require('child_process')

// npm run build && cd dist && node server/server.js

console.log('Running build scripts')
console.log('************************************************')
execSync('npm run build', { stdio: 'inherit' })

console.log('Starting App')
console.log('************************************************')
process.chdir('dist')
execSync('node server/server.js', { stdio: 'inherit' })
