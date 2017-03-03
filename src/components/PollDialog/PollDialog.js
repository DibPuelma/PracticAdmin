import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import QuestionEdit from '../../components/QuestionEdit/QuestionEdit.js';
import settings from '../../config/settings';

const customContentStyle = {
  maxWidth: 700,
};

const addQuestionContentStyle = {
  maxWidth: 500,
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
    
    var buttonCreateQuestion = {
      className: 'option selected',
      disabled: true
    };

    var buttonAddExistingQuestion = {
      className: 'option',
      disabled: false
    };

    var questions = [];
    if (props.poll) {
      questions = props.poll.Questions;
      questions = questions.sort((a, b) => Number(a.PollQuestions.order) - Number(b.PollQuestions.order));
    }

    this.state = {
      open             : true,
      openAddQuestion  : false,

      title            : props.editingMode ? 'Editar encuesta' : 'Crear encuesta',
      status           : PollDialogStatus.LOADING,
      showQuestion     : false,

      name             : props.poll ? props.poll.name : '',
      description      : props.poll ? props.poll.description : '',
      questions        : questions,
      
      questionEdit     : null,
      optionsContainers: null,
      selectedType     : null,
      selectedQuestion : null,

      buttonCreateQuestion     : buttonCreateQuestion,
      buttonAddExistingQuestion: buttonAddExistingQuestion
    }
  }

  componentDidMount() {
    this._load();
  }

  render() {
    return (
      <div>
        <Dialog
          title={ this.state.title }
          actions={ [] }
          modal={ true }
          open={ this.state.open }
          contentStyle={ customContentStyle }
          autoScrollBodyContent={ true }
          className={ "dialog" }
        >
        { this.state.status === PollDialogStatus.LOADING &&
          <div style={ styles.loginButtonsContainer }>
            <CircularProgress />
          </div>
        }

        { this.state.status !== PollDialogStatus.LOADING &&
          <div>
            <h5 style={{ marginBottom: 0 }}>Información</h5>
            <TextField
              floatingLabelText="Nombre:"
              fullWidth={ true }
              value={ this.state.name }
              onChange={ (event) => this.setState({ name: event.target.value}) }
              errorText={ this.state.nameError }
            />
            <TextField
              floatingLabelText="Descripción:"
              fullWidth={ true }
              value={ this.state.description }
              onChange={ (event) => this.setState({ description: event.target.value }) }
              errorText={ this.state.descriptionError }
            />

            <h5 style={{ marginTop: 40, marginBottom: 0 }}>Preguntas</h5>
            <div>
              { this.state.questions.map((x, i) =>
                <QuestionEdit 
                  question={ x }
                  optionsContainers={ this.state.optionsContainers }
                  allOptions={ this.state.allOptions }
                  user={ this.props.user }

                  onChangeText={ this._onChangeText }
                  onChangeOptCont={ this._onChangeOptCont }
                  onDelete={ this.props.editingMode ? null : this._deleteQuestion }
                  onMoveUp={ this._moveUpQuestion }
                  onMoveDown={ this._moveDownQuestion }
                  reloadContainers={ this._reloadContainers }

                  editingMode={ this.props.editingMode }

                  key={ x.id }
                  />
              )}
            </div>

            { !this.props.editingMode &&
            <div style={{ paddingTop: 20, paddingBottom: 20, textAlign: 'center' }} >
              <FlatButton 
                className="add-button" 
                label="Añadir Pregunta" 
                icon={ <ContentAdd {...iconProps}/> }
                style={{ paddingLeft: 10 }}
                onClick={ () => this.setState({ openAddQuestion: true }) }
                />
            </div>
            }

            <Dialog
              title={ 'Añadir pregunta' }
              actions={ [] }
              modal={ false }
              open={ this.state.openAddQuestion }
              contentStyle={ addQuestionContentStyle }
              autoScrollBodyContent={ true }
              onRequestClose={ () => this.setState({ openAddQuestion: false }) }
            >
              <div className="add-wrapper">
                <h5 style={{ marginBottom: 0, paddingTop: 20, marginLeft: 20 }}>Añadir pregunta</h5>
                
                <div style={{ paddingTop: 20, textAlign: 'center' }} >
                  <RaisedButton 
                    className={ this.state.buttonCreateQuestion.className }
                    disabled={ this.state.buttonCreateQuestion.disabled }
                    label="Crear pregunta"
                    onClick={ this._userCreateQuestion }
                    />
                  <RaisedButton 
                    className={ this.state.buttonAddExistingQuestion.className }
                    disabled={ this.state.buttonAddExistingQuestion.disabled }
                    label="Usar pregunta existente"
                    style={{ marginLeft: 20 }}
                    onClick={ this._userExistingQuestion }
                    />
                </div>

                { this.state.buttonCreateQuestion.disabled && /* disabled <=> selected */
                  <div style={{ paddingTop: 20, paddingBottom: 20, textAlign: 'center' }} >
                    <DropDownMenu
                      value={ this.state.selectedType }
                      onChange={ this.typeChange }
                      autoWidth={ true }
                      >
                      <MenuItem value={ null } primaryText={ 'Seleccionar un tipo' } />
                      <MenuItem value={ 'number' } primaryText={ 'Número' } />
                      <MenuItem value={ 'boolean' } primaryText={ 'Sí/No' } />
                      <MenuItem value={ 'text' } primaryText={ 'Texto' } />
                      <MenuItem value={ 'options' } primaryText={ 'Opciones' } />
                    </DropDownMenu>
                  </div>
                }

                { this.state.buttonAddExistingQuestion.disabled && 
                  <div style={{ paddingTop: 20, paddingBottom: 20, textAlign: 'center' }} >
                    <DropDownMenu
                      value={ this.state.selectedQuestion }
                      onChange={ this.selectedQuestionChange }
                      autoWidth={ true }
                      >
                      <MenuItem value={ null } primaryText={ 'Seleccionar una pregunta' } key={ 0 } />
                      { this.state.allQuestions.map((x, i) =>
                        <MenuItem value={ x.id } primaryText={ x.text } key={ x.id } />
                      )}
                    </DropDownMenu>
                  </div>
                }
              </div>
             </Dialog>

            { this.state.error &&
              <div className={ 'error' }>
                { this.state.error }
              </div>
            }

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
          </div>
        }

        </Dialog>
      </div>
      )
  }

  _userCreateQuestion = () => {
    this.setState({ selectedType: null });
    var buttonCreateQuestion = {
      className: 'option selected',
      disabled: true
    };

    var buttonAddExistingQuestion = {
      className: 'option',
      disabled: false
    };

    this.setState({ buttonCreateQuestion: buttonCreateQuestion });
    this.setState({ buttonAddExistingQuestion: buttonAddExistingQuestion });
  }
  _userExistingQuestion = () => {
    this.setState({ selectedQuestion: null });
    var buttonCreateQuestion = {
      className: 'option',
      disabled: false
    };

    var buttonAddExistingQuestion = {
      className: 'option selected',
      disabled: true
    };

    this.setState({ buttonCreateQuestion: buttonCreateQuestion });
    this.setState({ buttonAddExistingQuestion: buttonAddExistingQuestion });
  }

  _load = () => {
    var self = this;
    var promises = [];
    var company_id = this.props.user.company_id;

    // Load all options containers
    var url = settings.COMPANY_OPTIONS_CONTAINERS.replace(":company_id", company_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());
    var p1 = promise.then(function(result) {
      self.setState({ optionsContainers: result });
    });
    promises.push(p1);

    // Load all questions
    var url2 = settings.COMPANY_QUESTIONS.replace(":company_id", company_id);
    var promise2 = fetch(url2, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());    
    var p2 = promise2.then(function(result) {
      self.setState({ allQuestions: result });
    });
    promises.push(p2);

    // Load all possible options
    var url3 = settings.COMPANY_POSSIBLE_OPTIONS.replace(":company_id", company_id);
    var promise3 = fetch(url3, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      } 
    })
    .then((response) => response.json());    
    var p3 = promise3.then(function(result) {
      self.setState({ allOptions: result });
    }, function(err) {
      console.log(err);
    });
    promises.push(p3);

    // Resolve
    Promise.all(promises).then(() => {
      self.setState({ status: PollDialogStatus.WAITING });    
    }).catch((error) => { 
      console.log(error); 
    });
  }
  
  _reloadContainers = () => {
    var self = this;
    var promises = [];
    var company_id = this.props.user.company_id;

    // Load all options containers
    var url = settings.COMPANY_OPTIONS_CONTAINERS.replace(":company_id", company_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());
    var p1 = promise.then(function(result) {
      self.setState({ optionsContainers: result });
    });
    promises.push(p1);

    // Load all possible options
    var url3 = settings.COMPANY_POSSIBLE_OPTIONS.replace(":company_id", company_id);
    var promise3 = fetch(url3, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      } 
    })
    .then((response) => response.json());    
    var p3 = promise3.then(function(result) {
      self.setState({ allOptions: result });
    }, function(err) {
      console.log(err);
    });
    promises.push(p3);

    // Resolve
    return Promise.all(promises);
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
    if (value === null) return;
    // this.setState({ selectedType: value });

    var question = { 
      id  : -(this.state.questions.length + 1),
      text:'',
      type: value,
      newQuestion : true
    }

    if (value === 'options') {
      question.options_container_id = this.state.optionsContainers[0].id;
      question.OptionsContainer = this.state.optionsContainers[0];
    }

    var questions = this.state.questions;
    questions.push(question);
    this.setState({ questions: questions, openAddQuestion: false });
    this.forceUpdate();
  }

  selectedQuestionChange = (event, index, value) => {
    if (value === null) return;
    // this.setState({ selectedQuestion: value });

    var question = null;
    for (var i = 0; i < this.state.allQuestions.length; i++) {
      if (this.state.allQuestions[i].id === value) {
        question = this.state.allQuestions[i];
        break;
      }
    }

    // No question selected
    if (question === null) return;

    // The question is already in the poll
    if (this._findById(value) !== null) {
      this.setState({ openAddQuestion: false });
      this.forceUpdate();
      return;
    }

    question.newQuestion = false;

    if (question.type === 'options') {
      question.OptionsContainer = this._findOptContById(question.options_container_id);
    }

    var questions = this.state.questions;
    questions.push(question);
    this.setState({ questions: questions, openAddQuestion: false });
    this.forceUpdate();
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
    // FIXME: id must not be in use
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

  _deleteQuestion = (question) => {
    var questions = this.state.questions;
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].id === question.id) {
        questions.splice(i, 1);
      }
    }
    this.setState({ questions: questions });
    this.forceUpdate();
  }

  _moveUpQuestion = (question) => {
    var questions = this.state.questions;
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].id === question.id) {
        if (i === 0) return;
        var aux = questions[i - 1];
        questions[i - 1] = questions[i];
        questions[i] = aux;
        break;
      }
    }

    this.setState({ questions: questions });
    this.forceUpdate();
  }

  _moveDownQuestion = (question) => {
   var questions = this.state.questions;
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].id === question.id) {
        if (i === questions.length - 1) return;
        var aux = questions[i + 1];
        questions[i + 1] = questions[i];
        questions[i] = aux;
        break;
      }
    }

    this.setState({ questions: questions });
    this.forceUpdate(); 
  }

  _validate = () => {
    var result = true;

    if (this.state.name.length < 1 || this.state.name.length > 30) {
      this.setState({ nameError: 'Este campo es necesario. Entre 1 y 30 caracteres.' });
      result = false;
    } else {
      this.setState({ nameError: null });
    }

    if (this.state.description.length > 500) {
      this.setState({ descriptionError: 'Este campo no puede tener más de 500 caracteres.' });
      result = false;
    } else {
      this.setState({ descriptionError: null });
    }

    if (!result) {
      this.setState({ error: 'Error en la validación. Por favor, revisar los campos ingresados' });
    } else {
      this.setState({ error: null });
    }

    return result;
  }

  _save = () => {
    if (!this._validate()) return;

    this.setState({ status: PollDialogStatus.SAVING });
    
    // Questions   
    var newQuestions = [];
    var existingQuestions = [];

    for (var i = 0; i < this.state.questions.length; i++) {
      var question = {
        text : this.state.questions[i].text,
        type : this.state.questions[i].type,
        order: (i + 1)
      };

      if (question.type === 'options') {
        question.optionsContainer = this.state.questions[i].options_container_id;
      }

      if (this.state.questions[i].newQuestion) {
        newQuestions.push(question);
      } else {
        question.id = this.state.questions[i].id;
        existingQuestions.push(question);
      }
    }

    // Body
    var body = { 
      name             : this.state.name,
      description      : this.state.description,
      newQuestions     : newQuestions,
      existingQuestions: existingQuestions
    };

    /*console.log(JSON.stringify(body));*/
    
    this.props.onSubmit(body);
  }
}

