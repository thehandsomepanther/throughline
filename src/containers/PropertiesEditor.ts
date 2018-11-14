import { connect } from 'react-redux';

import PropertiesEditor from '../components/PropertiesEditor';
import { EditorState } from '../types/editor';
import { RepeatersState } from '../types/repeaters';
import { ShapesState } from '../types/shapes';
import { Store } from '../types/store';

const mapStateToProps = (
  state: Store
): {
  shapes: ShapesState,
  editor: EditorState,
  repeaters: RepeatersState
} => ({
  shapes: state.shapes,
  editor: state.editor,
  repeaters: state.repeaters
});

export default connect(mapStateToProps)(PropertiesEditor);
