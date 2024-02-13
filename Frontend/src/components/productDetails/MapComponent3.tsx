import React, { useEffect, useState } from 'react'
import mapOfRegionCors from './RegionCords';

import tt from '@tomtom-international/web-sdk-maps';
import useUserStore from '../../store';
import APIClient from '../../services/api-client';
import axios from 'axios';
import { Price } from '../../entities/price';
import useProductDetails from '../../hooks/useProductDetails';
import { ProductDetails } from '../../entities/productDetails';
import useProductPrices from '../../hooks/useProductPrices';
import ProductPrices from './productPrices';

/*
const handleSearch = async (address:string) => {
  try {
    const response = await axios.get('https://api.tomtom.com/search/2/search/' + address + '.json', {
      params: {
        key: 'UcAS3ERLSlBjzpGkkZjvf9j88kW8A3Cp',
      },
    });

    
    const pierwszyWynik = response.data.results[0];

    // Wyświetl współrzędne geograficzne
    if (pierwszyWynik) {
      console.log('Współrzędne geograficzne:', pierwszyWynik.position);
      return pierwszyWynik;
    } else {
      console.log('Nie znaleziono wyników.');
    }
  } catch (error) {
    console.error('Błąd podczas wyszukiwania:', error);
  }
};
*/

const handleSearch = (address:string) => {
  return axios.get('https://api.tomtom.com/search/2/search/' + address + '.json', {
    params: {
      key: 'UcAS3ERLSlBjzpGkkZjvf9j88kW8A3Cp',
    },
  })
  .then(response => {
    const pierwszyWynik = response.data.results[0];

    // Wyświetl współrzędne geograficzne
    if (pierwszyWynik) {
      console.log('Współrzędne geograficzne:', pierwszyWynik.position);
      return pierwszyWynik;
    } else {
      console.log('Nie znaleziono wyników.');
    }
  })
  .catch(error => {
    console.error('Błąd podczas wyszukiwania:', error);
  });
};



interface Props{
  productId:string;
}

interface Position{
  lon:number;
  lat:number;
}

var temp:Position[] =[];

const MapaComponent = ({productId}:Props) => {
  const [selectedPowiat,setSelectedPowiat]=useState(0);
  const nowy=useUserStore(s=>s.globalSelectedPowiat);
  const currentCity = mapOfRegionCors.find(city => city.name == nowy);
  const productPrices =useProductPrices(parseInt(productId!), 33);
  const [selected,setSelected]=useState(currentCity);
  const [mark,setMark]=useState<Position[]>([{lon:21.70,lat:50.67}]);
  // const [mark,setMark]=useState([{lon:21.70,lat:50.67}]);
  

  

  useEffect(()=>{
    if(currentCity){
      // console.log(currentCity);
      setSelected(currentCity);
      // handleSearch().then(pr=>console.log(pr.position));

      // while(isLoading){
      //   console.log('asgagsga');
      // }
      console.log(currentCity.name);
      if(productPrices&&!productPrices.isLoading){
        console.log(productPrices.data);
        productPrices.data?.forEach(price=>{
          var list = price.shopAddress.split(" ");
          console.log(list[0]);
          if(list[0]==currentCity.name) {
            handleSearch(price.shopAddress).then(pr=>temp.push(pr.position)); 
          }
        })
        //setMark(temp);
      }
      /*
      if(productPrices&&!productPrices.isLoading){
        productPrices.data?.forEach(price=>{
          handleSearch(price.shopAddress).then(pr=>temp.push(pr.position));  
        })
        setMark(temp);
      }
      */
      
    }
  },[currentCity,productId,productPrices]);

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
    //const markers=mark.map(mark=>new tt.Marker().setLngLat([mark.lon,mark.lat]));
    //markers.map(mark1=>mark1.getElement().className='marker');
    //markers.map(mark1=>mark1.addTo(map));
    // const marker = new tt.Marker().setLngLat([mark.lon,mark.lat]);
    const markers1 = temp.map(temp=>new tt.Marker().setLngLat([temp.lon,temp.lat]));
    markers1.map(temp1=>temp1.getElement().className='marker');
    markers1.map(temp1=>temp1.addTo(map));

     // Dodaj etykietę do markera
    //  const label = document.createElement('div');
    //  label.className = 'marker-label';
    //  label.innerHTML = 'To jest moja etykieta';
 
    //  const markerElement = marker.getElement();
    //  markerElement.appendChild(label);
    //  markerElement.className='marker';
    // marker.addTo(map);
    return () => {
      map.remove(); // Opuść mapę, gdy komponent zostanie odmontowany
    };
  }, [selected,nowy,temp]); // [] oznacza, że useEffect zostanie uruchomiony tylko raz po zamontowaniu komponentu

  return <div id="map" style={{position:'relative',width: '100%', height: '600px' }}></div>;
};

export default MapaComponent