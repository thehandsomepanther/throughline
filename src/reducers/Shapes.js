// @flow

import { SHAPE_RECT } from '../types/shapes';
import type { ShapesStateType } from '../types/shapes';

const initialState: ShapesStateType = {
  test1: {
    type: SHAPE_RECT,
    xPosition: 100,
    yPosition: 100,
    width: 100,
    height: 100,
    fill: '#f1f1f1',
  },
  test2: {
    type: SHAPE_RECT,
    xPosition: 150,
    yPosition: 150,
    width: 100,
    height: 100,
    fill: '#000000',
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
