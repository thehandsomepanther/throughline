export enum Using {
  Custom = 'USING_CUSTOM',
  Function = 'USING_FN',
  Constant = 'USING_CONST',
}

export type ConstValue = number
export type FunctionValue = string
export type CustomValue = Array<number>

export type Property = {
  using: Using,
  const?: ConstValue,
  custom?: CustomValue,
  fn?: FunctionValue,
};

export type PropertyValues = Array<number>;
