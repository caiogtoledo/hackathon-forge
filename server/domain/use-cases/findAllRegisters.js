const registersModel = require("../../models/registersModel");

module.exports = {
  all: async () => {
    return await registersModel.find();
  },
  getByName: async (name) => {
    console.log("name getByName:", name);
    let register = await registersModel.find({ name: name });
    return getPresenceInformation(register);
  },
};

// função que indica se havia movimento ou não naquele momento
function getPresenceInformation(data) {
  const newData = [];
  data.forEach((moment, i) => {
    var newMoment = JSON.parse(JSON.stringify(moment));
    if (i === 0) {
      newMoment["hasPresence"] = false;
      newData.push(newMoment);
    } else {
      var count = moment.cpe - data[i - 1].cpe;
      if (count > 1) {
        newMoment["hasPresence"] = "Yes";
        newData.push(newMoment);
      } else {
        newMoment["hasPresence"] = "False";
        newData.push(newMoment);
      }
    }
  });
  return newData;
}
