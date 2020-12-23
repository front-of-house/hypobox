const { h } = require('hyposcript')
const { hypostyle } = require('hypostyle')
const defaults = require('hypostyle/presets/default')

const { create } = require('nano-css')
const { addon: cache } = require('nano-css/addon/cache')
const { addon: nesting } = require('nano-css/addon/nesting')
const { addon: keyframes } = require('nano-css/addon/keyframes')
const { addon: rule } = require('nano-css/addon/rule')

const nano = create()

cache(nano)
nesting(nano)
keyframes(nano)
rule(nano)

let context = hypostyle(defaults)

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
    tokens,
    ...hypostyle(theme)
  }
}

function cxn (style) {
  return nano.rule(style)
}

function get () {
  return nano.raw
}

function Box ({
  as = 'div',
  class: cn = '',
  className: cN = '',
  css: block,
  ...props
}) {
  const { css: parseHypostyle, pick, tokens } = context

  const cleaned = pick(props)
  const styles = parseHypostyle(cleaned.styles)
  const blockStyles = parseHypostyle(
    typeof block === 'function' ? block(tokens) : block || {}
  )

  return h(as, {
    class: [cn || '', cN || '', cxn(styles), cxn(blockStyles)]
      .filter(Boolean)
      .join(' '),
    ...cleaned.props
  })
}

module.exports = {
  keyframes: nano.keyframes,
  css: cxn,
  getCss: get,
  configure,
  Box
}
