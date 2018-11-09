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
export const AddChildRepeater = (
  repeaterID: string
): AddChildRepeaterAction => ({
  type: RepeatersAction.AddChildRepeater,
  repeaterID
});

export interface DeleteRepeaterAction {
  type: RepeatersAction.DeleteRepeater;
  id: string;
}
export const deleteRepeater = (id: string): DeleteRepeaterAction => ({
  type: RepeatersAction.DeleteRepeater,
  id
});

export interface UpdateRepeaterAction {
  type: RepeatersAction.UpdateRepeater;
  id: string;
  times: number;
  variable: string;
}
export const updateRepeater = (
  id: string,
  times: number,
  variable: string
): UpdateRepeaterAction => ({
  type: RepeatersAction.UpdateRepeater,
  id,
  times,
  variable
});
