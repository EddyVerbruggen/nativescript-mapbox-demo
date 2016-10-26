var vmModule = require("./main-view-model");
function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;

var mapbox = require("nativescript-mapbox");

function onMapReady(args) {
  args.map.addMarkers([
    {
      id: 2,
      lat: 52.3602160,
      lng: 4.8891680,
      title: 'One-line title here', // no popup unless set
      subtitle: 'Really really nice location',
      iconPath: 'res/markers/green_pin_marker.png',
      onTap: function(){console.log("'Nice location' marker tapped");},
      onCalloutTap: function(){console.log("'Nice location' marker callout tapped");}
    }]
  );
  
  setTimeout(function() {
    args.map.setViewport(
      {
        bounds: {
          north: 52.4820,
          east: 5.1087,
          south: 52.2581,
          west: 4.6816
        },
        animated: true
      }
    );
  }, 4000);

  setTimeout(function() {
    args.map.addPolygon({
      points: [
        {
          lat: 52.5,
          lng: 5.05
        },
        {
          lat: 52.55,
          lng: 5
        },
        {
          lat: 52.6,
          lng: 5.1
        }
      ]
    });
  }, 5000);

  setTimeout(function() {
    args.map.addPolyline({
      id: 10,
      color: 0xffff0000,
      points: [
        {
          lat: 52.4,
          lng: 5
        },
        {
          lat: 51.9,
          lng: 5.1
        },
        {
          lat: 51.8,
          lng: 4.95
        }
      ]
    });
  }, 6000);

  setTimeout(function() {
    args.map.setCenter({
      lat: 52.4820,
      lng: 5.1087,
      animated: true
    });
  }, 6000);

  setTimeout(function() {
    args.map.setZoomLevel({
      level: 10,
      animated: true
    });
  }, 8000);

  setTimeout(function() {
    args.map.removeMarkers([2]);
  }, 10000);

  setTimeout(function() {
    args.map.setTilt({
      tilt: 60,
      duration: 2500
    });
  }, 10000);

  setTimeout(function() {
    args.map.animateCamera({
      target: {
        lat: 51.8,
        lng: 5
      },
      tilt: 75,
      zoomLevel: 9,
      duration: 4000
    });
  }, 13000);

  setTimeout(function() {
    args.map.removePolylines([10]);
  }, 15000);

}

exports.onMapReady = onMapReady;