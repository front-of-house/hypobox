const { h } = require('hyposcript')
const { hypostyle } = require('hypostyle')
const presets = require('hypostyle/presets')

let context = hypostyle(presets)

function configure (hypo) {
  context = hypo
}

function Box ({ as = 'div', className = '', css, ...props }) {
  const cleaned = context.pick(props)

  return h(as, {
    className: [className, context.css(cleaned.styles), css && context.css(css)]
      .filter(Boolean)
      .map(s => s.trim())
      .join(' '),
    ...cleaned.props
  })
}

module.exports = {
  configure,
  Box
}
