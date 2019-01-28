import * as React from 'react';

import { Dispatch } from 'src/actions';
import { RepeatersState } from 'src/types/repeaters';
import { updateFormula, updateUsing } from '../../actions/shapes';
import { SidebarHeader } from '../../styles/components/SidebarHeader'
import { EditorState } from '../../types/editor';
import { Formula, FunctionValue, Using } from '../../types/formulas';
import { EllipseProperties, RectProperties, ShapeType } from '../../types/shapes';
import { Shape, ShapesState } from '../../types/shapes';
import { PropertiesGraph } from './PropertiesGraph';
import {
  ConstantPropertyInput,
  FunctionPropertyInput,
  FunctionPropertyInputContainer,
  InvalidPropNotification,
  PropertiesEditorContainer,
  PropertyInfoContainer,
  PropertyInfoHeader,
  PropertyName,
  UsingDropdown,
} from './styles';

interface FunctionPropertyProps {
  fn?: string;
  repeaters: RepeatersState;
  shapeID: string;
  handleFunctionChange: (fn: string) => void;
}

class FunctionProperty extends React.Component<FunctionPropertyProps> {
  private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.handleFunctionChange(e.target.value);
  }

  public render() {
    const { fn, shapeID, repeaters } = this.props;

    const params = ['t'];
    let repeaterID: string | null = shapeID;
    while (repeaterID && repeaters[repeaterID]) {
      params.push(repeaters[repeaterID].variable || repeaters[repeaterID].defaultVariable);
      repeaterID = repeaters[repeaterID].next;
    }

    return (
      <FunctionPropertyInputContainer>
        <span>{`function (${params.join(', ')}) {`}</span>
        <FunctionPropertyInput
          value={fn}
          onInput={this.handleChange}
        />
        <span>}</span>
      </FunctionPropertyInputContainer>
    )
  }
}

interface PropertyInfoProps {
  formula: Formula;
  shapeID: string;
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>;
  activeFrame: number;
  isErroneous: boolean;
  repeaters: RepeatersState;
  dispatch: Dispatch;
}

class PropertyInfo extends React.Component<PropertyInfoProps> {
  private handleUsingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { dispatch, shapeID, prop } = this.props;
    dispatch(updateUsing(shapeID, prop, e.target.value as Using));
  }

  private handleConstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { dispatch, shapeID, prop } = this.props;
    dispatch(updateFormula(shapeID, prop, e.target.value));
  }

  private handleFunctionChange = (fn: string) => {
    const { dispatch, shapeID, prop } = this.props;
    dispatch(updateFormula(shapeID, prop, fn));
  }

  public render() {
    const { formula, isErroneous, prop, activeFrame, shapeID, dispatch, repeaters } = this.props;
    let values = formula.values;

    // TODO: Figure out a better way to handle this (preferrably some way of
    // giving the user control over the function arguments?)
    while (Array.isArray(values[0])) {
      values = values[0] as FunctionValue | number[];
    }

    return (
      <PropertyInfoContainer>
        <PropertyInfoHeader>
          <div>
            <PropertyName>{prop}</PropertyName>
            <UsingDropdown value={formula.using} onChange={this.handleUsingChange}>
              <option value={Using.Constant}>Constant</option>
              <option value={Using.Function}>Function</option>
            </UsingDropdown>
          </div>
          {isErroneous && (
            <InvalidPropNotification>!!</InvalidPropNotification>
          )}
        </PropertyInfoHeader>
        {formula.using === Using.Constant && (
          <ConstantPropertyInput
            value={formula.const}
            onChange={this.handleConstChange}
          />
        )}
        {formula.using === Using.Function && (
          <FunctionProperty
            fn={formula.fn}
            handleFunctionChange={this.handleFunctionChange}
            shapeID={shapeID}
            repeaters={repeaters}
          />
        )}
        {formula.using !== Using.Constant && (
          <PropertiesGraph
            values={values as number[]}
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
  repeaters,
  dispatch,
}: {
    shape: Shape,
    shapeID: string,
    activeFrame: number,
    erroneousProps?: Partial<RectProperties<true>> | Partial<EllipseProperties<true>>,
    repeaters: RepeatersState,
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
          shapeID={shapeID}
          activeFrame={activeFrame}
          isErroneous={erroneousProps ? !!erroneousProps[property] : false}
          dispatch={dispatch}
          repeaters={repeaters}
          key={property} />
      );
    } else if (shape.type === ShapeType.Ellipse) {
      const ellipseProperty = property as keyof RectProperties<any>;
      propertyInfos.push(
        <PropertyInfo
          prop={ellipseProperty}
          formula={shape.formulas[ellipseProperty]}
          shapeID={shapeID}
          activeFrame={activeFrame}
          isErroneous={erroneousProps ? !!erroneousProps[property] : false}
          dispatch={dispatch}
          repeaters={repeaters}
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
  repeaters,
  dispatch,
}: {
    shapes: ShapesState,
    editor: EditorState,
    repeaters: RepeatersState,
    dispatch: Dispatch,
  }) =>
  editor.activeShape && shapes[editor.activeShape] ? (
    <PropertiesEditorContainer>
      <ShapePropertiesView
        shapeID={editor.activeShape}
        shape={shapes[editor.activeShape]}
        activeFrame={editor.activeFrame}
        repeaters={repeaters}
        erroneousProps={editor.erroneousProps[editor.activeShape]}
        dispatch={dispatch}
      />
    </PropertiesEditorContainer>
  ) : null;
