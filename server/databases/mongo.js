/* eslint-disable no-console */
const mongoose = require("mongoose");

module.exports = () => {
  return mongoose
    .connect(
      `mongodb+srv://joaopedroboneli:maua2022@cluster0.ojwmeak.mongodb.net/forge_hackathon2022`
    )
    .then(() => {
      console.log("conected!");
    })

    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
