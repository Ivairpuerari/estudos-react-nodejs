const express = require("express");

const service = require("./services/bank.service");

const routes = new express.Router();

routes.get("/saldo/:agencia/:conta", service.findByAgenciaAndConta);

routes.get("/media/:agencia", service.findMidSaldoByAgencia);

routes.get("/top-menores/:limit", service.topMenorSaldo);

routes.post("/transferencia-private", service.transferenciaPrivate);

routes.get("/top-maiores/:limit", service.topMaiorSaldo);

routes.put("/deposito", service.deposito);

routes.put("/saque", service.saque);

routes.delete("/encerrar/:agencia/:conta", service.encerrar);

routes.post("/transferencia", service.transferencia);

module.exports = routes;
