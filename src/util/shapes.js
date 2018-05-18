// @flow
/* global Worker */

import { USING_CONST, USING_CUSTOM, USING_FN } from '../types/properties';
import { SHAPE_RECT } from '../types/shapes';
import type { ShapeType } from '../types/shapes';
import type { PropertyType } from '../types/properties';

export const evalFunctionProp = (
  fn: string,
  frames: number,
): Promise<Array<number>> => {
  let worker: ?Worker = new Worker('worker.js');
  const frameIndices = [];
  for (let i = 0; i < frames; i += 1) {
    frameIndices.push(i);
  }

  return new Promise(
    (
      resolve: (val: Array<number>) => void,
      reject: (reason: Error) => void,
    ) => {
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
            frameIndices,
          )}.map(function(t){${fn}})})()`,
        ]);

        worker.onmessage = (e: MessageEvent) => {
          clearTimeout(timeout);
          const values = JSON.parse(e.data);
          values.forEach((value: ?number) => {
            if (typeof value !== 'number') {
              reject(new Error(e.message));
            }
          });
          resolve(JSON.parse(e.data));
        };

        worker.onerror = (e: ErrorEvent) => {
          clearTimeout(timeout);
          reject(new Error(e.message));
        };
      }
    },
  );
};

export const calcPropValues = (
  prop: PropertyType,
  frames: number,
): Promise<Array<number>> => {
  switch (prop.using) {
    case USING_CONST:
      if (prop.const === null || prop.const === undefined) {
        throw new Error('Tried to use const value of prop when none exists.');
      }
      const values = [];
      for (let i = 0; i < frames; i += 1) {
        values.push(prop.const || 0);
      }

      return Promise.resolve(values);
    case USING_CUSTOM:
      if (!prop.custom) {
        throw new Error('Tried to use custom value of prop when none exists.');
      }

      return Promise.resolve(prop.custom);
    case USING_FN:
      return evalFunctionProp(prop.fn || '', frames);
    default:
      throw new Error(`Tried to use unexpected prop: ${prop.using}`);
  }
};

export const calcShapeValues = (
  shape: ShapeType,
  frames: number,
  handleCalcPropError: (prop: string) => void,
): Promise<{ [key: string]: Array<number> }> =>
  new Promise(
    (
      resolve: (val: { [key: string]: Array<number> }) => void,
      reject: (reason: Error) => void,
    ) => {
      switch (shape.type) {
        case SHAPE_RECT:
          Promise.all([
            calcPropValues(shape.fillR, frames).catch(() => {
              handleCalcPropError('fillR');
            }),
            calcPropValues(shape.fillG, frames).catch(() => {
              handleCalcPropError('fillG');
            }),
            calcPropValues(shape.fillB, frames).catch(() => {
              handleCalcPropError('fillB');
            }),
            calcPropValues(shape.posX, frames).catch(() => {
              handleCalcPropError('posX');
            }),
            calcPropValues(shape.posY, frames).catch(() => {
              handleCalcPropError('posY');
            }),
            calcPropValues(shape.width, frames).catch(() => {
              handleCalcPropError('width');
            }),
            calcPropValues(shape.height, frames).catch(() => {
              handleCalcPropError('height');
            }),
          ]).then((values: Array<?Array<number>>) => {
            let shouldResolve = true;
            for (let i = 0; i < values.length; i += 1) {
              if (values[i] === undefined) {
                shouldResolve = false;
                break;
              }
            }

            if (shouldResolve) {
              const [fillR, fillG, fillB, posX, posY, width, height] = values;

              // we know that all the values in the resolved object will be of type
              // Array<number> because of the for loop above, but Flow isn't smart
              // enough to know that
              // $FlowFixMe
              resolve({
                fillR,
                fillG,
                fillB,
                posX,
                posY,
                width,
                height,
              });
            } else {
              reject(new Error('Some shapes have invalid props'));
            }
          });
          break;
        default:
      }
    },
  );
