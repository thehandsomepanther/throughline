// @flow

type Shape = "RECT" | "ELLIPSE" | "CIRCLE";

type ShapesState = {
  +[key: string]: Shape
};

const initialState: ShapesState = {};

export default (
  state: ShapesState = initialState,
  action: { type: string }
) => {
  switch (action.type) {
    default:
      return state;
  }
};
