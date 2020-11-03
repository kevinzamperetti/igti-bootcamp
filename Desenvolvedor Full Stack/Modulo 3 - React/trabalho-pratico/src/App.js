import React, { Component } from 'react';
import Title from './components/Title/Title';
import InputFullSalary from './components/InputFullSalary';
import InputReadOnly from './components/InputReadOnly';
import ProgressBarSalary from './components/ProgressBarSalary';

import { calculateSalaryFrom } from './helpers/salary';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fullSalary: 3900,
    };
  }

  handleChange = value => {
    this.setState({
      fullSalary: value,
    });
  };

  render() {
    const { fullSalary } = this.state;

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);

    const perdiscountINSS = (discountINSS * 100) / fullSalary;
    const perdiscountIRPF = (discountIRPF * 100) / fullSalary;
    const pernetSalary = (netSalary * 100) / fullSalary;

    return (
      <div className="container">
        <Title value={'React Salário'} />
        <form className="col s12">
          <div className="row">
            <InputFullSalary
              label="Salário Bruto:"
              onChange={this.handleChange}
              value={fullSalary}
            />
            <InputReadOnly label="Base INSS:" value={baseINSS} color="#000" />
            <InputReadOnly
              label="Desconto INSS:"
              value={discountINSS}
              color="#e67e22"
              percent={perdiscountINSS.toFixed(2)}
            />
            <InputReadOnly label="Base IPRF:" value={baseIRPF} color="#000" />
            <InputReadOnly
              label="Desconto IPRF:"
              value={discountIRPF}
              color="#c0392b"
              percent={perdiscountIRPF.toFixed(2)}
            />
            <InputReadOnly
              label="Salário líquido:"
              value={netSalary}
              color="#16a085"
              percent={pernetSalary.toFixed(2)}
            />
            <ProgressBarSalary
              discountINSS={perdiscountINSS.toFixed(2)}
              discountIRPF={perdiscountIRPF.toFixed(2)}
              netSalary={pernetSalary.toFixed(2)}
            />
          </div>
        </form>
      </div>
    );
  }
}
