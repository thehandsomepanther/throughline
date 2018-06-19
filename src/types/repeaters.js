// @flow

export const REPEATER_ADD_REPEATER = 'REPEATER_ADD_REPEATER';
export type RepeaterAddRepeaterType = 'REPEATER_ADD_REPEATER';

export const REPEATER_DELETE_REPEATER = 'REPEATER_DELETE_REPEATER';
export type RepeaterDeleteRepeaterType = 'REPEATER_DELETE_REPEATER';

export const REPEATER_UPDATE_REPEATER = 'REPEATER_UPDATE_REPEATER';
export type RepeaterUpdateRepeaterType = 'REPEATER_UPDATE_REPEATER';

export type RepeaterType = {
  +[key: string]: number,
};

export type RepeatersStateType = {
  +[key: string]: RepeaterType,
};
