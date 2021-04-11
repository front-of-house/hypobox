const { h } = require('hyposcript')
const { hypostyle } = require('hypostyle')
const presets = require('hypostyle/presets')

let hypo = hypostyle(presets)

function configure (instance) {
  hypo = instance
}

function Box ({ as = 'div', className = '', cx, ...props }) {
  const cleaned = hypo.pick(props)

  return h(as, {
    className: [
      className,
      hypo.css({
        ...cleaned.styles,
        ...hypo.explode(cx || {})
      })
    ]
      .filter(Boolean)
      .map(s => s.trim())
      .join(' '),
    ...cleaned.props
  })
}

function compose (as, styles) {
  return (props, ref) => {
    const cleaned = hypo.pick(props)

    const p = {
      ...cleaned.props,
      cx: {
        // explode everything to allow for overrides
        ...hypo.explode(styles),
        ...hypo.explode(cleaned.styles),
        ...hypo.explode(props.cx || {})
      }
    }

    return typeof as !== 'string' ? h(as, p) : h(Box, { as, ...p })
  }
}

module.exports = {
  configure,
  Box,
  compose
}
