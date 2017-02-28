import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import Question from '../../components/Question/Question.js';
import QuestionDialog from '../../components/QuestionDialog/QuestionDialog.js';

import settings from '../../config/settings';

var QuestionsStatus = { LOADING: 'loading', READY: 'ready' };

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      status          : QuestionsStatus.LOADING ,
      showCreateDialog: false, 
      createDialog    : null,
      user            : this.props.route.getUser()
    };
  }

  componentDidMount() {
    this._load();
  }

  render() {
    if (this.state.status === QuestionsStatus.LOADING) {
      return (
        <FullPageLoading />
      );
    }

    return (
      <div>
        <div>
          <RaisedButton onClick={ this._create } primary={ true } label="Crear" />
        </div>

        <div className="questions-container">
          { this.state.questions.map((x, i) =>
            <Question question={ x } optionsContainers={ this.state.optionsContainers } />
          )}
        </div>

        { this.state.showCreateDialog && 
          this.state.createDialog
        }

      </div>
    );
  }

  _load() {
    this.setState({ status: QuestionsStatus.LOADING });
    var self = this;

    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_QUESTIONS.replace(":company_id", company_id);
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
        self.setState({ optionsContainers: result2 });
        self.setState({ questions: result });
        self.setState({ status: QuestionsStatus.READY });
      });

    }, function(err) {
      console.log(err);
    });
  }

  _create = () => {
    this.setState({ 
      showCreateDialog: true, 
      createDialog:     (<QuestionDialog 
                          onDestroy={ this._hideDialog }
                          onSubmit={ this._createSubmit }
                          optionsContainers={ this.state.optionsContainers }
                          />)
    });
  }

  _hideDialog = () => {
    this.setState({ showCreateDialog: false, createDialog: null });
  }

  _createSubmit = (body) => {
    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_QUESTIONS.replace(":company_id", company_id);

    var promise = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(body)
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self._hideDialog();
      self._load();
    }, function(err) {
      self._hideDialog();
      console.log(err);
      // TODO: show error on dialog
    });
  }

}
