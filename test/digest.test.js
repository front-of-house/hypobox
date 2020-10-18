const { digest, theme } = require('../')

module.exports = (test, assert) => {
  test('base style', () => {
    const { style } = digest({}, theme)
    assert.equal(style.position, 'relative')
  })

  test('no units', () => {
    const { style } = digest(
      {
        o: 0,
        z: 0
      },
      {}
    )
    assert.strictEqual(style.order, '0')
    assert.strictEqual(style.zIndex, '0')
  })

  test('scale by index', () => {
    const { style } = digest(
      {
        pl: 0,
        w: 0
      },
      {
        space: [2, 4, 8],
        width: ['200px', '400px']
      }
    )
    assert.equal(style.paddingLeft, '2px')
    assert.equal(style.width, '200px')
  })

  test('px value off scale', () => {
    const { style } = digest(
      {
        pl: 10,
        w: 300
      },
      {
        space: [2, 4, 8],
        width: ['200px', '400px']
      }
    )
    assert.equal(style.paddingLeft, '10px')
    assert.equal(style.width, '300px')
  })

  test('px value ignores string', () => {
    const { style } = digest(
      {
        pl: '20px',
        w: '300px'
      },
      {
        space: [2, 4, 8],
        width: ['200px', '400px']
      }
    )
    assert.equal(style.paddingLeft, '20px')
    assert.equal(style.width, '300px')
  })

  test('width 50%', () => {
    const { style } = digest(
      {
        w: 1 / 2
      },
      {}
    )
    assert.equal(style.width, '50%')
  })
  test('width 100%', () => {
    const { style } = digest(
      {
        w: 1
      },
      {}
    )
    assert.equal(style.width, '100%')
  })

  test('object scale', () => {
    const { style } = digest(
      {
        pl: 'sm',
        w: 'sm'
      },
      {
        space: { sm: '8px' },
        width: { sm: '200px' }
      }
    )
    assert.equal(style.paddingLeft, '8px')
    assert.equal(style.width, '200px')
  })

  test('booleans', () => {
    const { style } = digest(
      {
        top: true,
        f: true
      },
      {}
    )
    assert.equal(style.top, '0px')
    assert.equal(style.display, 'flex')
  })

  test('positioning', () => {
    const { style } = digest(
      {
        top: 0
      },
      {
        space: [2]
      }
    )
    assert.equal(style.top, '2px')
  })

  test('multi-prop', () => {
    const { style } = digest(
      {
        px: [0, 1, 2]
      },
      {
        breakpoints: ['100px', '200px', '300px'],
        space: [2, 4, 8]
      }
    )
    assert.equal(style.paddingLeft, '2px')
    assert.equal(style.paddingRight, '2px')
    assert.equal(
      style[`@media screen and (min-width: 100px)`].paddingLeft,
      '4px'
    )
    assert.equal(
      style[`@media screen and (min-width: 100px)`].paddingRight,
      '4px'
    )
    assert.equal(
      style[`@media screen and (min-width: 200px)`].paddingLeft,
      '8px'
    )
    assert.equal(
      style[`@media screen and (min-width: 200px)`].paddingRight,
      '8px'
    )
  })

  test('negative ints', () => {
    const { style } = digest(
      {
        top: -1
      },
      {
        space: [0, 2]
      }
    )
    assert.equal(style.top, '-2px')
  })

  test('exploded props', () => {
    const { style } = digest(
      {
        p: 1,
        m: 1
      },
      {
        space: [0, 2]
      }
    )
    assert.equal(style.paddingTop, '2px')
    assert.equal(style.paddingBottom, '2px')
    assert.equal(style.paddingLeft, '2px')
    assert.equal(style.paddingRight, '2px')

    assert.equal(style.marginTop, '2px')
    assert.equal(style.marginBottom, '2px')
    assert.equal(style.marginLeft, '2px')
    assert.equal(style.marginRight, '2px')
  })

  test('margin/padding precendence', () => {
    const { style } = digest(
      {
        pl: 0,
        p: 1,
        pr: 0,
        ml: 0,
        m: 1,
        mr: 0
      },
      {
        space: [0, 2]
      }
    )
    assert.equal(style.paddingTop, '2px')
    assert.equal(style.paddingBottom, '2px')
    assert.equal(style.paddingLeft, '2px')
    assert.equal(style.paddingRight, '0px')

    assert.equal(style.marginTop, '2px')
    assert.equal(style.marginBottom, '2px')
    assert.equal(style.marginLeft, '2px')
    assert.equal(style.marginRight, '0px')
  })
}
