export enum Using {
  Function = 'USING_FN',
  Constant = 'USING_CONST',
};

export interface VirtualFormula {
  using: Using;
  fn?: string;
  const?: string;
};

// A FunctionValue is nested list of numbers. Each level of nesting corresponds to the
// value of an argument supplied to the function. For example, in the simplest function
// we supply one argument, t, which corresponds to the frame index. In that case, we the
// type of `values` is number[].
// If we add two repeaters to the shape, we get a function with three arguments (e.g. t,
// i, and j). Now, the type of `values` is Array<Array<Array<number>>>.
export interface FunctionValue extends Array<number | FunctionValue> { };
export interface FunctionFormula extends VirtualFormula {
  using: Using.Function;
  values: FunctionValue;
};

export interface ConstFormula extends VirtualFormula {
  using: Using.Constant;
  values: number[];
};

export type FormulaValue = number[] | FunctionValue;
export type Formula = FunctionFormula | ConstFormula;
