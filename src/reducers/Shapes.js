// @flow

import type { ShapesState } from '../types/shapes';

const initialState: ShapesState = {
  test: 'SHAPE_RECT',
};

export default (
  state: ShapesState = initialState,
  action: { type: string }
) => {
  switch (action.type) {
    default:
      return state;
  }
};
