// @flow
/* global Worker */

import { USING_CONST, USING_CUSTOM, USING_FN } from '../types/properties';
import { SHAPE_RECT } from '../types/shapes';
import { rgbToHex } from './';
import type { ShapeType } from '../types/shapes';
import type { PropertyType } from '../types/properties';

export const evalFunctionProp = (fn: string, t: number): Promise<number> => {
  let worker: ?Worker = new Worker('worker.js');

  return new Promise(
    (resolve: (val: number) => void, reject: (reason: Error) => void) => {
      if (worker) {
        const timeout = setTimeout(() => {
          if (worker) {
            worker.terminate();
            worker = null;
          }
          reject(new Error('Timeout'));
        }, 1500);

        worker.postMessage([`(function(t){${fn}})(${t})`]);

        worker.onmessage = (e: MessageEvent) => {
          clearTimeout(timeout);
          resolve(parseInt(e.data, 10));
        };

        worker.onerror = (e: ErrorEvent) => {
          clearTimeout(timeout);
          reject(new Error(e.message));
        };
      }
    },
  );
};

export const calcPropValue = (
  prop: PropertyType,
  t: number,
): Promise<number> => {
  switch (prop.using) {
    case USING_CONST:
      if (prop.const === null || prop.const === undefined) {
        throw new Error('Tried to use const value of prop when none exists.');
      }
      return Promise.resolve(prop.const);
    case USING_CUSTOM:
      if (!prop.custom) {
        throw new Error('Tried to use custom value of prop when none exists.');
      }
      return Promise.resolve(prop.custom[t]);
    case USING_FN:
      return evalFunctionProp(prop.fn || '', t);
    default:
      throw new Error(`Tried to use unexpected prop: ${prop.using}`);
  }
};

export const drawShape = (
  shape: ShapeType,
  ctx: CanvasRenderingContext2D,
  t: number,
  handleCalcPropError: (prop: string) => void,
) => {
  switch (shape.type) {
    case SHAPE_RECT:
      Promise.all([
        calcPropValue(shape.fillR, t).catch(() => {
          handleCalcPropError('fillR');
        }),
        calcPropValue(shape.fillG, t).catch(() => {
          handleCalcPropError('fillG');
        }),
        calcPropValue(shape.fillB, t).catch(() => {
          handleCalcPropError('fillB');
        }),
        calcPropValue(shape.posX, t).catch(() => {
          handleCalcPropError('posX');
        }),
        calcPropValue(shape.posY, t).catch(() => {
          handleCalcPropError('posY');
        }),
        calcPropValue(shape.width, t).catch(() => {
          handleCalcPropError('width');
        }),
        calcPropValue(shape.height, t).catch(() => {
          handleCalcPropError('height');
        }),
      ]).then((values: Array<number>) => {
        const [fillR, fillG, fillB, posX, posY, width, height] = values;
        ctx.fillStyle = rgbToHex(fillR, fillG, fillB);
        ctx.fillRect(posX, posY, width, height);
      });
      break;
    default:
  }
};
