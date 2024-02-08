import React, { useEffect, useState } from 'react'
import mapOfRegionCors from './RegionCords';

import tt from '@tomtom-international/web-sdk-maps';
import useUserStore from '../../store';


// interface Props{
//   selectedPrice:
// }

const MapaComponent = () => {
  const nowy=useUserStore(s=>s.globalSelectedPowiat);
  const currentCity = mapOfRegionCors.find(city => city.name == nowy);
  const [selected,setSelected]=useState(currentCity);

  useEffect(()=>{
    if(currentCity){
      console.log(currentCity);
      setSelected(currentCity);
    }
  },[currentCity]);

  useEffect(() => {
// Zamień liczbę na string i rozdziel część przed i po przecinkiem
const [czescCalkowitaX, czescPoPrzecinkuX] =selected? selected.x.toString().split('.'):'18.44';
const [czescCalkowitaY, czescPoPrzecinkuY] =selected? selected.y.toString().split('.'):'52.13';

// Konwertuj część po przecinku z powrotem na liczbę
const liczbaPoPrzecinkuX = parseFloat('0.' + czescPoPrzecinkuX) * 5/3;
const liczbaPoPrzecinkuY = parseFloat('0.' + czescPoPrzecinkuY) * 5/3;

// Pomnóż tylko część po przecinku

const x=parseInt(czescCalkowitaX)+liczbaPoPrzecinkuX;
const y=parseInt(czescCalkowitaY)+liczbaPoPrzecinkuY;

    const map = tt.map({
      key: 'UcAS3ERLSlBjzpGkkZjvf9j88kW8A3Cp',
      container: 'map', // Id kontenera, w którym umieścisz mapę
      center: [x,y], // Początkowe współrzędne mapy
      zoom: 12, // Poziom przybliżenia
    });

    // Dodaj dowolne dodatkowe funkcje lub markery do mapy
    const marker = new tt.Marker().setLngLat([mapOfRegionCors[0].x+0.01, mapOfRegionCors[0].y+0.01]).addTo(map);
     // Dodaj etykietę do markera
     const label = document.createElement('div');
     label.className = 'marker-label';
     label.innerHTML = 'To jest moja etykieta';
 
     const markerElement = marker.getElement();
     markerElement.appendChild(label);
    return () => {
      map.remove(); // Opuść mapę, gdy komponent zostanie odmontowany
    };
  }, [selected,nowy]); // [] oznacza, że useEffect zostanie uruchomiony tylko raz po zamontowaniu komponentu

  return <div id="map" style={{ width: '995px', height: '600px' }}></div>;
};

export default MapaComponent