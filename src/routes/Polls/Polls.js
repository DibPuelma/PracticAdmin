import React, { Component } from 'react'
import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import Poll from '../../components/Poll/Poll.js';
import settings from '../../config/settings';

var PollsStatus = { LOADING: 'loading', READY: 'ready' };

export default class Polls extends Component {
  constructor(props) {
    super(props);
    this.state = { status: PollsStatus.LOADING };
  }

  componentDidMount() {
    this._load();
  }

  render() {
    if (this.state.status === PollsStatus.LOADING) {
      return (
        <FullPageLoading />
      );
    }

    return (
      <div>
        <div className="polls-container">
          { this.state.polls.map((x, i) =>
            <Poll poll={ x } />
          )}
        </div>
      </div>
    );
  }

  _load() {
    var polls = this;
    /*var promise = new Promise(function(resolve, reject) {
      setTimeout(function() { // Wait for api simulation
        resolve("Stuff worked!");
        //reject(Error("It broke"));
      }, 2000);
    });*/

    var company_id = 2;
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
      polls.setState({ polls: result });
      polls.setState({ status: PollsStatus.READY });
    }, function(err) {
      console.log(err);
    });
  }
}
