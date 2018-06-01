// @flow

import { USING_CONST, USING_CUSTOM, USING_FN } from '../types/properties';
import { SHAPE_RECT } from '../types/shapes';
import type { ShapesStateType } from '../types/shapes';
import type { ActionType } from '../actions';

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
    name: 'test1',
    posX: {
      using: USING_FN,
      const: 100,
      custom: temp,
      fn: 'return Math.sin(t * 2 * Math.PI / 60) * 100 + 100',
    },
    posY: {
      using: USING_FN,
      const: 100,
      custom: temp,
      fn: 'return Math.cos(t * 2 * Math.PI / 60) * 100 + 100',
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
      const: 241,
      custom: null,
      fn: null,
    },
    fillG: {
      using: USING_CONST,
      const: 241,
      custom: null,
      fn: null,
    },
    fillB: {
      using: USING_CONST,
      const: 241,
      custom: null,
      fn: null,
    },
    rotation: {
      using: USING_CONST,
      const: 0,
      custom: null,
      fn: null,
    },
  },
  test2: {
    type: SHAPE_RECT,
    name: 'test2',
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
    rotation: {
      using: USING_CONST,
      const: 0,
      custom: null,
      fn: null,
    },
  },
  test3: {
    type: SHAPE_RECT,
    name: 'test3',
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
    rotation: {
      using: USING_CONST,
      const: 0,
      custom: null,
      fn: null,
    },
  },
  test4: {
    type: SHAPE_RECT,
    name: 'test4',
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
    rotation: {
      using: USING_CONST,
      const: 0,
      custom: null,
      fn: null,
    },
  },
  test5: {
    type: SHAPE_RECT,
    name: 'test5',
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
    rotation: {
      using: USING_CONST,
      const: 0,
      custom: null,
      fn: null,
    },
  },
};

export default (
  state: ShapesStateType = initialState,
  action: ActionType,
): ShapesStateType => {
  switch (action.type) {
    case 'SHAPE_UPDATE_USING':
      return {
        ...state,
        [action.shape]: {
          ...state[action.shape],
          [action.prop]: {
            ...state[action.shape][action.prop],
            using: action.using,
          },
        },
      };
    case 'SHAPE_UPDATE_CONST':
      return {
        ...state,
        [action.shape]: {
          ...state[action.shape],
          [action.prop]: {
            ...state[action.shape][action.prop],
            const: action.value || 0,
          },
        },
      };
    case 'SHAPE_UPDATE_FN':
      return {
        ...state,
        [action.shape]: {
          ...state[action.shape],
          [action.prop]: {
            ...state[action.shape][action.prop],
            fn: action.value || '',
          },
        },
      };
    default:
      return { ...state };
  }
};
