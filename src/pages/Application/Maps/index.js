import React, {useState, useEffect} from 'react';
import ReactMapboxGl, { Marker, GeoJSONLayer, Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Loading from '../../../components/Loading';
import { Container } from './styles';
import io from 'socket.io-client';
import Panel from '../../../components/Panel';
import api from '../../../services/api';
import { useSelector } from 'react-redux';
import markerIcon from '../../../assets/marker.png';
import startIcon from '../../../assets/start.png';
import finishedIcon from '../../../assets/finished.png';

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
    const [currentDatas, setCurrentDatas] = useState([]);
    const [geojson, setGeojson] = useState(null)
    const profile = useSelector(state => state.user.profile);

    const [searchOn, setSearchOn] = useState(false);

    /*async function saveLocationCache(data) {
       await api.post('location-cache', {
            company: profile.emp_codigo,
            routes: data,
       });
    }*/

    socket.on('received', async function(data) {  
        setDatas(data);   
        setCurrentDatas(data);    
        //saveLocationCache(data);
    });

   function handleViewUser(id, name) {
       alert('Usuario: ' + name)
   }

   function handleSetData(data) {
    setDatas(data);
    setSearchOn(true);
   }

   async function loadLocationCache() {
       const response = await api.get(`location-cache?company=${profile.emp_codigo}`);

       setDatas(response.data[0].routes);

       setCurrentDatas(response.data[0].routes);

       setLoadingData(false);

       
   }

   function handleSetGeoJson(json) {
      setGeojson(json.value);
    
   }

   function handleClean() {
    setGeojson(null);
    setSearchOn(false);
   }

   useEffect(() => {
      loadLocationCache();
        navigator.geolocation.getCurrentPosition(function(position) {
            setCurrentPosition([position.coords.longitude, position.coords.latitude]);     
            setLoading(false); 
        });  
        
       
    }, []);

    useEffect(() => {

    }, [datas, currentDatas, geojson]);


   //mapbox://styles/mapbox/dark-v9

   const linePaint = {
      'line-color': 'black',
      'line-width': 3,
    };

  return (
      <Container>     
          {loading || loadingData ? (
               <Loading loading={loading} />
          ) : (
            <>
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    zoom={[14]}
                    center={searchOn ? datas[0].coords : currentPosition}                
                    containerStyle={{
                        height: '100vh',
                        width: '100vw'
                    }}
                    >
                    {geojson && (
                        <>
                          <GeoJSONLayer
                            data={geojson}
                            linePaint={linePaint}                          
                          />                     

                          <>
                            {geojson.features.map(p => (
                              <>
                                {p.geometry.type === 'Point' && (
                                  <Marker
                                    coordinates={p.geometry.coordinates}
                                    onClick={() => {alert(p.properties.name +
                                      '\n' +
                                      p.properties.prp_name)}}
                                    anchor="bottom">  
                                    <img src={markerIcon} style={{width: 40, height: 40, borderRadius: 50, border: 50}}/>                                
                                  </Marker>
                                )}

<>
                                {p.geometry.type === 'LineString' && (
                                  <>
                                    <Marker
                                      coordinates={p.geometry.coordinates[0]}
                                      onClick={() => {alert('INICIO')}}
                                      anchor="bottom">  
                                      <img src={startIcon} style={{width: 40, height: 40, borderRadius: 50, border: 50}}/>                                
                                    </Marker>

                                    <Marker
                                      coordinates={
                                        p.geometry.coordinates[
                                            p.geometry.coordinates
                                                .length - 1
                                        ]
                                      }
                                      onClick={() => {alert('FIM')}}
                                      anchor="bottom">  
                                      <img src={finishedIcon} style={{width: 40, height: 40, borderRadius: 50, border: 50}}/>                                
                                    </Marker>

                                  </>
                                )}
                              </>
                              </>
                              
                            ))}
                          </>

                        </>
                    )}    
              
                    {datas.map(location => (
                        <Marker
                            coordinates={location.coords}
                            onClick={() => {handleViewUser(location.user, location.name)}}
                            anchor="bottom">
                            <img src={`https://avatars.dicebear.com/api/human/${location.user}.svg`} style={{width: 40, height: 40, borderRadius: 50, border: 50}}/>
                        </Marker>
                    ))}
                   
         
                    
                </Map>
        
                <Panel dataEmployee={currentDatas} handleSetData={handleSetData} handleSetGeoJson={handleSetGeoJson} handleClean={handleClean}/>
            </>
        )}
      </Container>
  )
}

export default Maps;