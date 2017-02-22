import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import ActionViewHeadline from 'material-ui/svg-icons/action/view-headline'
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import PollEditForm from '../../components/PollEditForm/PollEditForm.js';


const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
}
export default class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false, dialog: false, poll: this.props.poll };
  }

  render() {
    return (
      <div className="poll-container">
        <Paper className="poll" >
          <div className="title">{ this.state.poll.name }</div>
          <div className="description">{ this.state.poll.description }</div>
          <Divider />
          <FlatButton className="option" label="Ver" 
            icon={ <ActionViewHeadline {...iconProps}/> } />
          <FlatButton className="option" label="Editar" 
            icon={ <ContentCreate {...iconProps}/> }
            onClick={ this._showDialog }
            />
          <FlatButton className="option" label="Eliminar" 
            icon={ <ActionDelete {...iconProps}/> } />
        </Paper>
        
        { this.state.showDialog && 
          this.state.dialog
        }

      </div>
    );
  }

  _showDialog = () => {
    this.setState({ showDialog: true, 
      dialog: (<PollEditForm destroy={ this._hideDialog } poll={ this.props.poll } onSubmit={ this._updatePoll } />)
    });
  }

  _hideDialog = () => {
    this.setState({ showDialog: false, dialog: null });
  }

  _updatePoll = (pollInfo) => {
    var poll = this.state.poll;
    poll.name = pollInfo.name;
    poll.description = pollInfo.description;
    this.setState({ poll: poll });
  }

}
