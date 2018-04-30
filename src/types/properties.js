// @flow

export type Property = {
  +xPosition: number,
  +yPosition: number,
  +fill: string,
};

export type PropertiesState = {
  +[key: string]: Property,
};
