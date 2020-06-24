import React, { Component } from "react";
import css from "./header.module.css";

export default class Header extends Component {
  render() {
    return (
      <div className={css.flexRow}>
        <h2>React Salário</h2>
      </div>
    );
  }
}
