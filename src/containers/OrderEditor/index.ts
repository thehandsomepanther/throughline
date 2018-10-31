import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OrderEditor from '../../components/OrderEditor';
import { changeActiveShape } from '../../actions/editor';
import { updateOrder } from '../../actions/order';
import { deleteShape } from '../../actions/shapes';
import {
  addRepeater,
  deleteRepetition,
  updateRepeater,
} from '../../actions/repeaters';
import { ShapesState } from '../../types/shapes';
import { OrderState } from '../../types/order';
import { Store } from '../../types/store';
import { EditorState } from '../../types/editor';
import { RepeatersState } from '../../types/repeaters';

const mapStateToProps = (
  state: Store,
): {
  shapes: ShapesState,
  order: OrderState,
  editor: EditorState,
  repeaters: RepeatersState,
} => ({
  shapes: state.shapes,
  order: state.order,
  editor: state.editor,
  repeaters: state.repeaters,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(
    {
      changeActiveShape,
      updateOrder,
      deleteShape,
      addRepeater,
      deleteRepetition,
      updateRepeater,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderEditor);
