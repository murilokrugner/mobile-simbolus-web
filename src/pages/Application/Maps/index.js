import React, {useState, useEffect} from 'react';

import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ClipLoader from "react-spinners/ClipLoader";

import { Container } from './styles';

import marketIcon from '../../../assets/simb.png';

import io from 'socket.io-client';

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoibXVyaWxva3J1Z25lciIsImEiOiJja3Bjd3ZvM2cxYTRwMm9sYTZrbmZva2ZnIn0.j68LYEywNr9hu4B0Kk8AjQ'
  });

const socket = io('http://localhost:3333');

function Maps() {
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [currentPosition, setCurrentPosition] = useState(null);   
    const [datas, setDatas] = useState([]);

    socket.on('received', async function(data) {  
        setDatas(data);
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCurrentPosition([position.coords.longitude, position.coords.latitude]);

            setLoading(false);
        });    
    }, []);

   function handleViewUser(id, name) {
       alert('Usuario: ' + name)
   }

  return (
      <Container>
          {loading && loadingData ? (
               <ClipLoader color={'#fff'} loading={loading} size={100} />
          ) : (
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                zoom={[14]}
                center={currentPosition}                
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
                >
                 {datas.map(location => (
                    <Marker
                        coordinates={location.coords}
                        onClick={() => {handleViewUser(location.user, location.name)}}
                        anchor="bottom">
                        <img src={`https://avatars.dicebear.com/api/human/${location.user}.svg`} style={{width: 40, height: 40, borderRadius: 50, border: 50}}/>
                    </Marker>
                ))}
            </Map>
          )}
      </Container>
  )
}

export default Maps;