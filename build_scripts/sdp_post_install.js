const { execSync } = require('child_process')

console.log('Installing npm packages for web')
console.log('************************************************')
process.chdir('web')
execSync('npm install', { stdio: 'inherit' })
