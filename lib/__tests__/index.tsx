import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { h, PropsWithChildren } from 'hyposcript'
import { hypostyle } from 'hypostyle'
import * as presets from 'hypostyle/presets'

import { Box, configure, compose, flush } from '../'

test('no styles', () => {
  const html = <Box />

  assert.ok(/class/.test(html))
})

test('base, pick', () => {
  const html = <Box order={1} style={{ background: 'blue' }} />
  const sheet = flush()

  assert.ok(/order:1/.test(sheet))
  assert.ok(/style.+background/.test(html))
})

test('with as', () => {
  const html = <Box as="img" src="" />

  assert.ok(/img.+src/.test(html))
})

test('className', () => {
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
  const sheet = flush()

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
  const sheet = flush()

  assert.ok(/h1/.test(html))
  assert.ok(/font-size:20px/.test(sheet))
  assert.ok(/font-size:30px/.test(sheet))
})

test('compose Component', () => {
  const hypo = hypostyle(presets)
  configure(hypo)

  function Button({ children, ...props }: PropsWithChildren<{}>) {
    return (
      <Box as="button" {...props}>
        {children}
      </Box>
    )
  }

  const Button1 = compose(Button, {
    color: 'tomato',
  })

  const html = <Button1>Hello</Button1>

  assert.ok(/button class="/.test(html))
})

test('cx', () => {
  const hypo = hypostyle(presets)
  configure(hypo)
  ;<Box cx={(theme) => ({ c: 'blue' })} />
  const sheet = flush()

  assert.ok(/color:blue/.test(sheet))
})

test.run()
