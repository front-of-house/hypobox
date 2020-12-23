![hypobox](https://user-images.githubusercontent.com/4732330/96394851-af58f800-1188-11eb-8922-6a3a555d74fd.png)

<br/>

Hyper minimal [hyposcript](https://github.com/sure-thing/hyposcript) `Box`
component, built with [hypostyle](https://github.com/sure-thing/hypostyle) and
[nano-css](https://github.com/streamich/nano-css).

```bash
npm i hypobox
```

#### Example

```jsx
<Box f aic fw>
  <Box w={[1, 1 / 2]}>
    <H1 c='#333'>Hello world!</H1>
  </Box>
  <Box w={[1, 1 / 2]}>
    <Box
      as='button'
      c='#333'
      css={tokens => ({ '&:hover': { color: tomato; } })}
    >
      Click Me
    </Box>
  </Box>
</Box>
```

## Overview

> **Note**, all examples here will assume JSX usage. For information on how to
> set that up, check out the
> [hyposcript README](https://github.com/sure-thing/hyposcript#jsx).

Hypobox uses [hypostyle](https://github.com/sure-thing/hypostyle) internally,
and so supports the full API of hypostyle. Values provided here will be
_merged_ with the hypostyle [defaults](https://github.com/sure-thing/hypostyle#recommended-defaults).

```javascript
import { configure, Box } from 'hypobox'

configure({
  tokens: {
    color: {
      primary: '#ff4567'
    }
  },
  macros: {
    border: {
      border: '1px solid black'
    }
  }
})

<Box c='primary' border /> // => { color: '#ff4567', border: '1px solid black' }
```

Note: if you plan to customize your implementation with `configure()`, you
should do that before using `Box` or any of the utils.

### Utils

Hypobox also exposes some helpful utils.

#### `css`

Create ad-hoc style definitions, returning a classname.

```javascript
import { css } from 'hypobox'

configure({ ... }) // configure first

const cn = css({ c: 'blue' })
```

#### `injectGlobal`

Create global CSS rules with the full flexibility of hypostyle.

```javascript
import { injectGlobal } from 'hypobox'

configure({ ... }) // configure first

injectGlobal({
  '.classname': {
    c: 'blue'
  }
})
```

#### `keyframes`

Hypobox exports the `keyframes` helper from
[nano-css](https://github.com/streamich/nano-css/blob/master/docs/keyframes.md).
See those docs for more info.

### Server Rendering

On the server, styles are collected by nano-css. After rendering, call `flush()`
to retrieve generated CSS and clear memory.

```javascript
import { Box, flush } from 'hypobox'

const html = (
  <Box f aic jcc>
    Flexy centered content
  </Box>
)

const css = flush()
```

### License

MIT License © [Eric Bailey](https://estrattonbailey.com)
