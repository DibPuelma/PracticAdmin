import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

import QuestionShow from '../../components/QuestionShow/QuestionShow.js';
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

export default class PollShow extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, open: true }
  }

  componentDidMount() {
    this._load();
  }

  render() {
    return (
      <div>
        <Dialog
          title={ 'Ver Encuesta' }
          actions={ [] }
          modal={ false }
          open={ this.state.open }
          contentStyle={ customContentStyle }
          autoScrollBodyContent={ true }
          className={ "dialog" }
          onRequestClose={ () => this._close() }
        >
          { this.state.loading &&
            <div style={ styles.loginButtonsContainer }>
              <CircularProgress />
            </div>
          }

          { !this.state.loading &&
            <div>
              <h3>{ this.state.poll.name }</h3>
              { /* <h4>{ this.state.poll.description }</h4> */ }
              
              { this.state.poll.Questions.map((x, i) =>
                <QuestionShow 
                  showText={ true }
                  question={ x }
                  user={ this.props.user }
                  options={ this._getOptions(x) }
                  key={ x.id }
                  style={{ paddingBottom: 40 }}
                  />
              )}
            </div>
          }

          <div style={ styles.loginButtonsContainer }>
            <RaisedButton onClick={ this.props.onDestroy } label="Cerrar" />
          </div>

        </Dialog>
      </div>
      )
  }

  _load = () => {
    this.setState({ loading: true });
    var self = this;
    var company_id = this.props.user.company_id;

    // Load all options containers
    var url = settings.COMPANY_POLL.replace(":company_id", company_id);
    url = url.replace(":poll_id", this.props.pollId);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());
    promise.then(function(poll) {
      // Sort by order ascending
      poll.Questions = poll.Questions.sort((a, b) => Number(a.PollQuestions.order) - Number(b.PollQuestions.order));

      self.setState({ poll: poll });
      self.setState({ loading: false });
    }).catch(function(error) {
      console.log(error);
    });
  }

  _getOptions = (x) => {
    if (x.OptionsContainer)
      return x.OptionsContainer.PossibleOptions;
    return undefined;
  }

  _close = () => {
    this.props.onDestroy();
    this.setState({ open: false });
  }
}