// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OrderEditor from '../../components/OrderEditor';
import { changeActiveShape } from '../../actions/editor';
import { updateOrder } from '../../actions/order';
import { deleteShape } from '../../actions/shapes';
import {
  addRepeater,
  deleteRepeater,
  updateRepeater,
} from '../../actions/repeaters';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { StoreType } from '../../types/store';
import type { EditorStateType } from '../../types/editor';
import type { RepeatersStateType } from '../../types/repeaters';

const mapStateToProps = (
  state: StoreType,
): {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
  repeaters: RepeatersStateType,
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
      deleteRepeater,
      updateRepeater,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderEditor);
