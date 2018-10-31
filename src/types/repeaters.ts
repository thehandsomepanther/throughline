export enum RepeatersAction {
  AddRepeater = 'REPEATER_ADD_REPEATER',
  DeleteRepetition = 'REPEATER_DELETE_REPETITION',
  UpdateRepeater = 'REPEATER_UPDATE_REPEATER',
}

export type Repetition = {
  times: number,
  variable: string,
};

export type Repeater = Array<Repetition>;

export type RepeatersState = {
  [key: string]: Repeater,
};
