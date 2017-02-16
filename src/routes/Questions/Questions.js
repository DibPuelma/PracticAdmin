import React, { Component } from 'react'
import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import Question from '../../components/Question/Question.js';
import settings from '../../config/settings';

var QuestionsStatus = { LOADING: 'loading', READY: 'ready' };

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { status: QuestionsStatus.LOADING };
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
        <div className="questions-container">
          { this.state.questions.map((x, i) =>
            <Question question={ x } optionsContainers={ this.state.optionsContainers }/>
          )}
        </div>
      </div>
    );
  }

  _load() {
    var self = this;

    var company_id = 2;
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
      var url2 = settings.COMPANY_OPTIONS_CONTAINER.replace(":company_id", company_id);

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
}
