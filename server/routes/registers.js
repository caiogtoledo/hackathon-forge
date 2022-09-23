const { all, getByName } = require("../domain/use-cases/findAllRegisters");

module.exports = {
  all: async (req, res) => {
    console.log("buscando registros...");
    const registers = await all();
    return res.status(200).json(registers);
  },
  getByName: async (req, res) => {
    const { name } = req.params;
    console.log("buscando registros...");
    const registers = await getByName(name);
    return res.status(200).json(registers);
  },
};
