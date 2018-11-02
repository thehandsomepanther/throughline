// The order branch of the state tree keeps track of the "stack" of frames to
// determine the order in which they should be rendered. This keeps an ordered
// list of shapeIDs.
export type OrderState = Array<string>;

export enum OrderAction {
  UpdateOrder = 'ORDER_UPDATE_ORDER',
};
