// @flow

import * as React from 'react';
import {
  PropertiesEditorContainer,
  ShapeInfo,
  PropertyInfoContainer,
  PropertyName,
} from './styles';
import { SHAPE_RECT_PROPS } from '../../types/shapes';
import { USING_CONST, USING_CUSTOM, USING_FN } from '../../types/properties';
import type { ShapesStateType, ShapeType } from '../../types/shapes';
import type { EditorStateType } from '../../types/editor';
import type { UpdateUsingType, UpdateConstType } from '../../actions/shapes';

const getPropValue = (
  shape: ShapeType,
  prop: string,
): string | number | Array<number> => {
  switch (shape[prop].using) {
    case USING_CONST:
      return shape[prop].const;
    case USING_CUSTOM:
      return shape[prop].custom;
    case USING_FN:
      return shape[prop].fn.toString();
    default:
      throw new Error(
        `Attempted to using an unrecognized value, ${shape[prop].using}`,
      );
  }
};

const ShapePropertiesView = ({
  shape,
  handleUsingChange,
  handleUpdateConst,
}: {
  shape: ShapeType,
  handleUsingChange: UpdateUsingType,
  handleUpdateConst: UpdateConstType,
}): ?React$Element<any> => (
  <div>
    <ShapeInfo>
      {shape.name}, a {shape.type}
    </ShapeInfo>
    {SHAPE_RECT_PROPS.map((prop: string): ?React$Element<any> => (
      <PropertyInfoContainer key={prop}>
        <PropertyName>{prop}</PropertyName>
        <select
          value={shape[prop].using}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleUsingChange(shape.name, prop, e.target.value);
          }}
        >
          <option value={USING_CONST}>{USING_CONST}</option>
          <option value={USING_CUSTOM}>{USING_CUSTOM}</option>
          <option value={USING_FN}>{USING_FN}</option>
        </select>
        <input
          value={getPropValue(shape, prop)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleUpdateConst(shape.name, prop, e.target.value);
          }}
        />
      </PropertyInfoContainer>
    ))}
  </div>
);

export default ({
  shapes,
  editor,
  updateConst,
  updateUsing,
}: {
  shapes: ShapesStateType,
  editor: EditorStateType,
  updateConst: UpdateConstType,
  updateUsing: UpdateUsingType,
}): ?React$Element<any> => (
  <PropertiesEditorContainer>
    <ShapePropertiesView
      shape={shapes[editor.activeShape]}
      handleUsingChange={updateUsing}
      handleUpdateConst={updateConst}
    />
  </PropertiesEditorContainer>
);
