/*STATES = [
  'AK', 'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];*/

Fields = new Mongo.Collection('fields');
Schemas = {};
/*
Fields.before.insert(function (userId, doc) {
  var gender = Random.choice(['men', 'women']);
  var num = _.random(0, 50);
  doc.avatarUrl = 'https://randomuser.me/api/portraits/thumb/' + gender + '/' + num + '.jpg';
});

Fields.attachSchema(new SimpleSchema({
  name: {
    type: Object
  },
  'name.first': {
    type: String,
    label: 'First Name',
    autoform: {
      'label-type': 'floating',
      placeholder: 'First Name'
    },
    max: 200
  },
  'name.last': {
    type: String,
    label: 'Last Name',
    autoform: {
      'label-type': 'floating',
      placeholder: 'Last Name'
    },
    max: 200
  },
  emails: {
    type: [Object]
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Email Address'
    }
  },
  'emails.$.label': {
    type: String,
    label: 'Label',
    autoform: {
      options: [
        {value: 'Work', label: 'Work'},
        {value: 'Home', label: 'Home'},
        {value: 'School', label: 'School'},
        {value: 'Other', label: 'Other'}
      ]
    }
  },
  priority: {
    type: String,
    optional: true,
    autoform: {
      options: [
        {value: 'High', label: 'High'},
        {value: 'Medium', label: 'Medium'},
        {value: 'Low', label: 'Low'}
      ],
      type: 'select-radio'
    }
  },
  location: {
    type: Object
  },
  'location.city': {
    type: String,
    max: 200
  },
  'location.state': {
    type: String,
    autoform: {
      options: _.map(STATES, function (state) {
        return {label: state, value: state};
      })
    }
  },
  details: {
    type: Object
  },
  'details.notes': {
    type: String,
    label: 'Notes',
    optional: true,
    autoform: {
      rows: 10,
      'label-type': 'stacked'
    }
  },
  'details.active': {
    type: Boolean,
    defaultValue: true,
    autoform: {
      type: 'toggle'
    }
  },
  avatarUrl: {
    type: String,
    optional: true
  }
}));
*/
SimpleSchema.messages({
  needsLatLong: '[label] should be of form [longitude, latitude]',
  lonOutOfRange: '[label] longitude should be between -90 and 90',
  latOutOfRange: '[label] latitude should be between -180 and 180'
});

Schemas.Point = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['Point']
  },
  coordinates: {
    type: [Number],
    decimal: true,
    custom: function() {
      var ref, ref1;
      if (this.value.length !== 2) {
        return "needsLatLong";
      }
      if (!((-180 <= (ref = this.value[0]) && ref <= 180))) {
        return "lonOutOfRange";
      }
      if (!((-90 < (ref1 = this.value[1]) && ref1 <= 90))) {
        return "latOutOfRange";
      }
    }
  }
});

Schemas.Polygon = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['Polygon']
  },
  coordinates: {
    type: [[[Number]]],
    decimal: true,
    custom: function() {
      if (Array.isArray(this.value)) {
        var isBoundaryArray = _.every(this.value, function(boundary) {return Array.isArray(boundary);});
        if (isBoundaryArray) {
          _.each(this.value, function(boundary) {
            var isLatLngArray = _.every(boundary, function(lnglat) {return Array.isArray(lnglat);});
            if (isLatLngArray) {
              if (_.some(boundary, function(lnglat) {return lnglat.length !== 2})) {
                return "needsLatLong";
              }
              if (_.some(boundary, function(lnglat) {return (lnglat[0] < -180) || (lnglat[0] > 180);})) {
                return "lonOutOfRange";
              }
              if (_.some(boundary, function(lnglat) {return (lnglat[1] < -90) || (lnglat[1] > 90);})) {
                return "latOutOfRange";
              }
            }
          });
        }
      }
    }
  }
});

var calculateCenter = function(geometry) {
  var avglat, avglng, lnglats;
  lnglats = _.map(geometry.split(';'), function(lnglatString) {
    return _.map(lnglatString.split(','), function(str) {
      return parseFloat(str);
    });
  });
  avglng = (_.reduce(lnglats, (function(memo, num) {
    return memo + num[0];
  }), 0)) / lnglats.length;
  avglat = (_.reduce(lnglats, (function(memo, num) {
    return memo + num[1];
  }), 0)) / lnglats.length;
  return {
    "type": "Point",
    "coordinates": [avglng, avglat]
  };
};

Schemas.Fields = new SimpleSchema({
  name: {
    type: String,
    label: 'Field Name',
    max: 60
  },
  geometry: {
    type: Schemas.Polygon,
    label: 'Geometry',
    autoform: {
      type: 'polygonMap',
      afFieldInput: {
        geolocation: true,
        searchBox: true,
        autolocate: true        
      }
    }
  },
  center: {
    type: Schemas.Point,
    index: '2dsphere',
    autoValue: function() {
      return calculateCenter((this.field('geometry').value));
    }
  },
  description: {
    type: String,
    label: 'Description',
    autoform: {
      rows: 2,
      'label-type': 'stacked'
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  }
});

Fields.attachSchema(Schemas.Fields);
