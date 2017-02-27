import React, {Component} from 'react'

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import Contest from '../../components/Contest/Contest.js';
import settings from '../../config/settings';
import ContestEditForm from '../../components/ContestEditForm/ContestEditForm.js';
import RaisedButton from 'material-ui/RaisedButton';

var ContestsStatus = {LOADING: 'loading', READY: 'ready'};

export default class Contests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ContestsStatus.LOADING,
      showCreateDialog: false,
      createDialog: null,
    };
  }

  componentDidMount() {
    this._load();
  }

  render() {
    if (this.state.status === ContestsStatus.LOADING) {
      return (
        <FullPageLoading />
      );
    }
    else {
      return (
        <div>
        <div>
        <RaisedButton onClick={this._create} primary={true} label="Crear" />
        </div>

        <div className="employees-container">
        {this.state.contests.map((contest, i) => (
          <Contest key={i}
          contest={contest}
          sellPoints={this.state.sellPoints}
          updateContests={this._load}
          takenSellPoints={this.state.takenSellPoints}
          delete={this._delete}
          />
        ))}
        </div>

        {this.state.showCreateDialog &&
          this.state.createDialog
        }

        </div>
      );
    }
  }

  _load = () => {
    var company_id = 2;
    var url = settings.COMPANY_CONTESTS.replace(":company_id", company_id);
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((contests) => {
      fetch(settings.COMPANY_SELLPOINTS.replace(":company_id", company_id), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((sellPoints) => {
        console.log(sellPoints);
        this.setState({
          sellPoints: sellPoints,
          contests: contests,
          takenSellPoints: this._getTakenSellPoints(contests),
          status: ContestsStatus.READY
        });
      })
      .catch((error) => {
        console.log(error);
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  _create = () => {
    this.setState({
      showCreateDialog: true,
      createDialog:     (<ContestEditForm
        onDestroy={this._hideDialog}
        onSubmit={this._createSubmit}
        sellPoints={this.state.sellPoints}
        contest={null}
        takenSellPoints={this.state.takenSellPoints}
        title='Crear Concurso'
        />)
      });
    }

    _hideDialog = () => {
      this.setState({showCreateDialog: false, createDialog: null});
    }

    _createSubmit = (body) => {
      var company_id = 2;
      fetch(settings.COMPANY_CONTESTS.replace(":company_id", company_id), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      .then((response) => {
        response.json()
      })
      .then((result) => {
        this._hideDialog();
        this._load();
      })
      .catch((error) => {
        this._hideDialog();
        // TODO: show error on dialog
      });
    }

    _getTakenSellPoints = (contests) => {
      var takenSellPoints = [];
      contests.map((contest) => {
        contest.SellPoints.map((sellPoint) => {
          takenSellPoints.push(sellPoint.id);
        })
      })
      return takenSellPoints;
    }

    _delete = (id) => {
      var company_id = 2;
      fetch(settings.COMPANY_CONTEST.replace(":company_id", company_id).replace(":id", id), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((result) => {
      })
      .catch((error) => {
        console.log(error);
        // TODO: show error on dialog
      });
    }
  }
