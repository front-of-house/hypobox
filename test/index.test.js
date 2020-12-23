/* eslint-disable no-unused-expressions */
const { h } = require('hyposcript')
const { Box, configure, flush, injectGlobal } = require('../')

module.exports = (test, assert) => {
  test('no styles', () => {
    const html = <Box />
    assert(/class=""/.test(html))
  })

  test('base', () => {
    const html = <Box o={1} style={{ background: 'blue' }} />
    const css = flush()

    assert(/order:1/.test(css))
    assert(/style.+background/.test(html))
  })

  test('configure custom tokens', () => {
    configure({
      tokens: {
        color: {
          r: 'red' // custom value
        }
      }
    })
    ;<div>
      <Box c='blue' />
      <Box c='r' />
    </div>

    const css = flush()

    assert(/color:blue/.test(css))
    assert(/color:red/.test(css))
  })

  test('macros', () => {
    configure({
      macros: {
        short: {
          color: '#ff4567'
        }
      }
    })
    ;<Box f short />

    const css = flush()

    assert(/display:flex/.test(css))
    assert(/color:#ff4567/.test(css))
  })

  test('variants', () => {
    configure({
      variants: {
        type: {
          primary: {
            color: '#ff4567'
          }
        }
      }
    })
    ;<Box type='primary' />

    const css = flush()

    assert(/color:#ff4567/.test(css))
  })

  test('with as', () => {
    const html = <Box as='img' src='' />

    assert(/img.+src/.test(html))
  })

  test('css', () => {
    ;<Box css={{ c: 'blue' }} />

    const css = flush()
    assert(/color:blue/.test(css))
  })

  test('css with media query', () => {
    ;<Box css={{ maxWidth: [1, 1 / 2, 1 / 3] }} />

    const css = flush()
    assert(/@media(.|\n)+max-width:33.33/.test(css))
  })

  test('css as fn', () => {
    ;<Box css={tokens => ({ pt: tokens.space[1] + 'px' })} />

    const css = flush()
    assert(/padding-top:4px/.test(css))
  })

  test('class', () => {
    const html = <Box class='foo' w={10} />

    assert(/foo\s/.test(html))
  })

  test('className', () => {
    const html = <Box className='foo' w={10} />

    assert(/foo\s/.test(html))
  })

  test('injectGlobal', () => {
    injectGlobal({ '.global': { c: 'blue' } })

    const css = flush()

    assert(/global(.|\n)+color:blue/.test(css))
  })
}
