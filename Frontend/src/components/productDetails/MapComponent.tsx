import { useEffect, useState } from 'react'
import tt from '@tomtom-international/web-sdk-maps';
import { Pointer } from './ProductDetails';

interface Props{
  currentCity:CurrentCity;
  newMarkers:Pointer[];
}

interface CurrentCity{
  name:string;
  x:number;
  y:number;
}

export interface Position{
  lon:number;
  lat:number;
}

const MapComponent = ({currentCity,newMarkers}:Props) => {

  useEffect(() => {

        const [integerPartX, fractionPartX] =currentCity? currentCity.x.toString().split('.'):'18.44';
        const [integerPartY, fractionPartY] =currentCity? currentCity.y.toString().split('.'):'52.13';
       
        const degreesX = parseFloat('0.' + fractionPartX) * 5/3;
        const degreesY = parseFloat('0.' + fractionPartY) * 5/3;
       
       
        const x=parseInt(integerPartX)+degreesX;
        const y=parseInt(integerPartY)+degreesY;
          
        
          const map = tt.map({
            key: 'UcAS3ERLSlBjzpGkkZjvf9j88kW8A3Cp',
            container: 'map', 
            center: [x, y], 
            zoom: 12, 
          });

          
    const markers = newMarkers.map(temp1 => {
      const label = document.createElement('div');
      label.className = 'marker-label';
      label.innerHTML = `<p>${temp1.name}</br> cena ${temp1.price}zł</p>`;

      const marker= new tt.Marker().setLngLat([temp1.position.lon,temp1.position.lat]);
      const markerElement = marker.getElement();
      markerElement.appendChild(label);
      return marker;
    });


    console.log(markers);

    let mapZomed=false;

    markers.forEach((marker) => {
     marker.getElement().className = 'marker';
      marker.addTo(map);

    marker.getElement().addEventListener('click', () => {
        const labelElement = marker.getElement().querySelector('.marker-label');
        if(labelElement){
          labelElement.classList.toggle('marker-label-clicked');
        }
       
          map.flyTo({
            center: marker.getLngLat(),
            zoom: !mapZomed ? 15:12,
            essential: true,
          });
        mapZomed=!mapZomed;     
  });
    });

    
    return () => {
      map.remove();
    };
     
  }, [newMarkers]);
      

  return <div id="map" style={{position:'relative',width: '100%', height: '600px',overflow:'hidden' }}></div>;

};

export default MapComponent