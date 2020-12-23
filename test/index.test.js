/* eslint-disable no-unused-expressions */
const { h } = require('hyposcript')
const { Box, configure, getCss, injectGlobal } = require('../')

module.exports = (test, assert) => {
  test('no styles', () => {
    const html = <Box />
    assert(/class=""/.test(html))
  })

  test('base', () => {
    const html = <Box o={1} style={{ background: 'blue' }} />
    const css = getCss()

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

    const css = getCss()

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

    const css = getCss()

    assert(/display:flex/.test(css))
    assert(/color:#ff4567/.test(css))
  })

  test('variants', () => {
    configure({
      tokens: {
        variants: {
          type: {
            primary: {
              color: '#ff4567'
            }
          }
        }
      }
    })
    ;<Box type='primary' />

    const css = getCss()

    assert(/color:#ff4567/.test(css))
  })

  test('with as', () => {
    const html = <Box as='img' src='' />

    assert(/img.+src/.test(html))
  })

  test('css', () => {
    ;<Box css={{ c: 'blue' }} />

    const css = getCss()
    assert(/color:blue/.test(css))
  })

  test('css with media query', () => {
    ;<Box css={{ maxWidth: [1, 1 / 2, 1 / 3] }} />

    const css = getCss()
    assert(/@media(.|\n)+max-width:33.33/.test(css))
  })

  test('css as fn', () => {
    ;<Box css={tokens => ({ pt: tokens.space[1] + 'px' })} />

    const css = getCss()
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
    injectGlobal({ '.global': { color: 'blue' } })

    assert(/global\s/.test(getCss()))
  })
}
