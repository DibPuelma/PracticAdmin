import React, { Component } from 'react'

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ToggleStar from 'material-ui/svg-icons/toggle/star';

const iconStyles = {
  marginRight: 24,
};

export default class QuestionShow extends Component {
  constructor(props) {
    super(props);

    var defaultValue = null;
    if (typeof this.props.options !== 'undefined' && this.props.options.length > 0)
      defaultValue = this.props.options[0].id;

    this.state = { 
      question        : this.props.question,
      value           : defaultValue,
    }
  }
  componentWillReceiveProps() {
    var defaultValue = null;
    if (typeof this.props.options !== 'undefined' && this.props.options.length > 0)
      defaultValue = this.props.options[0].id;

    this.setState({ value: defaultValue });
  }

  render() {
    return (
      <div style={ this.props.style }>
        { this.props.showText &&
          <div>
            { this.props.question.text }
          </div>
        }

        { !this.props.showText &&
          <div className={ 'answer-example' }>Ejemplo de respuesta:</div>
        }

        { this.state.question.type === 'number' &&
          <div className={ 'answer-container answer-number' }>
            <ToggleStar style={iconStyles} />
            <ToggleStar style={iconStyles} />
            <ToggleStar style={iconStyles} />
            <ToggleStar style={iconStyles} />
            <ToggleStar style={iconStyles} />
          </div>
        }

        { this.state.question.type === 'boolean' &&
          <div className={ 'answer-container' }>
            <SelectField
              floatingLabelText="Respuesta"
              value={ this.state.value }
              onChange={ (event, index, value) => this.setState({ value }) }
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value={true} primaryText="Sí" />
              <MenuItem value={false} primaryText="No" />
            </SelectField>
          </div>
        }

        { this.state.question.type === 'text' &&
          <div className={ 'answer-container' }>
            <TextField hintText="Respuesta" fullWidth={ true } />
          </div>
        }

        { this.state.question.type === 'options' &&
          <div className={ 'answer-container' }>
            <SelectField
              floatingLabelText="Respuesta"
              value={ this.state.value }
              onChange={ (event, index, value) => this.setState({ value }) }
            >
            
            { this.props.options && this.props.options.map((option) => 
                (<MenuItem value={ option.id } primaryText={ option.value } key={ option.id } />)
              )
            }
            </SelectField>
          </div>
        }

      </div>
    );
  }
}
