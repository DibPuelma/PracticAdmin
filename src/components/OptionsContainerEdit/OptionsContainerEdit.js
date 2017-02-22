import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import settings from '../../config/settings';

const styles = {
  customWidth: {
    width: 350,
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
  }
};

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
}

var OptionsContainerEditStatus = { WAITING: 'waiting', SAVING: 'saving' };

export default class OptionsContainerEdit extends Component {
  constructor(props) { 
    var optionsContainer = props.optionsContainer;
    if (optionsContainer == null) {
      optionsContainer = {
        name: '',
        PossibleOptions: []
      }
    }

    super(props);
    this.state = { status: OptionsContainerEditStatus.WAITING,
                   optionsContainer: optionsContainer,
                   name: optionsContainer.name,
                   possibleOptions: optionsContainer.PossibleOptions.slice(0), // Create a copy
                   allOptions: props.allOptions,
                   newValue: '',
                   company_id: props.allOptions[0].company_id
                 };
  }

  render() {
    return (
      <div className="optionsContainerEdit">
        <TextField
          floatingLabelText="Nombre:"
          fullWidth={ true }
          multiLine={ true }
          defaultValue={ this.state.optionsContainer.name }
          onChange={ (event) => this.setState({ name: event.target.value}) }
          />

        <div>Opciones</div>
        <div className="add-wrapper">
          <TextField
            className="add-input"
            floatingLabelText="Añadir opción:"
            fullWidth={ true }
            multiLine={ true }
            defaultValue={ '' }
            value={ this.state.newValue }
            onChange={ (event) => this.setState({ newValue: event.target.value}) }
            />

          <FlatButton className="add-button" label="Añadir" 
            icon={ <ContentAdd {...iconProps}/> }
            onClick={ this._addOption }
            />
        </div>

        <div style={styles.wrapper}>
          { this.state.possibleOptions.map((x, i) =>
             <Chip style={styles.chip} className="chip" 
              onRequestDelete={ () => this._deleteOption(x) }>{ x.value }</Chip>
          )}
        </div>

        { this.state.status === OptionsContainerEditStatus.WAITING  &&
          <div style={ styles.loginButtonsContainer }>
            <RaisedButton onClick={ this._save } primary={ true } style={ styles.loginSubmit } label="Guardar" />
            <RaisedButton onClick={ this.props.onCancel } label="Cancelar" />
          </div>
        }

        { this.state.status === OptionsContainerEditStatus.SAVING  &&
          <div style={ styles.loginButtonsContainer }>
            <CircularProgress />
          </div>
        }

      </div>
    );
  }

  _changeText = (event) => {
    this.props.onChangeText(this.props.question.id, event.target.value);
  }

  _findOptionByValue = (value) => {
    for (var i = 0; i < this.state.allOptions.length ; i++) {
      if (this.state.allOptions[i].value === value) {
        return this.state.allOptions[i];
      }
    }
    return null;
  }

  _isContained = (option) => {
    for (var i = 0; i < this.state.possibleOptions.length; i++) {
      if (this.state.possibleOptions[i].value === option.value) {
        return true;
      }
    }
    return false;
  }

  _addOption = () => {
    var value = this.state.newValue;

    var option = this._findOptionByValue(value);
    if (option === null)
      option = { new: true, value: value }

    if (!this._isContained(option)) {
      var possibleOptions = this.state.possibleOptions;
      var newOption = option;
      newOption['add'] = true;
      possibleOptions.push(newOption);
      this.setState({ possibleOptions: possibleOptions });
    }
    this.setState({ newValue: '' });
  }

  _deleteOption = (option) => {
    var possibleOptions = this.state.possibleOptions;
    for (var i = 0; i < this.state.possibleOptions.length; i++) {
      if (this.state.possibleOptions[i].value === option.value) {
        possibleOptions.splice(i, 1);
      }
    }
    this.setState({ possibleOptions: possibleOptions });
  }

  _save = () => {
    this.setState({ status: OptionsContainerEditStatus.SAVING });

    var company_id = this.state.company_id;
    var newOptions = [];
    var existingOptions = [];
    var deletedOptions = [];

    // Separate possible options
    for (var i = 0; i < this.state.possibleOptions.length; i++) {
      var add = this.state.possibleOptions[i].add;
      if (!add) continue; // Skip options that are already in

      var option = {
        value: this.state.possibleOptions[i].value,
        company_id: company_id
      };
      var new_ = this.state.possibleOptions[i].new;

      if (new_) {
        newOptions.push(option);  
      } else {
        option.id = this.state.possibleOptions[i].id;
        existingOptions.push(option);
      }
    }

    // Check for deleted options, loop over the original container
    for (var i = 0; i < this.state.optionsContainer.PossibleOptions.length; i++) {
      var option = { id: this.state.optionsContainer.PossibleOptions[i].id,
                     value: this.state.optionsContainer.PossibleOptions[i].value, 
                     company_id: company_id
                   };
      if (!this._isContained(option)) {
        deletedOptions.push(option);
      }
    }

    // console.log(JSON.stringify(newOptions));
    // console.log(JSON.stringify(existingOptions));
    // console.log(JSON.stringify(deletedOptions));
    // console.log(this.state.name);

    var body = {
      name            : this.state.name,
      newOptions      : newOptions,
      existingOptions : existingOptions,
      deletedOptions  : deletedOptions
    };

    this.props.onSubmit(this.state.optionsContainer.id, body);
  }
}


