const mongoose = require("mongoose");

const schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/relationship_example", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("...connected"))
  .catch((err) => console.log(err));

const StudentSchema = new schema({
  name: String,
  age: Number,
});

const StudentModel = mongoose.model("student", StudentSchema);

const CourseSchema = new schema({
  name: String,
});

const CourseModel = mongoose.model("course", CourseSchema);

const EnrollmentSchema = new schema({
  //   student: { type: mongoose.Types.ObjectId, ref: "student" }, with ref
  student: { type: mongoose.Types.ObjectId }, // without ref
  //   course: { type: mongoose.Types.ObjectId, ref: "course" },
  course: { type: mongoose.Types.ObjectId }, //without ref
});

const EnrollmentModel = mongoose.model("enrollment", EnrollmentSchema);

async function courseSave(data) {
  const result = await CourseModel.create(data)
    .then((res) => res)
    .catch((err) => err);
  console.log(result);
}

async function studentSave(data) {
  const result = await StudentModel.create(data)
    .then((res) => res)
    .catch((err) => err);
  console.log(result);
}

async function enrollmentSave(data) {
  const result = await EnrollmentModel.create(data)
    .then((res) => res)
    .catch((err) => err);
  console.log(result);
}

// let courses = [
//   { name: "Angular" },
//   { name: "Node" },
//   { name: "React" },
//   { name: "Mongo Db" },
//   { name: "Maria Db" },
// ];

// courseSave(courses);

// let students = [
//   { name: "Prasenjit Saha" },
//   { name: "Avijit Saha" },
//   { name: "Pradip Kumar Saha" },
//   { name: "Sandhya Saha" },
//   { name: "Archita Kundu Saha" },
// ];

// studentSave(students);

// let enrollments = [
//   { student: "655b706eef92bd7362261759", course: "655b6f83d66bf5321824d2e2" },
//   { student: "655b706eef92bd736226175a", course: "655b6f83d66bf5321824d2e4" },
//   { student: "655b706eef92bd736226175b", course: "655b6f83d66bf5321824d2e3" },
// ];

// enrollmentSave(enrollments);

//the function use with ref condition in EnrollmentModel

async function fetchData() {
  const enrollmentData = await EnrollmentModel.find({
    student: { $ne: "655b706eef92bd7362261759" },
  })
    .populate("student course")
    .then((res) => res)
    .catch((err) => err);
  console.log(enrollmentData);
}

// fetchData();

async function fetchDataWithoutRef() {
  const enrollmentData = await EnrollmentModel.find({
    student: { $ne: "655b706eef92bd7362261759" },
  })
    .populate([
      { path: "student", model: StudentModel },
      { path: "course", model: CourseModel },
    ])
    .then((res) => res)
    .catch((err) => err);
  console.log(enrollmentData);
}

// fetchDataWithoutRef();

// data find with uniqe students like group by and count with aggregate

async function aggregateData() {
  const data = await EnrollmentModel.aggregate()
    .group({ _id: "$student", count: { $sum: 1 } })
    .then((res) => {
      const details = EnrollmentModel.populate(res, {
        path: "_id",
        model: StudentModel,
      })
        .then((r) => r)
        .catch((err) => err);
      return details;
    })
    .catch((err) => err);

  console.log(data);
}

aggregateData();
