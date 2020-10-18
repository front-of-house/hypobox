# hypobox ![npm](https://img.shields.io/npm/v/hypobox)

Hyper minimal [hyposcript](https://github.com/sure-thing/hyposcript) `Box`
component, built with [styletron](https://www.styletron.org/).

```bash
npm i hypobox
```

#### Contents

- [Overview](#overview)
  - [Property Shorthands](#property-shorthands)
  - [`as` prop](#as-prop)
  - [Reponsive Props](#responsive-props)
- [Usage](#usage)
  - [Using Your Theme](#using-your-theme)
  - [Rendering a Template](#rendering-a-template)
- [FAQ](#faq)
- [List of Property Shorthands](#list-of-property-shorthands)

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
      css={theme => ({ '&:hover': { color: tomato; } })}
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

Hypobox combines functional CSS and CSS-in-JS solutions into a single tiny API.
It's heavily inspired by [reflexbox](https://rebassjs.org/reflexbox/), with some
conventions lifted from
[svbstrate](https://github.com/estrattonbailey/svbstrate). It allows your to
rapidly mark up and style web pages, using familiar syntax, without leaving your
templates and without a build system.

It uses a few patterns that may not be familiar to everyone.

#### Property Shorthands

Like functional CSS solutions, some common CSS props are shortened aliases for
ease of use. Some of these expect you to pass a value, like `c` (color), and
some are simply _macros_ for a collection of properties, like `abs` (`position: absolute`):

```jsx
<Box abs c='#333' />
```

#### `as` prop

This polymorphic prop allows you to change what HTML element is rendered. If
you're coming from `styled-components` [this will look similar](https://styled-components.com/docs/api#as-polymorphic-prop).

```jsx
<Box as='ul' /> // => <ul></ul>
```

#### Responsive Props

Some props also support an array syntax that allows you to define mobile-first
responsive values. Your breakpoints can be configured, but we'll get to that.

```jsx
<Box w={['100%', '50%']} />
```

This box is `100%` wide on mobile, and `50%` wide at the next configured
breakpoint. Percentages less than or equal `100%` can also be defined as
fractions of `1`:

```jsx
<Box w={[1, 1 / 2]} />
```

## Usage

Hypobox is best when you define a theme for it to use. Below is an example of a
full theme, with CSS style properties and associated \_theme scales:

```js
const theme = {
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64],
  breakpoints: ['400px', '800px', '1200px'],
  fontSize: ['3rem', '3rem', '2.2rem', '1.8rem', '1.4rem', '1rem', '0.875rem'],
  fontWeight: [
    '0',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '1000'
  ],
  lineHeight: ['1.1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6'],
  fontFamily: {
    sans: "'Roboto', sans-serif",
    mono: "'Roboto Mono', monospace"
  },
  color: {
    black: '#333',
    salmon: '#ff4567'
  },
  width: {
    small: 600,
    medium: 900,
    large: 1100
  }
}
```

A few notes here:

- `space` is used for whitespace i.e. `padding` and `margin`, but can also be
  used to positioning like `top` of `bottom`
- as mentioned above, `width` can be expressed as fractions, which yield
  percentages
- integers that match indices of the theme scale will use the scale value
- integers that do not match indices of the theme scale will be convert to
  pixels where appropriate
- theme scales can be arrays or objects, since values are accessed using bracket
  syntax i.e. `scale[value]`
  - use your preference here
- array indices in the above are intentional, for example:
  - `space` is multiples of `4` by index, so `space[2]` is `8px`, `space[6]` is
    `24px` etc
  - `h1` size is `fontSize[1]` and so on

### Using Your Theme

To use your theme, pass it to Hypobox's `configure` export _prior to rendering
your components_:

```jsx
import { Box, configure } from 'hypobox'

configure({
  theme: {
    color: {
      t: 'tomato'
    }
  }
})

const html = <Box c='t' />
```

To extract the generated CSS, call `getCss()` _after you've rendered your
components_:

```jsx
import { Box, configure, getCss } from 'hypobox'

// ...

const html = <Box c='t' />

const css = getCss() // .aa { color: tomato }
```

### Rendering a Template

Since [hyposcript](https://github.com/sure-thing/hyposcript) simply generates
strings, "rendering" is just string interpolation. Here's a full example:

```jsx
import { Box, configure, getCss } from 'hypobox'

configure({
  theme: {
    color: {
      t: 'tomato'
    }
  },
})

const html = (
  <Box c="t">Hello world!</Box>
)

const css = getCss()

const document = `<!DOCTYPE html>
<html>
  <head>
    <title>Hypobox</title>
    <style>${css}</style>
  </head>
  <body>${html}</body>
</html>`

/*

<!DOCTYPE html>
<html>
  <head>
    <title>Hypobox</title>
    <style>.aa{color:tomato}</style>
  </head>
  <body><div class="aa">Hello world!</div></body>
</html>
```

## FAQ

#### Using `Box` for everything feels verbose, is there a better way?

Since `Box` can be used for anything, you can use it for everything. But if that
feels weird to you, creating your own abstractions is easy!

```jsx
const Button = props => <Box as='button' {...props} />

<Button>Click me!</Button>
```

## List of Property Shorthands

All shorthands are described as `<shorthand> - <outputProp(s)> - <example>`.

#### Color

- `c` - `color` - `<Box c="tomato" />`
- `bg` - `background` - `<Box bg="tomato" />`

#### Flexbox

- `f` - `display: flex` - `<Box f />`
- `fw` - `flex-wrap: wrap` - `<Box f fw />`
- `ais` - `align-items: start` - `<Box f ais />`
- `aic` - `align-items: center` - `<Box f aic />`
- `aie` - `align-items: end` - `<Box f aie />`
- `jcs` - `justify-content: flex-start` - `<Box f jcs />`
- `jcc` - `justify-content: center` - `<Box f jcc />`
- `jce` - `justify-content: flex-end` - `<Box f jce />`
- `jcb` - `justify-content: space-between` - `<Box f jcb />`
- `o` - `order` - `<Box f o={1} />`

#### Whitespace

- `m` - `margin-top, margin-bottom, margin-left, margin-right` - `<Box m={2} />`
- `mt` - `margin-top` - `<Box mt={2} />`
- `mb` - `margin-bottom` - `<Box mb={2} />`
- `ml` - `margin-left` - `<Box ml={2} />`
- `mr` - `margin-right` - `<Box mr={2} />`
- `my` - `margin-top, margin-bottom` - `<Box my={2} />` - i.e. y-axis
- `mx` - `margin-left, margin-right` - `<Box mx={2} />` - i.e. x-axis

For `padding`, it's the same as above, but use `p`, `pt`, `px`, and so on.

#### Typography

- `ff` - `font-family` - `<Box ff="sans" />`
- `fs` - `font-size` - `<Box fs={2} />` - i.e. `h2` font size
- `fe` - `font-weight` - `<Box fw={7} />` - i.e. `700` font weight
- `lh` - `line-height` - `<Box lh={2} />` - i.e. `h2` line height
- `ta` - `text-align` - `<Box ta="center" />`

#### Display & Positioning

- `d` - `display` - `<Box d="inline-block" />`
- `db` - `display: block` - `<Box db />`
- `dib` - `display: inline-block` - `<Box dib />`
- `rel` - `position: relative` - `<Box rel />`
- `abs` - `position: absolute` - `<Box abs />`
- `fix` - `position: fixed` - `<Box fix />`
- `top` - `top: 0` - `<Box top />` or `<Box top={2} />`
- `bottom` - `bottom: 0` - `<Box bottom />` or `<Box bottom={2} />`
- `left` - `left: 0` - `<Box left />` or `<Box left={2} />`
- `right` - `right: 0` - `<Box right />` or `<Box right={2} />`
- `cover` - `top: 0; bottom: 0; left: 0; right: 0` - `<Box cover />`

#### Width & Height

- `h` - `height: 100%` - `<Box h />` or `<Box height="400px" />`
- `w` - `width: 100%` - `<Box w />` or `<Box w="large" />` or `<Box width="400px" />`
- `mw` - `max-width` - `<Box mw="large" />` or `<Box mw="400px" />`

#### Misc

- `z` - `z-index` - `<Box z={1} />`

### License

MIT License © [Eric Bailey](https://estrattonbailey.com)
