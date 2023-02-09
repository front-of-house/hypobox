import { h, Props } from 'hyposcript'
import { hypostyle, Hypostyle, HypostyleObject, HypostyleObjectOrFunction } from 'hypostyle'
import * as presets from 'hypostyle/presets'

export type As = keyof HTMLElementTagNameMap
export type BoxProps = {
  as?: As
  cx?: HypostyleObjectOrFunction
} & HypostyleObject &
  Props

let hypo = hypostyle(presets)

export function configure(hypostyle: Hypostyle) {
  hypo = hypostyle
}

export function flush() {
  return hypo.flush()
}

export function Box({ as = 'div', className = '', cx, ...props }: BoxProps) {
  var picked = hypo.pick<Omit<BoxProps, 'cx' | 'as'>>(props)
  var css = hypo.css({
    ...hypo.explode(picked.styles), // custom attr
    ...hypo.explode(cx || {}), // custom cx
  })

  return h(as, {
    ...picked.props,
    className: [className, css]
      .filter(Boolean)
      .map((s) => s.trim())
      .join(' '),
  })
}

export function compose(Element: As | Function, styles: HypostyleObjectOrFunction) {
  return (props: BoxProps) => {
    var picked = hypo.pick<BoxProps>(props)
    var cx = {
      ...hypo.explode(styles), // base
      ...hypo.explode(picked.styles), // custom attr
      ...hypo.explode(picked.props.cx || {}), // custom cx
    }

    return typeof Element === 'function' ? (
      <Element {...picked.props} cx={cx} />
    ) : (
      <Box as={Element} {...picked.props} cx={cx} />
    )
  }
}
