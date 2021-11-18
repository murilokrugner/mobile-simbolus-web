import React, { useState, useEffect } from "react";
import ReactMapboxGl, {
  Marker,
  GeoJSONLayer,
  Layer,
  Feature,
} from "react-mapbox-gl";
import ReactSelect from 'react-select';
import "mapbox-gl/dist/mapbox-gl.css";
import Loading from "../../../components/Loading";
import { Container, ContainerButtonRefresh } from "./styles";
import io from "socket.io-client";
import Panel from "../../../components/Panel";
import api from "../../../services/api";
import { useSelector } from "react-redux";
import markerIcon from "../../../assets/marker.png";
import startIcon from "../../../assets/start.png";
import finishedIcon from "../../../assets/finished.png";

import Modal from 'react-modal';
import { toast } from "react-toastify";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibXVyaWxva3J1Z25lciIsImEiOiJja3Bjd3ZvM2cxYTRwMm9sYTZrbmZva2ZnIn0.j68LYEywNr9hu4B0Kk8AjQ",
});

const socket = io("http://201.33.248.208:3333");

const customStyles = {
  content: {
    top: '50%',
    left: '70%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
};

function Maps() {
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [datas, setDatas] = useState(null);
  const [currentDatas, setCurrentDatas] = useState([]);
  const [geojson, setGeojson] = useState(null);
  const profile = useSelector((state) => state.user.profile);

  const [selectEmployee, setSelectEmployee] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  const [jsonComplete, setJsonComplete] = useState(null);

  const [searchOn, setSearchOn] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [loadingMaps, setLoadingMaps] = useState(false);

  async function loadEmployees() {
      const response = await api.get(`employees?company=${profile.emp_codigo}`);

      const data = [];

      const formatEmployees = response.data.map(item => {
      data.push({'value': item.FUN_CODIGO, 'label': item.FUN_NOME});
      });

      setEmployees(data);

      setLoadingEmployees(false);
  }

  function handleViewUser(id, name) {
    alert("Usuario: " + name);
  }

  function handleSetData(data) {
    setDatas(data);
    setSearchOn(true);
  }

  async function loadLocationCache() {
    setLoadingMaps(true);

    const response = await api.get(
      `location-cache?company_name=${profile.emp_nome}`
    );

    if (response.data.length > 0) {
      setDatas(response.data);

      setCurrentDatas(response.data);
    } else {
      setCurrentDatas(null);
      setDatas(null);
    }

    setLoadingData(false);
    setLoading(false);
    setLoadingMaps(false);

  }

  function handleSetGeoJson(json) {
    setGeojson(json.value);
    setJsonComplete(json);
  }

  function handleClean() {
    setGeojson(null);
    setSearchOn(false);
  }

  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSubmitTrasfer() {
      openModal();
  }

  async function sendTransfer() {
    if (selectEmployee === '' || selectEmployee === null) {
      alert('Selecione o vendendor');
      return;
    }

      if (jsonComplete === '' || jsonComplete === null) {
        alert('Selecione a rota que você quer transferir');
        return;
      }

      const splitJson = jsonComplete.label.split('-');

      const idJson = splitJson[0];

      try {
        await api.post(`transfer-route?idJson=${idJson}&employee=${selectEmployee.value}`)

        toast.success('Rota transferida com sucesso!');
  
        closeModal();
      } catch (error) {
        toast.error('Erro ao transferir rota, tente novamente mais tarde');
      }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      loadLocationCache();
      setCurrentPosition([position.coords.longitude, position.coords.latitude]);
    });
  }, []);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [datas, currentDatas, geojson]);

  //mapbox://styles/mapbox/dark-v9

  const linePaint = {
    "line-color": "black",
    "line-width": 3,
  };

  return (
    <Container>        
      {loading || loadingData ? (
        <Loading loading={loading} />
      ) : (
        <>
          {loadingMaps ? (
            <Loading loading={loadingMaps} />
          ) : (
            <Map
            style="mapbox://styles/mapbox/streets-v9"
            zoom={[14]}
            center={searchOn ? datas[0].coords : currentPosition}
            containerStyle={{
              height: "100vh",
              width: "100vw",
            }}
          >
            <>
            <ContainerButtonRefresh>
              <button type="button" onClick={loadLocationCache}>ATUALIZAR MAPA</button>
            </ContainerButtonRefresh>
            {geojson && (
              <>
                <GeoJSONLayer data={geojson} linePaint={linePaint} />

                <>
                  {geojson.features.map((p) => (
                    <>
                      {p.geometry.type === "Point" && (
                        <Marker
                          coordinates={p.geometry.coordinates}
                          onClick={() => {
                            alert(
                              p.properties.name + "\n" + p.properties.prp_name
                            );
                          }}
                          anchor="bottom"
                        >
                          <img
                            src={markerIcon}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 50,
                              border: 50,
                            }}
                          />
                        </Marker>
                      )}

                      <>
                        {p.geometry.type === "LineString" && (
                          <>
                            <Marker
                              coordinates={p.geometry.coordinates[0]}
                              onClick={() => {
                                alert("INICIO");
                              }}
                              anchor="bottom"
                            >
                              <img
                                src={startIcon}
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 50,
                                  border: 50,
                                }}
                              />
                            </Marker>

                            <Marker
                              coordinates={
                                p.geometry.coordinates[
                                  p.geometry.coordinates.length - 1
                                ]
                              }
                              onClick={() => {
                                alert("FIM");
                              }}
                              anchor="bottom"
                            >
                              <img
                                src={finishedIcon}
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 50,
                                  border: 50,
                                }}
                              />
                            </Marker>
                          </>
                        )}
                      </>
                    </>
                  ))}
                </>
              </>
            )}

            {datas !== null && (
              <>
                {datas.map((location) => (
                  <Marker
                    coordinates={location.routes[0].coords}
                    onClick={() => {
                      handleViewUser(location.routes[0].user, location.routes[0].name);
                    }}
                    anchor="bottom"
                  >
                    <img
                      src={`https://avatars.dicebear.com/api/human/${location.user}.svg`}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        border: 50,
                      }}
                    />
                  </Marker>
                ))}
              </>
            )}

            </>
          </Map>
          )}

          <Panel
            dataEmployee={currentDatas}
            handleSetData={handleSetData}
            handleSetGeoJson={handleSetGeoJson}
            handleClean={handleClean}
            handleSubmitTrasfer={handleSubmitTrasfer}
          />  
        </>
      )}      

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Transferir rota para outro vendedor"
      >
        <h2>Selecione o vendendor para qual você quer transferir a rota</h2>
        <ReactSelect    
            name={selectEmployee}
            value={selectEmployee}
            defaultValue={selectEmployee}
            onChange={value => setSelectEmployee(value)}
            placeholder={'Selecionar vendedor'}                    
            options={employees}
            isClearable={false}
            isLoading={loadingEmployees}
          />
        <button onClick={sendTransfer}>Transferir</button>
      </Modal>
    </Container>
  );
}

export default Maps;
