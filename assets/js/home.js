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
const listLighthouses = [
  {
    id: 1,
    name: "Hải đăng 1",
    latitude: 15.422884140443102,
    longitude: 109.14396262587107,
  },
  {
    id: 2,
    name: "Hải đăng 2",
    latitude: 15.438623,
    longitude: 109.189339,
  },
  {
    id: 3,
    name: "Hải đăng 3",
    latitude: 15.328724,
    longitude: 109.187622,
  },
  {
    id: 4,
    name: "Hải đăng 4",
    latitude: 15.366467,
    longitude: 109.287872,
  },
];
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
$(document).ready(function () {
  map = L.map("map").setView([15.422884140443102, 109.14396262587107], 13);

  L.tileLayer("http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  listLighthouses.forEach((lighthouse) => {
    const marker = L.marker([lighthouse.latitude, lighthouse.longitude], {
      icon: lighthouseIcon,
    });

    marker.lighthouseData = lighthouse;
    marker.addTo(lighthouseGroup);
  });
  lighthouseGroup.addTo(map);
  lighthouseGroup.on("click", function (e) {
    console.log(e);
    const marker = e.layer;
    const data = marker.lighthouseData;
    console.log("đang xem: ", data.name);
    const markerPoint = map.latLngToContainerPoint(marker.getLatLng());
    console.log(markerPoint);
    $("#device-info-window")
      .css({
        top: markerPoint.y + 50 + "px",
        left: markerPoint.x + 200 + "px",
      })
      .fadeIn();
    stopBlink();
    showDeviceWindow();
    activeMarker = marker;
    blinkInterval = setInterval(() => {
      markerBlink(activeMarker);
    }, 1000);
  });

  makeDraggable(document.getElementById("device-info-window"));

  $("#btn-close-window").click(function () {
    $("#device-info-window").fadeOut();
    stopBlink();
  });
  map.on("click", (e) => {
    $("#device-info-window").fadeOut();
    stopBlink();
  });
  map.on("movestart", () => {
    $("#device-info-window").fadeOut();
    stopBlink();
  });
});
