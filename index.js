const mongoose = require("mongoose");
const schema = mongoose.Schema;
mongoose
  .connect("mongodb://127.0.0.1:27017/testmongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then((result) => console.log("...connected"))
  .catch((error) => console.log(error));

const studentSchema = new schema({
  name: String,
  phone: String,
  rollNumber: Number,
  active: Boolean,
});

const Student = mongoose.model("student", studentSchema);
async function saveStudent(name, phone, rollNumber, active = true) {
  const student = new Student({
    name,
    phone,
    rollNumber,
    active,
  });

  const result = await student.save();
  console.log({ student: result });
}

// saveStudent("Avijit Saha", "12345678", 12);

async function getStudents() {
  await Student.find()
    .then((student) => console.log(student))
    .catch((error) => console.log(error));
}

async function getById(id) {
  const result = await Student.findById(id);
  console.log(result);
}

// getById("6559a8228939e8652f29b315");

async function getStudentByName(name, phone) {
  const result = await Student.find({ name, phone });
  console.log(result);
}

// getStudentByName("Avijit Saha", "12345678");

async function getStudentByNameCaseInsencitive(name, phone) {
  //   const result = await Student.find({ name: { $regex: /avijit/i } });
  const result = await Student.find({
    name: new RegExp("." + name + ".*", "i"),
    phone: new RegExp("." + phone + ".*", "i"),
  });
  console.log(result);
}

// getStudentByNameCaseInsencitive("", "78");

async function getStudentByNameAndSql(name) {
  const result = await Student.find()
    .where("name")
    .equals(name)
    .where("active")
    .equals(true)
    .then((res) => res)
    .catch((err) => err);
  console.log(result);
}

// getStudentByNameAndSql("prasenjit saha");

async function getStudentDataBySelectedFields() {
  const result = await Student.find()
    .select("name phone -_id")
    .then((res) => res)
    .catch((err) => err);
  console.log(result);
}

// getStudentDataBySelectedFields();

async function getStudentDataByCount(name) {
  const result = await Student.find({
    name: new RegExp(".*" + name + ".*", "i"),
  })
    .countDocuments()
    .then((res) => res)
    .catch((err) => err);
  console.log(result);
}

getStudentDataByCount("pra");
