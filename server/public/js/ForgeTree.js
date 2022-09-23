$(document).ready(function () {
  $(function () {
    generateTimeline(document);
    getForgeToken(function (access_token) {
      let urn =
        "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmpjcWhnbm9kdDBqaWlzdzd1ZnZsdXJxeTdyMzBtcXctdGVzdGUvVENDLUJpYmxpb3RlY2ElMjBwYXJhJTIwZXhwb3J0YSVDMyU4MyVDMiVBNyVDMyU4MyVDMiVBM28ucnZ0";

      jQuery.ajax({
        url:
          "https://developer.api.autodesk.com/modelderivative/v2/designdata/" +
          urn +
          "/manifest",
        headers: { Authorization: "Bearer " + access_token },
        success: function (res) {
          $(".js-timeline").Timeline();
          if (res.status === "success") launchViewer(urn);
          else
            $("#forgeViewer").html(
              "The translation job still running: " +
                res.progress +
                ". Please try again in a moment."
            );
        },
        error: function (err) {
          var msgButton =
            "This file is not translated yet! " +
            '<button class="btn btn-xs btn-info" onclick="translateObject()"><span class="glyphicon glyphicon-eye-open"></span> ' +
            "Start translation</button>";
          $("#forgeViewer").html(msgButton);
        },
      });
    });
  });
});

function translateObject(node) {
  $("#forgeViewer").empty();
  if (node == null) node = $("#appBuckets").jstree(true).get_selected(true)[0];
  var bucketKey = node.parents[0];
  var objectKey = node.id;
  console.log("ObjectKey aqui:", objectKey);
  jQuery.post({
    url: "/api/forge/modelderivative/jobs",
    contentType: "application/json",
    // data: JSON.stringify({ bucketKey: bucketKey, objectName: 'objectKey' }),
    data: JSON.stringify({ bucketKey: bucketKey, objectName: objectKey }),
    success: function (res) {
      console.log("objectKey:", objectKey);
      console.log("bucketKey:", bucketKey);
      $("#forgeViewer").html(
        "Translation started! Please try again in a moment."
      );
    },
  });
}
