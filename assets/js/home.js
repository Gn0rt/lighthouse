var map;

$(document).ready(function () {
  map = L.map("map").setView([10.762622, 106.660172], 13);

  L.tileLayer("http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);
});
