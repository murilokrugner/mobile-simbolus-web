import React, { useState, useEffect } from 'react';

import { Container } from './styles';

import api from '../../services/api';

import Loading from '../Loading';

import { useSelector } from 'react-redux';

import ReactSelect from 'react-select';

function RoutesEmployee({employee, handleGeoJson}) {
    const [loading, setLoading] = useState(true);
    const [routes, setRoutes] = useState([]);
    const [selectRoute, setSelectRoute] = useState('');
    const profile = useSelector(state => state.user.profile);

    async function loadRoutes() {        
        setLoading(true);
        
        const response = await api.get(
            `routesall?company_name=${profile.emp_nome}&fun=${employee}`,
        );

        const data = [];

        const formatEmployees = response.data.map(item => {
            data.push({'value': item.routes, 'label': item.id + ' - ' + item.description});
        });

        setRoutes(data);
        setLoading(false);
    }
    
    function handleAddRouteInMap() {
        handleGeoJson(selectRoute);     
    }


    useEffect(() => {
        if (employee !== null) {
            loadRoutes();
        } else {
            setLoading(false);
        }
    }, [employee]);

    useEffect(() => {
       if (selectRoute !== '' || selectRoute !== null || selectRoute.value !== null || selectRoute !== undefined) {
        handleAddRouteInMap();
       }
    }, [selectRoute]);

  return (
      <Container>
          {loading ? (
              <Loading />
          ) : (
              <>
                <ReactSelect    
                    name={selectRoute}
                    value={selectRoute}
                    defaultValue={selectRoute}
                    onChange={value => setSelectRoute(value)}
                    placeholder={'Rotas de venda'}                    
                    options={routes}
                    isClearable={false}
                    isLoading={loading}
                />
              </>
          )}
      </Container>
  );
}

export default RoutesEmployee;