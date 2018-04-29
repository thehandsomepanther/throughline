// @flow

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import PropertiesEditor from "../../components/PropertiesEditor";

const mapStateToProps = (state, ownProps) => ({
  shapes: state.shapes,
  properties: state.properties
});

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesEditor);
