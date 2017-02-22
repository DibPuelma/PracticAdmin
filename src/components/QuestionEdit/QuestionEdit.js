import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

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
};

export default class QuestionEdit extends Component {
  constructor(props) {
    super(props);

    if (props.question.OptionsContainer && props.question.OptionsContainer.PossibleOptions) { //;props.question.type === 'options') {
      this.state = {
        question: props.question,
        optionsContainer: props.question.options_container_id,
        options: props.question.OptionsContainer.PossibleOptions
      };
    } else {
      this.state = { question: props.question };
    }
  }

  render() {
    return (
      <div className="question">
       <TextField
        floatingLabelText="Pregunta:"
        fullWidth={ true }
        multiLine={true}
        defaultValue={ this.props.question.text }
        onChange={ this._changeText }
        />

        { this.state.question.type === 'options' &&
          <div>
            <div>Contenedor</div>
            <DropDownMenu
              value={this.state.optionsContainer}
              onChange={this._changeOptCont}
              style={styles.customWidth}
              autoWidth={false}
            >
              { this.props.optionsContainers.map((x, i) =>
                <MenuItem value={ x.id } primaryText={ x.name } />
              )}
            </DropDownMenu>

            <div>Opciones</div>
            <div style={styles.wrapper}>
              {  this.state.options && this.state.options.map((x, i) =>
                 <Chip style={styles.chip} className="chip">{ x.value }</Chip>
              )}
            </div>
          </div>
        }
        <div>[{ this.state.question.type }]</div>
      </div>
    );
  }

  _changeText = (event) => {
    this.props.onChangeText(this.props.question.id, event.target.value);
  }

  _changeOptCont = (event, index, value) => {
    this.props.optionsContainers.map((x, i) => {
      if (x.id === value) {
        this.setState({ optionsContainer: value });
        this.setState({ options: x.PossibleOptions });
        this.props.onChangeOptCont(this.props.question.id, value);
      }
    });
  }

}
