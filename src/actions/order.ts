import { OrderAction } from '../types/order';

export interface UpdateOrderAction {
  type: OrderAction.UpdateOrder;
  oldIndex: number;
  newIndex: number;
}
export const updateOrder = (
  oldIndex: number,
  newIndex: number
): UpdateOrderAction => ({
  type: OrderAction.UpdateOrder,
  oldIndex,
  newIndex
});
