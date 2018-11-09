// The order branch of the state tree keeps track of the "stack" of frames to
// determine the order in which they should be rendered. This keeps an ordered
// list of shapeIDs. Shapes are laid out in increasing order of "height", meaning
// shapes at the end of the list appear above shapes at the beginning.
export type OrderState = string[];

export enum OrderAction {
  UpdateOrder = 'ORDER_UPDATE_ORDER',
};
