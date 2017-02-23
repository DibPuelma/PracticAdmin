import React, { Component } from 'react'

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import RaisedButton from 'material-ui/RaisedButton';

import Poll from '../../components/Poll/Poll.js';
import PollDialog from '../../components/PollDialog/PollDialog.js';

import settings from '../../config/settings';

var PollsStatus = { LOADING: 'loading', READY: 'ready' };

export default class Polls extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      status          : PollsStatus.LOADING,
      showCreateDialog: false, 
      createDialog    : null,
      user            : this.props.route.getUser()
    };
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
        <div>
          <RaisedButton onClick={ this._create } primary={ true } label="Crear" />
        </div>

        <div className="polls-container">
          { this.state.polls.map((x, i) =>
            <Poll poll={ x } user={ this.state.user } />
          )}
        </div>

        { this.state.showCreateDialog && 
          this.state.createDialog
        }

      </div>
    );
  }

  _load() {
    this.setState({ status: PollsStatus.LOADING });
    var polls = this;

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
      polls.setState({ polls: result });
      polls.setState({ status: PollsStatus.READY });
    }, function(err) {
      console.log(err);
    });
  }


  _hideDialog = () => {
    this.setState({ showCreateDialog: false, createDialog: null });
  }

  _create = () => {
    this.setState({ 
      showCreateDialog: true, 
      createDialog:     (<PollDialog 
                          onDestroy={ this._hideDialog }
                          onSubmit={ this._createSubmit }
                          user={ this.state.user }
                          />)
    });
  }

  _createSubmit = (body) => {
    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_POLLS.replace(":id", company_id);

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
