import { StyleObject } from 'styletron-standard'

export type Theme = {
  breakpoints: string[]
  [k: string]: number[] | string[] | { [k: string]: number | string }
}
