var map;
let blinkInterval = null;
var lighthouseGroup = L.featureGroup();
var activeMarker = null;

let lighthouseIcon = L.icon({
  iconUrl: "/assets/image/lighthouse.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

function showDeviceWindow() {
  $("#device-info-window").fadeIn();
}
function makeDraggable(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  // Nếu có header thì kéo bằng header, nếu không thì kéo bằng cả body
  var header = document.getElementById("window-header");
  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // Lấy vị trí chuột ban đầu
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Tính toán vị trí mới
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Gán vị trí mới cho element
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // Dừng kéo khi thả chuột
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function markerBlink(marker) {
  marker.setOpacity(0.5);
  setTimeout(() => {
    marker.setOpacity(1);
  }, 500);
}
function stopBlink() {
  if (blinkInterval) {
    clearInterval(blinkInterval);
    blinkInterval = null;
  }
}

window.lighthouseMakers = function (datas) {
  lighthouseGroup.clearLayers();
  datas.forEach((item) => {
    if (item.latitude && item.longitude) {
      const marker = L.marker([item.latitude, item.longitude], {
        icon: lighthouseIcon,
      });
      marker.lighthouseData = item;
      marker.addTo(lighthouseGroup);
    }
  });
};
function handleMarkerClick(marker) {
  const data = marker.lighthouseData;
  if (activeMarker) {
    activeMarker.setOpacity(1);
  }
  const markerPoint = map.latLngToContainerPoint(marker.getLatLng());
  $("#device-info-window")
    .css({
      top: markerPoint.y + 50 + "px",
      left: markerPoint.x + 200 + "px",
    })
    .fadeIn();
  $("#win-name").text(data.name || "N/A");
  $("#win-mmsi").text(data.mmsi || "N/A");
  stopBlink();
  activeMarker = marker;
  blinkInterval = setInterval(() => markerBlink(activeMarker), 1000);
}

window.focusOnDevice = function (lat, lng, mmsi, lastReceive) {
  if (!map) return;
  let targetMarker = null;
  lighthouseGroup.eachLayer(function (layer) {
    if (
      layer.lighthouseData &&
      String(layer.lighthouseData.mmsi) === String(mmsi)
    ) {
      targetMarker = layer;
    }
  });
  if (!targetMarker) return;
  console.log("Tìm thấy marker:", targetMarker);
  map.off("moveend");
  $("#device-info-window").fadeOut();
  stopBlink();
  map.once("moveend", () => {
    handleMarkerClick(targetMarker);
  });

  map.flyTo([lat, lng], 15, {
    duration: 0.5,
    easeLinearity: 0.25,
  });
};
$(document).ready(function () {
  map = L.map("map").setView([15.422884140443102, 109.14396262587107], 13);

  L.tileLayer("http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  lighthouseGroup.addTo(map);

  lighthouseGroup.on("click", function (e) {
    const marker = e.layer;
    const latlng = marker.getLatLng();
    // hủy event cũ
    map.off("moveend");
    $("#device-info-window").fadeOut();
    stopBlink();
    map.once("moveend", () => {
      handleMarkerClick(marker);
    });
    map.flyTo(latlng, 15, {
      duration: 0.5,
      easeLinearity: 0.25,
    });
  });

  makeDraggable(document.getElementById("device-info-window"));

  $("#btn-close-window").click(function () {
    $("#device-info-window").fadeOut();
    stopBlink();
  });
  map.on("click", (e) => {
    $("#device-info-window").fadeOut();
    console.log(e.latlng);
    stopBlink();
  });
  // map.on("movestart", () => {
  //   $("#device-info-window").fadeOut();
  //   stopBlink();
  // });
});
