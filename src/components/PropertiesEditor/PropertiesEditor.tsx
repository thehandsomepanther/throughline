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
import { Using } from '../../types/properties';
import { ShapesState, Shape } from '../../types/shapes';
import { EditorState } from '../../types/editor';
import { ShapeValuesState, ShapeValues } from '../../types/shapeValues';
import { UpdateUsing, UpdateConst, UpdateFunction } from '../../actions/shapes';
import { ChangeActiveFrame } from '../../actions/editor';
import { UpdateShapeValues } from '../../actions/shapeValues';

const getPropValue = (
  shape: Shape,
  prop: string,
): string | number | Array<number> => {
  switch (shape.properties[prop].using as Using) {
    case Using.Constant:
      return shape.properties[prop].const;
    case Using.Custom:
      return shape.properties[prop].custom;
    case Using.Function:
      return shape.properties[prop].fn;
    default:
      throw new Error(
        `Attempted to using an unrecognized value, ${
          shape.properties[prop].using
        }`,
      );
  }
};

const ConstInput = ({
  value,
  handleUpdateConst,
}: {
  value: number,
  handleUpdateConst: (val: number) => void,
}) => (
  <ConstantPropertyInput
    value={value || ''}
    placeholder='0'
    onChange={(e) => {
      handleUpdateConst(e.target.value);
    }}
  />
);

const FunctionInput = ({
  code,
  handleUpdateFunction,
}: {
  code: string,
  handleUpdateFunction: (code: string) => void,
}) => (
  <div>
    <FunctionPropertyInput
      value={code || ''}
      placeholder="return 0"
      onChange={(e) => {
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
  shape: Shape,
  shapeKey: string,
  shapeValues: ShapeValues,
  activeFrame: number,
  erroneousProps?: { [key: string]: true },
  handleUsingChange: UpdateUsing,
  handleUpdateConst: UpdateConst,
  handleUpdateFunction: UpdateFunction,
  changeActiveFrame: ChangeActiveFrame,
  updateShapeValues: UpdateShapeValues,
}) => (
  <div>
    <ShapeInfo>
      {shape.name}, a {shape.type}
    </ShapeInfo>
    {shapeTypeToProperties[shape.type].map(
      (prop: string) => (
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
            value={shape.properties[prop].using}
            onChange={(e) => {
              handleUsingChange(shapeKey, prop, e.target.value);
            }}
          >
            <option value={Using.Constant}>Constant</option>
            <option value={Using.Custom}>Custom</option>
            <option value={Using.Function}>Function</option>
          </select>
          {shape.properties[prop].using === Using.Constant && (
            <ConstInput
              value={getPropValue(shape, prop)}
              handleUpdateConst={(val: number) => {
                handleUpdateConst(shapeKey, prop, val);
              }}
            />
          )}
          {shape.properties[prop].using === Using.Custom}
          {shape.properties[prop].using === Using.Function && (
            <FunctionInput
              code={getPropValue(shape, prop)}
              handleUpdateFunction={(code: string) => {
                handleUpdateFunction(shapeKey, prop, code);
              }}
            />
          )}
          {shape.properties[prop].using !== Using.Constant && (
            <PropertiesGraph
              values={shapeValues.properties[prop]}
              activeFrame={activeFrame}
              changeActiveFrame={changeActiveFrame}
              updateShapeValues={
                shape.properties[prop].using === Using.Custom
                  ? (values: Array<number>) => {
                      updateShapeValues(shapeKey, prop, values);
                    }
                  : null
              }
            />
          )}
        </PropertyInfoContainer>
      ),
    )}
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
  shapes: ShapesState,
  editor: EditorState,
  shapeValues: ShapeValuesState,
  updateConst: UpdateConst,
  updateUsing: UpdateUsing,
  updateFunction: UpdateFunction,
  changeActiveFrame: ChangeActiveFrame,
  updateShapeValues: UpdateShapeValues,
}) =>
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
