const { h } = require('hyposcript')
const { driver } = require('styletron-standard')
const { Server } = require('styletron-engine-atomic')

const { digest, toStyleObject } = require('./digest')
const { theme } = require('./theme')
const { aliases } = require('./aliases')

const styletron = new Server()

const context = {
  theme,
  toClassname (style) {
    return driver(style, styletron)
  }
}

function getCss () {
  return styletron.getCss()
}

function configure ({ theme: t }) {
  context.theme = t ? { ...theme, ...t } : theme
}

function Box ({ as = 'div', className: cn = '', css, ...props }) {
  const { theme, toClassname } = context
  const { style, attributes } = digest(props, theme)

  return h(as, {
    class: [
      cn || '',
      toClassname(style),
      css
        ? toClassname(
            toStyleObject(typeof css === 'function' ? css(theme) : css, theme)
          )
        : ''
    ]
      .filter(Boolean)
      .join(' '),
    ...attributes
  })
}

module.exports = {
  theme,
  digest,
  toStyleObject,
  aliases,
  getCss,
  configure,
  Box
}
