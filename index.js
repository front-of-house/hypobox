const { h } = require('hyposcript')
const { hypostyle } = require('hypostyle')
const defaults = require('hypostyle/presets/default')

const { create } = require('nano-css')
const { addon: cache } = require('nano-css/addon/cache')
const { addon: nesting } = require('nano-css/addon/nesting')
const { addon: keyframes } = require('nano-css/addon/keyframes')
const { addon: rule } = require('nano-css/addon/rule')
const { addon: globalAddon } = require('nano-css/addon/global')

let nano = createNano()
let context = hypostyle(defaults)

function createNano () {
  const nano = create()

  cache(nano)
  nesting(nano)
  keyframes(nano)
  rule(nano)
  globalAddon(nano)

  return nano
}

function configure (props) {
  const tokens = {
    ...defaults.tokens,
    ...(props.tokens || {})
  }
  const theme = {
    tokens,
    shorthands: {
      ...defaults.shorthands,
      ...(props.shorthands || {})
    },
    macros: {
      ...defaults.macros,
      ...(props.macros || {})
    },
    variants: {
      ...defaults.variants,
      ...(props.variants || {})
    }
  }

  context = {
    theme,
    ...hypostyle(theme)
  }
}

function css (style) {
  return nano.rule(style)
}

function injectGlobal (style) {
  return nano.global(context.css(style))
}

function flush () {
  context = {
    theme: context.theme,
    ...hypostyle(context.theme)
  }

  const raw = nano.raw

  nano = createNano()

  return raw
}

function Box ({
  as = 'div',
  class: cn = '',
  className: cN = '',
  css: block,
  ...props
}) {
  const { css: parseHypostyle, pick, theme } = context

  const cleaned = pick(props)
  const styles = Object.keys(cleaned.styles || {}).length
    ? parseHypostyle(cleaned.styles)
    : undefined
  const blockStyles = block
    ? parseHypostyle(
        typeof block === 'function' ? block(theme.tokens) : block || {}
      )
    : undefined

  return h(as, {
    class: [
      cn || '',
      cN || '',
      styles && css(styles),
      blockStyles && css(blockStyles)
    ]
      .filter(Boolean)
      .map(s => s.trim())
      .join(' '),
    ...cleaned.props
  })
}

module.exports = {
  configure,
  Box,
  css,
  injectGlobal,
  keyframes: nano.keyframes,
  flush
}
