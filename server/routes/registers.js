const { all } = require("../domain/use-cases/findAllRegisters");

module.exports = {
  all: async (req, res) => {
    console.log("buscando registros...");
    const registers = await all();
    return res.status(200).json(registers);
  },
};
