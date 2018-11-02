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
import { Using, ConstValue, FunctionValue } from '../../types/formulas';
import { ShapesState, Shape } from '../../types/shapes';
import { EditorState } from '../../types/editor';
import { ShapeValuesState, ShapeValues } from '../../types/shapeValues';
import { updateUsing, updateConst, updateFunction } from '../../actions/shapes';
import { changeActiveFrame } from '../../actions/editor';
import { updateShapeValues } from '../../actions/shapeValues';
import { Dispatch } from 'src/actions';

const getConstValue = (shape: Shape, prop: string): ConstValue =>  shape.properties[prop].const
const getFunctionValue = (shape: Shape, prop: string): FunctionValue => shape.properties[prop].fn

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
      // TODO: more rigorous checks here
      handleUpdateConst(parseInt(e.target.value));
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
  dispatch,
}: {
  shape: Shape,
  shapeKey: string,
  shapeValues: ShapeValues,
  activeFrame: number,
  erroneousProps?: { [key: string]: true },
  dispatch: Dispatch,
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
              dispatch(updateUsing(shapeKey, prop, e.target.value as Using));
            }}
          >
            <option value={Using.Constant}>Constant</option>
            <option value={Using.Custom}>Custom</option>
            <option value={Using.Function}>Function</option>
          </select>
          {shape.properties[prop].using === Using.Constant && (
            <ConstInput
              value={getConstValue(shape, prop)}
              handleUpdateConst={(val: number) => {
                dispatch(updateConst(shapeKey, prop, val));
              }}
            />
          )}
          {shape.properties[prop].using === Using.Custom}
          {shape.properties[prop].using === Using.Function && (
            <FunctionInput
              code={getFunctionValue(shape, prop)}
              handleUpdateFunction={(code: string) => {
                dispatch(updateFunction(shapeKey, prop, code));
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
  dispatch,
}: {
  shapes: ShapesState,
  editor: EditorState,
  shapeValues: ShapeValuesState,
  dispatch: Dispatch,
}) =>
  editor.activeShape && shapeValues[editor.activeShape] ? (
    <PropertiesEditorContainer>
      <ShapePropertiesView
        shapeKey={editor.activeShape}
        shape={shapes[editor.activeShape]}
        shapeValues={shapeValues[editor.activeShape]}
        activeFrame={editor.activeFrame}
        erroneousProps={{ ...editor.erroneousProps[editor.activeShape] }}
        dispatch={dispatch}
      />
    </PropertiesEditorContainer>
  ) : null;
