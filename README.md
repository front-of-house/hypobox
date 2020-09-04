# hypobox ![npm](https://img.shields.io/npm/v/hypobox) [![install size](https://packagephobia.com/badge?p=hypobox)](https://packagephobia.com/result?p=hypobox)

Tiny [hyposcript](https://github.com/sure-thing/hyposcript) `Box` component.
Built with [styletron](https://www.styletron.org/).

## Usage

```jsx
import { Box, configure, getCss } from 'hypobox'

configure({
  theme: {
    color: {
      b: 'blue'
    },
  },
})

<Box as='section' f aic>
  <Box as='li' w={[1, 1 / 2]}>
    <H1 c='b'>Hello world!</H1>
  </Box>
  <Box as='li' w={[1, 1 / 2]}>
    <Box
      as='button'
      c='b'
      css={theme => ({ '&:hover': { color: tomato; } })}
    >
      Click Me
    </Box>
  </Box>
</Box>

getCss() // => .ae { ... } ....
```

### License

MIT License © [Eric Bailey](https://estrattonbailey.com)
