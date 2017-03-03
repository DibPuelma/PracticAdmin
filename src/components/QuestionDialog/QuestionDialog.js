import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import QuestionEdit from '../../components/QuestionEdit/QuestionEdit.js';

const customContentStyle = {
  maxWidth: 700,
  paddingTop: 15, 
  paddingBottom: 15
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

var QuestionDialogStatus = { WAITING: 'waiting', SAVING: 'saving' };

export default class QuestionDialog extends Component {
  constructor(props) {
    super(props);

    var question = { type:'number', text: '' };
    
    question.options_container_id = this.props.optionsContainers[0].id;
    question.OptionsContainer = this.props.optionsContainers[0];
    
    this.state = {
      status: QuestionDialogStatus.WAITING,
      open: true,
      showQuestion: false,
      questionEdit: null,
      question: question
    }
  }

  componentDidMount() {
    this.updateQuestionEdit();
  }

  render() {
    return (
      <div className="dialog">
        <Dialog
          title={ 'Crear Pregunta' }
          actions={ [] }
          modal={ true }
          open={ this.state.open }
          contentStyle={ customContentStyle }
          autoScrollBodyContent={ true }
        >
          <div className={ 'selectContainer' } >
            <SelectField
              floatingLabelText="Tipo de pregunta"
              value={ this.state.question.type }
              onChange={ this.typeChange }
              style={ styles.customWidth }
              autoWidth={ true }
              >
                <MenuItem value={ 'number' } primaryText={ 'Número' } />
                <MenuItem value={ 'boolean' } primaryText={ 'Sí/No' } />
                <MenuItem value={ 'text' } primaryText={ 'Texto' } />
                <MenuItem value={ 'options' } primaryText={ 'Opciones' } />
            </SelectField>
          </div>

          { this.state.showQuestion &&
            this.state.questionEdit
          }

          { this.state.status === QuestionDialogStatus.WAITING  &&
            <div style={ styles.loginButtonsContainer }>
              <RaisedButton onClick={ this._save } primary={ true } style={ styles.loginSubmit } label="Guardar" />
              <RaisedButton onClick={ this.props.onDestroy } label="Cancelar" />
            </div>
          }

          { this.state.status === QuestionDialogStatus.SAVING  &&
            <div style={ styles.loginButtonsContainer }>
              <CircularProgress />
            </div>
          }

        </Dialog>
      </div>
      )
  }

  typeChange = (event, index, value) => {
    this.setState({ showQuestion: false });
    this.setState({ question: null });

    var question = this.state.question;
    question.type = value;

    this.setState({ question: question });
    this.updateQuestionEdit();
  }

  updateQuestionEdit = () => {
    this.setState({ showQuestion: true });
    this.setState({ questionEdit: (
         <QuestionEdit
          question={ this.state.question } 
          onChangeText={ this._onChangeText } 
          onChangeOptCont={ this._onChangeOptCont } 
          optionsContainers={ this.props.optionsContainers }
          textError={ this.state.textError }
          /> 
          )});
  }

  _onChangeText = (question_id, text) => {
    var question = this.state.question;
    question.text = text;
    this.setState({ question: question });
  }

  _onChangeOptCont = (question_id, optionsContainerId) => {
    var question = this.state.question;
    question.options_container_id = optionsContainerId;
    this.setState({ question: question });
  }

  _validate = () => {
    var result = true;
    
    if (this.state.question.text.length < 1 || this.state.question.text.length > 100) {
      
      this.setState({ showQuestion: false });
      
      this.setState({ textError: 'Este campo es necesario. Entre 1 y 100 caracteres.' });

      this.updateQuestionEdit();
      
      result = false;
    } else {
      this.setState({ textError: null });
    }

    return result;
  }

  _save = () => {
    if (!this._validate()) return;

    this.setState({ status: QuestionDialogStatus.SAVING });
    var body = { text: this.state.question.text, type: this.state.question.type };

    if (this.state.question.type === 'options') {
      body.optionsContainer = this.state.question.options_container_id;
    }

    this.props.onSubmit(body);
  }

}
