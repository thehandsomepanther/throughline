import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropertiesEditor from '../../components/PropertiesEditor';
import { updateUsing, updateConst, updateFunction } from '../../actions/shapes';
import { changeActiveFrame } from '../../actions/editor';
import { updateShapeValues } from '../../actions/shapeValues';
import { ShapesState } from '../../types/shapes';
import { EditorState } from '../../types/editor';
import { ShapeValuesState } from '../../types/shapeValues';
import { Store } from '../../types/store';

const mapStateToProps = (
  state: Store,
): {
  shapes: ShapesState,
  editor: EditorState,
  shapeValues: ShapeValuesState,
} => ({
  shapes: state.shapes,
  editor: state.editor,
  shapeValues: state.shapeValues,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(
    {
      updateUsing,
      updateConst,
      updateFunction,
      updateShapeValues,
      changeActiveFrame,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PropertiesEditor);
