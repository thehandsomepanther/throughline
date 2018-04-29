// @flow

type Property = {
  +xPosition: string
};

type PropertiesState = {
  +[key: string]: Property
};

const initialState = {};

export default (
  state: PropertiesState = initialState,
  action: { type: string }
) => {
  switch (action.type) {
    default:
      return state;
  }
};
