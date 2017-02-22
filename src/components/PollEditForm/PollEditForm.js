import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import settings from '../../config/settings';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import QuestionEdit from '../../components/QuestionEdit/QuestionEdit.js';

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
  loginButtonsContainer: {
    paddingTop: 24,
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

var PollEditFormStatus = { LOADING: 'loading', READY: 'ready', SAVING: 'saving' };

export default class PollEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status     : PollEditFormStatus.LOADING,
        open       : true,
        name       : this.props.poll.name,
        description: this.props.poll.description
      };
  }

  componentDidMount() {
    this._load();
  }

  render() {
    return (
      <div>
        <Dialog
          title={ 'Editar - ' + this.props.poll.name }
          actions={ [] }
          modal={ true }
          open={ this.state.open }
          contentStyle={ customContentStyle }
          autoScrollBodyContent={ true }
        >

          { this.state.status === PollEditFormStatus.LOADING &&
            <div className="dialog">
              <div className="loading-container">
                <CircularProgress size={30} />
              </div>
              <div style={ styles.loginButtonsContainer }>
                  <RaisedButton primary={ true } style={ styles.loginSubmit } label="Guardar" disabled={true} />
                  <RaisedButton onClick={ this._hide } label="Cancelar" />
                </div>
            </div>
          }

          { this.state.status !== PollEditFormStatus.LOADING &&
            <div className="dialog">

              <TextField
                floatingLabelText="Nombre:"
                fullWidth={ true }
                multiLine={ true }
                defaultValue={ this.props.poll.name }
                onChange={ (event) => this.setState({ name: event.target.value}) }
              />
              <TextField
                floatingLabelText="Descripción:"
                fullWidth={ true }
                multiLine={ true }
                defaultValue={ this.props.poll.description }
                onChange={ (event) => this.setState({ description: event.target.value }) }
                rows={ 2 }
              />
              <Divider />

              <div>
                { this.state.poll.Questions.map((x, i) =>
                  <QuestionEdit
                    question={ x }
                    onChangeText={ this._onChangeText }
                    onChangeOptCont={ this._onChangeOptCont }
                    optionsContainers={ this.state.optionsContainers }
                  />
                )}
              </div>

              { this.state.status === PollEditFormStatus.READY  &&
                <div style={ styles.loginButtonsContainer }>
                  <RaisedButton onClick={ this._save } primary={ true } style={ styles.loginSubmit } label="Guardar" />
                  <RaisedButton onClick={ this._hide } label="Cancelar" />
                </div>
              }

              { this.state.status === PollEditFormStatus.SAVING  &&
                <div style={ styles.loginButtonsContainer }>
                  <CircularProgress />
                </div>
              }
            </div>
          }
        </Dialog>
      </div>

    );
  }

  _hide = () => {
    var self = this;
    this.setState({ open: false });
    new Promise(function(resolve, reject) {
      setTimeout(function() {
        self.props.destroy();
        resolve("Stuff worked!");
      }, 250);
    });
  }

  _load = () => {
    var form = this;
    var company_id = 2;
    var poll_id    = this.props.poll.id;
    var url = settings.COMPANY_POLL.replace(":company_id", company_id);
        url = url.replace(":poll_id", poll_id);

    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());

    promise.then(function(result) {
      var url2 = settings.COMPANY_OPTIONS_CONTAINERS.replace(":company_id", company_id);

      var promise2 = fetch(url2, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json());

      promise2.then(function(result2) {
        form.setState({ poll: result });
        form.setState({ optionsContainers: result2 });
        form.setState({ status: PollEditFormStatus.READY });
      });
    }, function(err) {
      console.log(err);
    });
  }

  _onChangeText = (question_id, text) => {
    var k = this._findQuestionById(question_id);
    var poll = this.state.poll;

    poll.Questions[k].text = text;
    poll.Questions[k].changed = true;
    this.setState({ poll: poll });
  }

  _onChangeOptCont = (question_id, optionsContainer) => {
    var k = this._findQuestionById(question_id);
    var poll = this.state.poll;

    poll.Questions[k].optionsContainer = optionsContainer;
    poll.Questions[k].changed = true;
    this.setState({ poll: poll })
  }

  _findQuestionById = (id) => {
    for(var k = 0; k < this.state.poll.Questions.length; k++) {
      if (this.state.poll.Questions[k].id === id) {
        return k;
      }
    }
    return null;
  }

  _save = () => {
    this.setState({ status: PollEditFormStatus.SAVING });
    this.setState({ updated: false });

    var self     = this;
    var requests = [];

    console.log(this.state.name);
    console.log(this.state.description);

    var poll_id = this.state.poll.id;
    var company_id = 2;
    var url = settings.COMPANY_POLL.replace(":company_id", company_id);
            url = url.replace(":poll_id", poll_id);

    // Update poll info
    var request = fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({ name: this.state.name, description: this.state.description })
    })
    .then((response) => response.json());

    var r = request.then(function(result) {
      self.setState({ updated: true });
    }, function(err) {
      console.log(err);
    });
    requests.push(r);

    // Update poll's questions
    this.state.poll.Questions.forEach((x, k) => {
      if (x.changed) {
        var question_id = x.id;

        var url = settings.COMPANY_QUESTION.replace(":company_id", company_id);
            url = url.replace(":question_id", question_id);

        console.log(url);
        console.log(x.optionsContainer);

        var body = { text: x.text, type: x.type };

        if (x.type === 'options')  {
          body.optionsContainer = x.optionsContainer;
        }

        var promise = fetch(url, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          'body': JSON.stringify(body)
        })
        .then((response) => response.json());

        var p = promise.then(function(result) {

        }, function(err) {
          console.log(err);
        });
        requests.push(p);
      }
    });


    Promise.all(requests).then(function() {
      self._hide();
      if (self.state.updated) {
        self.props.onSubmit({ name: self.state.name, description: self.state.description })
      }

    });


  }
}
