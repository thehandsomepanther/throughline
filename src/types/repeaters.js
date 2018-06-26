// @flow

export const REPEATER_ADD_REPEATER = 'REPEATER_ADD_REPEATER';
export type RepeaterAddRepeaterType = 'REPEATER_ADD_REPEATER';

export const REPEATER_DELETE_REPETITION = 'REPEATER_DELETE_REPETITION';
export type RepeaterDeleteRepetitionType = 'REPEATER_DELETE_REPETITION';

export const REPEATER_UPDATE_REPEATER = 'REPEATER_UPDATE_REPEATER';
export type RepeaterUpdateRepeaterType = 'REPEATER_UPDATE_REPEATER';

export type RepetitionType = {
  +times: number,
  +variable: string,
};

export type RepeaterType = ?Array<RepetitionType>;

export type RepeatersStateType = {
  +[key: string]: RepeaterType,
};
