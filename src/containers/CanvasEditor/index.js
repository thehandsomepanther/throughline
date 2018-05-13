// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Canvas from '../../components/CanvasEditor';
import {
  updateCanvases,
  addErroneousProp,
  resetErroneousProps,
} from '../../actions/editor';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { StoreType } from '../../types/store';
import type { EditorStateType } from '../../types/editor';

const mapStateToProps = (
  state: StoreType,
): {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
} => ({
  shapes: state.shapes,
  order: state.order,
  editor: state.editor,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(
    { updateCanvases, addErroneousProp, resetErroneousProps },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
