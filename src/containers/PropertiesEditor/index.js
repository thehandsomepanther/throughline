// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropertiesEditor from '../../components/PropertiesEditor';
import { updateUsing, updateConst } from '../../actions/shapes';
import type { ShapesStateType } from '../../types/shapes';
import type { EditorStateType } from '../../types/editor';
import type { OrderStateType } from '../../types/order';
import type { StoreType } from '../../types/store';

const mapStateToProps = (
  state: StoreType,
): {
  shapes: ShapesStateType,
  editor: EditorStateType,
  order: OrderStateType,
} => ({
  shapes: state.shapes,
  editor: state.editor,
  order: state.order,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators({ updateUsing, updateConst }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesEditor);
