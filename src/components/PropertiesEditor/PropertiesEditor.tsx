import * as React from 'react';

import { Dispatch } from 'src/actions';
import { updateConst, updateFunction, updateUsing } from '../../actions/shapes';
import { SidebarHeader } from '../../styles/components/SidebarHeader'
import { EditorState } from '../../types/editor';
import { ConstValue, Formula, FunctionValue, Using } from '../../types/formulas';
import { EllipseProperties, FormulaValues, RectProperties, ShapeType } from '../../types/shapes';
import { Shape, ShapesState } from '../../types/shapes';
import { PropertiesGraph } from './PropertiesGraph';
import {
  ConstantPropertyInput,
  FunctionPropertyInput,
  InvalidPropNotification,
  PropertiesEditorContainer,
  PropertyInfoContainer,
  PropertyInfoHeader,
  PropertyName,
  UsingDropdown,
} from './styles';

const getConstValue = (formula: Formula): ConstValue | undefined => formula.const;
const getFunctionValue = (formula: Formula): FunctionValue | undefined => formula.fn;

interface PropertyInfoProps {
  formula: Formula;
  values: FormulaValues;
  shapeID: string;
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>;
  activeFrame: number;
  isErroneous: boolean;
  dispatch: Dispatch;
}

class PropertyInfo extends React.Component<PropertyInfoProps> {
  private handleUsingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { dispatch, shapeID, prop } = this.props;
    dispatch(updateUsing(shapeID, prop, e.target.value as Using));
  }

  private handleConstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { dispatch, shapeID, prop } = this.props;
    dispatch(updateConst(shapeID, prop, e.target.value));
  }

  private handleFunctionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { dispatch, shapeID, prop } = this.props;
    dispatch(updateFunction(shapeID, prop, e.target.value));
  }

  public render() {
    const { formula, isErroneous, prop, values, activeFrame, shapeID, dispatch } = this.props;

    return (
      <PropertyInfoContainer>
        {isErroneous && (
          <InvalidPropNotification>
            <span role="img" aria-label="warning">⛔️</span>{' '}
            This prop is invalid
          </InvalidPropNotification>
        )}
        <PropertyInfoHeader>
          <PropertyName>{prop}</PropertyName>
          <UsingDropdown value={formula.using} onChange={this.handleUsingChange}>
            <option value={Using.Constant}>Constant</option>
            <option value={Using.Custom}>Custom</option>
            <option value={Using.Function}>Function</option>
          </UsingDropdown>
        </PropertyInfoHeader>
        {formula.using === Using.Constant && (
          <ConstantPropertyInput
            value={getConstValue(formula)}
            placeholder='0'
            onChange={this.handleConstChange}
          />
        )}
        {formula.using === Using.Custom && (
          null // TODO: Fill this out
        )}
        {formula.using === Using.Function && (
          <FunctionPropertyInput
            value={getFunctionValue(formula)}
            placeholder="return 0"
            onChange={this.handleFunctionChange}
          />
        )}
        {formula.using !== Using.Constant && (
          <PropertiesGraph
            values={values}
            activeFrame={activeFrame}
            shapeID={shapeID}
            shapeProperty={prop}
            using={formula.using}
            dispatch={dispatch}
          />
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
  }) => {
  const propertyInfos = [];
  for (const property in shape.formulas) {
    if (!shape.formulas.hasOwnProperty(property)) {
      continue;
    }

    if (shape.type === ShapeType.Rect) {
      const rectProperty = property as keyof RectProperties<any>;
      propertyInfos.push(
        <PropertyInfo
          prop={rectProperty}
          formula={shape.formulas[rectProperty]}
          values={shape.values[rectProperty]}
          shapeID={shapeID}
          activeFrame={activeFrame}
          isErroneous={erroneousProps && erroneousProps[shapeID]}
          dispatch={dispatch}
          key={property} />
      );
    } else if (shape.type === ShapeType.Ellipse) {
      const ellipseProperty = property as keyof RectProperties<any>;
      propertyInfos.push(
        <PropertyInfo
          prop={ellipseProperty}
          formula={shape.formulas[ellipseProperty]}
          values={shape.values[ellipseProperty]}
          shapeID={shapeID}
          activeFrame={activeFrame}
          isErroneous={erroneousProps && erroneousProps[shapeID]}
          dispatch={dispatch}
          key={property} />
      );
    }
  }

  return (
    <div>
      <SidebarHeader>Properties</SidebarHeader>
      {...propertyInfos}
    </div>
  )
};

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
        erroneousProps={editor.erroneousProps[editor.activeShape]}
        dispatch={dispatch}
      />
    </PropertiesEditorContainer>
  ) : null;
