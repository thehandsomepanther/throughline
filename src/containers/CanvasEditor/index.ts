import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Canvas from '../../components/CanvasEditor';
import { resetRedrawCanvases, changeActiveFrame } from '../../actions/editor';
import { ShapesState } from '../../types/shapes';
import { OrderState } from '../../types/order';
import { Store } from '../../types/store';
import { EditorState } from '../../types/editor';
import { ShapeValuesState } from '../../types/shapeValues';
import { RepeatersState } from '../../types/repeaters';

const mapStateToProps = (
  state: Store,
): {
  shapes: ShapesState,
  order: OrderState,
  editor: EditorState,
  shapeValues: ShapeValuesState,
  repeaters: RepeatersState,
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
      resetRedrawCanvases,
      changeActiveFrame,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Canvas);
