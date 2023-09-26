const path = require('path')

const testEslint = names =>
  `next lint --fix --file ${names
    .map(name => path.relative(process.cwd(), name))
    .join(' --file ')}`
const prettiering = names =>
  `npx prettier -w ${names
    .map(name => path.relative(process.cwd(), name))
    .join(' ')}`

module.exports = {
  '*.{ts,tsx,js,jsx}': [testEslint, prettiering],
  '*.{md,mdx}': [prettiering]
}
