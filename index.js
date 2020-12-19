const { h } = require('hyposcript')
const { hypostyle, pick } = require('hypostyle')
const { driver } = require('styletron-standard')
const { Server } = require('styletron-engine-atomic')

const styletron = new Server()

const context = {}

function configure ({ theme: t }) {
  context.theme = t
}

function toClassname (style) {
  return driver(style, styletron)
}

function getCss () {
  return styletron.getCss()
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
  getCss,
  configure,
  Box
}
