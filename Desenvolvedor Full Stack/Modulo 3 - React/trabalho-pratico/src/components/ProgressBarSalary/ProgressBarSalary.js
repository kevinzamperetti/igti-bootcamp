import React, { Component } from 'react';
import Bar from '../Bar';

export default class ProgressBarSalary extends Component {
  render() {
    const { discountINSS, discountIRPF, netSalary } = this.props;

    return (
      <div
        className="input-field col s12"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Bar value={discountINSS} color="#e67e22" />
        <Bar value={discountIRPF} color="#c0392b" />
        <Bar value={netSalary} color="#16a085" />
      </div>
    );
  }
}
