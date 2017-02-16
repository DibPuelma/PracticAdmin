import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import settings from '../../config/settings';

import QuestionEdit from '../../components/QuestionEdit/QuestionEdit.js';

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
}

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

var QuestionStatus = { WAITING: 'waiting', EDITING: 'editing', 'SAVING': 'saving' }

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { status: QuestionStatus.WAITING, question: this.props.question };
  }

  render() {
    return (
      <div className="question-container">
        <Paper className="question" >
          { this.state.status === QuestionStatus.WAITING &&
            <div>
              <div className="title">{ this.state.question.text }</div>
              <Divider />
              <FlatButton className="option" label="Editar" 
                icon={ <ContentCreate {...iconProps}/> }
                onClick={ this._onEdit }
                />
              <FlatButton className="option" label="Eliminar" 
                icon={ <ActionDelete {...iconProps}/> } />
            </div>
          }

          { (this.state.status === QuestionStatus.EDITING || this.state.status === QuestionStatus.SAVING) && 
            <div>
              <QuestionEdit 
                question={ this.state.question } 
                onChangeText={ this._onChangeText } 
                onChangeOptCont={ this._onChangeOptCont } 
                optionsContainers={ this.props.optionsContainers }
              />

              { this.state.status === QuestionStatus.EDITING  &&
                <div style={ styles.loginButtonsContainer }>
                  <RaisedButton onClick={ this._onSave } primary={ true } style={ styles.loginSubmit } label="Guardar" />
                  <RaisedButton onClick={ this._onCancel } label="Cancelar" />
                </div>
              }

              { this.state.status === QuestionStatus.SAVING  &&
                <div style={ styles.loginButtonsContainer }>
                  <CircularProgress />
                </div>
                }
            </div>
          }

        </Paper>
      </div>
    );
  }

  _onEdit = () => {
    this.setState({ status: QuestionStatus.EDITING });

    if (this.state.question.type === 'options') {
      var question = this.state.question;
      var k = this._getOptionsContainerById(question.options_container_id);
      question.OptionsContainer = this.props.optionsContainers[k];
      this.setState({ question: question });

      this.setState({ updated: false });
      this.setState({ updatedText: this.state.question.text });
      this.setState({ updatedContainer: this.state.question.OptionsContainer });
    }
  }

  _getOptionsContainerById = (id) => {
    for(var k = 0; k < this.props.optionsContainers.length; k++) {
      if (this.props.optionsContainers[k].id === id) {
        return k;
      }
    }
    return null;
  }

  _onCancel = () => {
    this.setState({ status: QuestionStatus.WAITING });
  }

  _onSave = () => {
    var self = this;
    self.setState({ status: QuestionStatus.SAVING });

    var company_id = 2;
    var question_id = self.state.question.id;

    var url = settings.COMPANY_QUESTION.replace(":company_id", company_id);
    url = url.replace(":question_id", question_id);

    var body = { text: self.state.updatedText, type: self.state.question.type };

    if (self.state.question.type === 'options')  {
      body.optionsContainer = self.state.updatedContainer.id;
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
    
    promise.then(function(result) {
      var question = self.state.question;
      question.text = self.state.updatedText;
      if (question.type === 'options') {
        question.options_container_id = self.state.updatedContainer.id;
        question.optionsContainer =  self.state.updatedContainer;
      }

      self.setState({ question: question });
      self.setState({ status: QuestionStatus.WAITING });
    }, function(err) {
      self.setState({ status: QuestionStatus.EDITING });      
      console.log(err);
    });
  }

  _onChangeText = (question_id, text) => {
    this.setState({ updatedText: text });
  }

  _onChangeOptCont = (question_id, optionsContainerId) => {
    var k = this._getOptionsContainerById(optionsContainerId);
    var optionsContainer = this.props.optionsContainers[k]
    this.setState({ updatedContainer: optionsContainer });
  }

}
