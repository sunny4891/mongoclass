const mongoose = require("mongoose");
const schema = mongoose.Schema;
mongoose
  .connect("mongodb://127.0.0.1:27017/testmongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then((result) => console.log("...connected"))
  .catch((error) => console.log(error));

const AddressSchema = new schema({
  houseNumber: String,
  street: String,
  state: String,
  district: String,
});

const userSchema = new schema({
  name: String,
  email: String,
  password: String,
  phone: [String],
  address: [AddressSchema],
});

const AddressModel = mongoose.model("address", AddressSchema);
const UserModel = mongoose.model("user", userSchema);

async function saveUser(schema) {
  const user = new UserModel(schema);
  const result = await user.save();
  console.log(result);
}

const addresss = [
  new AddressModel({
    houseNumber: "109",
    street: "saradapally",
    state: "WB",
    district: "North 24 parganas",
  }),
  new AddressModel({
    houseNumber: "108",
    street: "saradapally",
    state: "WB",
    district: "North 24 parganas",
  }),
  new AddressModel({
    houseNumber: "107",
    street: "saradapally",
    state: "WB",
    district: "North 24 parganas",
  }),
];

const userData = {
  name: "Avijit Saha",
  email: "avijit.saha@gmail.com",
  password: "12345678",
  phone: ["1234567890", "8765432190", "1593574690"],
  address: addresss,
};

// saveUser(userData);

// varient  type of update code in Mongodb

async function updateData() {
  let user = await UserModel.findById("655af7996c044a6013f3d47c")
    .then((res) => res)
    .catch((error) => error);
  user.name = "Kalpana Saha";
  user.save();
  console.log(user);
}

// updateData();

async function anotherUpdateProcess() {
  const user = await UserModel.findByIdAndUpdate(
    "655af7996c044a6013f3d47c",
    {
      $set: {
        name: "pradip kumar saha",
        email: "sandhy.saha@gmail.com",
      },
    },
    {
      new: true,
    }
  )
    .then((res) => res)
    .catch((err) => err);
  console.log(user);
}

anotherUpdateProcess();
