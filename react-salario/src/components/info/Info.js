import React, { Component } from "react";
import { formatNumber } from "../../helpers/formatHelpers";
import css from "./info.module.css";

export default class Info extends Component {
  handleFormat;

  render() {
    const {
      baseInss,
      descontoInss,
      baseIrpf,
      descontoIrpf,
      salarioLiquido,
    } = this.props;

    return (
      <div className={css.info}>
        <div className={css.details}>
          <label>Base INSS:</label>
          <input type="text" value={formatNumber(baseInss)} readOnly={true} />
        </div>
        <div className={css.details}>
          <label>Desconto INSS:</label>
          <input
            type="text"
            value={formatNumber(descontoInss)}
            readOnly={true}
          />
        </div>
        <div className={css.details}>
          <label>Base IRPF:</label>
          <input type="text" value={formatNumber(baseIrpf)} readOnly={true} />
        </div>
        <div className={css.details}>
          <label>Desconto IRPF:</label>
          <input
            type="text"
            value={formatNumber(descontoIrpf)}
            readOnly={true}
          />
        </div>
        <div className={css.details}>
          <label>Salario liquido:</label>
          <input
            type="text"
            value={formatNumber(salarioLiquido)}
            readOnly={true}
          />
        </div>
      </div>
    );
  }
}
