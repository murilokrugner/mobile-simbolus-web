import React, {useState, useEffect} from 'react';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ClipLoader from "react-spinners/ClipLoader";

import { Container } from './styles';

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoibXVyaWxva3J1Z25lciIsImEiOiJja3Bjd3ZvM2cxYTRwMm9sYTZrbmZva2ZnIn0.j68LYEywNr9hu4B0Kk8AjQ'
  });
  

function Maps() {
    const [loading, setLoading] = useState(true);
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCurrentPosition([position.coords.longitude, position.coords.latitude]);

            setLoading(false);
        });
    }, []);

    

  return (
      <Container>
          {loading ? (
               <ClipLoader color={'#fff'} loading={loading} size={100} />
          ) : (
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                zoom={[17]}
                center={currentPosition}                
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
                >
                
            </Map>
          )}
      </Container>
  )
}

export default Maps;