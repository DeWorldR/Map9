
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuMTIzdGgiLCJhIjoiY2xrcG56cnR1MHoxMjNwa3k3MXdvdGs4ayJ9.OLRvMH5R4M-IlWp5vqMouQ';

// สร้างแผนที่
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [0, 0],
  zoom: 13
});

// สร้าง Marker
var marker = new mapboxgl.Marker()
  .setLngLat([0, 0])
  .addTo(map);

// สร้าง Marker ปลายทาง
var destinationMarker = new mapboxgl.Marker({ color: '#ff0000' }) // เลือกสีส้มสำหรับเครื่องหมาย
  .setLngLat([99.82592512114043, 19.90291986572897])
  .addTo(map);


if ("geolocation" in navigator) {
  // ขอสิทธิ์ในการรับตำแหน่งปัจจุบันของผู้ใช้
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    map.setCenter([lng, lat]);
    marker.setLngLat([lng, lat]);

    // ใช้ Marker ปลายทางเพื่อแสดงตำแหน่ง
    destinationMarker.setLngLat([99.82592512114043, 19.90291986572897]);


    var directionsAPI = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + lng + ',' + lat + ';' + '99.82592512114043' + ',' + '19.90291986572897' + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
    fetch(directionsAPI)
      .then(response => response.json())
      .then(data => {
        // แสดงเส้นทางในแผนที่
        var route = data.routes[0].geometry;
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#8723cf', 
            'line-width': 8
          }
        });
      });
  });
} else {

  alert("Geolocation is not supported by your browser");
}
