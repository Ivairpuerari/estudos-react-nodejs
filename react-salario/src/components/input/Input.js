import React, { Component } from "react";
import css from "./input.module.css";

export default class Input extends Component {
  handleInputChange = (e) => {
    const novoSalario = e.target.value;

    this.props.onChangeFilter(novoSalario);
  };

  render() {
    const { salario } = this.props;

    return (
      <div className={css.input}>
        <label>Salário bruto</label>
        <input
          type="Number"
          value={salario}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
