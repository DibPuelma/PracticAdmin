import React, { Component } from 'react'

import Snackbar from 'material-ui/Snackbar';
import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import SellPoint from '../../components/SellPoint/SellPoint.js';
import SellPointDialog from '../../components/SellPointDialog/SellPointDialog.js';

import settings from '../../config/settings';

export default class SellPoints extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading   : true,
      user      : this.props.route.getUser(),
      showDialog: false, 
      dialog    : null,
      snackOpen : false,
      snackText : ''
    };
  }

  componentDidMount() {
    this._load();
  }

  render() {
    return (
      <div>
        { this.state.loading &&
          <FullPageLoading />
        }

        { !this.state.loading &&
          <div>
            <div className="sellpoints-container">
              { this.state.sellpoints.map((x) => (
                <SellPoint sellpoint={ x } user={ this.state.user } key={ x.id } onEdit={ this._edit }/>
              ))}
            </div>
          </div>
        }

        { this.state.showDialog && 
          this.state.dialog
        }

        <Snackbar
          open={ this.state.snackOpen }
          message={ this.state.snackText }
          autoHideDuration={ 4000 }
          onRequestClose={ () => { this.setState({ snackOpen: false }) } }
        />

      </div>
    );
  }

  _display = (msg) => {
    this.setState({ snackText: msg, snackOpen: true });
  }

  _load() {
    this.setState({ loading: true });
    var self = this;

    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_SELLPOINTS.replace(":company_id", company_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self.setState({ sellpoints: result });
      self.setState({ loading: false });
    }, function(err) {
      console.log(err);
    });
  }


  _hideDialog = () => {
    this.setState({ showDialog: false, dialog: null });
  }

  _edit = (sellpoint) => {
    this.setState({
      showDialog: true, 
      dialog:     (<SellPointDialog
                    onDestroy={ this._hideDialog }
                    onSubmit={ this._submit }
                    sellpoint={ sellpoint }
                    user={ this.state.user }
                    />)
    });
  }

  _submit = (sellpoint_id, body) => {
    var self = this;
    var promises = [];

    var company_id = this.state.user.company_id;
    var attended_poll_id = body.attended_poll_id;
    var unattended_poll_id = body.unattended_poll_id;

    var url_attended = settings.COMPANY_SELLPOINT_ATTENDED.replace(":company_id", company_id);
    url_attended = url_attended.replace(":sell_point_id", sellpoint_id);
    url_attended = url_attended.replace(":poll_id", attended_poll_id);

    var promise1 = fetch(url_attended, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json());
    promises.push(promise1);

    var url_unattended = settings.COMPANY_SELLPOINT_UNATTENDED.replace(":company_id", company_id);
    url_unattended = url_unattended.replace(":sell_point_id", sellpoint_id);
    url_unattended = url_unattended.replace(":poll_id", unattended_poll_id);

    var promise2 = fetch(url_unattended, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json());
    promises.push(promise2);

    Promise.all(promises).then(() => {
      var sellpoints = self.state.sellpoints;
      for (var i = 0; i < sellpoints.length; i++) {
        if (sellpoints[i].id === sellpoint_id) {
          sellpoints[i].attended_poll_id = attended_poll_id;
          sellpoints[i].unattended_poll_id = unattended_poll_id;
        }
      }
      self.setState({ sellpoints: sellpoints });
      self._display('Punto de venta modificado con éxito');
      self._hideDialog();
    }).catch(function (error) {
      self._hideDialog();
      self._display("Error interno. Consultar al administrador.");
      console.log(error);
    });
    
  }

}
