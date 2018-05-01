// @flow

import type { OrderStateType } from '../types/order';

const initialState: OrderStateType = ['test1', 'test2'];

export default (
  state: OrderStateType = initialState,
  action: { type: string },
): OrderStateType => {
  switch (action.type) {
    default:
      return state;
  }
};
