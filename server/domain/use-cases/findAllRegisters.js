const registersModel = require("../../models/registersModel");

module.exports = {
  all: async () => {
    return await registersModel.find();
  },
  getByName: async (name) => {
    console.log("name getByName:", name);
    return await registersModel.find({ name: name });
  },
};
