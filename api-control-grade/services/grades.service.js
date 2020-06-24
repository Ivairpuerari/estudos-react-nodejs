var fs = require("fs");

module.exports = {
  async save(req, res) {
    console.log(req.params.id);
    const { student, subject, type, value } = req.body;

    const grades = JSON.parse(fs.readFileSync(global.filename));

    const grade = {
      id: grades.nextId++,
      student: student,
      subject: subject,
      type: type,
      value: Number(value),
      timestamp: new Date(),
    };

    grades.grades.push(grade);

    fs.writeFileSync(global.filename, JSON.stringify(grades));

    res.send(grade);
  },

  async update(req, res) {
    const { student, subject, type, value } = req.body;

    const id = Number(req.params.id);

    const grades = JSON.parse(fs.readFileSync(global.filename));

    const index = grades.grades.findIndex((grade) => grade.id === id);

    if (index === -1) {
      res.status(400).send("Gradle not found");
    }

    grades.grades[index].student = student;
    grades.grades[index].subject = subject;
    grades.grades[index].type = type;
    grades.grades[index].value = value;

    fs.writeFileSync(global.filename, JSON.stringify(grades));

    res.send(grades.grades[index]);
  },

  async delete(req, res) {
    const id = Number(req.params.id);

    const grades = JSON.parse(fs.readFileSync(global.filename));

    const index = grades.grades.findIndex((grade) => grade.id === id);

    grades.grades.splice(index, 1);

    fs.writeFileSync(global.filename, JSON.stringify(grades));

    res.status(200).send(JSON.stringify(grades));
  },

  async findById(req, res) {
    const id = Number(req.params.id);

    const grades = JSON.parse(fs.readFileSync(global.filename));

    const index = grades.grades.findIndex((grade) => grade.id === id);

    res.send(grades.grades[index]);
  },

  async sumGradeStudent(req, res) {
    const student = req.params.student;
    const subject = req.params.subject;

    const grades = JSON.parse(fs.readFileSync(global.filename));

    const total = grades.grades
      .filter((grade) => grade.student === student && grade.subject === subject)
      .reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0);

    console.log(total);
    res.send(JSON.stringify(total));
  },

  async meanGradeSubject(req, res) {
    const subject = req.params.subject;
    const type = req.params.type;

    console.log(subject, type);

    const grades = JSON.parse(fs.readFileSync(global.filename));

    const gradesType = grades.grades.filter(
      (grade) => grade.subject === subject && grade.type === type
    );

    const mean =
      gradesType.reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0) / gradesType.length;

    res.send(JSON.stringify(mean));
  },

  async betterSubject(req, res) {
    const subject = req.params.subject;
    const type = req.params.type;

    const grades = JSON.parse(fs.readFileSync(global.filename));

    const topsGradesToType = grades.grades
      .filter((grade) => grade.subject === subject && grade.type === type)
      .sort((a, b) => (b.value > a.value ? 1 : -1));

    res.send(topsGradesToType.slice(0, 3));
  },

  async findAll(req, res) {
    const grades = JSON.parse(fs.readFileSync(global.filename));
    res.send(grades);
  },
};
