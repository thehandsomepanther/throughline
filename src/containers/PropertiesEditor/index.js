// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropertiesEditor from '../../components/PropertiesEditor';
import type { ShapesStateType } from '../../types/shapes';
import type { PropertiesStateType } from '../../types/properties';
import type { StoreType } from '../../types/store';

const mapStateToProps = (
  state: StoreType,
): { shapes: ShapesStateType, properties: PropertiesStateType } => ({
  shapes: state.shapes,
  properties: state.properties,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesEditor);
