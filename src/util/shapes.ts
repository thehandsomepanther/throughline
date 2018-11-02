import { toNumber, range } from 'lodash';
import { Using } from '../types/formulas';
import { shapeTypeToProperties } from '../types/shapes';
import { Shape } from '../types/shapes';
import { Formula } from '../types/formulas';

export const evalFunctionProp = (
  fn: string,
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

        worker.postMessage([
          `(function(){return ${JSON.stringify(
            range(frames)
          )}.map(function(t){${fn}})})()`
        ]);

        worker.onmessage = (e) => {
          clearTimeout(timeout);
          const values = JSON.parse(e.data);
          values.forEach((value?: number) => {
            if (Number.isNaN(toNumber(value))) {
              reject(
                new Error(
                  'Expression evaluated to something other than an number'
                )
              );
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
  prop: Formula,
  frames: number
): Promise<number[]> => {
  switch (prop.using) {
    case Using.Constant:
      if (prop.const === null || prop.const === undefined) {
        throw new Error('Tried to use const value of prop when none exists.');
      }

      return evalConstProp(`${prop.const}`, frames);
    case Using.Custom:
      if (!prop.custom) {
        throw new Error('Tried to use custom value of prop when none exists.');
      }

      return Promise.resolve(prop.custom);
    case Using.Function:
      return evalFunctionProp(prop.fn || '', frames);
    default:
      throw new Error(`Tried to use unexpected prop: ${prop.using}`);
  }
};

// Given a shape, calculates the values for its provided formulas at a given frame.
export const calcShapeValues = (
  shape: Shape,
  frames: number,
  handleCalcPropError: (prop: string) => void
): Promise<{ [key: string]: number[] }> =>
  new Promise(
    (
      resolve: (val: { [key: string]: number[] }) => void,
      reject: (reason: Error) => void
    ) => {
      const propsKeys = shapeTypeToProperties[shape.type];

      // TODO: because calcShapeValues only gets called on init (and all subsequent
      // updates are handled using calcFormulaValues), this error handling doesn't
      // actually render any props in the props editor (and also no error messages)
      // if there's an error in one of them. need to figure out a better way to handle that
      Promise.all(
        propsKeys.map(
          (prop: string): Promise<number[] | null> =>
            calcFormulaValues(shape.formulas[prop], frames).catch(
              (): Promise<null> => {
                handleCalcPropError(prop);
                return Promise.resolve(null);
              }
            )
        )
      ).then((values: Array<number[] | null>) => {
        let shouldResolve = true;
        for (const value of values) {
          if (value == null) {
            shouldResolve = false;
            break;
          }
        }

        if (shouldResolve) {
          resolve(
            // we know that all the values in the resolved object will be of type
            // number[] because of the for loop above, but Flow isn't smart
            // enough to know that
            values.reduce(
              (
                acc: { [key: string]: number[] },
                curr: number[],
                i: number
              ): { [key: string]: number[] } => ({
                ...acc,
                [propsKeys[i]]: curr
              }),
              {}
            )
          );
        } else {
          reject(new Error('Some shapes have invalid props'));
        }
      });
    }
  );
