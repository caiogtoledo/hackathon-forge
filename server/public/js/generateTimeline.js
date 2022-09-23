function generateTimeline(document) {
  fetch("/registers").then((res) => {
    res.json().then((data) => {
      data.forEach((register) => {
        let element = document.createElement("div");
        let date = `${new Date(register.timestamp)}`;
        console.log("date: ", date);
        element.setAttribute("data-time", date.slice(3,25));
        document.getElementById("timeline").appendChild(element);
      });
    });
  });
}
