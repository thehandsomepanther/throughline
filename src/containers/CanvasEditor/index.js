// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Canvas from '../../components/CanvasEditor';
import {
  updateCanvases,
  addErroneousProp,
  resetErroneousProps,
} from '../../actions/editor';
import { setShapeValues } from '../../actions/shapeValues';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { StoreType } from '../../types/store';
import type { EditorStateType } from '../../types/editor';
import type { ShapeValuesStateType } from '../../types/shapeValues';

const mapStateToProps = (
  state: StoreType,
): {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
  shapeValues: ShapeValuesStateType,
} => ({
  shapes: state.shapes,
  order: state.order,
  editor: state.editor,
  shapeValues: state.shapeValues,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(
    {
      updateCanvases,
      addErroneousProp,
      resetErroneousProps,
      setShapeValues,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
