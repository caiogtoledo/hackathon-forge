const registersModel = require("../../models/registersModel");

module.exports = {
  all: async () => {
    return await registersModel.find();
  },
};
