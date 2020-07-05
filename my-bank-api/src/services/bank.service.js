const db = require("../config/db");
const mongoose = require("mongoose");

const account = db.account;
global.tarifaSaque = 1;
global.tarifaTransferencia = 8;

module.exports = {
  async findByAgenciaAndConta(req, res) {
    const agencia = Number(req.params.agencia);
    const conta = Number(req.params.conta);

    const response = await account.findOne({ agencia: agencia, conta: conta });

    console.log(response);
    if (!response) {
      res.status(404).send("Nenhuma conta encontrado.");
      return;
    }
    res.status(200).send(response.balance.toString());
  },

  async findMidSaldoByAgencia(req, res) {
    const agencia = req.params.agencia;

    console.log(agencia);
    const result = await account.find({ agencia: agencia });

    console.log(result);

    const mid =
      result.reduce((accumulator, current) => {
        return accumulator + current.balance;
      }, 0) / result.length;

    res.status(200).send(mid.toString());
  },

  async topMenorSaldo(req, res) {
    const limit = req.params.limit;
    console.log(limit);
    const result = await account.find({});

    console.log(result);

    result.sort((a, b) => (b.balance < a.balance ? 1 : -1));

    res.status(200).send(result.slice(0, limit));
  },

  async topMaiorSaldo(req, res) {
    const limit = req.params.limit;
    console.log(limit);
    const result = await account.find({});

    console.log(result);

    result
      .sort((a, b) => (b.name < a.name ? 1 : -1))
      .sort((a, b) => (b.balance > a.balance ? 1 : -1));

    res.status(200).send(result.slice(0, limit));
  },

  async transferenciaPrivate(req, res) {
    const agencias = await account.distinct("agencia");

    console.log(agencias);

    for (const agencia of agencias) {
      const contas = await account.find({ agencia: agencia });

      const max = contas.sort((a, b) => (b.balance > a.balance ? 1 : -1))[0];

      console.log(max);

      max.agencia = "99";

      max.save();
    }

    const privates = await account.find({ agencia: "99" });

    res.status(200).send(privates);
  },

  async deposito(req, res) {
    const { agencia, conta, valor } = req.body;

    const registro = await account.findOne({ conta: conta, agencia: agencia });

    if (!registro) {
      res.status(404).send("Nenhuma conta encontrado.");
      return;
    }

    console.log(registro);
    registro.balance = registro.balance + valor;

    console.log(registro);

    await registro.save();

    res.status(200).send(registro.balance.toString());
  },

  async saque(req, res) {
    const { agencia, conta, valor } = req.body;

    const registro = await account.findOne({ conta: conta, agencia: agencia });

    if (!registro) {
      res.status(404).send("Nenhuma conta encontrado.");
      return;
    }

    console.log(registro);

    if (registro.balance <= valor) {
      res.send(404).send("Saldo insuficiente.");
      return;
    }

    registro.balance = registro.balance - (valor + global.tarifaSaque);

    console.log(registro);

    await registro.save();

    res.status(200).send(registro);
  },

  async encerrar(req, res) {
    const agencia = Number(req.params.agencia);
    const conta = Number(req.params.conta);

    await account.findOneAndDelete({ agencia: agencia, conta: conta });

    const result = await account.find({ agencia: agencia });

    console.log(result);

    res.status(200).send(result.length.toString());
  },

  async transferencia(req, res) {
    const { origem, destino, valor } = req.body;

    const contaOrigem = await account.findOne({ conta: origem });
    const contaDestino = await account.findOne({ conta: destino });

    console.log(contaOrigem);

    console.log(contaDestino);

    let debitoContaOrigem = valor;

    if (contaOrigem.agencia !== contaDestino.agencia) {
      debitoContaOrigem = debitoContaOrigem + global.tarifaTransferencia;
    }

    contaDestino.balance = contaDestino.balance + valor;

    contaOrigem.balance = contaOrigem.balance - debitoContaOrigem;

    await contaDestino.save();
    await contaOrigem.save();

    res.status(200).send(contaOrigem.balance.toString());
  },
};
