import React, { Component } from 'react';
import css from './inputreadonly.module.css';
import { formatNumber } from '../../helpers/formatHelpers';

export default class InputReadOnly extends Component {
  handleInputChange = event => {};

  render() {
    const { label, value, color, percent } = this.props;

    let valor = formatNumber(value);
    if (percent) {
      valor = `${valor} (${percent}%)`;
    }

    return (
      <div className="input-field col s3">
        <input
          style={{ color: `${color}` }}
          type="text"
          className={css.input_field_base}
          value={valor}
          onChange={this.handleInputChange}
        />
        <label className="active">{label}</label>
      </div>
    );
  }
}
