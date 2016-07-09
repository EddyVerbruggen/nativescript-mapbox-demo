var observable = require("data/observable");
var mapbox = require("nativescript-mapbox");
var dialogs = require("ui/dialogs");
var platform = require("platform");
var isIOS = platform.device.os === platform.platformNames.ios;
var DemoAppModel = (function (_super) {
  __extends(DemoAppModel, _super);
  function DemoAppModel() {
    _super.call(this);
  }

  DemoAppModel.prototype.doShow = function () {
    mapbox.show({
      accessToken: 'sk.eyJ1IjoiZWRkeXZlcmJydWdnZW4iLCJhIjoia1JpRW82NCJ9.OgnvpsKzB3GJhzyofQNUBw',
      style: mapbox.MapStyle.OUTDOORS,
      margins: {
        left: 32,
        right: 32,
        top: isIOS ? 350 : 470,
        bottom: isIOS ? 50 : 0
      },
      center: {
        lat: 52.3702160,
        lng: 4.8951680
      },
      zoomLevel: 9, // 0 (most of the world) to 20, default 0
      showUserLocation: true, // default false
      hideAttribution: true, // default false
      hideLogo: true, // default false
      hideCompass: false, // default false
      disableRotation: false, // default false
      disableScroll: false, // default false
      disableZoom: false, // default false
      disableTilt: false, // default false
      markers: [
        {
          lat: 52.3732160,
          lng: 4.8941680,
          title: 'Nice location',
          subtitle: 'Really really nice location',
          iconPath: 'res/markers/green_pin_marker.png',
          onTap: function(){console.log("'Nice location' marker tapped");},
          onCalloutTap: function(){console.log("'Nice location' marker callout tapped");}
        }
      ]
    }).then(
        function(result) {
          console.log("Mapbox show done");
        },
        function(error) {
          console.log("mapbox show error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doHide = function () {
    mapbox.hide().then(
        function(result) {
          console.log("Mapbox hide done");
        },
        function(error) {
          console.log("mapbox hide error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doAddMarkers = function () {
    var onTap = function(marker) {
      console.log("Marker tapped with title: '" + marker.title + "'");
    };
    var onCalloutTap = function(marker) {
      alert("Marker callout tapped with title: '" + marker.title + "'");
    };

    mapbox.addMarkers([
      {
        lat: 52.3602160,
        lng: 4.8891680,
        title: 'One-line title here', // no popup unless set
        subtitle: 'And a one-liner here as well.',
        iconPath: 'res/markers/home_marker.png',
        onTap: onTap,
        onCalloutTap: onCalloutTap
      },
      {
        lat: 52.3602160,
        lng: 4.9891680,
        title: 'One-line title here 2', // no popup unless set
        subtitle: 'And a one-liner here as well.',
        iconPath: 'res/markers/home_marker.png',
        onTap: onTap,
        onCalloutTap: onCalloutTap
      },
      {
        lat: 52.3602160,
        lng: 4.7891680,
        title: 'One-line title here 3', // no popup unless set
        subtitle: 'And a one-liner here as well.',
        iconPath: 'res/markers/home_marker.png',
        onTap: onTap,
        onCalloutTap: onCalloutTap
      },
      {
        lat: 52.3702160,
        lng: 4.8911680,
        title: 'This title is cut off on iOS, but multi-line on Android', // no popup unless set
        subtitle: 'Same for this subtitle. Same for this subtitle. Same for this subtitle. Same for this subtitle. Same for this subtitle.',
        onTap: function(){console.log("Marker tapped");},
        onCalloutTap: function(){console.log("Marker callout tapped");}
      }
    ]).then(
        function(result) {
          console.log("Mapbox addMarkers done");
        },
        function(error) {
          console.log("mapbox addMarkers error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doSetTilt = function () {
    mapbox.setTilt(
        {
          tilt: 35,
          duration: 4000
        }
    ).then(
        function(result) {
          console.log("Mapbox doSetTilt done");
        },
        function(error) {
          console.log("mapbox doSetTilt error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doAnimateCamera = function () {
    mapbox.animateCamera(
        {
          target: {
            lat: 52.3732160,
            lng: 4.8941680,
          },
          zoomLevel: 17, // Android
          altitude: 500, // iOS
          bearing: 270,
          tilt: 50,
          duration: 10000
        }
    ).then(
        function(result) {
          console.log("Mapbox doAnimateCamera done");
        },
        function(error) {
          console.log("mapbox doAnimateCamera error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doSetCenter = function () {
    mapbox.setCenter(
        {
          lat: 52.3602160,
          lng: 4.8891680,
          animated: true
        }
    ).then(
        function(result) {
          console.log("Mapbox setCenter done");
        },
        function(error) {
          console.log("mapbox setCenter error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doGetCenter = function () {
    mapbox.getCenter().then(
        function(result) {
          dialogs.alert({
            title: "Center",
            message: JSON.stringify(result),
            okButtonText: "OK"
          });
        },
        function(error) {
          console.log("mapbox getCenter error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doGetZoomLevel = function () {
    mapbox.getZoomLevel().then(
        function(result) {
          dialogs.alert({
            title: "Zoom Level",
            message: JSON.stringify(result),
            okButtonText: "OK"
          });
        },
        function(error) {
          console.log("mapbox getCenter error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doSetZoomLevel = function () {
    mapbox.setZoomLevel(
        {
          level: 6,
          animated: true
        }
    ).then(
        function(result) {
          console.log("Mapbox setZoomLevel done");
        },
        function(error) {
          console.log("mapbox setZoomLevel error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doAddPolygon = function () {
    mapbox.addPolygon({
      points: [
        {
          lat: 52.3832160,
          lng: 4.8991680
        },
        {
          lat: 52.3632160,
          lng: 4.9011680
        },
        {
          lat: 52.3932160,
          lng: 4.8911680
        }
      ]
    }).then(
        function(result) {
          console.log("Mapbox addPolygon done");
        },
        function(error) {
          console.log("mapbox addPolygon error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doCheckHasFineLocationPermission = function () {
    mapbox.hasFineLocationPermission().then(
        function(granted) {
          dialogs.alert({
            title: "Permission granted?",
            message: granted ? "YES" : "NO",
            okButtonText: "OK"
          });
        }
    );
  };

  DemoAppModel.prototype.doRequestFineLocationPermission = function () {
    mapbox.requestFineLocationPermission().then(
        function() {
          console.log("Fine Location permission requested");
        }
    );
  };

  return DemoAppModel;
})(observable.Observable);
exports.DemoAppModel = DemoAppModel;
exports.mainViewModel = new DemoAppModel();
