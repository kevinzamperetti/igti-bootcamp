import React, { Component } from 'react';
import css from './title.module.css';

export default class Title extends Component {
  render() {
    const { value } = this.props;
    return <h1 className={css.centered}>{value}</h1>;
  }
}
