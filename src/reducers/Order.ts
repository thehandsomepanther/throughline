import { shapesInitialState } from './Shapes';
import { OrderState, OrderAction } from '../types/order';
import { Action } from '../actions';
import { ShapesAction } from '../types/shapes';

export const orderInitialState: OrderState = Object.keys(shapesInitialState);

export default (
  state: OrderState = orderInitialState,
  action: Action,
): OrderState => {
  let newState;
  switch (action.type) {
    case OrderAction.UpdateOrder:
      newState = [...state];
      newState.splice(action.oldIndex, 1);
      newState.splice(action.newIndex, 0, state[action.oldIndex]);
      return newState;
    case ShapesAction.NewShape:
      return [...state, action.id];
    case ShapesAction.DeleteShape:
      const { id } = action;
      return state.filter((value: string): boolean => value !== id);
    default:
      return state;
  }
};
