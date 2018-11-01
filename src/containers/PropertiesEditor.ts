import { connect } from 'react-redux';

import PropertiesEditor from '../components/PropertiesEditor';
import { ShapesState } from '../types/shapes';
import { EditorState } from '../types/editor';
import { ShapeValuesState } from '../types/shapeValues';
import { Store } from '../types/store';

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

export default connect(mapStateToProps)(PropertiesEditor);
