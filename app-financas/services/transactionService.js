const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

module.exports = {
  async period(req, res) {
    const period = req.params.period;

    console.log(period);

    const data = await TransactionModel.find({ yearMonth: period });

    const totalLancamentos = data.length;

    const receita = data
      .filter((item) => item.type === "+")
      .reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0);

    const despesa = data
      .filter((item) => item.type === "-")
      .reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0);

    const saldo = receita - despesa;

    res.status(200).send({
      totalLancamentos: totalLancamentos,
      totalReceita: receita,
      totalDespesa: despesa,
      saldo: saldo,
      dados: data,
    });
  },

  async getAll(req, res) {
    const data = await TransactionModel.find({});

    res.status(200).send(data);
  },

  async getId(req, res) {
    const id = new ObjectId(req.params.id);

    const data = await TransactionModel.findById(id);

    res.status(200).send(data);
  },

  async getAllYearsMonth(req, res) {
    const data = await TransactionModel.find({}).distinct("yearMonth");

    res.status(200).send(data);
  },

  async summarizePeriod(req, res) {
    const period = req.params.period;
    const data = await TransactionModel.find({ yearMonth: period });
  },
};
