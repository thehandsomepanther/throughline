// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OrderEditor from '../../components/OrderEditor';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { StoreType } from '../../types/store';

const mapStateToProps = (
  state: StoreType,
): { shapes: ShapesStateType, order: OrderStateType } => ({
  shapes: state.shapes,
  order: state.order,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderEditor);
