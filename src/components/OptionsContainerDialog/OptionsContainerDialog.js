import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog';
import OptionsContainerEdit from '../../components/OptionsContainerEdit/OptionsContainerEdit.js';

const customContentStyle = {
  maxWidth: 700,
};

export default class OptionsContainerDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    }
  }

  render() {
    return (
      <div className="optionsContainerDialog">
        <Dialog
          title={ 'Crear opciones' }
          actions={ [] }
          modal={ true }
          open={ this.state.open }
          contentStyle={ customContentStyle }
          autoScrollBodyContent={ true }
        >
          <OptionsContainerEdit 
            allOptions={ this.props.allOptions } 
            onCancel={ this.props.onDestroy }
            onSubmit={ this.props.onSubmit } 
            />
        </Dialog>
      </div>
      )
  }
}
