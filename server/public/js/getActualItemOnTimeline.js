var indexTimeline = 234;
function getActualItemOnTimeline(indexTimeline) {
  generateCardDetail(timelineData[indexTimeline]);
}

function generateCardDetail(data) {
  let card = document.getElementById("sensor-detail");
  if (actualSprite == "") {
    console.log("nada");
    card.innerHTML = "";
  } else {
    console.log(data);
    console.log("actualSprite:", actualSprite);
    console.log("entrei no card detail");
    let dataToShow = [];
    if (actualSprite == 10) {
      dataToShow = data.gama;
    } else if (actualSprite == 11) {
      dataToShow = data.beta;
    } else {
      dataToShow = data.wc;
    }
    card.innerHTML = "";
    card.innerHTML += `
    <div style="padding: 10px; border-radius: 8px"; background: rgb(0, 0, 0, .2)">
        <div style="opacity: 100%;">
            <strong>Sensor: </strong>${sensor_dict_name[dataToShow.name]}
        </div>
        <div style="opacity: 100%;">
            <strong>Temperature: </strong>${dataToShow.tmp} °C
        </div>
        <div style="opacity: 100%;">
            <strong>Luminosity: </strong>${dataToShow.lux} lux
        </div>
        <div style="opacity: 100%;">
            <strong>Sensor Battery: </strong>${dataToShow.bat} V
        </div>
        <div style="opacity: 100%;">
            <strong>Humidity: </strong>${dataToShow.hum}%
        </div>
    </div>
    `;
  }
}

var sensor_dict_name = {
  "0004a30b00e933da": "Auditorium Gama",
  "0004a30b00e9d364": "Women's W.C.",
  "0004a30b00e964d5": "Auditorium Beta",
};
