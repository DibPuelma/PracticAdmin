import React, { Component } from 'react'

import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import QuestionEdit from '../../components/QuestionEdit/QuestionEdit.js';
import settings from '../../config/settings';

const customContentStyle = {
  maxWidth: 700,
};

const styles = {
  loginSubmit: {
    marginRight: 20
  },
  loginInput: {
    width: '100%'
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  loginButtonsContainer: {
    paddingTop: 24,
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customWidth: {
    minWidth: 300,
    width: 350,
  }
}

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
};


var PollDialogStatus = { LOADING: 'loading', WAITING: 'waiting', SAVING: 'saving' };

export default class PollDialog extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open             : true,
      status           : PollDialogStatus.LOADING,
      showQuestion     : false,
      name             : '',
      description      : '',
      questionEdit     : null,
      questions        : [],
      selectedType     : 'number',
      optionsContainers: null
    }
  }

  componentDidMount() {
    this._load();
  }

   render() {
    if (this.state.status === PollDialogStatus.LOADING) {
      return (
        <FullPageLoading />
      );
    }

    return (
      <div className="questionDialog">
        <Dialog
          title={ 'Crear Encuesta' }
          actions={ [] }
          modal={ true }
          open={ this.state.open }
          contentStyle={ customContentStyle }
          autoScrollBodyContent={ true }
        >
          <TextField
            floatingLabelText="Nombre:"
            fullWidth={ true }
            multiLine={ true }
            defaultValue={ '' }
            onChange={ (event) => this.setState({ name: event.target.value}) }
          />
          <TextField
            floatingLabelText="Descripción:"
            fullWidth={ true }
            multiLine={ true }
            defaultValue={ '' }
            onChange={ (event) => this.setState({ description: event.target.value }) }
            rows={ 2 }
          />

          <Divider />

          <div>Preguntas:</div>
          <div>
            { this.state.questions.map((x, i) =>
              <QuestionEdit 
                question={ x } 
                onChangeText={ this._onChangeText }
                onChangeOptCont={ this._onChangeOptCont }
                optionsContainers={ this.state.optionsContainers }
                />
            )}
          </div>

          <Divider />
          <div>Añadir pregunta</div>
          <div className="add-wrapper">
            <DropDownMenu
              value={ this.state.selectedType }
              onChange={ this.typeChange }
              style={ styles.customWidth }
              autoWidth={ true }
              >
                <MenuItem value={ 'number' } primaryText={ 'Número' } />
                <MenuItem value={ 'boolean' } primaryText={ 'Sí/No' } />
                <MenuItem value={ 'text' } primaryText={ 'Texto' } />
                <MenuItem value={ 'options' } primaryText={ 'Opciones' } />
            </DropDownMenu>

            <FlatButton 
              className="add-button" 
              label="Añadir" 
              icon={ <ContentAdd {...iconProps}/> }
              onClick={ this._addQuestion }
              />
          </div>


          { this.state.status === PollDialogStatus.WAITING  &&
            <div style={ styles.loginButtonsContainer }>
              <RaisedButton onClick={ this._save } primary={ true } style={ styles.loginSubmit } label="Guardar" />
              <RaisedButton onClick={ this.props.onDestroy } label="Cancelar" />
            </div>
          }

          { this.state.status === PollDialogStatus.SAVING  &&
            <div style={ styles.loginButtonsContainer }>
              <CircularProgress />
            </div>
          }

        </Dialog>
      </div>
      )
  }

  _load = () => {
    var self = this;

    var company_id = this.props.user.company_id;
    var url = settings.COMPANY_OPTIONS_CONTAINERS.replace(":company_id", company_id);

    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self.setState({ optionsContainers: result });
      self.setState({ status: PollDialogStatus.WAITING });
    });
  }

  _findById = (id) => {
    for (var i = 0; i < this.state.questions.length; i++) {
      if (this.state.questions[i].id === id)
        return i;
    }
    return null;
  }

  _findOptContById = (id) => {
    for (var i = 0; i < this.state.optionsContainers.length; i++) {
      if (this.state.optionsContainers[i].id === id)
        return this.state.optionsContainers[i];
    }
    return null; 
  }

  typeChange = (event, index, value) => {
    this.setState({ selectedType: value});
  }

  _onChangeText = (question_id, text) => {
    var k = this._findById(question_id);
    var questions = this.state.questions;
    
    questions[k].text = text;
    
    this.setState({ questions: questions });
  }

  _onChangeOptCont = (question_id, optionsContainerId) => {
    var k = this._findById(question_id);
    var questions = this.state.questions;
    
    questions[k].options_container_id = optionsContainerId;
    questions[k].OptionsContainer     = this._findOptContById(optionsContainerId);
    
    // console.log(questions[k].options_container_id)
    // console.log(questions[k].OptionsContainer)

    this.setState({ questions: questions });
  }

  _addQuestion = () => {
    var question = { 
      id  : this.state.questions.length + 1, 
      text:'',
      type: this.state.selectedType
    }

    if (this.state.selectedType === 'options') {
      question.options_container_id = this.state.optionsContainers[0].id;
      question.OptionsContainer = this.state.optionsContainers[0];
    }

    var questions = this.state.questions;
    questions.push(question);
    this.forceUpdate();
  }

  _save = () => {
    this.setState({ status: PollDialogStatus.SAVING });
    
    // Questions   
    var newQuestions = [];
    var existingQuestions = [];

    for (var i = 0; i < this.state.questions.length; i++) {
      var question = {
        text: this.state.questions[i].text,
        type: this.state.questions[i].type
      };

      if (question.type === 'options') {
        question.optionsContainer = this.state.questions[i].options_container_id;
      }
      // TODO: separate questions
      newQuestions.push(question);
    }

    // Body
    var body = { 
      name             : this.state.name,
      description      : this.state.description,
      newQuestions     : newQuestions,
      existingQuestions: existingQuestions,
      order            : 0
    };

    console.log(JSON.stringify(body));
    
    this.props.onSubmit(body);
  }
}

