import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import downloader from '../../lib/downloader';

export default class ExcelDownloadButton extends Component {
  render() {
    return (
      <RaisedButton
      onClick={() => downloader.download(this.props.fileName, this.props.uri)}
      secondary={true}
      fullWidth={true}
      style={{marginBottom: '20px'}}
      label={this.props.label}
      icon={<DownloadIcon />}
      />
    );
  }
}
