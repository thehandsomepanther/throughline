// @flow

import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

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
  UpdateConstActionType,
} from '../../actions/shapes';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

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

const ConstInput = ({
  value,
  handleUpdateConst,
}: {
  value: string | number | Array<number>,
  handleUpdateConst: (number) => UpdateConstActionType,
}): ?React$Element<any> => (
  <input
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      handleUpdateConst(parseInt(e.target.value, 10));
    }}
  />
);

const FunctionInput = ({
  code,
}: {
  code: string | number | Array<number>,
}): ?React$Element<any> => (
  <div>
    <CodeMirror
      value={code}
      options={{ mode: 'javascript', lineNumbers: true, theme: 'material' }}
      viewportMargin={Infinity}
    />
  </div>
);

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
          <option value={USING_CONST}>Constant</option>
          <option value={USING_CUSTOM}>Custom</option>
          <option value={USING_FN}>Function</option>
        </select>
        {shape[prop].using === USING_CONST && (
          <ConstInput
            value={getPropValue(shape, prop)}
            handleUpdateConst={(val: number) => {
              handleUpdateConst(shape.name, prop, val);
            }}
          />
        )}
        {shape[prop].using === USING_CUSTOM}
        {shape[prop].using === USING_FN && (
          <FunctionInput code={getPropValue(shape, prop)} />
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
