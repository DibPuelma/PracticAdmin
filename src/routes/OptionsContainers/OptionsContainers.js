import React, { Component } from 'react'

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import OptionsContainer from '../../components/OptionsContainer/OptionsContainer.js';
import settings from '../../config/settings';

var OptionsContainersStatus = { LOADING: 'loading', READY: 'ready' };

export default class OptionsContainers extends Component {
  constructor(props) {
    super(props);
    this.state = { status: OptionsContainersStatus.LOADING };
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
        <div className="options-containers-container">
          { this.state.options_containers.map((x, i) =>
            <OptionsContainer optionsContainer={ x } allOptions={ this.state.allOptions } refresh={ this._load } />
          )}
        </div>
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
}
