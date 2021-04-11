/* eslint-disable no-unused-expressions */
const { h } = require('hyposcript')
const { hypostyle } = require('hypostyle')
const presets = require('hypostyle/presets')

const { Box, configure, compose } = require('../')

module.exports = (test, assert) => {
  test('no styles', () => {
    const hypo = hypostyle()

    configure(hypo)

    const html = <Box />

    assert(/class=""/.test(html))
  })

  test('base, pick', () => {
    const hypo = hypostyle(presets)

    configure(hypo)

    const html = <Box order={1} style={{ background: 'blue' }} />
    const sheet = hypo.flush()

    assert(/order:1/.test(sheet))
    assert(/style.+background/.test(html))
  })

  test('with as', () => {
    const hypo = hypostyle(presets)

    configure(hypo)

    const html = <Box as='img' src='' />

    assert(/img.+src/.test(html))
  })

  test('className', () => {
    const hypo = hypostyle(presets)

    configure(hypo)

    const html = <Box className='foo' w={10} />

    assert(/foo\s/.test(html))
  })

  test('configure', () => {
    const hypo = hypostyle({
      ...presets,
      tokens: {
        color: {
          b: 'blue'
        }
      }
    })

    configure(hypo)
    ;<Box className='foo' c='b' />
    const sheet = hypo.flush()

    assert(/color:blue/.test(sheet))
  })

  test('compose', () => {
    const hypo = hypostyle(presets)
    const H1 = compose('h1', {
      fontSize: '20px'
    })

    configure(hypo)

    const html = <H1 />
    const sheet = hypo.flush()

    assert(/h1/.test(html))
    assert(/font-size:20px/.test(sheet))
  })

  test('cx', () => {
    const hypo = hypostyle(presets)
    configure(hypo)
    ;<Box cx={theme => ({ c: 'blue' })} />
    const sheet = hypo.flush()

    assert(/color:blue/.test(sheet))
  })
}
