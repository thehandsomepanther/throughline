import * as React from 'react';

import { Dispatch } from 'src/actions';
import { updateConst, updateFunction, updateUsing } from '../../actions/shapes';
import { EditorState } from '../../types/editor';
import { ConstValue, FunctionValue, Using } from '../../types/formulas';
import { EllipseProperties, RectProperties } from '../../types/shapes';
import { Shape, ShapesState } from '../../types/shapes';
import {
  ConstantPropertyInput,
  FunctionPropertyInput,
  InvalidPropNotification,
  PropertiesEditorContainer,
  PropertyInfoContainer,
  PropertyName,
  ShapeInfo,
} from './styles';

const getConstValue = (shape: Shape, prop: string): ConstValue => shape.formulas[prop].const
const getFunctionValue = (shape: Shape, prop: string): FunctionValue => shape.formulas[prop].fn

interface PropertyInfoProps {
  shape: Shape;
  shapeID: string;
  prop: string;
  activeFrame: number;
  erroneousProps?: Partial<RectProperties<true>> | Partial<EllipseProperties<true>>;
  dispatch: Dispatch;
}

class PropertyInfo extends React.Component<PropertyInfoProps> {
  private handleUsingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { dispatch, shapeID, prop } = this.props;
    dispatch(updateUsing(shapeID, prop as keyof RectProperties<any> | keyof EllipseProperties<any>, e.target.value as Using));
  }

  private handleConstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { dispatch, shapeID, prop } = this.props;
    dispatch(updateConst(shapeID, prop as any, parseInt(e.target.value, 10)));
  }

  private handleFunctionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { dispatch, shapeID, prop } = this.props;
    dispatch(updateFunction(shapeID, prop as any, e.target.value));
  }

  public render() {
    const { shape, erroneousProps, prop } = this.props;

    return (
      <PropertyInfoContainer>
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
          onChange={this.handleUsingChange}
        >
          <option value={Using.Constant}>Constant</option>
          <option value={Using.Custom}>Custom</option>
          <option value={Using.Function}>Function</option>
        </select>
        {shape.formulas[prop].using === Using.Constant && (
          <ConstantPropertyInput
            value={getConstValue(shape, prop)}
            placeholder='0'
            onChange={this.handleConstChange}
          />
        )}
        {shape.formulas[prop].using === Using.Custom && (
          null // TODO: Fill this out
        )}
        {shape.formulas[prop].using === Using.Function && (
          <FunctionPropertyInput
            value={getFunctionValue(shape, prop) || ''}
            placeholder="return 0"
            onChange={this.handleFunctionChange}
          />
        )}
        {shape.formulas[prop].using !== Using.Constant && (
          null // TODO: Fix PropertiesGraph
          // <PropertiesGraph
          //   values={shape[shapeID].values[prop]}
          //   activeFrame={activeFrame}
          //   shapeID={shapeID}
          //   shapeProperty={prop}
          //   dispatch={dispatch}
          // />
        )}
      </PropertyInfoContainer>
    )
  }
}

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
      {Object.keys(shape.formulas).map(
        (prop: string) => (
          <PropertyInfo
            prop={prop}
            shape={shape}
            shapeID={shapeID}
            activeFrame={activeFrame}
            erroneousProps={erroneousProps}
            dispatch={dispatch}
            key={prop}
          />
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
