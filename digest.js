const { aliases }  = require('./aliases')

function digest (
  props,
  theme
) {
  let style = {
    position: 'relative'
  }
  let attr = {}

  for (const rawProp of Object.keys(props)) {
    const config = aliases[rawProp]

    if (!config) {
      attr[rawProp] = props[rawProp]
      continue
    }

    const { properties, scale, defaultValue, unit } = config
    const rawValues = [].concat(props[rawProp])

    for (let i = 0; i < rawValues.length; i++) {
      const v =
        typeof rawValues[i] === 'boolean'
          ? defaultValue || 'true'
          : rawValues[i]
      const breakpoint = i > 0 ? theme.breakpoints[i - 1] : undefined

      let value =
        // @ts-ignore
        scale && theme[scale] && theme[scale][v] ? theme[scale][v] : v

      if (typeof value === 'number' && unit) {
        value = unit(value)
      }

      for (const p of properties) {
        if (breakpoint) {
          const media = `@media screen and (min-width: ${breakpoint})`
          style[media] = {
            ...(style[media] || {}),
            [p]: value
          }
        } else {
          style[p] = value
        }
      }
    }
  }

  return {
    style,
    attr
  }
}

module.exports = { digest }
