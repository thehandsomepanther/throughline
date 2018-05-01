// @flow

import { SHAPE_RECT } from '../types/shapes';
import type { ShapesStateType } from '../types/shapes';

const initialState: ShapesStateType = {
  test1: SHAPE_RECT,
  test2: SHAPE_RECT,
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
