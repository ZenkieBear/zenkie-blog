const path = require('path')

const testEslint = filenames =>
  `next lint --fix --file ${filenames
    .map(name => path.relative(process.cwd(), name))
    .join(' --file ')}`
const prettiering = filenames =>
  `npx prettier -w ${filenames
    .map(name => path.relative(process.cwd(), name))
    .join(' ')}`

module.exports = {
  '*.{ts,tsx,js,jsx}': [testEslint, prettiering],
  '*.{md,mdx}': [prettiering]
}
