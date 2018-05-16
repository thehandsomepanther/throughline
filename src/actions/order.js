// @flow

import { ORDER_UPDATE_ORDER } from '../types/order';
import type { OrderUpdateOrderType } from '../types/order';

export type UpdateOrderActionType = {
  type: OrderUpdateOrderType,
  oldIndex: number,
  newIndex: number,
};
export type UpdateOrderType = (
  oldIndex: number,
  newIndex: number,
) => UpdateOrderActionType;
export const updateOrder = (
  oldIndex: number,
  newIndex: number,
): UpdateOrderActionType => ({
  type: ORDER_UPDATE_ORDER,
  oldIndex,
  newIndex,
});
