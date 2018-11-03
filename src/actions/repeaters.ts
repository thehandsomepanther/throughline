import { RepeatersAction } from '../types/repeaters';

export interface AddRepeaterAction {
  type: RepeatersAction.AddRepeater;
  key: string;
}
export const addRepeater = (key: string): AddRepeaterAction => ({
  type: RepeatersAction.AddRepeater,
  key
});

export interface DeleteRepetitionAction {
  type: RepeatersAction.DeleteRepetition;
  key: string;
  index: number;
}
export const deleteRepetition = (
  key: string,
  index: number
): DeleteRepetitionAction => ({
  type: RepeatersAction.DeleteRepetition,
  key,
  index
});

export interface UpdateRepeaterAction {
  type: RepeatersAction.UpdateRepeater;
  key: string;
  index: number;
  times: number;
  variable: string;
}
export const updateRepeater = (
  key: string,
  index: number,
  times: number,
  variable: string
): UpdateRepeaterAction => ({
  type: RepeatersAction.UpdateRepeater,
  key,
  index,
  times,
  variable
});
