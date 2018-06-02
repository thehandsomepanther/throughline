// @flow

import { shapesInitialState } from './Shapes';
import type { OrderStateType } from '../types/order';
import type { ActionType } from '../actions';

export const orderInitialState: OrderStateType = Object.keys(
  shapesInitialState,
);

export default (
  state: OrderStateType = orderInitialState,
  action: ActionType,
): OrderStateType => {
  let newState;
  switch (action.type) {
    case 'ORDER_UPDATE_ORDER':
      newState = [...state];
      newState.splice(action.oldIndex, 1);
      newState.splice(action.newIndex, 0, state[action.oldIndex]);
      return newState;
    case 'SHAPE_NEW_SHAPE':
      return [...state, action.id];
    default:
      return state;
  }
};
