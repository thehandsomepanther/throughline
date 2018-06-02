// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewShapeEditor from '../../components/NewShapeEditor';
import { addNewShape } from '../../actions/shapes';
import type { StoreType } from '../../types/store';

const mapStateToProps = (state: StoreType): {} => ({});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators({ addNewShape }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewShapeEditor);
