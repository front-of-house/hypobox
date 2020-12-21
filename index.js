const { h } = require('hyposcript')
const { hypostyle, pick } = require('hypostyle')

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

const context = {}

function configure ({ theme: t }) {
  context.theme = t
}

function toClassname (style) {
  return nano.rule(style)
}

function getCss () {
  return nano.raw
}

function Box ({
  as = 'div',
  class: cn = '',
  className: cN = '',
  css,
  ...props
}) {
  const cleaned = pick(props, context.theme)
  const { styles, theme } = hypostyle(cleaned.styles, context.theme)

  return h(as, {
    class: [
      cn || '',
      cN || '',
      toClassname(styles),
      css
        ? toClassname(
            hypostyle(typeof css === 'function' ? css(theme) : css, theme)
              .styles
          )
        : ''
    ]
      .filter(Boolean)
      .join(' '),
    ...cleaned.props
  })
}

module.exports = {
  keyframes: nano.keyframes,
  getCss,
  configure,
  Box
}
