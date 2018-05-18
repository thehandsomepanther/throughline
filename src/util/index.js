// @flow

export const rgbToHex = (r: number, g: number, b: number): string =>
  `#${Math.floor(r)
    .toString(16)
    .padStart(2, '0')}${Math.floor(g)
    .toString(16)
    .padStart(2, '0')}${Math.floor(b)
    .toString(16)
    .padStart(2, '0')}`;
