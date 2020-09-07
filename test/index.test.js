const { h } = require('hyposcript')
const { Box, configure, getCss } = require('../')

module.exports = (test, assert) => {
  test('property', () => {
    ;(
      <Box o={1} />
    );

    const css = getCss()

    assert(/order:1/.test(css))
  })

  test('with scale', () => {
    configure({
      theme: {
        color: {
          r: 'red' // custom value
        }
      }
    })

    ;(
      <div>
        <Box c="blue" />
        <Box c="r" />
      </div>
    );

    const css = getCss()

    assert(/color:blue/.test(css))
    assert(/color:red/.test(css))
  })

  test('with default value', () => {
    ;(
      <Box f />
    );

    const css = getCss()

    assert(/display:flex/.test(css))
  })

  test('with default value and scale', () => {
    ;(
      <Box w>
        <Box w="500px" />
      </Box>
    );

    const css = getCss()

    assert(/width:500px/.test(css))
  })

  test('with as', () => {
    const html = (
      <Box>
        <Box as="img" src="" />
      </Box>
    );

    assert(/img.+src/.test(html))
  })

  test('css with media query', () => {
    const html = (
      <Box css={{ maxWidth: [1, 1/2, 1/3] }} />
    );

    const css = getCss()
    assert(/@media.+max-width:33.33/.test(css))
  })
}
