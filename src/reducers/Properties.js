// @flow

import type { PropertiesStateType } from '../types/properties';

const initialState: PropertiesStateType = {
  test1: {
    xPosition: 100,
    yPosition: 100,
    width: 100,
    height: 100,
    fill: '#f1f1f1',
  },
  test2: {
    xPosition: 150,
    yPosition: 150,
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
