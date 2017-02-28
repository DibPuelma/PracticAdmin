import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import OptionsContainer from '../../components/OptionsContainer/OptionsContainer.js';
import OptionsContainerDialog from '../../components/OptionsContainerDialog/OptionsContainerDialog.js';
import settings from '../../config/settings';

var OptionsContainersStatus = { LOADING: 'loading', READY: 'ready' };

export default class OptionsContainers extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      status          : OptionsContainersStatus.LOADING,
      showCreateDialog: false,
      createDialog    : null,
      user            : this.props.route.getUser()
    };
  }

  componentDidMount() {
    this._load();
  }

  render() {
    if (this.state.status === OptionsContainersStatus.LOADING) {
      return (
        <FullPageLoading />
      );
    }

    return (
      <div>
        <div>
          <RaisedButton onClick={ this._create } primary={ true } label="Crear" />
        </div>

        <div className="options-containers-container">
          { this.state.options_containers.map((x, i) =>
            <OptionsContainer optionsContainer={ x } allOptions={ this.state.allOptions } updateSubmit={ this._updateSubmit } />
          )}
        </div>

        { this.state.showCreateDialog && 
          this.state.createDialog
        }

      </div>
    );
  }

  _load = () => {
    this.state = { status: OptionsContainersStatus.LOADING };
    var self = this;

    var company_id = 2;
    var url = settings.COMPANY_OPTIONS_CONTAINERS.replace(":company_id", company_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json());

    promise.then(function(result) {
      var url2 = settings.COMPANY_POSSIBLE_OPTIONS.replace(":company_id", company_id);
      var promise2 = fetch(url2, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        } 
      })
      .then((response) => response.json());
      promise2.then(function(result2) {
        self.setState({ allOptions: result2 });
        self.setState({ options_containers: result });
        self.setState({ status: OptionsContainersStatus.READY });
      }, function(err) {
        console.log(err);
      });    
    }, function(err) {
      console.log(err);
    });
  }

  _create = () => {
    this.setState({ 
      showCreateDialog: true, 
      createDialog:     (<OptionsContainerDialog 
                          onDestroy={ this._hideDialog }
                          onSubmit={ this._createSubmit }
                          allOptions={ this.state.allOptions }
                        />)
    });
  }

  _hideDialog = () => {
    this.setState({ showCreateDialog: false, createDialog: null });
  }

  _updateSubmit = (id, body) => {
    // Make request
    var self = this;
    var company_id = this.state.user.company_id;
    var container_id = id;
    var url = settings.COMPANY_OPTIONS_CONTAINER.replace(":company_id", company_id);
    url = url.replace(":id", container_id);

    var promise = fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(body)
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self._load();
    }, function(err) {
      console.log(err);
    });
  }

  _createSubmit = (id, body) => {
    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_OPTIONS_CONTAINERS.replace(":company_id", company_id);

    console.log(JSON.stringify(body));

    var promise = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(body)
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self._hideDialog();
      self._load();
    }, function(err) {
      console.log(err);
    });
  }
}
