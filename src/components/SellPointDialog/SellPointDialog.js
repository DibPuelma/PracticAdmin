import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import settings from '../../config/settings';

const customContentStyle = {
  maxWidth: 700,
};

const styles = {
  loginSubmit: {
    marginRight: 20
  },
  loginInput: {
    width: '100%'
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  loginButtonsContainer: {
    paddingTop: 24,
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customWidth: {
    minWidth: 300,
    width: 350,
  }
}

var Status = { LOADING: 'loading', WAITING: 'waiting', SAVING: 'saving' };

export default class SellPointDialog extends Component {
  constructor(props) {
    super(props);

    var attended_poll_id = props.sellpoint.attended_poll_id;
    if (attended_poll_id === undefined || attended_poll_id === null)
      attended_poll_id = 0;

    var unattended_poll_id = props.sellpoint.unattended_poll_id;
    if (unattended_poll_id === undefined || unattended_poll_id === null)
      unattended_poll_id = 0;

    // console.log(attended_poll_id);
    // console.log(unattended_poll_id);

    this.state = {
      status            : Status.LOADING,
      user              : props.user,
      attended_poll_id  : attended_poll_id,
      unattended_poll_id: unattended_poll_id,
      open              : true
    }
  }

  componentDidMount() {
    this._load();
  }

  render() {
    return (
      <div className="dialog">
        <Dialog
          className={ 'sellpoint' }
          title={ 'Editar punto de venta' }
          actions={ [] }
          modal={ true }
          open={ this.state.open }
          contentStyle={ customContentStyle }
          autoScrollBodyContent={ true }
        >
          { this.state.status === Status.LOADING  &&
            <div style={ styles.loginButtonsContainer }>
              <CircularProgress />
            </div>
          }

          { this.state.status !== Status.LOADING  &&
            <div>
              <div style={{ marginTop: 20, marginBottom:10 }}>{ this.props.sellpoint.location }</div>

              <div className={ 'selectContainer' } >
                <SelectField
                  value={ this.state.attended_poll_id }
                  floatingLabelText="Encuesta para cliente atendido"
                  onChange={ this.attendedChange }
                  style={ styles.customWidth }
                  autoWidth={ true }
                  >
                    <MenuItem value={ 0 } primaryText={ 'Sin encuesta' } />
                    { this.state.polls.map((poll) => 
                        <MenuItem value={ poll.id } primaryText={ poll.name } key={ poll.id } />
                       )
                    }
                </SelectField>
              </div>

              <div className={ 'selectContainer' } >
                <SelectField
                  value={ this.state.unattended_poll_id }
                  floatingLabelText="Encuesta para cliente no atendido"
                  onChange={ this.unattendedChange }
                  style={ styles.customWidth }
                  autoWidth={ true }
                  >
                    <MenuItem value={ 0 } primaryText={ 'Sin encuesta' } />
                    { this.state.polls.map((poll) => 
                        <MenuItem value={ poll.id } primaryText={ poll.name } key={ poll.id } />
                       )
                    }
                </SelectField>
              </div>

              { this.state.status === Status.WAITING  &&
                <div style={ styles.loginButtonsContainer }>
                  <RaisedButton onClick={ this._save } primary={ true } style={ styles.loginSubmit } label="Guardar" />
                  <RaisedButton onClick={ this.props.onDestroy } label="Cancelar" />
                </div>
              }

              { this.state.status === Status.SAVING  &&
                <div style={ styles.loginButtonsContainer }>
                  <CircularProgress />
                </div>
              }
            </div>
          }
        </Dialog>
      </div>
      )
  }

  _load = () => {
    this.setState({ status: Status.LOADING });
    var self = this;

    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_POLLS.replace(":id", company_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self.setState({ polls: result });
      self.setState({ status: Status.WAITING });
    }, function(err) {
      console.log(err);
    });
  }

  attendedChange = (event, index, value) => {
    this.setState({ attended_poll_id: value });
  }

  unattendedChange = (event, index, value) => {
    this.setState({ attended_poll_id: value });
  }

  _save = () => {
    this.setState({ status: Status.SAVING });
    
    var body = {
      attended_poll_id: this.state.attended_poll_id,
      unattended_poll_id: this.state.unattended_poll_id,
    };
    
    this.props.onSubmit(this.props.sellpoint.id, body);
  }

}
