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

  var accessToken = 'sk.eyJ1IjoiZWRkeXZlcmJydWdnZW4iLCJhIjoia1JpRW82NCJ9.OgnvpsKzB3GJhzyofQNUBw';

  DemoAppModel.prototype.doShow = function () {
    mapbox.show({
      accessToken: accessToken,
      style: mapbox.MapStyle.OUTDOORS,
      margins: {
        left: 18,
        right: 18,
        top: isIOS ? 400 : 424,
        bottom: isIOS ? 50 : 8
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
          id: 1,
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

  DemoAppModel.prototype.doDestroy = function () {
    mapbox.destroy().then(
        function(result) {
          console.log("Mapbox destroyed");
        },
        function(error) {
          console.log("mapbox destroy error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doUnhide = function () {
    mapbox.unhide().then(
        function(result) {
          console.log("Mapbox doUnhide done");
        },
        function(error) {
          console.log("mapbox doUnhide error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doRemoveAllMarkers = function () {
    mapbox.removeMarkers(
    ).then(
      function(result) {
        console.log("Mapbox doRemoveAllMarkers done");
      },
      function(error) {
        console.log("mapbox doRemoveAllMarkers error: " + error);
      }
    );
  };

  DemoAppModel.prototype.doRemove2Markers = function () {
    mapbox.removeMarkers([
      1,
      2
    ]).then(
      function(result) {
        console.log("Mapbox doRemove2Markers done");
      },
      function(error) {
        console.log("mapbox doRemove2Markers error: " + error);
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
        id: 2,
        lat: 52.3602160,
        lng: 4.8891680,
        title: 'One-line title here', // no popup unless set
        subtitle: 'With a res://icon-40 image',
        icon: isIOS ? 'res://icon-40' : 'res://icon',
        onTap: onTap,
        onCalloutTap: onCalloutTap
      },
      {
        id: 3,
        lat: 52.3602160,
        lng: 5,
        title: 'One-line title here 2', // no popup unless set
        subtitle: 'And a one-liner here as well.',
        icon: 'http://www.bme.be/wp-content/uploads/2014/04/marker.png',
        onTap: onTap,
        onCalloutTap: onCalloutTap
      },
      {
        id: 4,
        lat: 52.3602160,
        lng: 4.7891680,
        title: 'One-line title here 3', // no popup unless set
        subtitle: 'And a one-liner here as well.',
        iconPath: 'res/markers/home_marker.png',
        onTap: onTap,
        onCalloutTap: onCalloutTap
      },
      {
        id: 5,
        lat: 52.4,
        lng: 5.1,
        title: 'This title is cut off on iOS, but multi-line on Android', // no popup unless set
        subtitle: 'Same for this subtitle. Same for this subtitle. Same for this subtitle. Same for this subtitle. Same for this subtitle.',
        icon: 'http://maryjanewa.com/wp-content/uploads/2016/01/map-marker.png',
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

  DemoAppModel.prototype.doGetViewport = function () {
    mapbox.getViewport().then(
        function(result) {
          dialogs.alert({
            title: "Viewport determined",
            message: JSON.stringify(result),
            okButtonText: "OK"
          });
        },
        function(error) {
          console.log("mapbox doGetViewport error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doSetViewport = function () {
    mapbox.setViewport(
      {
        bounds: {
          north: 52.4820,
          east: 5.1087,
          south: 52.2581,
          west: 4.6816
        },
        animated: true // default true
      }
    ).then(
        function() {
          console.log("Viewport set");
        },
        function(error) {
          console.log("mapbox doSetViewport error: " + error);
        }
    );
  };

  // Add an option to download the current viewport: https://www.mapbox.com/ios-sdk/examples/offline-pack/ (look for visibleCoordinateBounds)
  DemoAppModel.prototype.doDownloadAmsterdam = function () {
    mapbox.downloadOfflineRegion(
        {
          // required for Android in case no map has been shown yet
          accessToken: accessToken,
          name: "Amsterdam",
          style: mapbox.MapStyle.OUTDOORS,
          minZoom: 9,
          maxZoom: 11,
          bounds: {
            north: 52.4820,
            east: 5.1087,
            south: 52.2581,
            west: 4.6816
          },
          onProgress: function (progress) {
            console.log("Download progress: " + JSON.stringify(progress));
          }
        }
    ).then(
        function() {
          dialogs.alert({
            title: "Offline region downloaded",
            message: "Done! Zoom levels 9-11 have been downloaded. The download progress was reported via console.log",
            okButtonText: "OK"
          });
        },
        function(error) {
          console.log("mapbox doDownloadAmsterdam error: " + error);
        }
    );

    dialogs.alert({
      title: "Be patient",
      message: "This takes a while, progress is logged via console.log",
      okButtonText: "Understood"
    });
  };

  DemoAppModel.prototype.doDownloadCurrentViewportAsOfflineRegion = function () {
    mapbox.getViewport().then(function(viewport) {
      mapbox.downloadOfflineRegion(
          {
            name: "LastViewport",
            style: mapbox.MapStyle.OUTDOORS,
            minZoom: viewport.zoomLevel,
            maxZoom: viewport.zoomLevel + 2,
            bounds: viewport.bounds,
            onProgress: function (progress) {
              console.log("Download progress: " + JSON.stringify(progress));
            }
          }
      ).then(
          function() {
            dialogs.alert({
              title: "Viewport downloaded",
              message: "Downloaded viewport with bounds " + JSON.stringify(viewport.bounds) + " at zoom levels " + viewport.zoomLevel + " - " + (viewport.zoomLevel + 2),
              okButtonText: "OK :)"
            });
          },
          function(error) {
            console.log("mapbox doDownloadCurrentViewportAsOfflineRegion error: " + error);
          }
      );
    }, function(error) {
      dialogs.alert({
        title: "Download error",
        message: error,
        okButtonText: "Got it"
      });
    });
  };

  DemoAppModel.prototype.doAddAndClusterGeoJSON = function () {
    mapbox.addGeoJsonClustered(
        {
          name: "earthquakes",
          data: "https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
          clusterMaxZoom: 15,
          clusterRadius: 20
          // clusters: [
          //   {}
          // ]
        }
    ).then(
        function() {
          dialogs.alert({
            title: "GeoJSON added",
            message: "Moving to the USA as that's where the GeoJson data is drawn",
            okButtonText: "OK"
          }).then(function() {
            mapbox.setViewport(
                {
                  bounds: {
                    north: 52.9,
                    east: -62.2,
                    south: 22.1,
                    west: -128.2
                  },
                  zoomLevel: 3
                }
            )
          });
        },
        function(error) {
          console.log("mapbox doAddAndClusterGeoJSON error: " + error);
        }
    );
  };

  DemoAppModel.prototype.doListOfflineRegions = function () {
    mapbox.listOfflineRegions().then(
      function(regions) {
        dialogs.alert({
          title: "Offline regions",
          message: JSON.stringify(regions),
          okButtonText: "Thanks"
        });
      },
      function(error) {
        dialogs.alert({
          title: "Offline regions list error",
          message: error,
          okButtonText: "Hmm"
        });
      }
    );
  };

  DemoAppModel.prototype.doDeleteOfflineRegion = function () {
    mapbox.deleteOfflineRegion({
      name: "Amsterdam"
    }).then(
      function() {
        dialogs.alert({
          title: "Offline region deleted",
          okButtonText: "Cool"
        });
      },
      function(error) {
        dialogs.alert({
          title: "Error deleting offline region",
          message: error,
          okButtonText: "Hmmz"
        });
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
          level: 2, // shows most of the world
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
