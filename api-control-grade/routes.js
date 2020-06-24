const express = require("express");
const gradleService = require("./services/grades.service");

const routes = new express.Router();

routes.post("/:id", gradleService.save);

routes.put("/:id", gradleService.update);

routes.delete("/:id", gradleService.delete);

routes.get("/:id", gradleService.findById);

routes.get(
  "/sum-student-subject/:student/:subject",
  gradleService.sumGradeStudent
);

routes.get("/", gradleService.findAll);

routes.get("/mean-subject-type/:subject/:type", gradleService.meanGradeSubject);

routes.get("/top/:subject/:type", gradleService.betterSubject);

module.exports = routes;
