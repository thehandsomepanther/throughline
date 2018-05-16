// @flow

import type { OrderStateType } from '../types/order';
import type { ActionType } from '../actions';

const initialState: OrderStateType = [
  'test1',
  'test2',
  'test3',
  'test4',
  'test5',
];

export default (
  state: OrderStateType = initialState,
  action: ActionType,
): OrderStateType => {
  let newState;
  switch (action.type) {
    case 'ORDER_UPDATE_ORDER':
      newState = [...state];
      newState.splice(action.oldIndex, 1);
      newState.splice(action.newIndex, 0, state[action.oldIndex]);
      return newState;
    default:
      return state;
  }
};
