// @flow

import React from 'react';
import uniqid from 'uniqid';
import { SHAPE_RECT_PROPS } from '../../types/shapes';
import { USING_CONST, USING_CUSTOM, USING_FN } from '../../types/properties';
import type { ShapesStateType, ShapeType } from '../../types/shapes';
import type { EditorStateType } from '../../types/editor';
import type { OrderStateType } from '../../types/order';

const ShapePropertiesView = ({
  shape,
  name,
  handleUsingChange,
}: {
  shape: ShapeType,
  name: string,
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
          onChange={(e) => handleUsingChange(name, key, e.target.value)}
        >
          <option value={USING_CONST}>{USING_CONST}</option>
          <option value={USING_CUSTOM}>{USING_CUSTOM}</option>
          <option value={USING_FN}>{USING_FN}</option>
        </select>
        {shape[key].using === USING_CONST && <div>{shape[key].const}</div>}
        {shape[key].using === USING_CUSTOM && (
          <div>{JSON.stringify(shape[key].custom)}</div>
        )}
        {shape[key].using === USING_FN && <div>{shape[key].fn.toString()}</div>}
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
}): ?React$Element<any> => (
  <div>
    {order.map((key: string, i: number): ?React$Element<any> => (
      <div key={i}>
        <ShapePropertiesView
          shape={shapes[key]}
          name={key}
          handleUsingChange={updateUsing}
        />
      </div>
    ))}
  </div>
);
