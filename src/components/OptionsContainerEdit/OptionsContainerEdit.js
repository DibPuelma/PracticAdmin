import React, { Component } from 'react'

import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import AutoComplete from 'material-ui/AutoComplete';
import Checkbox from 'material-ui/Checkbox';

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
        PossibleOptions: [],
        allow_other: false
      }
    }

    super(props);
    this.state = { 
      status          : OptionsContainerEditStatus.WAITING,
      optionsContainer: optionsContainer,
      name            : optionsContainer.name,
      allow_other     : optionsContainer.allow_other,
      possibleOptions : optionsContainer.PossibleOptions.slice(0), // Create a copy
      allOptions      : props.allOptions,
      newValue        : '',
      company_id      : props.allOptions[0].company_id,
      dataSource      : this._getTextArray(props.allOptions)
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
          errorText={ this.state.nameError }
          />

        <div>Opciones</div>
        <div className="add-wrapper">
          <AutoComplete
            ref='autoComplete'
            className="add-input"
            hintText="Presiona enter para ingresar una opción"
            floatingLabelText="Añadir opción:"
            fullWidth={ true }
            multiLine={ false }
            
            value={ this.state.newValue }

            onUpdateInput={ (value) => this.setState({ newValue: value }) }
            onNewRequest={ (chosenRequest, index) => this._addValue(chosenRequest) }       
            onKeyPress={ this._handleKeyPress }
            
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={ this.state.dataSource }

            />

          <FlatButton className="add-button" label="Añadir"
            icon={ <ContentAdd {...iconProps}/> }
            onClick={ this._addOption }
            />
        </div>

        <div style={styles.wrapper}>
          { this.state.possibleOptions.map((x, i) =>
             <Chip 
              style={ styles.chip } 
              className={ 'chip' }
              onRequestDelete={ () => this._deleteOption(x) }
              key={ x.value }
              >
              { x.value }
              </Chip>
          )}
        </div>

        <div style={{ marginTop: 20, marginBottom: 10 }}>
          <Checkbox
            checked={ this.state.allow_other }
            label={ 'Permitir campo de texto "Otros"' }
            onCheck={ this._changeAllowOther }
          />
        </div>

        { this.state.status === OptionsContainerEditStatus.WAITING  &&
          <div style={ styles.loginButtonsContainer }>
            <RaisedButton onClick={ this._save } primary={ true } style={ styles.loginSubmit } label="Guardar" />
            <RaisedButton className={ 'secondButton' }onClick={ this.props.onCancel } label="Cancelar" />
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

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this._addOption();
    }
  }

  _getTextArray = (allOptions) => {
    if (!allOptions) return;
    var array = [];
    allOptions.forEach((x) => {
      array.push(x.value)
    })
    return array;
  }

  _changeAllowOther = (event, isInputChecked) => {
    this.setState({ allow_other: isInputChecked });
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

  _addValue = (value) => {
    this.setState({ newValue: value });
    this._addOption();
  }

  _addOption = () => {
    var value = this.state.newValue;

    if (value === null || value === undefined || value === '')
      return;

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

    this.refs.autoComplete.setState({ searchText: ''})
    this.setState({ newValue: '' });
    console.log(this.state.newValue)
    this.forceUpdate();
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

  _validate = () => {
    var result = true;
    
    if (this.state.name.length < 1 || this.state.name.length > 30) {
      this.setState({ nameError: 'Este campo es necesario. Entre 1 y 30 caracteres.' });
      result = false;
    } else {
      this.setState({ nameError: null });
    }

    return result;
  }

  _save = () => {
    if (!this._validate()) return;

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
    for (i = 0; i < this.state.optionsContainer.PossibleOptions.length; i++) {
      option = { id: this.state.optionsContainer.PossibleOptions[i].id,
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
      allow_other     : this.state.allow_other,
      newOptions      : newOptions,
      existingOptions : existingOptions,
      deletedOptions  : deletedOptions
    };

    this.props.onSubmit(this.state.optionsContainer.id, body);
  }
}
