export enum RepeatersAction {
  AddRepeater = 'REPEATER_ADD_REPEATER',
  DeleteRepetition = 'REPEATER_DELETE_REPETITION',
  UpdateRepeater = 'REPEATER_UPDATE_REPEATER',
}

export interface Repetition {
  times: number;
  variable: string;
}

export type Repeater = Repetition[];

export interface RepeatersState {
  [shapeID: string]: Repeater;
}
