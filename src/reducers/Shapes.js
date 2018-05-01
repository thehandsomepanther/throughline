// @flow

import type { ShapesStateType } from '../types/shapes';

const initialState: ShapesStateType = {
  test: 'SHAPE_RECT',
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
