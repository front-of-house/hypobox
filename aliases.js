function px (v) {
  return v + 'px'
}

function str (v) {
  return v + ''
}

function percentOrPixel(v) {
  return v <= 1 ? v * 100 + '%' : v + 'px'
}

const aliases = {
  c: {
    properties: ['color'],
    scale: 'color'
  },
  bg: {
    properties: ['background'],
    scale: 'color'
  },
  f: {
    properties: ['display'],
    defaultValue: 'flex'
  },
  fw: {
    properties: ['flexWrap'],
    defaultValue: 'wrap'
  },
  aic: {
    properties: ['alignItems'],
    defaultValue: 'center'
  },
  ais: {
    properties: ['alignItems'],
    defaultValue: 'flex-start'
  },
  aie: {
    properties: ['alignItems'],
    defaultValue: 'flex-end'
  },
  jcs: {
    properties: ['justifyContent'],
    defaultValue: 'flex-start'
  },
  jce: {
    properties: ['justifyContent'],
    defaultValue: 'flex-end'
  },
  jcc: {
    properties: ['justifyContent'],
    defaultValue: 'center'
  },
  jcb: {
    properties: ['justifyContent'],
    defaultValue: 'space-between'
  },
  o: {
    properties: ['order'],
    unit: str
  },
  m: {
    properties: ['margin'],
    scale: 'space',
    unit: px
  },
  mt: {
    properties: ['marginTop'],
    scale: 'space',
    unit: px
  },
  mb: {
    properties: ['marginBottom'],
    scale: 'space',
    unit: px
  },
  ml: {
    properties: ['marginLeft'],
    scale: 'space',
    unit: px
  },
  mr: {
    properties: ['marginRight'],
    scale: 'space',
    unit: px
  },
  my: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    unit: px
  },
  mx: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    unit: px
  },
  p: {
    properties: ['padding'],
    scale: 'space',
    unit: px
  },
  pt: {
    properties: ['paddingTop'],
    scale: 'space',
    unit: px
  },
  pb: {
    properties: ['paddingBottom'],
    scale: 'space',
    unit: px
  },
  pl: {
    properties: ['paddingLeft'],
    scale: 'space',
    unit: px
  },
  pr: {
    properties: ['paddingRight'],
    scale: 'space',
    unit: px
  },
  py: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
    unit: px
  },
  px: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
    unit: px
  },
  z: {
    properties: ['zIndex'],
    scale: 'zIndex',
    unit: str
  },
  fs: {
    properties: ['fontSize'],
    scale: 'fontSize'
  },
  ff: {
    properties: ['fontFamily'],
    scale: 'fontFamily'
  },
  fe: {
    properties: ['fontWeight'],
    scale: 'fontWeight'
  },
  ta: {
    properties: ['textAlign'],
    defaultValue: 'center'
  },
  lh: {
    properties: ['lineHeight'],
    scale: 'lineHeight'
  },
  d: {
    properties: ['display']
  },
  db: {
    properties: ['display'],
    defaultValue: 'block'
  },
  dib: {
    properties: ['display'],
    defaultValue: 'inline-block'
  },
  rel: {
    properties: ['position'],
    defaultValue: 'relative'
  },
  abs: {
    properties: ['position'],
    defaultValue: 'absolute'
  },
  fix: {
    properties: ['position'],
    defaultValue: 'fixed'
  },
  w: {
    properties: ['width'],
    scale: 'width',
    defaultValue: '100%',
    unit: percentOrPixel,
  },
  h: {
    properties: ['height'],
    defaultValue: '100%',
    unit: percentOrPixel,
  },
  fill: {
    properties: ['top', 'bottom', 'left', 'right'],
    defaultValue: '0'
  },
  top: {
    properties: ['top'],
    scale: 'space',
    defaultValue: '0px',
    unit: px
  },
  bottom: {
    properties: ['bottom'],
    scale: 'space',
    defaultValue: '0px',
    unit: px
  },
  left: {
    properties: ['left'],
    scale: 'space',
    defaultValue: '0px',
    unit: px
  },
  right: {
    properties: ['right'],
    scale: 'space',
    defaultValue: '0px',
    unit: px
  }
}

module.exports = { str, px, percentOrPixel, aliases }
