var sensorStyleDefinitions = {
  co2: {
    url: "https://d2zqnmauvnpnnm.cloudfront.net/assets-1/images/co2.svg",
    color: 0xffffff,
  },
  temperature: {
    url: "https://d2zqnmauvnpnnm.cloudfront.net/assets-1/images/thermometer.svg",
    color: 0xffffff,
  },
  default: {
    url: "https://d2zqnmauvnpnnm.cloudfront.net/assets-1/images/circle.svg",
    color: 0xffffff,
  },
};

let devices = [
  {
    id: "Hall 85",
    position: {
      x: 31.945194312366482,
      y: 101.11616501336187,
      z: 6.807743072509766,
    },
    type: "temperature",
    sensorTypes: ["temperature"],
  },
  {
    id: "Hall III 72",
    position: {
      x: -98.96997142930644,
      y: 242.22996463496446,
      z: 8.035340592265129,
    },
    type: "combo",
    sensorTypes: ["co2", "temperature"],
  },
];

$("#buttonGenerateSprites").click(function onModelLoaded(data) {
    console.log("data:", data)
    var viewer = data.target;
    const dataVizExt = await viewer.loadExtension("Autodesk.DataVisualization");
  
    var styleMap = {};
    // Create model-to-style map from style definitions.
    Object.entries(sensorStyleDefinitions).forEach(([type, styleDef]) => {
      styleMap[type] = new Autodesk.DataVisualization.Core.ViewableStyle(
        Autodesk.DataVisualization.Core.ViewableType.SPRITE,
        new THREE.Color(styleDef.color),
        styleDef.url
      );
    });
  
    const viewableData = new Autodesk.DataVisualization.Core.ViewableData();
    viewableData.spriteSize = 16;
    let startId = 1;
  
    // Add viewables
    devices.forEach((device) => {
      let style = styleMap[device.type] || styleMap["default"];
      const viewable = new Autodesk.DataVisualization.Core.SpriteViewable(
        device.position,
        style,
        startId
      );
      viewableData.addViewable(viewable);
      startId++;
    });
  
    await viewableData.finish();
    dataVizExt.addViewables(viewableData);
  
    // Load level data
    let viewerDocument = data.model.getDocumentNode().getDocument();
    const aecModelData = await viewerDocument.downloadAecModelData();
    let levelsExt;
    if (aecModelData) {
      levelsExt = await viewer.loadExtension("Autodesk.AEC.LevelsExtension", {
        doNotCreateUI: true,
      });
    }
  
    // Select Level 3.
    const floorData = levelsExt.floorSelector.floorData;
    const floor = floorData[2];
    levelsExt.floorSelector.selectFloor(floor.index, true);
  
    // Generate surfaceshading data by mapping devices to rooms.
    const structureInfo = new Autodesk.DataVisualization.Core.ModelStructureInfo(
      data.model
    );
    const heatmapData = await structureInfo.generateSurfaceShadingData(devices);
  
    // Setup surfaceshading
    await dataVizExt.setupSurfaceShading(data.model, heatmapData);
  
    dataVizExt.registerSurfaceShadingColors("co2", [0x00ff00, 0xff0000]);
    dataVizExt.registerSurfaceShadingColors("temperature", [0xff0000, 0x0000ff]);
  
    /**
     * Interface for application to decide the current value for the heatmap
     * @param {Object} device device
     * @param {string} sensorType sensor type
     */
    function getSensorValue(device, sensorType) {
      let value = Math.random();
      return value;
    }
  
    dataVizExt.renderSurfaceShading(floor.name, "temperature", getSensorValue);
  
    setInterval(() => dataVizExt.updateSurfaceShading(getSensorValue), 2000);
  
    /* non data-viz related */
    function startDuctAnimation() {
      const keyframes = [
        5858,
        5867,
        6803,
        5772,
        5347,
        5631,
        5654,
        [5634, 5655],
        [5633, 5635, 5636, 5643, 5645, 5647],
        [5637, 5638, 5641, 5644, 5646, 5648, 5649, 5652, 5658],
        [5639, 5642, 5650, 5653],
        [5395, 5396, 5397, 5398, 5399, 5400, 5401, 5402],
  
        5858,
        5867,
        6803,
        [5762, 5764, 5768, 6889],
        5346,
        5687,
        [5766, 5767, 5770, 5771, 5707],
        [5690, 5708],
        [5709, 5710],
        [5689, 5691, 5694, 5696, 5698, 5700],
        [5695, 5697, 5699, 5701, 5702, 5705, 21783, 21786],
        [5405, 5406, 5407, 5408, 5692, 5693, 5703, 5706],
        [5403, 5404, 5405, 5406, 5407, 5408, 5409, 5410],
      ];
  
      function setGreenColor(dbids, clear) {
        let color = clear ? null : new THREE.Vector4(0, 1, 0.1, 1);
        if (!Array.isArray(dbids)) dbids = [dbids];
        dbids.map((i) => viewer.model.setThemingColor(i, color));
        viewer.impl.invalidate(true);
      }
  
      let i = 0;
      setInterval(() => {
        setGreenColor(keyframes[i % keyframes.length], i > keyframes.length);
        i++;
        i %= keyframes.length * 2;
      }, 64);
    }
  
    function startCameraTransition() {
      viewer.autocam.shotParams.destinationPercent = 3; // slow down camera movement
      viewer.autocam.shotParams.duration = 7;
      viewer.impl.toggleProgressive(false);
      viewer.isolate([1718, 2010, 2039, 2027, 2594, 8998, 9007]); // only "ducting", "floors" and "basic-walls" to be visible
      viewer.setViewFromArray([
        101.16925, -128.88954, 152.0, 59.14753, -11.29, 35.01, 0, 0, 1, 1.91,
        0.761012,
      ]);
      viewer.impl.renderer().setAOOptions(4, 0.8); //set nicer ambient occlusion
    }
  
    // add a small delay for everything to settle
    setTimeout(() => {
      startCameraTransition();
      startDuctAnimation();
    }, 2000);
  })

async function onModelLoaded(data) {
  var viewer = data.target;
  const dataVizExt = await viewer.loadExtension("Autodesk.DataVisualization");

  var styleMap = {};
  // Create model-to-style map from style definitions.
  Object.entries(sensorStyleDefinitions).forEach(([type, styleDef]) => {
    styleMap[type] = new Autodesk.DataVisualization.Core.ViewableStyle(
      Autodesk.DataVisualization.Core.ViewableType.SPRITE,
      new THREE.Color(styleDef.color),
      styleDef.url
    );
  });

  const viewableData = new Autodesk.DataVisualization.Core.ViewableData();
  viewableData.spriteSize = 16;
  let startId = 1;

  // Add viewables
  devices.forEach((device) => {
    let style = styleMap[device.type] || styleMap["default"];
    const viewable = new Autodesk.DataVisualization.Core.SpriteViewable(
      device.position,
      style,
      startId
    );
    viewableData.addViewable(viewable);
    startId++;
  });

  await viewableData.finish();
  dataVizExt.addViewables(viewableData);

  // Load level data
  let viewerDocument = data.model.getDocumentNode().getDocument();
  const aecModelData = await viewerDocument.downloadAecModelData();
  let levelsExt;
  if (aecModelData) {
    levelsExt = await viewer.loadExtension("Autodesk.AEC.LevelsExtension", {
      doNotCreateUI: true,
    });
  }

  // Select Level 3.
  const floorData = levelsExt.floorSelector.floorData;
  const floor = floorData[2];
  levelsExt.floorSelector.selectFloor(floor.index, true);

  // Generate surfaceshading data by mapping devices to rooms.
  const structureInfo = new Autodesk.DataVisualization.Core.ModelStructureInfo(
    data.model
  );
  const heatmapData = await structureInfo.generateSurfaceShadingData(devices);

  // Setup surfaceshading
  await dataVizExt.setupSurfaceShading(data.model, heatmapData);

  dataVizExt.registerSurfaceShadingColors("co2", [0x00ff00, 0xff0000]);
  dataVizExt.registerSurfaceShadingColors("temperature", [0xff0000, 0x0000ff]);

  /**
   * Interface for application to decide the current value for the heatmap
   * @param {Object} device device
   * @param {string} sensorType sensor type
   */
  function getSensorValue(device, sensorType) {
    let value = Math.random();
    return value;
  }

  dataVizExt.renderSurfaceShading(floor.name, "temperature", getSensorValue);

  setInterval(() => dataVizExt.updateSurfaceShading(getSensorValue), 2000);

  /* non data-viz related */
  function startDuctAnimation() {
    const keyframes = [
      5858,
      5867,
      6803,
      5772,
      5347,
      5631,
      5654,
      [5634, 5655],
      [5633, 5635, 5636, 5643, 5645, 5647],
      [5637, 5638, 5641, 5644, 5646, 5648, 5649, 5652, 5658],
      [5639, 5642, 5650, 5653],
      [5395, 5396, 5397, 5398, 5399, 5400, 5401, 5402],

      5858,
      5867,
      6803,
      [5762, 5764, 5768, 6889],
      5346,
      5687,
      [5766, 5767, 5770, 5771, 5707],
      [5690, 5708],
      [5709, 5710],
      [5689, 5691, 5694, 5696, 5698, 5700],
      [5695, 5697, 5699, 5701, 5702, 5705, 21783, 21786],
      [5405, 5406, 5407, 5408, 5692, 5693, 5703, 5706],
      [5403, 5404, 5405, 5406, 5407, 5408, 5409, 5410],
    ];

    function setGreenColor(dbids, clear) {
      let color = clear ? null : new THREE.Vector4(0, 1, 0.1, 1);
      if (!Array.isArray(dbids)) dbids = [dbids];
      dbids.map((i) => viewer.model.setThemingColor(i, color));
      viewer.impl.invalidate(true);
    }

    let i = 0;
    setInterval(() => {
      setGreenColor(keyframes[i % keyframes.length], i > keyframes.length);
      i++;
      i %= keyframes.length * 2;
    }, 64);
  }

  function startCameraTransition() {
    viewer.autocam.shotParams.destinationPercent = 3; // slow down camera movement
    viewer.autocam.shotParams.duration = 7;
    viewer.impl.toggleProgressive(false);
    viewer.isolate([1718, 2010, 2039, 2027, 2594, 8998, 9007]); // only "ducting", "floors" and "basic-walls" to be visible
    viewer.setViewFromArray([
      101.16925, -128.88954, 152.0, 59.14753, -11.29, 35.01, 0, 0, 1, 1.91,
      0.761012,
    ]);
    viewer.impl.renderer().setAOOptions(4, 0.8); //set nicer ambient occlusion
  }

  // add a small delay for everything to settle
  setTimeout(() => {
    startCameraTransition();
    startDuctAnimation();
  }, 2000);
}
