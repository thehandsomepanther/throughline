// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../../components/Home';
import { setShapeValues } from '../../actions/shapeValues';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { EditorStateType } from '../../types/editor';
import type { StoreType } from '../../types/store';

const mapStateToProps = (
  state: StoreType,
): {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
} => ({
  order: state.order,
  shapes: state.shapes,
  editor: state.editor,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(
    {
      setShapeValues,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
