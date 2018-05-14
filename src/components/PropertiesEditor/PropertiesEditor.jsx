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
import type {
  UpdateUsingType,
  UpdateConstType,
  UpdateFunctionType,
  UpdateConstActionType,
  UpdateFunctionActionType,
} from '../../actions/shapes';

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
      return shape[prop].fn;
    default:
      throw new Error(
        `Attempted to using an unrecognized value, ${shape[prop].using}`,
      );
  }
};

const ConstInput = ({
  value,
  handleUpdateConst,
}: {
  value: string | number | Array<number>,
  handleUpdateConst: (number) => UpdateConstActionType,
}): ?React$Element<any> => (
  <input
    value={value || ''}
    placeholder={0}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      handleUpdateConst(parseInt(e.target.value, 10));
    }}
  />
);

const FunctionInput = ({
  code,
  handleUpdateFunction,
}: {
  code: string | number | Array<number>,
  handleUpdateFunction: (string) => UpdateFunctionActionType,
}): ?React$Element<any> => (
  <div>
    <input
      value={code || ''}
      placeholder="return 0"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handleUpdateFunction(e.target.value);
      }}
    />
  </div>
);

const ShapePropertiesView = ({
  shape,
  shapeKey,
  handleUsingChange,
  handleUpdateConst,
  handleUpdateFunction,
}: {
  shape: ShapeType,
  shapeKey: string,
  handleUsingChange: UpdateUsingType,
  handleUpdateConst: UpdateConstType,
  handleUpdateFunction: UpdateFunctionType,
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
            handleUsingChange(shapeKey, prop, e.target.value);
          }}
        >
          <option value={USING_CONST}>Constant</option>
          <option value={USING_CUSTOM}>Custom</option>
          <option value={USING_FN}>Function</option>
        </select>
        {shape[prop].using === USING_CONST && (
          <ConstInput
            value={getPropValue(shape, prop)}
            handleUpdateConst={(val: number): UpdateConstActionType =>
              handleUpdateConst(shapeKey, prop, val)
            }
          />
        )}
        {shape[prop].using === USING_CUSTOM}
        {shape[prop].using === USING_FN && (
          <FunctionInput
            code={getPropValue(shape, prop)}
            handleUpdateFunction={(code: string): UpdateFunctionActionType =>
              handleUpdateFunction(shapeKey, prop, code)
            }
          />
        )}
      </PropertyInfoContainer>
    ))}
  </div>
);

export default ({
  shapes,
  editor,
  updateConst,
  updateUsing,
  updateFunction,
}: {
  shapes: ShapesStateType,
  editor: EditorStateType,
  updateConst: UpdateConstType,
  updateUsing: UpdateUsingType,
  updateFunction: UpdateFunctionType,
}): ?React$Element<any> =>
  editor.activeShape ? (
    <PropertiesEditorContainer>
      <ShapePropertiesView
        shapeKey={editor.activeShape}
        shape={shapes[editor.activeShape]}
        handleUsingChange={updateUsing}
        handleUpdateConst={updateConst}
        handleUpdateFunction={updateFunction}
      />
    </PropertiesEditorContainer>
  ) : null;
