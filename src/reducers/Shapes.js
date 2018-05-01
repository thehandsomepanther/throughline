// @flow

import { USING_CONST, USING_CUSTOM } from '../types/properties';
import { SHAPE_RECT } from '../types/shapes';
import type { ShapesStateType } from '../types/shapes';

const temp: Array<number> = [];

for (let i = 0; i < 60; i += 1) {
  if (i < 30) {
    temp.push(100 + i);
  } else {
    temp.push(160 - i);
  }
}

const initialState: ShapesStateType = {
  test1: {
    type: SHAPE_RECT,
    posX: {
      using: USING_CUSTOM,
      const: 100,
      custom: temp,
      fn: null,
    },
    posY: {
      using: USING_CONST,
      const: 100,
      custom: null,
      fn: null,
    },
    width: {
      using: USING_CONST,
      const: 100,
      custom: null,
      fn: null,
    },
    height: {
      using: USING_CONST,
      const: 100,
      custom: null,
      fn: null,
    },
    fillR: {
      using: USING_CONST,
      const: 41,
      custom: null,
      fn: null,
    },
    fillG: {
      using: USING_CONST,
      const: 41,
      custom: null,
      fn: null,
    },
    fillB: {
      using: USING_CONST,
      const: 41,
      custom: null,
      fn: null,
    },
  },
  test2: {
    type: SHAPE_RECT,
    posX: {
      using: USING_CONST,
      const: 150,
      custom: null,
      fn: null,
    },
    posY: {
      using: USING_CONST,
      const: 150,
      custom: null,
      fn: null,
    },
    width: {
      using: USING_CONST,
      const: 100,
      custom: null,
      fn: null,
    },
    height: {
      using: USING_CONST,
      const: 100,
      custom: null,
      fn: null,
    },
    fillR: {
      using: USING_CONST,
      const: 0,
      custom: null,
      fn: null,
    },
    fillG: {
      using: USING_CONST,
      const: 0,
      custom: null,
      fn: null,
    },
    fillB: {
      using: USING_CONST,
      const: 0,
      custom: null,
      fn: null,
    },
  },
};

export default (
  state: ShapesStateType = initialState,
  action: { type: string },
): ShapesStateType => {
  switch (action.type) {
    default:
      return state;
  }
};
