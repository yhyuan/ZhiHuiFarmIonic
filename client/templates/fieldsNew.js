Template.fieldsNew.created = function () {
  $(function() {
    $(window).resize(function() {
      $('#map').css('height', window.innerHeight - 82 - 45);
    });
    $(window).resize(); // trigger resize event
  });
};

Template.fieldsNew.rendered = function () {
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  var map = L.map('map', {
    doubleClickZoom: false
  }).setView([49.25044, -123.137], 13);

  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);
  // create a new Leaflet Draw control
  var drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems, // allow editing/deleting of features in this group
      edit: false // disable the edit tool (since we are doing editing ourselves)
    },
    draw: {
      circle: false, // disable circles
      marker: false, // disable polylines
      polyline: false, // disable polylines
      polygon: {
        allowIntersection: false, // polygons cannot intersect thenselves
        drawError: {
          color: 'red', // color the shape will turn when intersects
          message: '<strong>Oh snap!<strong> you can\'t draw that!' // message that will show when intersect
        },
      }
    }
  });

  // add our drawing controls to the map
  map.addControl(drawControl);

};

Template.fieldsNew.helpers({
  fields: function () {
    return Fields.find();
  }
});
