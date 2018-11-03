export enum Using {
  Custom = 'USING_CUSTOM',
  Function = 'USING_FN',
  Constant = 'USING_CONST',
}

export type ConstValue = number
export type FunctionValue = string
export type CustomValue = number[]

export interface Formula {
  using: Using;
  const?: ConstValue;
  custom?: CustomValue;
  fn?: FunctionValue;
}
