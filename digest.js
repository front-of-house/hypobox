const { aliases, percentOrPixel } = require('./aliases')

// assumes valid CSS properties at this point
function toStyleObject (props, theme) {
  const style = {}

  for (const prop of Object.keys(props)) {
    const { properties, scale, defaultValue, unit } = aliases[prop] || {
      properties: [prop],
      unit: percentOrPixel
    }
    const rawValues = [].concat(props[prop])

    for (let i = 0; i < rawValues.length; i++) {
      const v =
        typeof rawValues[i] === 'boolean'
          ? defaultValue || 'true'
          : rawValues[i]
      const negative = v < 0
      const key = typeof v === 'number' ? Math.abs(v) : v
      const breakpoint = i > 0 ? theme.breakpoints[i - 1] : undefined

      let value =
        // @ts-ignore
        scale && theme[scale] && theme[scale][key] ? theme[scale][key] : key

      if (typeof value === 'number' && unit) {
        value = unit(value * (negative ? -1 : 1))
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

  return style
}

function digest (props, theme) {
  const attributes = {}
  const style = {}

  // filters properties that are a part of the library vs other html attr
  for (const prop of Object.keys(props)) {
    const v = props[prop]

    if (!aliases[prop]) {
      attributes[prop] = v
    } else {
      style[prop] = v
    }
  }

  return {
    style: toStyleObject(
      {
        position: 'relative',
        ...style
      },
      theme
    ),
    attributes
  }
}

module.exports = { digest, toStyleObject }
