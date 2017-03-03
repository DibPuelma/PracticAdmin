import React, { Component } from 'react'

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import IconArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import IconArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconAdd from 'material-ui/svg-icons/content/add';

import QuestionShow from '../../components/QuestionShow/QuestionShow.js';
import OptionsContainerDialog from '../../components/OptionsContainerDialog/OptionsContainerDialog.js';

import settings from '../../config/settings';

const styles = {
  selectOptions: {
    width: 400,
    marginBottom: 20
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class QuestionEdit extends Component {
  constructor(props) {
    super(props);

    var state = {
      question        : props.question,
      user            : props.user,
      showCreateDialog: false,
      createDialog    : null,
      textError       : this.props.textError
    };

    if (props.question.OptionsContainer && props.question.OptionsContainer.PossibleOptions) {
      state.optionsContainer = props.question.options_container_id;
      state.options          = props.question.OptionsContainer.PossibleOptions;
      state.containerName    = this.props.question.OptionsContainer.name;
    } else {
      state.optionsContainer = this.props.optionsContainers[0].id;
      state.options          = this.props.optionsContainers[0].PossibleOptions;
      state.containerName    = this.props.optionsContainers[0].name;
    }

    this.state = state;
  }

  componentWillReceiveProps() {
    var state = {
      question        : this.props.question,
      user            : this.props.user,
      showCreateDialog: false,
      createDialog    : null,
      textError       : this.props.textError
    };

    if (this.props.question.OptionsContainer && this.props.question.OptionsContainer.PossibleOptions) {
      state.optionsContainer = this.props.question.options_container_id;
      state.options          = this.props.question.OptionsContainer.PossibleOptions;
      state.containerName    = this.props.question.OptionsContainer.name;
    } else {
      state.optionsContainer = this.props.optionsContainers[0].id;
      state.options          = this.props.optionsContainers[0].PossibleOptions;
      state.containerName    = this.props.optionsContainers[0].name;
    }

    this.setState(state);
  }

  render() {
    return (
      <div className="question">
        <div className={ 'options' }>
          { this.props.onMoveUp &&
            <FlatButton icon={<IconArrowUpward />} onClick={ () => this.props.onMoveUp(this.props.question) } />
          }
          { this.props.onMoveDown &&
          <FlatButton icon={<IconArrowDownward />} onClick={ () => this.props.onMoveDown(this.props.question) } />
          }
          { this.props.onDelete &&
            <FlatButton icon={<IconClose />} onClick={ () => this.props.onDelete(this.props.question) } />
          }
        </div>

       <TextField
        floatingLabelText="Pregunta:"
        fullWidth={ true }
        multiLine={true}
        defaultValue={ this.props.question.text }
        onChange={ this._changeText }
        style={{ marginTop: 0 }}
        errorText={ this.state.textError }
        />

        { this.state.question.type === 'options' &&
          <div>
            { !this.props.editingMode &&
              <div>
                <SelectField
                  value={this.state.optionsContainer}
                  onChange={this._changeOptCont}
                  style={styles.selectOptions}
                  autoWidth={false}
                  floatingLabelText="Opciones"
                >
                  { this.props.optionsContainers.map((x, i) => (
                    <MenuItem value={ x.id } primaryText={ x.name } key={ x.id }/>
                  ))}
                  <Divider />
                  <MenuItem value={ null } primaryText={ 'Añadir Opciones' } leftIcon={<IconAdd />} key={ 0 }/>
                </SelectField>
              </div>
            }

            { this.props.editingMode &&
              <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                { this.state.containerName }
              </div>
            }
          </div>
        }

        <QuestionShow question={ this.props.question } options={ this.state.options } />

        { this.state.showCreateDialog && 
          this.state.createDialog
        }
      </div>
    );
  }

  _showAddContainer = () => {
    this.setState({ 
      showCreateDialog: true, 
      createDialog:     (<OptionsContainerDialog 
                          onDestroy={ this._hideAddContainer }
                          onSubmit={ this._createSubmit }
                          allOptions={ this.props.allOptions }
                        />)
    });
  }

  _hideAddContainer = () => {
    this.setState({ showCreateDialog: false, createDialog: null });
  }

  _changeText = (event) => {
    this.props.onChangeText(this.props.question.id, event.target.value);
  }

  _changeOptCont = (event, index, value) => {
    if (value === null) {
      this._showAddContainer();
    } else {
      this.props.optionsContainers.forEach((x, i) => {
        if (x.id === value) {
          this.setState({ optionsContainer: value });
          this.setState({ options: x.PossibleOptions });
          this.setState({ containerName: x.name });
          this.props.onChangeOptCont(this.props.question.id, value);
        }
      });
    }
  }

  _createSubmit = (id, body) => {
    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_OPTIONS_CONTAINERS.replace(":company_id", company_id);

    // console.log(JSON.stringify(body));

    var promise = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(body)
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self.props.reloadContainers().then(() => {
        self.props.onChangeOptCont(self.props.question.id, result.id);
        self._hideAddContainer();
      }, function(err){
        console.log(err);
        self._hideAddContainer();
      });
      
    }, function(err) {
      self._hideAddContainer();
    });
  }
}
