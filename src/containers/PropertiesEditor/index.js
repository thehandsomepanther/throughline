// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropertiesEditor from '../../components/PropertiesEditor';
import { updateUsing, updateConst, updateFunction } from '../../actions/shapes';
import { setShapeValues } from '../../actions/shapeValues';
import type { ShapesStateType } from '../../types/shapes';
import type { EditorStateType } from '../../types/editor';
import type { ShapeValuesStateType } from '../../types/shapeValues';
import type { StoreType } from '../../types/store';

const mapStateToProps = (
  state: StoreType,
): {
  shapes: ShapesStateType,
  editor: EditorStateType,
  shapeValues: ShapeValuesStateType,
} => ({
  shapes: state.shapes,
  editor: state.editor,
  shapeValues: state.shapeValues,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(
    {
      updateUsing,
      updateConst,
      updateFunction,
      setShapeValues,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesEditor);
