import * as $ from 'jquery';
import * as M from 'materialize-css';

require('jquery-lazy');
require('jquery-lazy/plugins/jquery.lazy.av');

$(() => {
	$('.lazy').lazy();

	M.Sidenav.init(document.querySelector('.sidenav'));
	M.Collapsible.init(document.querySelector('.collapsible'));
	M.Modal.init(document.querySelectorAll('.modal'));
	M.Tabs.init(document.querySelectorAll('.tabs'));
	M.Tooltip.init(document.querySelectorAll('.tooltipped'));

	$('body').on('click', '.copy-serial', copySerial);
	$('body').on('click', '.notification-entry .modal-trigger', prepareModal);

	if($('#map').length){
		loadScript("https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.js", () => {
			initMap();
		})
	}
});

function prepareModal(e){
	
	let title = $(this).text();
	let text = $(this).data('text');

	$('#notification-modal #title').text(title);
	$('#notification-modal #content').text(text);
}

function copySerial(e){
	e.preventDefault();
	let serial = $(this).data('serial');
	navigator.clipboard.writeText(serial);
	M.toast({html: 'Серийный номер скопирован в буфер обмена!'});
}

//= Асинхронная загрузка скриптов =========================================
function loadScript(url, callback){

	var script = document.createElement("script")
	script.type = "text/javascript";
	
	if (script.readyState){  //IE
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" ||
					script.readyState == "complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {  //Others
		script.onload = function(){
			callback();
		};
	}

	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

//= Инициализация карты ===================================================
function initMap(){

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VuZXN5cyIsImEiOiJjbDhlZGpnMXUxa2VoM3BuMzBocmljZmdiIn0.ips7qa_gfSr299RO_C27bQ';
	
	let coords = [38.970353, 45.040368];
	let zoom = 17;

    const geoJson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "point",
                    "coordinates": coords
                },
                "properties": {
                    "title": "INOE • TECH",
                    "coordinates": coords
                }
            }
        ]
    }

    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/genesys/ckls2dt0l12fj17qxtbz91bqg',
        center: coords,
        zoom: zoom
    });

    map.scrollZoom.disable();

    for (const feature of geoJson.features){
        const el = $('<div class="marker"><div class="marker-element"></div></div>')[0];
        el.className = "marker";

        new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({offset: 25})
                    .setHTML(
                        `<div class="popup-header">${feature.properties.title}</div><div class="popup-description"><p>г. Краснодар, ул. Северная, 324Г</p><a target="_blank" href="https://yandex.ru/maps/-/CCUf64tX~B">Подробнее</a></div>`
                    )
            )
            .addTo(map);
    }
}