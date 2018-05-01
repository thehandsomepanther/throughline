// @flow

import type { PropertiesStateType } from '../types/properties';

const initialState: PropertiesStateType = {
  test: {
    xPosition: 100,
    yPosition: 100,
    width: 100,
    height: 100,
    fill: '#000000',
  },
};

export default (
  state: PropertiesStateType = initialState,
  action: { type: string },
): PropertiesStateType => {
  switch (action.type) {
    default:
      return state;
  }
};
