import { connect } from 'react-redux';

import Canvas from '../components/CanvasEditor';
import { ShapesState } from '../types/shapes';
import { OrderState } from '../types/order';
import { Store } from '../types/store';
import { EditorState } from '../types/editor';
import { RepeatersState } from '../types/repeaters';

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
