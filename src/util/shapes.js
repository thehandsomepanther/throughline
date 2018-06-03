// @flow
/* global Worker */

import { toNumber } from 'lodash';
import { USING_CONST, USING_CUSTOM, USING_FN } from '../types/properties';
import { shapeTypeToProperties } from '../types/shapes';
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

      if (Number.isNaN(toNumber(prop.const))) {
        return Promise.reject(new Error('Const value is not a number'));
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
      const propsKeys = shapeTypeToProperties[shape.type];

      // TODO: because calcShapeValues only gets called on init (and all subsequent
      // updates are handled using calcPropValues), this error handling doesn't
      // actually render any props in the props editor (and also no error messages)
      // if there's an error in one of them. need to figure out a better way to handle that
      Promise.all(
        propsKeys.map((prop: string): Promise<?Array<number>> =>
          calcPropValues(shape[prop], frames).catch((): Promise<null> => {
            handleCalcPropError(prop);
            return Promise.resolve(null);
          }),
        ),
      ).then((values: Array<?Array<number>>) => {
        let shouldResolve = true;
        for (let i = 0; i < values.length; i += 1) {
          if (values[i] === null) {
            shouldResolve = false;
            break;
          }
        }

        if (shouldResolve) {
          resolve(
            // we know that all the values in the resolved object will be of type
            // Array<number> because of the for loop above, but Flow isn't smart
            // enough to know that
            // $FlowFixMe
            values.reduce(
              (
                acc: { [key: string]: Array<number> },
                curr: Array<number>,
                i: number,
              ): { [key: string]: Array<number> } => ({
                ...acc,
                [propsKeys[i]]: curr,
              }),
              {},
            ),
          );
        } else {
          reject(new Error('Some shapes have invalid props'));
        }
      });
    },
  );
