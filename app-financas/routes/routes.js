const express = require("express");
const transactionRouter = express.Router();

const transactionServices = require("../services/transactionService");

module.exports = transactionRouter;

//listarlancamentosporperiodo-yyyy-mm

transactionRouter.get("/period/:period", transactionServices.period);

transactionRouter.get("/findAll", transactionServices.getAll);

transactionRouter.get("/findById/:id", transactionServices.getId);

transactionRouter.get(
  "/getAllYearsMonth",
  transactionServices.getAllYearsMonth
);
