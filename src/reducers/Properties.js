// @flow

import type { PropertiesState } from '../types/properties';

const initialState: PropertiesState = {
  test: {
    xPosition: 100,
    yPosition: 100,
    fill: '#000000',
  },
};

export default (
  state: PropertiesState = initialState,
  action: { type: string }
) => {
  switch (action.type) {
    default:
      return state;
  }
};
