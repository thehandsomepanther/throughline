export enum RepeatersAction {
  AddRootRepeater = 'REPEATER_ADD_ROOT_REPEATER',
  AddChildRepeater = 'REPEATER_ADD_CHILD_REPEATER',
  DeleteRepeater = 'REPEATER_DELETE_REPEATER',
  UpdateRepeater = 'REPEATER_UPDATE_REPEATER',
};

export interface Repeater {
  times: number;
  variable: string;
  next: string | null;       // ID of next repeater
};

// The Repeaters branch of the state tree maps keys to repeaters. A key can
// be either a shape ID or a repeater ID.
// If the key is a shape ID, that means it's the root repeater for that shape.
// If it's a repeater ID, that means it's a child repeater (i.e. the repeater
// of a repeater).
export interface RepeatersState {
  [id: string]: Repeater;
};
