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
import { shapeTypeToProperties, RectProperties, EllipseProperties } from '../../types/shapes';
import { Using, ConstValue, FunctionValue } from '../../types/formulas';
import { ShapesState, Shape } from '../../types/shapes';
import { EditorState } from '../../types/editor';
import { updateUsing, updateConst, updateFunction } from '../../actions/shapes';
import { Dispatch } from 'src/actions';

const getConstValue = (shape: Shape, prop: string): ConstValue =>  shape.formulas[prop].const
const getFunctionValue = (shape: Shape, prop: string): FunctionValue => shape.formulas[prop].fn

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
      handleUpdateConst(parseInt(e.target.value, 10));
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
  shapeID,
  activeFrame,
  erroneousProps,
  dispatch,
}: {
  shape: Shape,
  shapeID: string,
  activeFrame: number,
  erroneousProps?: Partial<RectProperties<true>> | Partial<EllipseProperties<true>>,
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
            value={shape.formulas[prop].using}
            onChange={(e) => {
              dispatch(updateUsing(shapeID, prop as any, e.target.value as Using));
            }}
          >
            <option value={Using.Constant}>Constant</option>
            <option value={Using.Custom}>Custom</option>
            <option value={Using.Function}>Function</option>
          </select>
          {shape.formulas[prop].using === Using.Constant && (
            <ConstInput
              value={getConstValue(shape, prop)}
              handleUpdateConst={(val: number) => {
                dispatch(updateConst(shapeID, prop as any, val));
              }}
            />
          )}
          {shape.formulas[prop].using === Using.Custom}
          {shape.formulas[prop].using === Using.Function && (
            <FunctionInput
              code={getFunctionValue(shape, prop)}
              handleUpdateFunction={(code: string) => {
                dispatch(updateFunction(shapeID, prop as any, code));
              }}
            />
          )}
          {shape.formulas[prop].using !== Using.Constant && (
            <PropertiesGraph
              values={shape[shapeID].values[prop]}
              activeFrame={activeFrame}
              shapeID={shapeID}
              shapeProperty={prop}
              dispatch={dispatch}
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
  dispatch,
}: {
  shapes: ShapesState,
  editor: EditorState,
  dispatch: Dispatch,
}) =>
  editor.activeShape && shapes[editor.activeShape] ? (
    <PropertiesEditorContainer>
      <ShapePropertiesView
        shapeID={editor.activeShape}
        shape={shapes[editor.activeShape]}
        activeFrame={editor.activeFrame}
        erroneousProps={{ ...editor.erroneousProps[editor.activeShape] }}
        dispatch={dispatch}
      />
    </PropertiesEditorContainer>
  ) : null;
