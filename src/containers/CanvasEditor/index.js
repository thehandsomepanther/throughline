// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Canvas from '../../components/CanvasEditor';
import { updateCanvases, changeActiveFrame } from '../../actions/editor';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { StoreType } from '../../types/store';
import type { EditorStateType } from '../../types/editor';
import type { ShapeValuesStateType } from '../../types/shapeValues';
import type { RepeatersStateType } from '../../types/repeaters';

const mapStateToProps = (
  state: StoreType,
): {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
  shapeValues: ShapeValuesStateType,
  repeaters: RepeatersStateType,
} => ({
  shapes: state.shapes,
  order: state.order,
  editor: state.editor,
  shapeValues: state.shapeValues,
  repeaters: state.repeaters,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(
    {
      updateCanvases,
      changeActiveFrame,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Canvas);
