// @flow

import {
  REPEATER_ADD_REPEATER,
  REPEATER_DELETE_REPETITION,
  REPEATER_UPDATE_REPEATER,
} from '../types/repeaters';
import type {
  RepeaterAddRepeaterType,
  RepeaterDeleteRepetitionType,
  RepeaterUpdateRepeaterType,
} from '../types/repeaters';

export type AddRepeaterActionType = {
  type: RepeaterAddRepeaterType,
  key: string,
};
export type AddRepeaterType = (key: string) => AddRepeaterActionType;
export const addRepeater = (key: string): AddRepeaterActionType => ({
  type: REPEATER_ADD_REPEATER,
  key,
});

export type DeleteRepetitionActionType = {
  type: RepeaterDeleteRepetitionType,
  key: string,
  index: number,
};
export type DeleteRepetitionType = (
  key: string,
  index: number,
) => DeleteRepetitionActionType;
export const deleteRepetition = (
  key: string,
  index: number,
): DeleteRepetitionActionType => ({
  type: REPEATER_DELETE_REPETITION,
  key,
  index,
});

export type UpdateRepeaterActionType = {
  type: RepeaterUpdateRepeaterType,
  key: string,
  index: number,
  times: number,
  variable: string,
};
export type UpdateRepeaterType = (
  key: string,
  index: number,
  times: number,
  variable: string,
) => UpdateRepeaterActionType;
export const updateRepeater = (
  key: string,
  index: number,
  times: number,
  variable: string,
): UpdateRepeaterActionType => ({
  type: REPEATER_UPDATE_REPEATER,
  key,
  index,
  times,
  variable,
});
