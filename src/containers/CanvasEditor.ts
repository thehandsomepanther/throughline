import { connect } from 'react-redux';

import Canvas from '../components/CanvasEditor';
import { EditorState } from '../types/editor';
import { OrderState } from '../types/order';
import { RepeatersState } from '../types/repeaters';
import { ShapesState } from '../types/shapes';
import { Store } from '../types/store';

const mapStateToProps = (
  state: Store
): {
  shapes: ShapesState,
  order: OrderState,
  editor: EditorState,
  repeaters: RepeatersState
} => ({
  shapes: state.shapes,
  order: state.order,
  editor: state.editor,
  repeaters: state.repeaters
});

export default connect(mapStateToProps)(Canvas);
