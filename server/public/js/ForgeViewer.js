var viewer;

function launchViewer(urn) {
  var options = {
    env: "AutodeskProduction",
    getAccessToken: getForgeToken,
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById("forgeViewer"),
      { extensions: ["Autodesk.DocumentBrowser"] }
    );
    viewer.start();
    var documentId = "urn:" + urn;
    Autodesk.Viewing.Document.load(
      documentId,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then((i) => {
    // documented loaded, any action?
    generateSprites();
  });
}

function onDocumentLoadFailure(viewerErrorCode, viewerErrorMsg) {
  console.error(
    "onDocumentLoadFailure() - errorCode:" +
      viewerErrorCode +
      "\n- errorMessage:" +
      viewerErrorMsg
  );
}

function getForgeToken(callback) {
  fetch("/api/forge/oauth/token").then((res) => {
    res.json().then((data) => {
      callback(data.access_token, data.expires_in);
    });
  });
}

async function generateSprites() {
  // Load 'Autodesk.DataVisualization' and store it as a variable for later use
  const dataVizExtn = await viewer.loadExtension("Autodesk.DataVisualization");

  const DataVizCore = Autodesk.DataVisualization.Core;
  const viewableType = DataVizCore.ViewableType.SPRITE;
  const spriteColor = new THREE.Color(0xffffff);
  const baseURL = "https://shrikedoc.github.io/data-visualization-doc/_static/";
  const spriteIconUrl = `${baseURL}fan-00.svg`;

  const style = new DataVizCore.ViewableStyle(
    viewableType,
    spriteColor,
    spriteIconUrl
  );

  const viewableData = new DataVizCore.ViewableData();
  viewableData.spriteSize = 24; // Sprites as points of size 24 x 24 pixels

  const myDataList = [
    { position: { x: -10, y: -50, z: 3 } },
    { position: { x: 7, y: -50, z: 3 } },
    { position: { x: 25, y: 37, z: 3 } },
  ];

  myDataList.forEach((myData, index) => {
    const dbId = 10 + index;
    const position = myData.position;
    const viewable = new DataVizCore.SpriteViewable(position, style, dbId);

    viewableData.addViewable(viewable);
  });

  await viewableData.finish();
  dataVizExtn.addViewables(viewableData);
}
