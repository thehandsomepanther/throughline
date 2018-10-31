export enum Using {
  Custom = 'USING_CUSTOM',
  Function = 'USING_FN',
  Constant = 'USING_CONST',
}

export type Property = {
  using: Using,
  const?: string | number,
  custom?: Array<number>,
  fn?: string,
};

export type PropertyValues = Array<number>;
