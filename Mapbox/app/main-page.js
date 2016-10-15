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
  }, 5000);
}

exports.onMapReady = onMapReady;