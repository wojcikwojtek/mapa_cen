import { useEffect, useState } from 'react'
import tt, { Marker } from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import { Price } from '../../entities/price';
import { Pointer } from './ProductDetails';





interface Props{
  currentCity:CurrentCity;
  newMarkers:Pointer[];
  // unmount:()=>void;
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

const MapaComponentNew = ({currentCity,newMarkers}:Props) => {
  
  // const [selected,setSelected]=useState(currentCity);

// useEffect(()=>{

// },[productPrices,currentCity]);


  useEffect(() => {

        const [czescCalkowitaX, czescPoPrzecinkuX] =currentCity? currentCity.x.toString().split('.'):'18.44';
        const [czescCalkowitaY, czescPoPrzecinkuY] =currentCity? currentCity.y.toString().split('.'):'52.13';
       
        const liczbaPoPrzecinkuX = parseFloat('0.' + czescPoPrzecinkuX) * 5/3;
        const liczbaPoPrzecinkuY = parseFloat('0.' + czescPoPrzecinkuY) * 5/3;
       
       
        const x=parseInt(czescCalkowitaX)+liczbaPoPrzecinkuX;
        const y=parseInt(czescCalkowitaY)+liczbaPoPrzecinkuY;
          
      
          console.log("x"+x);
          console.log("y"+y);
          
        
        
          const map = tt.map({
            key: 'UcAS3ERLSlBjzpGkkZjvf9j88kW8A3Cp',
            container: 'map', // Id kontenera, w którym umieścisz mapę
            center: [x, y], // Początkowe współrzędne mapy
            zoom: 12, // Poziom przybliżenia
          });

          // console.log("dlugosc: " + newMarkers[0].lon);
          
    const markers = newMarkers.map(temp1 => {
      const label = document.createElement('div');
      label.className = 'marker-label';
      label.innerHTML = `<p>${temp1.name}</p>`;

      const marker= new tt.Marker().setLngLat([temp1.position.lon,temp1.position.lat]);
      const markerElement = marker.getElement();
      markerElement.appendChild(label);
      return marker;
    });


    console.log(markers);

    markers.forEach((marker) => {
     marker.getElement().className = 'marker';
      marker.addTo(map);

       // Dodaj event listener do znacznika
    marker.getElement().addEventListener('click', () => {
      // Przybliżenie do znacznika po kliknięciu
      map.flyTo({
          center: marker.getLngLat(),
          zoom: 15,  // Możesz dostosować wartość zoomu według potrzeb
          essential: true  // Opcjonalne, ustawia zoom jako niezbędny
      });
  });
    });

    
    return () => {
      map.remove();
    };
     
  }, [newMarkers]);
      


  return <div id="map" style={{position:'relative',width: '100%', height: '600px' }}></div>;

  // useEffect(() => {
    
// Zamień liczbę na string i rozdziel część przed i po przecinkiem
// const [czescCalkowitaX, czescPoPrzecinkuX] =currentCity? currentCity.x.toString().split('.'):'18.44';
// const [czescCalkowitaY, czescPoPrzecinkuY] =currentCity? currentCity.y.toString().split('.'):'52.13';

// // Konwertuj część po przecinku z powrotem na liczbę
// const liczbaPoPrzecinkuX = parseFloat('0.' + czescPoPrzecinkuX) * 5/3;
// const liczbaPoPrzecinkuY = parseFloat('0.' + czescPoPrzecinkuY) * 5/3;

// // Pomnóż tylko część po przecinku

// const x=parseInt(czescCalkowitaX)+liczbaPoPrzecinkuX;
// const y=parseInt(czescCalkowitaY)+liczbaPoPrzecinkuY;

//     const map = tt.map({
//       key: 'UcAS3ERLSlBjzpGkkZjvf9j88kW8A3Cp',
//       container: 'map', // Id kontenera, w którym umieścisz mapę
//       center: [x,y], // Początkowe współrzędne mapy
//       zoom: 12, // Poziom przybliżenia
//     });

//     console.log("markery:"+marks);
//     const markers1 = marks.map(temp=>new tt.Marker().setLngLat([temp.lon,temp.lat]));
    
//     markers1.map(temp1=>temp1.getElement().className='marker');
//     markers1.map(temp1=>temp1.addTo(map));

//      // Dodaj etykietę do markera
//     //  const label = document.createElement('div');
//     //  label.className = 'marker-label';
//     //  label.innerHTML = 'To jest moja etykieta';
 
//     //  const markerElement = marker.getElement();
//     //  markerElement.appendChild(label);
//     //  markerElement.className='marker';
//     // marker.addTo(map);
//     return () => {
//       map.remove(); // Opuść mapę, gdy komponent zostanie odmontowany
//     };
//   }, [marks,currentCity]); // [] oznacza, że useEffect zostanie uruchomiony tylko raz po zamontowaniu komponentu

  // return <div id="map" style={{position:'relative',width: '100%', height: '600px' }}></div>;
};

export default MapaComponentNew