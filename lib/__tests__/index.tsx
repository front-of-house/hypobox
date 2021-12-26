import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { h } from 'hyposcript'
import { hypostyle } from 'hypostyle'
import * as presets from 'hypostyle/presets'

import { Box, configure, compose } from '../'

test('no hypostyle', () => {
  assert.throws(() => {
    ;<Box />
  })

  assert.throws(() => {
    compose('h1', {})({})
  })
})

test('no styles', () => {
  const hypo = hypostyle({})

  configure(hypo)

  const html = <Box />

  assert.ok(/class=""/.test(html))
})

test('base, pick', () => {
  const hypo = hypostyle(presets)

  configure(hypo)

  const html = <Box order={1} style={{ background: 'blue' }} />
  const sheet = hypo.flush()

  assert.ok(/order:1/.test(sheet))
  assert.ok(/style.+background/.test(html))
})

test('with as', () => {
  const hypo = hypostyle(presets)

  configure(hypo)

  const html = <Box as="img" src="" />

  assert.ok(/img.+src/.test(html))
})

test('className', () => {
  const hypo = hypostyle(presets)

  configure(hypo)

  const html = <Box className="foo" w={10} />

  assert.ok(/foo\s/.test(html))
})

test('configure', () => {
  const hypo = hypostyle({
    ...presets,
    tokens: {
      color: {
        b: 'blue',
      },
    },
  })

  configure(hypo)
  ;<Box className="foo" c="b" />
  const sheet = hypo.flush()

  assert.ok(/color:blue/.test(sheet))
})

test('compose', () => {
  const hypo = hypostyle(presets)
  const H1 = compose('h1', {
    fontSize: '20px',
  })
  const H2 = compose('h1', {
    fontSize: '30px',
  })

  configure(hypo)

  const html = (
    <div>
      <H1 />
      <H2 />
    </div>
  )
  const sheet = hypo.flush()

  assert.ok(/h1/.test(html))
  assert.ok(/font-size:20px/.test(sheet))
  assert.ok(/font-size:30px/.test(sheet))
})

test('cx', () => {
  const hypo = hypostyle(presets)
  configure(hypo)
  ;<Box cx={(theme) => ({ c: 'blue' })} />
  const sheet = hypo.flush()

  assert.ok(/color:blue/.test(sheet))
})

test.run()
