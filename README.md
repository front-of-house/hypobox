# hypobox

[![npm version](https://img.shields.io/npm/v/hypobox?style=flat&colorA=4488FF&colorB=4488FF)](https://www.npmjs.com/package/hypobox) [![test coverage](https://img.shields.io/coveralls/github/sure-thing/hypobox?style=flat&colorA=223355&colorB=223355)](https://coveralls.io/github/sure-thing/hypobox?branch=main) [![npm bundle size](https://badgen.net/bundlephobia/min/hypobox?color=223355&labelColor=223355)](https://bundlephobia.com/result?p=hypobox)

Hyper minimal [hyposcript](https://github.com/sure-thing/hyposcript) `Box`
component, built with [hypostyle](https://github.com/sure-thing/hypostyle).

```bash
npm i hypobox
```

#### Example

```jsx
import { Box } from 'hypobox'
;<Box f aic fw>
  <Box w={[1, 1 / 2]}>
    <H1 c="#333">Hello world!</H1>
  </Box>
  <Box w={[1, 1 / 2]}>
    <Box
      as="button"
      c="#333"
      css={(tokens) => ({
        '&:hover': { color: 'tomato' },
      })}
    >
      Click Me
    </Box>
  </Box>
</Box>
```

## Usage

By default, `hypobox` provisions a default `hypostyle` instance for you, using
`hypostyle`'s [default presets](https://github.com/sure-thing/hypostyle#presets).
To customize this, configure a custom `hypostyle` instance, optionally merging in
the default preset:

```javascript
import { hypostyle } from 'hypostyle'
import presets from 'hypostyle/presets'
import { Box, configure } from 'hypobox'

const hypo = hypostyle({
  ...presets,
  tokens: {
    ...presets.tokens,
    color: {
      primary: '#ff4567'
    }
  },
  macros: {
    outlined: {
      border: '1px solid black',
    }
  }
})

configure(hypo)

<Box c='primary' outlined /> // => { color: '#ff4567', border: '1px solid black' }
```

> **Note:** if you plan to customize your implementation with `configure()`, you
> should do that before using `Box` or any of the utils.

### Everything Else

Create a `hypostyle` instance as above and use it for everything else. Refer to
the [hypostyle docs](https://github.com/sure-thing/hypostyle) docs for more info
on what's available.

### Server Rendering

SSR is pretty similar to what you see in the
[hypostyle](https://github.com/sure-thing/hypostyle#server-usage) docs.

> **Note:** We recommend using a new `hypostyle` instance for each render to
> ensure no styles are leaked into sequential requests.

```javascript
import { hypostyle } from 'hypostyle'
import presets from 'hypostyle/presets'
import { Box, configure } from 'hypobox'

const hypo = hypostyle(presets)

configure(hypo)

const body = (
  <Box f aic jcc>
    Flexy centered content
  </Box>
)

const stylesheet = hypo.flush()

const html = `
<!DOCTYPE html>
<html>
  <head>
    <style>${stylesheet}</style>
  </head>
  <body>${body}</body>
</html>
`
```

### Related

- [hyposcript](https://github.com/sure-thing/hyposcript)
- [hypostyle](https://github.com/sure-thing/hypostyle)
- [@hypobox/react](https://github.com/sure-thing/hypobox-react)
- [styled-system](https://github.com/styled-system/styled-system)
- [nano-css](https://github.com/streamich/nano-css)

### License

MIT License © [Sure Thing](https://github.com/sure-thing)
