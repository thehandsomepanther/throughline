// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OrderEditor from '../../components/OrderEditor';
import { changeActiveShape } from '../../actions/editor';
import { updateOrder } from '../../actions/order';
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ changeActiveShape, updateOrder }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderEditor);
