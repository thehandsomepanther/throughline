// @flow

import type { OrderStateType } from '../types/order';

const initialState: OrderStateType = ['test'];

export default (
  state: OrderStateType = initialState,
  action: { type: string },
): OrderStateType => {
  switch (action.type) {
    default:
      return state;
  }
};
