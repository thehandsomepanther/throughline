// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropertiesEditor from '../../components/PropertiesEditor';
import type { ShapesStateType } from '../../types/shapes';
import type { StoreType } from '../../types/store';

const mapStateToProps = (state: StoreType): { shapes: ShapesStateType } => ({
  shapes: state.shapes,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesEditor);
