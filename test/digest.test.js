const { digest, theme } = require('../')

module.exports = (test, assert) => {
  test('base style', () => {
    const { style, attr } = digest({}, theme)
    assert.equal(style.position, 'relative')
  })

  test('no units', () => {
    const { style, attr } = digest(
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
    const { style, attr } = digest(
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
    const { style, attr } = digest(
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
    const { style, attr } = digest(
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
    const { style, attr } = digest(
      {
        w: 1 / 2
      },
      {}
    )
    assert.equal(style.width, '50%')
  })
  test('width 100%', () => {
    const { style, attr } = digest(
      {
        w: 1
      },
      {}
    )
    assert.equal(style.width, '100%')
  })

  test('object scale', () => {
    const { style, attr } = digest(
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
    const { style, attr } = digest(
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
    const { style, attr } = digest(
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
    const { style, attr } = digest(
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
    const { style, attr } = digest(
      {
        top: -1
      },
      {
        space: [0, 2]
      }
    )
    assert.equal(style.top, '-2px')
  })
}
