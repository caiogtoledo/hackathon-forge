/* eslint-disable no-console */
const mongoose = require("mongoose");

module.exports = () => {
  return mongoose
    .connect(`${process.env.MONGODB_CNT_STR}`)
    .then(() => {
      console.log("conected!");
    })

    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
