// @flow

export const rgbToHex = (r: number, g: number, b: number): string =>
  `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
