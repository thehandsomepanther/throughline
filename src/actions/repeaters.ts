import { RepeatersAction } from '../types/repeaters';

export interface AddRootRepeaterAction {
  type: RepeatersAction.AddRootRepeater;
  shapeID: string;
}
export const addRootRepeater = (shapeID: string): AddRootRepeaterAction => ({
  type: RepeatersAction.AddRootRepeater,
  shapeID
});

export interface AddChildRepeaterAction {
  type: RepeatersAction.AddChildRepeater;
  repeaterID: string;
}
export const addChildRepeater = (
  repeaterID: string
): AddChildRepeaterAction => ({
  type: RepeatersAction.AddChildRepeater,
  repeaterID
});

export interface DeleteRepeaterAction {
  type: RepeatersAction.DeleteRepeater;
  repeaterID: string;
}
export const deleteRepeater = (repeaterID: string): DeleteRepeaterAction => ({
  type: RepeatersAction.DeleteRepeater,
  repeaterID
});

export interface UpdateRepeaterAction {
  type: RepeatersAction.UpdateRepeater;
  repeaterID: string;
  times: number;
  variable: string;
}
export const updateRepeater = (
  repeaterID: string,
  times: number,
  variable: string
): UpdateRepeaterAction => ({
  type: RepeatersAction.UpdateRepeater,
  repeaterID,
  times,
  variable
});
