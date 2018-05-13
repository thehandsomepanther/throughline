// @flow

import { USING_CONST, USING_CUSTOM, USING_FN } from '../types/properties';
import { SHAPE_RECT } from '../types/shapes';
import { rgbToHex } from './';
import type { ShapeType } from '../types/shapes';
import type { PropertyType } from '../types/properties';

export const evalFunctionProp = (fn: string, t: number): Promise<number> => {
  let worker: any = new Worker('worker.js');

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      worker.terminate();
      worker = null;
      reject('Timeout');
    }, 1500);

    worker.postMessage([`(function(t){${fn}})(${t})`]);

    worker.onmessage = (e) => {
      clearTimeout(timeout);
      resolve(e.data);
    };

    worker.onerror = (e) => {
      clearTimeout(timeout);
      reject(e.message);
    };
  });
};

export const calcPropValue = (prop: PropertyType, t: number): Promise<number> =>
  new Promise((resolve, reject): Promise<number> => {
    switch (prop.using) {
      case USING_CONST:
        if (prop.const === null || prop.const === undefined) {
          throw new Error('Tried to use const value of prop when none exists.');
        }
        resolve(prop.const);
        break;
      case USING_CUSTOM:
        if (!prop.custom) {
          throw new Error(
            'Tried to use custom value of prop when none exists.',
          );
        }
        resolve(prop.custom[t]);
        break;
      case USING_FN:
        if (!prop.fn) {
          throw new Error(
            'Tried to use function value of prop when none exists.',
          );
        }
        resolve(evalFunctionProp(prop.fn, t));
        break;
      default:
        throw new Error(`Tried to use unexpected prop: ${prop.using}`);
    }
  });

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
