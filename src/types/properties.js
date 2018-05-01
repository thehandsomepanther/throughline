// @flow

export type PropertyType = {
  +xPosition: number,
  +yPosition: number,
  +fill: string,
  +width: number,
  +height: number,
};

export type PropertiesStateType = {
  +[key: string]: PropertyType,
};
