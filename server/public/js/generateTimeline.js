var timelineData = [];

function generateTimeline(document) {
  var data_sensor_beta = [];
  var data_sensor_gama = [];
  var data_sensor_wc = [];

  fetch("/registers/0004a30b00e964d5").then((res) => {
    res
      .json()
      .then((data) => {
        data_sensor_beta = data;
      })
      .then(() => {
        fetch("/registers/0004a30b00e933da").then((res) => {
          res.json().then((data) => {
            data_sensor_gama = data;
          });
        });
      })
      .then(() => {
        fetch("/registers/0004a30b00e9d364").then((res) => {
          res
            .json()
            .then((data) => {
              data_sensor_wc = data;
            })
            .then(() => {
              let newData = joinTimestamps(
                data_sensor_beta,
                data_sensor_gama,
                data_sensor_wc
              );
              newData.forEach((register) => {
                let element = document.createElement("div");
                let date = `${new Date(register.timestamp)}`;
                element.setAttribute("data-time", date.slice(3, 25));
                element.setAttribute("register", register);
                document.getElementById("timeline").appendChild(element);
              });
            });
        });
      });
  });
}

function joinTimestamps(beta, gama, wc) {
  beta_spliced = beta.splice(0, wc.length);
  gama_spliced = gama.splice(0, wc.length);
  console.log("beta_spliced: ", beta_spliced.length);
  console.log("gama_spliced: ", gama_spliced.length);
  console.log("wc_spliced: ", wc.length);
  newData = [];
  for (let index = 0; index < wc.length; index++) {
    newData.push({
      timestamp: wc[index].timestamp,
      beta: beta_spliced[index],
      gama: gama_spliced[index],
      wc: wc[index],
    });
  }
  console.log("consolidado: ", newData);
  timelineData = newData;
  return newData;
}
