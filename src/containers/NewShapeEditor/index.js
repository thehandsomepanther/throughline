// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewShapeEditor from '../../components/NewShapeEditor';
import type { StoreType } from '../../types/store';

const mapStateToProps = (state: StoreType): {} => ({});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewShapeEditor);
