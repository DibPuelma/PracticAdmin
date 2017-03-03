import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import Question from '../../components/Question/Question.js';
import QuestionDialog from '../../components/QuestionDialog/QuestionDialog.js';

import settings from '../../config/settings';

var QuestionsStatus = { LOADING: 'loading', READY: 'ready' };

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 10
  },
  color: "#FFF",
  viewBox: '0 0 30 30'
}

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      status          : QuestionsStatus.LOADING ,
      showCreateDialog: false, 
      createDialog    : null,
      user            : this.props.route.getUser(),
      deleteDialogOpen: false,
      snackOpen       : false,
      snackText       : ''
    };
  }

  componentDidMount() {
    this._load();
  }

  render() {
    const actions = [
      <FlatButton label="Cancelar" primary={true} onTouchTap={this._handleClose} />,
      <FlatButton label="Eliminar" primary={true} onTouchTap={this._deleteRequest} />,
    ];

    return (
      <div>
        { this.state.status === QuestionsStatus.LOADING &&
          <FullPageLoading />
        }

        { this.state.status !== QuestionsStatus.LOADING &&
          <div>
            <div>
              <RaisedButton onClick={ this._create } primary={ true } label="Crear" icon={ <ContentAdd {...iconProps}/> } />
            </div>

            <div className="questions-container">
              { this.state.questions.map((x, i) =>
                <Question 
                  question={ x }
                  optionsContainers={ this.state.optionsContainers } 
                  doDelete={ this._delete }
                  key={ x.id }
                  onSaved={ this._load }
                  display={ this._display }
                  />
              )}
            </div>

            { this.state.showCreateDialog && 
              this.state.createDialog
            }

            <Dialog
              actions={ actions }
              modal={ false }
              open={ this.state.deleteDialogOpen }
              onRequestClose={ this._handleClose }
              >
              Esta acción es irreversible. ¿Continuar?
            </Dialog>
          </div>
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

  _load = () => {
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
      self._display("Pregunta creada con éxito");
      self._load();
    }, function(err) {
      self._hideDialog();
      self._display("Error interno. Consultar al administrador.");
      console.log(err);
      // TODO: show error on dialog
    });
  }

  _handleClose = () => {
    this.setState({ deleteDialogOpen: false });
  };

  _delete = (id) => {
    this.setState({ toDelete: id, deleteDialogOpen: true });
  }

  _deleteRequest = () => {
    this.setState({ deleteDialogOpen: false });
    this.setState({ status: QuestionsStatus.LOADING });

    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_QUESTION.replace(":company_id", company_id);
    url = url.replace(":question_id", this.state.toDelete);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function(result) {
      self._display("Pregunta eliminada con éxito");
      self._load();
    }, function(err) {
      self._display("Error interno. Consultar al administrador.");
      self._load();
      console.log(err);
    });
  }

}
