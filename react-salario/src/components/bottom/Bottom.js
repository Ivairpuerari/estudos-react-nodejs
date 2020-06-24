import React, { Component } from "react";
import Bar from "./Bar";
import css from "./bottom.module.css";

export default class Bottom extends Component {
  handlePorcentagemSalario = (valor, total) => {
    if (valor === 0) {
      return 0;
    }

    return (valor * 100) / total;
  };

  render() {
    const { inss, irpf, salarioLiquido, salarioBruto } = this.props;
    console.log(
      this.handlePorcentagemSalario(inss, salarioBruto),
      this.handlePorcentagemSalario(irpf, salarioBruto),
      this.handlePorcentagemSalario(salarioLiquido, salarioBruto)
    );
    return (
      <div>
        <div className={css.details}>
          <Bar
            value={this.handlePorcentagemSalario(inss, salarioBruto)}
            color={"#e67e22"}
          />
          <Bar
            value={this.handlePorcentagemSalario(irpf, salarioBruto)}
            color={"#c0392b"}
          />
          <Bar
            value={this.handlePorcentagemSalario(salarioLiquido, salarioBruto)}
            color={"#16a085"}
          />
        </div>
      </div>
    );
  }
}
