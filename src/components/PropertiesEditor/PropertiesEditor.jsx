// @flow

import * as React from 'react';
import uniqid from 'uniqid';
import { SHAPE_RECT_PROPS } from '../../types/shapes';
import { USING_CONST, USING_CUSTOM, USING_FN } from '../../types/properties';
import type { ShapesStateType, ShapeType } from '../../types/shapes';
import type { EditorStateType } from '../../types/editor';
import type { OrderStateType } from '../../types/order';
import type { UpdateUsingType, UpdateConstType } from '../../actions/shapes';

const getPropValue = (
  shape: ShapeType,
  key: string,
): string | number | Array<number> => {
  switch (shape[key].using) {
    case USING_CONST:
      return shape[key].const;
    case USING_CUSTOM:
      return shape[key].custom;
    case USING_FN:
      return shape[key].fn.toString();
    default:
      throw new Error(
        `Attempted to using an unrecognized value, ${shape[key].using}`,
      );
  }
};

const ShapePropertiesView = ({
  shape,
  name,
  handleUsingChange,
  handleUpdateConst,
}: {
  shape: ShapeType,
  name: string,
  handleUsingChange: UpdateUsingType,
  handleUpdateConst: UpdateConstType,
}): ?React$Element<any> => (
  <div>
    <div>
      {name}, a {shape.type}
    </div>
    {SHAPE_RECT_PROPS.map((key: string): ?React$Element<any> => (
      <div key={uniqid()}>
        <div>{key}</div>
        <select
          value={shape[key].using}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleUsingChange(name, key, e.target.value);
          }}
        >
          <option value={USING_CONST}>{USING_CONST}</option>
          <option value={USING_CUSTOM}>{USING_CUSTOM}</option>
          <option value={USING_FN}>{USING_FN}</option>
        </select>
        <input
          value={getPropValue(shape, key)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleUpdateConst(name, key, e.target.value);
          }}
        />
      </div>
    ))}
  </div>
);

export default ({
  shapes,
  editor,
  order,
  updateConst,
  updateUsing,
}: {
  shapes: ShapesStateType,
  editor: EditorStateType,
  order: OrderStateType,
  updateConst: UpdateConstType,
  updateUsing: UpdateUsingType,
}): ?React$Element<any> => (
  <div>
    {order.map((key: string, i: number): ?React$Element<any> => (
      <div key={i}>
        <ShapePropertiesView
          shape={shapes[key]}
          name={key}
          handleUsingChange={updateUsing}
          handleUpdateConst={updateConst}
        />
      </div>
    ))}
  </div>
);
