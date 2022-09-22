function generateTimeline() {
  console.log("gerando timeline");
  let element = document.createElement("div");
  element.attributes.setAttributes("data-time", "2022");
  document.getElementbyId("timeline").appendChild(element);
}
