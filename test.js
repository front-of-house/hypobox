console.time('test')

require('@babel/register')({
  presets: [
    [
      '@babel/preset-react',
      {
        pragma: 'h'
      }
    ]
  ]
})

const test = require('baretest')('hypobox')
const assert = require('assert')

require('./test/index.test.js')(test, assert)
require('./test/digest.test.js')(test, assert)

!(async function () {
  await test.run()
  console.timeEnd('test')
})()
