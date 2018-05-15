// @flow

export const rgbToHex = (r: number, g: number, b: number): string =>
  `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
