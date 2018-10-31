import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../../components/Home';
import { resetShapeValues } from '../../actions/shapeValues';
import { ShapesState } from '../../types/shapes';
import { OrderState } from '../../types/order';
import { EditorState } from '../../types/editor';
import { Store } from '../../types/store';

const mapStateToProps = (
  state: Store,
): {
  shapes: ShapesState,
  order: OrderState,
  editor: EditorState,
} => ({
  order: state.order,
  shapes: state.shapes,
  editor: state.editor,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(
    {
      resetShapeValues,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
