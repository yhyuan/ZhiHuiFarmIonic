var mapCreatedCallback = function () {
  $(function() {
    $(window).resize(function() {
      $('#map').css('height', window.innerHeight - 82 - 45);
    });
    $(window).resize(); // trigger resize event
  });
};

var mapRenderedCallback = function (field) {
  return function () {
    var map = L.map('map', {
      doubleClickZoom: false
    }).setView([49.25044, -123.137], 13);

    L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
    drawnItems = new L.FeatureGroup();
    if(field) {
      L.geoJson(field.geometry, {
        onEachFeature: function (feature, layer) {
          drawnItems.addLayer(layer);
        }
      });      
    }

    map.addLayer(drawnItems);
    if(field) {
      map.fitBounds(drawnItems);
    }
    // create a new Leaflet Draw control
    var drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems//, // allow editing/deleting of features in this group
        //edit: false // disable the edit tool (since we are doing editing ourselves)
      },
      draw: {
        circle: false, // disable circles
        marker: false, // disable polylines
        polyline: false, // disable polylines
        rectangle: false,
        polygon: {
          allowIntersection: false, // polygons cannot intersect thenselves
          showArea: true,
          drawError: {
            color: 'red', // color the shape will turn when intersects
            timeout: 1000,
            message: '<strong>Oh snap!<strong> you can\'t draw that!' // message that will show when intersect
          }
        }
      }
    });

    // add our drawing controls to the map
    map.addControl(drawControl);
    map.on('draw:created', function(e) {
          var layer = e.layer;
          drawnItems.addLayer(layer);
      });
      map.on('draw:editstart', function(e) {
          isEditing = true;
      });
      map.on('draw:editstop', function(e) {
          isEditing = false;
      });
      map.on('draw:deletestart', function(e) {
          isDeleting = true;
      });
      map.on('draw:deletestop', function(e) {
          isDeleting = false;
      });

      IonPopup.prompt({
        title: '地块名',
        template: '请输入地块名',
        okText: '确认',
        cancelText: '取消',
        inputPlaceholder: field ? field.name : '地块名',
        onOk: function(e, value) {
          fieldName = value;
        },
        onCancel: function(e, value) {
          fieldName = "未命名";
        }      
      });

  };
};

Template.fieldsEdit.created = mapCreatedCallback;

Template.fieldsEdit.rendered = function () {
  var field = Fields.findOne({_id: Router.current().params._id});
  mapRenderedCallback(field)();  
};


var isEditing = false;
var isDeleting = false;
var drawnItems;
var fieldName = "";
Template.fieldsEdit.helpers({
  fields: function () {
    return Fields.find();
  }
});

/*
Template.layout.events({
  'click [data-action=submitField]': function (event, template) {
    var conditions = [{condition: drawnItems.getLayers().length === 0, title: '地块边界为空', message: '地块边界为空。请使用画图工具来添加地块边界。'}, 
    {condition: isEditing, title: '地块边界编辑', message: '您正在编辑地块边界，请保存地块边界编辑结果后，再保存地块信息。'}, 
    {condition: isDeleting, title: '地块边界删除', message: '您正在删除地块边界，请保存地块边界删除结果后，再保存地块信息。'}]
    var result = _.find(conditions, function(cond){ return cond.condition; });
    if(result) {
          IonPopup.alert({
            title: result.title,
            template: result.message,
            okText: 'Got It.'            
          });
          return;
    }
    var id = Meteor.call("addField", {
      name: fieldName,
      geometry: drawnItems.toGeoJSON()
    });
    Router.go('fields')
  }
});*/

Template.fieldsNew.created = mapCreatedCallback;

Template.fieldsNew.rendered = mapRenderedCallback ();

Template.fieldsNew.helpers({
  fields: function () {
    return Fields.find();
  }
});

Template.layout.events({
  'click [data-action=submitField]': function (event, template) {
    var conditions = [{condition: drawnItems.getLayers().length === 0, title: '地块边界为空', message: '地块边界为空。请使用画图工具来添加地块边界。'}, 
    {condition: isEditing, title: '地块边界编辑', message: '您正在编辑地块边界，请保存地块边界编辑结果后，再保存地块信息。'}, 
    {condition: isDeleting, title: '地块边界删除', message: '您正在删除地块边界，请保存地块边界删除结果后，再保存地块信息。'}]
    var result = _.find(conditions, function(cond){ return cond.condition; });
    if(result) {
          IonPopup.alert({
            title: result.title,
            template: result.message,
            okText: 'Got It.'            
          });
          return;
    }
    var id = Meteor.call("addField", {
      name: fieldName,
      geometry: drawnItems.toGeoJSON()
    });

    Router.go('fields')
  }
});
