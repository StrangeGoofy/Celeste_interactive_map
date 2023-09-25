import { mapsData } from './mapsData_copy.js';

let map;

var MAP_ID;

var markers_strawberry_gr = L.layerGroup();
var markers_winged_strawberry_gr = L.layerGroup();
var markers_heart_gr = L.layerGroup();

//berry icon
const customIcon_strawberry = new L.Icon({
	iconUrl: '../img/berry/berry.png',
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});

const customIcon_winged_strawberry = new L.Icon({
	iconUrl: '../img/berry/winged_Strawberry.png',
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});

const customIcon_heart = new L.Icon({
	iconUrl: '../img/berry/Heart.png',
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});

function loadMap(mapId) {
	//clear field
	map.eachLayer(function (layer) {
		map.removeLayer(layer);
	});

	markers_strawberry_gr = L.layerGroup();
	markers_winged_strawberry_gr = L.layerGroup();
	markers_heart_gr = L.layerGroup();


	//load map
	var data = mapsData[mapId];
	if (!data) return console.error('Invalid mapId:', mapId);

	MAP_ID = mapId;

	const img = new Image();
	img.src = data.imageUrl;
	img.onload = function () {
		const imgWidth = this.width;
		const imgHeight = this.height;

		const marginX = imgWidth * 0.2; // 20% от ширины изображения
		const marginY = imgHeight * 0.2; // 20% от высоты изображения

		const bounds = [
			[-marginY, -marginX], // левый верхний угол
			[imgHeight + marginY, imgWidth + marginX], // правый нижний угол
		];

		L.imageOverlay(data.imageUrl, bounds).addTo(map);
		map.fitBounds(bounds);
		map.setMaxBounds(bounds);


		// add markers
		data.markers_strawberry.forEach(function (marker) {
			L.marker([marker.y, marker.x], { icon: customIcon_strawberry })
				.addTo(markers_strawberry_gr)
				.bindPopup(marker.content);
		});

		data.markers_winged_strawberry.forEach(function (marker) {
			L.marker([marker.y, marker.x], { icon: customIcon_winged_strawberry })
				.addTo(markers_winged_strawberry_gr)
				.bindPopup(marker.content);
		});

		data.markers_heart.forEach(function (marker) {
			L.marker([marker.y, marker.x], { icon: customIcon_heart })
				.addTo(markers_heart_gr)
				.bindPopup(marker.content);
		});
	};
}

document.addEventListener('DOMContentLoaded', function () {
	map = L.map('map', {
		crs: L.CRS.Simple,
		minZoom: -2,
		maxZoom: 0.5,
		zoomControl: false, // turn off auto position of zoom control
		attributionControl: false, // clean "leaflet" at right bottom
	});

	L.control
		.zoom({
			position: 'bottomright',
		})
		.addTo(map);

	//first loading
	loadMap('map1');

	/* map.on('click', function (e) {
		L.marker(map.containerPointToLatLng(e.containerPoint), {
			icon: customIcon,
		}).addTo(map);
		console.log(e.containerPoint);
	}); */

	map.invalidateSize();
});

document.querySelector('.levels_grid').addEventListener('click', function (e) {
	const button = e.target;
	if (button.tagName.toLowerCase() === 'button' && !button.disabled) {
		const mapId = button.getAttribute('data-map-id');
		if (mapId) {
			loadMap(mapId);
		}
	}
	console.log(mapsData[MAP_ID].markers_heart);
});

document.addEventListener('click', function (e) {
	if (e.target && e.target.id === 'star-button') {
		alert('Tip add to favorite');
	}
});

document.querySelector('header img').addEventListener('click', function () {
	const buttons = document.querySelector('.profile__buttons');
	buttons.classList.toggle('active');
});

document.querySelector('#instruments').addEventListener('click', function () {
	const news = document.querySelector('.menu__news');
	news.classList.toggle('active', false);
	const instruments = document.querySelector('.menu__instruments');
	instruments.classList.toggle('active');

});

document.querySelector('#news').addEventListener('click', function () {
	const instruments = document.querySelector('.menu__instruments');
	instruments.classList.toggle('active', false);
	const news = document.querySelector('.menu__news');
	news.classList.toggle('active');
});

document.getElementById('profile-reg').addEventListener('click', function () {
	window.location.href = './registration.html';
});

document.getElementById('profile-login').addEventListener('click', function () {
	window.location.href = './LogIn_page.html';
});

document.getElementById('profile-edit').addEventListener('click', function () {
	window.location.href = './edit.html';
});

document.getElementById('b1').addEventListener('click', function(){
	this.style.border = '4px solid black'
	document.getElementById('b2').style.border = '2px solid black'; 
});

document.getElementById('b2').addEventListener('click', function(){
	this.style.border = '4px solid black'
	document.getElementById('b1').style.border = '2px solid black'; 
});

//Strawberry markers



var strawberry_red = document.getElementById('strawbbery_checkbox');
strawberry_red.addEventListener('change', function () {
    if (this.checked) {
        // If checkbox is checked, add the marker group to the map
        map.addLayer(markers_strawberry_gr);
    } else {
        // If checkbox is unchecked, remove the marker group from the map
        map.removeLayer(markers_strawberry_gr);
    }
});

var strawberry_winged = document.getElementById('winged_strawbbery_checkbox');
strawberry_winged.addEventListener('change', function () {
    if (this.checked) {
        // If checkbox is checked, add the marker group to the map
        map.addLayer(markers_winged_strawberry_gr);
    } else {
        // If checkbox is unchecked, remove the marker group from the map
        map.removeLayer(markers_winged_strawberry_gr);
    }
});

var heart = document.getElementById('heart_checkbox');
heart.addEventListener('change', function () {
    if (this.checked) {
        // If checkbox is checked, add the marker group to the map
        map.addLayer(markers_heart_gr);
    } else {
        // If checkbox is unchecked, remove the marker group from the map
        map.removeLayer(markers_heart_gr);
    }
});