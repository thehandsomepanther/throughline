// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Canvas from '../../components/Canvas';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { StoreType } from '../../types/store';

const mapStateToProps = (
  state: StoreType,
): {
  shapes: ShapesStateType,
  order: OrderStateType,
} => ({
  shapes: state.shapes,
  order: state.order,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
