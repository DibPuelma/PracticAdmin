import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';

import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import OptionsContainerEdit from '../../components/OptionsContainerEdit/OptionsContainerEdit.js';


const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
}

const styles = {
  chip: {
    margin: 4,
    fontSize: 10
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

var OptionsContainerStatus = { WAITING: 'waiting', EDITING: 'editing' };

export default class OptionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { status: OptionsContainerStatus.WAITING,
                   allOptions: this.props.allOptions };
  }

  render() {
    return (
      <div className="options-container-container">
        <Paper className="options-container" >
          { this.state.status === OptionsContainerStatus.WAITING &&
            <div>
            <div className="title">{ this.props.optionsContainer.name }</div>
            <div style={styles.wrapper}>
              { this.props.optionsContainer.PossibleOptions.map((x, i) =>
                 <Chip style={styles.chip} className="chip">{ x.value }</Chip>
              )}
            </div>

            <Divider />
            <FlatButton className="option" label="Editar" 
              icon={ <ContentCreate {...iconProps}/> }
              onClick={ this._edit }
              />
            <FlatButton className="option" label="Eliminar" 
              icon={ <ActionDelete {...iconProps}/> } />
            </div>
          }
          
          { this.state.status === OptionsContainerStatus.EDITING &&
            <div className="options-container-container">
              <OptionsContainerEdit 
                optionsContainer={ this.props.optionsContainer } 
                allOptions={ this.state.allOptions } 
                onCancel={ this._cancel }
                onSubmit={ this.props.updateSubmit } 
                />
            </div>
          }
        </Paper>
      </div>
    );
  }

  _edit = () => {
    this.setState({ status: OptionsContainerStatus.EDITING });
  }

  _cancel = () => {
    this.setState({ status: OptionsContainerStatus.WAITING }); 
  }
}
