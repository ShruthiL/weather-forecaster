const { execSync } = require('child_process')
const { removeSync } = require('fs-extra')

console.log('Deleting dist')
console.log('************************************************')
removeSync('./dist')

console.log('Transpiling server to dist')
console.log('************************************************')
execSync('npm run tsc', { stdio: 'inherit' })

console.log('Transpiling web to dist')
console.log('************************************************')
process.chdir('web')
execSync('npm run build', { stdio: 'inherit' })

console.log('copying middileware package.json to right location')
console.log('************************************************')
process.chdir('..')
execSync('npm run copy', { stdio: 'inherit' })
