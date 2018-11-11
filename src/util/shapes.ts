import { range, toNumber } from 'lodash';
import { Using } from '../types/formulas';
import { Formula } from '../types/formulas';
import { Repeater, RepeatersState } from '../types/repeaters';
import { Shape } from '../types/shapes';

const isNumberOrArrayOfNumbers = (value: any): boolean => {
  if (typeof value === 'number') {
    return true;
  }

  if (Array.isArray(value)) {
    return value.reduce((acc, curr) => acc && isNumberOrArrayOfNumbers(curr), true);
  }

  return false;
}

export const evalFunctionProp = (
  fn: string,
  frames: number,
  shapeID: string,
  repeaters: RepeatersState,
): Promise<number[]> => {
  let worker: Worker | null = new Worker('worker.js');

  let script = `(function(){return ${
    JSON.stringify(range(frames))}.map(function(t){${fn}})})()`;

  let repeater: Repeater | null = repeaters[shapeID];
  while (repeater) {
    script = `(function(){return ${
      JSON.stringify(range(repeater.times))
      }.map(function(${repeater.variable}){return ${script}})})()`;

    repeater = repeater.next ? repeaters[repeater.next] : null;
  }

  return new Promise(
    (resolve: (val: number[]) => void, reject: (reason: Error) => void) => {
      if (worker) {
        const timeout = setTimeout(() => {
          if (worker) {
            worker.terminate();
            worker = null;
          }
          reject(new Error('Timeout'));
        }, 2000);

        worker.postMessage([script]);

        worker.onmessage = (e) => {
          clearTimeout(timeout);
          const values = JSON.parse(e.data);
          values.forEach((value?: number) => {
            if (!isNumberOrArrayOfNumbers(value)) {
              reject(new Error('Expression evaluated to something other than an number'));
            }
          });
          resolve(values);
        };

        worker.onerror = (e) => {
          clearTimeout(timeout);
          reject(new Error(e.message));
        };
      }
    }
  );
};

export const evalConstProp = (
  value: string,
  frames: number
): Promise<number[]> => {
  let worker: Worker | null = new Worker('worker.js');

  return new Promise(
    (resolve: (val: number[]) => void, reject: (reason: Error) => void) => {
      if (worker) {
        const timeout = setTimeout(() => {
          if (worker) {
            worker.terminate();
            worker = null;
          }
          reject(new Error('Timeout'));
        }, 2000);

        worker.postMessage([`(function(){return ${value}})()`]);

        worker.onmessage = (e: MessageEvent) => {
          clearTimeout(timeout);
          const { data } = e;
          if (Number.isNaN(toNumber(data))) {
            reject(new Error('Const value is not a number'));
          }

          const values = [];
          for (let i = 0; i < frames; i += 1) {
            values.push(parseFloat(data));
          }
          resolve(values);
        };

        worker.onerror = (e) => {
          clearTimeout(timeout);
          reject(new Error(e.message));
        };
      }
    }
  );
};

export const calcFormulaValues = (
  shapeID: string,
  formula: Formula,
  frames: number,
  repeaters: RepeatersState,
): Promise<number[]> => {
  switch (formula.using) {
    case Using.Constant:
      if (formula.const == null) {
        throw new Error(
          'Tried to use const value of formula when none exists.'
        );
      }

      return evalConstProp(`${formula.const}`, frames);
    case Using.Custom:
      if (!formula.custom) {
        throw new Error(
          'Tried to use custom value of formula when none exists.'
        );
      }

      // Ensure that our custom formula has at least as many values as the number
      // of frames by padding out the formula as necessary
      while (formula.custom.length < frames) {
        formula.custom.push(formula.custom[formula.custom.length - 1]);
      }

      return Promise.resolve(formula.custom.slice(0, frames));
    case Using.Function:
      return evalFunctionProp(formula.fn || '', frames, shapeID, repeaters);
  }
};

// Given a shape, calculates the values for its provided formulas at every frame.
export const calcShapeValues = (
  shapeID: string,
  shape: Shape,
  frames: number,
  repeaters: RepeatersState,
  handleCalcPropError: (prop: string) => void
): Promise<{ [key: string]: number[] }> =>
  new Promise(
    (
      resolve: (val: { [key: string]: number[] }) => void,
      reject: (reason: Error) => void
    ) => {
      // TODO: because calcShapeValues only gets called on init (and all subsequent
      // updates are handled using calcFormulaValues), this error handling doesn't
      // actually render any props in the props editor (and also no error messages)
      // if there's an error in one of them. need to figure out a better way to handle that

      const promises = [];
      for (const propKey in shape.formulas) {
        if (!shape.formulas.hasOwnProperty(propKey)) {
          continue;
        }

        promises.push(
          calcFormulaValues(shapeID, shape.formulas[propKey], frames, repeaters)
            .then((values: number[]) => {
              return Promise.resolve({ [propKey]: values });
            })
            .catch(
              (): Promise<null> => {
                handleCalcPropError(propKey);
                return Promise.resolve(null);
              }
            )
        );
      }

      Promise.all(promises).then(
        (values: Array<{ [prop: string]: number[] } | null>) => {
          const shapeValues = values.reduce(
            (acc, curr) =>
              acc == null
                ? null
                : {
                  ...acc,
                  ...curr
                },
            {}
          );

          if (shapeValues != null) {
            resolve(shapeValues);
          } else {
            reject(new Error('Some shapes have invalid props'));
          }
        }
      );
    }
  );
