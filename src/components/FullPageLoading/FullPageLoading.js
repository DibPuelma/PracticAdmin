import React, { Component } from 'react'

import CircularProgress from 'material-ui/CircularProgress';

export default class FullPageLoading extends Component {
  render() {
    return (
      <div className="full-page-loading">
        <CircularProgress />
      </div>
    );
  }
}

