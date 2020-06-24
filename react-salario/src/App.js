import React, { Component } from "react";
import Bottom from "./components/bottom/Bottom";
import Header from "./components/header/Header";
import Info from "./components/info/Info";
import Input from "./components/input/Input";
import { calculateSalaryFrom } from "./helpers/salary";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salario: 0,
      baseInss: 0,
      descontoInss: 0,
      baseIrpf: 0,
      descontoIrpf: 0,
      salarioLiquido: 0,
    };
  }

  handleChangeFilter = (novoSalario) => {
    this.setState({
      salario: novoSalario,
    });

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(novoSalario);

    this.setState({
      baseInss: baseINSS,
      descontoInss: discountINSS,
      baseIrpf: baseIRPF,
      descontoIrpf: discountIRPF,
      salarioLiquido: netSalary,
    });
  };

  render() {
    const {
      salario,
      baseInss,
      descontoInss,
      baseIrpf,
      descontoIrpf,
      salarioLiquido,
    } = this.state;
    return (
      <div className="container">
        <Header />
        <Input salario={salario} onChangeFilter={this.handleChangeFilter} />
        <Info
          baseInss={baseInss}
          descontoInss={descontoInss}
          baseIrpf={baseIrpf}
          descontoIrpf={descontoIrpf}
          salarioLiquido={salarioLiquido}
        />
        <div>
          <Bottom
            inss={descontoInss}
            irpf={descontoIrpf}
            salarioLiquido={salarioLiquido}
            salarioBruto={salario}
          />
        </div>
      </div>
    );
  }
}
