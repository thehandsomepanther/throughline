import { connect } from 'react-redux';

import PropertiesEditor from '../components/PropertiesEditor';
import { EditorState } from '../types/editor';
import { ShapesState } from '../types/shapes';
import { Store } from '../types/store';

const mapStateToProps = (
  state: Store
): {
    shapes: ShapesState,
    editor: EditorState
  } => ({
    shapes: state.shapes,
    editor: state.editor
  });

export default connect(mapStateToProps)(PropertiesEditor);
