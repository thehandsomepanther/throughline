// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Canvas from '../../components/Canvas';

const mapStateToProps = (state, ownProps) => ({
  shapes: state.shapes,
  properties: state.properties,
});

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
