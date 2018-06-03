// @flow

export const USING_CUSTOM = 'USING_CUSTOM';
export const USING_FN = 'USING_FN';
export const USING_CONST = 'USING_CONST';

export type UsingCustomType = 'USING_CUSTOM';
export type UsingFunctionType = 'USING_FN';
export type UsingConstantType = 'USING_CONST';

export type UsingType = UsingCustomType | UsingFunctionType | UsingConstantType;

export type PropertyType = {
  +using: UsingType,
  +const: ?string | ?number,
  +fn: ?string,
  +custom: ?Array<number>,
};

export type PropertyValuesType = Array<number>;
