var actualSprite = "";
let card = document.getElementById("sensor-detail");
function onSpriteClicked(event) {
  console.log(`Sprite clicked: ${event.dbId}`);
  let card = document.getElementById("sensor-detail");
  console.log(card);
  card.innerHTML += "";
  actualSprite = event.dbId;
}

function onSensorSpriteClicked(event) {
  // The identifier of the `SpriteViewable` that is being clicked.
  const targetDbId = event.dbId;

  // Look up the corresponding sprite viewable from `viewableData`.
  const viewables = viewableData.viewables;
  const viewable = viewables.find((v) => v.dbId === targetDbId);

  if (viewable && viewable.myContextData) {
    const data = viewable.myContextData;
    console.log(`Sensor model: ${data.sensorModel}`);
    // Should print "Sensor model: BTE-2900x"
  }
}
