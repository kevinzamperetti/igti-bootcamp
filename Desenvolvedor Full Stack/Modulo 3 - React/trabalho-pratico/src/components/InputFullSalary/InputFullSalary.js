import React, { Component } from 'react';

export default class InputFullSalary extends Component {
  handleInputChange = event => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  render() {
    const { label, value } = this.props;
    return (
      <div className="input-field col s12">
        <input
          type="number"
          className="validate"
          value={value}
          onChange={this.handleInputChange}
        />
        <label className="active">{label}</label>
      </div>
    );
  }
}
