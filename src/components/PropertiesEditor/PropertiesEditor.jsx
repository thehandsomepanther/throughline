// @flow

import * as React from 'react';

import PropertiesGraph from './PropertiesGraph';
import {
  PropertiesEditorContainer,
  ShapeInfo,
  PropertyInfoContainer,
  PropertyName,
  FunctionPropertyInput,
  ConstantPropertyInput,
  InvalidPropNotification,
} from './styles';
import { shapeTypeToProperties } from '../../types/shapes';
import { USING_CONST, USING_CUSTOM, USING_FN } from '../../types/properties';
import type { ShapesStateType, ShapeType } from '../../types/shapes';
import type { EditorStateType } from '../../types/editor';
import type {
  ShapeValuesStateType,
  ShapeValuesType,
} from '../../types/shapeValues';
import type {
  UpdateUsingType,
  UpdateConstType,
  UpdateFunctionType,
  UpdateConstActionType,
  UpdateFunctionActionType,
} from '../../actions/shapes';
import type { ChangeActiveFrameType } from '../../actions/editor';
import type { UpdateShapeValuesType } from '../../actions/shapeValues';

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
  handleUpdateConst: (val: number) => UpdateConstActionType,
}): ?React$Element<any> => (
  <ConstantPropertyInput
    value={value || ''}
    placeholder={0}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      handleUpdateConst(e.target.value);
    }}
  />
);

const FunctionInput = ({
  code,
  handleUpdateFunction,
}: {
  code: string | number | Array<number>,
  handleUpdateFunction: (code: string) => UpdateFunctionActionType,
}): ?React$Element<any> => (
  <div>
    <FunctionPropertyInput
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
  shapeValues,
  activeFrame,
  erroneousProps,
  handleUsingChange,
  handleUpdateConst,
  handleUpdateFunction,
  changeActiveFrame,
  updateShapeValues,
}: {
  shape: ShapeType,
  shapeKey: string,
  shapeValues: ShapeValuesType,
  activeFrame: number,
  erroneousProps: ?{ [key: string]: true },
  handleUsingChange: UpdateUsingType,
  handleUpdateConst: UpdateConstType,
  handleUpdateFunction: UpdateFunctionType,
  changeActiveFrame: ChangeActiveFrameType,
  updateShapeValues: UpdateShapeValuesType,
}): ?React$Element<any> => (
  <div>
    <ShapeInfo>
      {shape.name}, a {shape.type}
    </ShapeInfo>
    {shapeTypeToProperties[shape.type].map((prop: string): ?React$Element<
      any,
    > => (
      <PropertyInfoContainer key={prop}>
        {erroneousProps &&
          erroneousProps[prop] && (
            <InvalidPropNotification>
              <span role="img" aria-label="warning">
                ⛔️
              </span>{' '}
              This prop is invalid
            </InvalidPropNotification>
          )}
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
        {shape[prop].using !== USING_CONST && (
          <PropertiesGraph
            values={shapeValues[prop]}
            activeFrame={activeFrame}
            changeActiveFrame={changeActiveFrame}
            updateShapeValues={
              shape[prop].using === USING_CUSTOM
                ? (values: Array<number>) => {
                    updateShapeValues(shapeKey, prop, values);
                  }
                : null
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
  shapeValues,
  updateConst,
  updateUsing,
  updateFunction,
  changeActiveFrame,
  updateShapeValues,
}: {
  shapes: ShapesStateType,
  editor: EditorStateType,
  shapeValues: ShapeValuesStateType,
  updateConst: UpdateConstType,
  updateUsing: UpdateUsingType,
  updateFunction: UpdateFunctionType,
  changeActiveFrame: ChangeActiveFrameType,
  updateShapeValues: UpdateShapeValuesType,
}): ?React$Element<any> =>
  editor.activeShape && shapeValues[editor.activeShape] ? (
    <PropertiesEditorContainer>
      <ShapePropertiesView
        shapeKey={editor.activeShape}
        shape={shapes[editor.activeShape]}
        shapeValues={shapeValues[editor.activeShape]}
        activeFrame={editor.activeFrame}
        erroneousProps={{ ...editor.erroneousProps[editor.activeShape] }}
        handleUsingChange={updateUsing}
        handleUpdateConst={updateConst}
        handleUpdateFunction={updateFunction}
        changeActiveFrame={changeActiveFrame}
        updateShapeValues={updateShapeValues}
      />
    </PropertiesEditorContainer>
  ) : null;
